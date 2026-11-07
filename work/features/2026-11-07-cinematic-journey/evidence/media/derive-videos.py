"""Reproduce the five curated web derivatives without modifying source videos."""
from concurrent.futures import ThreadPoolExecutor
import hashlib
import io
import json
from pathlib import Path
import subprocess
import sys
from PIL import Image

EVIDENCE = Path(__file__).resolve().parent
ROOT = EVIDENCE.parents[4]
OUTPUT = ROOT / "growth/site/assets/films"
CATALOG = ROOT / "growth/content/video-catalog.json"
FFMPEG = "/opt/homebrew/bin/ffmpeg"
FFPROBE = "/opt/homebrew/bin/ffprobe"
RESUME = "--resume" in sys.argv


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def create_derivative(item):
    source = ROOT / item["sourceFile"]
    clip_id = item["id"]
    video = OUTPUT / f"{clip_id}.mp4"
    poster = OUTPUT / f"{clip_id}.webp"
    captions = OUTPUT / f"{clip_id}.es.vtt"
    transcript = OUTPUT / f"{clip_id}.es.txt"
    command = [FFMPEG, "-y", "-v", "error", "-i", str(source),
               "-map", "0:v:0", "-map", "0:a:0", "-map_metadata", "-1",
               "-vf", "scale='min(720,iw)':-2", "-c:v", "libx264",
               "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(video)]
    if not (RESUME and video.exists()):
        subprocess.run(command, check=True)
    poster_command = [FFMPEG, "-y", "-v", "error", "-ss", str(item["posterTime"]),
                      "-i", str(source), "-frames:v", "1", "-vf",
                      "scale='min(480,iw)':-2", "-f", "image2pipe", "-c:v", "png", "pipe:1"]
    poster_bytes = subprocess.check_output(poster_command)
    with Image.open(io.BytesIO(poster_bytes)) as image:
        image.convert("RGB").save(poster, "WEBP", quality=76, method=6)
    raw_captions = EVIDENCE / "transcripts/word-timing" / f"{item['sourceId']}.vtt"
    text = raw_captions.read_text()
    for before, after in [("Agenda Undemo.", "Agenda una demo."),
                          ("Agenda on Demo.", "Agenda una demo."),
                          ("Cuch", "Coach"), ("24-7", "24/7"),
                          ("Gold Sheet", "GoalSheet")]:
        text = text.replace(before, after)
    captions.write_text(text)
    caption_lines = [line for line in text.splitlines()
                     if line.strip() and line != "WEBVTT" and "-->" not in line]
    transcript.write_text("Transcripción del video · " + item["titleProposed"] + "\n\n" +
                          " ".join(caption_lines) + "\n")
    metadata = json.loads(subprocess.check_output(
        [FFPROBE, "-v", "error", "-show_format", "-show_streams", "-of", "json", str(video)]))
    stream = next(s for s in metadata["streams"] if s["codec_type"] == "video")
    entry = {"id": clip_id, "title": item["titleProposed"],
             "src": f"/growth-assets/films/{clip_id}.mp4",
             "poster": f"/growth-assets/films/{clip_id}.webp",
             "width": stream["width"], "height": stream["height"],
             "durationSeconds": round(float(metadata["format"]["duration"]), 3),
             "captions": f"/growth-assets/films/{clip_id}.es.vtt", "audioKind": "speech"}
    evidence = {"id": clip_id, "source": item["sourceFile"], "sourceSha256": digest(source),
                "posterTime": item["posterTime"], "ffmpegCommand": command,
                "posterCommand": poster_command, "posterEncoding": "Pillow WEBP quality76 method6",
                "metadata": metadata,
                "files": [{"path": str(p.relative_to(ROOT)), "bytes": p.stat().st_size,
                           "sha256": digest(p)} for p in [video, poster, captions, transcript]]}
    return entry, evidence


def main():
    plan = json.loads((EVIDENCE / "integration-plan.json").read_text())
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(create_derivative, plan["clips"]))
    catalog = {entry["id"]: entry for entry, _ in results}
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    evidence = {"method": "H.264 CRF23, AAC96k, faststart; no upscaling; complete videos",
                "originalsChanged": False, "clips": [item for _, item in results]}
    (EVIDENCE / "derivatives.json").write_text(json.dumps(evidence, ensure_ascii=False, indent=2))
    print(json.dumps({"clips": len(results),
                      "videoBytes": sum(i["files"][0]["bytes"] for _, i in results),
                      "posterBytes": sum(i["files"][1]["bytes"] for _, i in results)}, indent=2))


if __name__ == "__main__":
    main()
