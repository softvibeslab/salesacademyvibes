import json, os, re, shutil, sys
SL = "/Users/rogergv/Documents/SoftvibesLab"
OUT = os.environ.get("KB_OUT", "/tmp/sa-kb/knowledge")
PRIVATE = ("meetings/", "input/")
os.makedirs(OUT, exist_ok=True)

def private(n):
    src = (n.get("source_file") or "") + " " + (n.get("source_location") or "")
    return n.get("project") in ("meetings", "input") or any(p in src for p in PRIVATE)

def filter_graph(src, dst):
    g = json.load(open(src))
    drop = {n["id"] for n in g["nodes"] if private(n)}
    g["nodes"] = [n for n in g["nodes"] if n["id"] not in drop]
    key = "links" if "links" in g else "edges"
    g[key] = [e for e in g[key] if e.get("source") not in drop and e.get("target") not in drop and not any(p in (e.get("source_file") or "") for p in PRIVATE)]
    if "hyperedges" in g:
        g["hyperedges"] = [h for h in g["hyperedges"] if not set(h.get("nodes", [])) & drop]
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    json.dump(g, open(dst, "w"), ensure_ascii=False)
    return len(drop), len(g["nodes"]), len(g[key])

def copy(src, dst, skip_ext=(), skip_names=()):
    if os.path.isdir(src):
        for root, dirs, files in os.walk(src):
            dirs[:] = [d for d in dirs if d not in ("__pycache__", "cache", ".scratch", "node_modules", "history") and not d.startswith("update-")]
            for f in files:
                if f.endswith(skip_ext) or f in skip_names or f.startswith("."):
                    continue
                rel = os.path.relpath(os.path.join(root, f), src)
                os.makedirs(os.path.join(dst, os.path.dirname(rel)), exist_ok=True)
                shutil.copy2(os.path.join(root, f), os.path.join(dst, rel))
    elif os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)

SA = f"{SL}/SalesAcademyVibes/graphify-out"
stats = {}
stats["sales-academy"] = filter_graph(f"{SA}/graph.json", f"{OUT}/sales-academy/graph.json")
for f in ["GRAPH_REPORT.md", "README.md", "WIKI_SALES_ACADEMY.md", "analysis.json", "api-catalog.json", "community-labels.json", "findings.json", "project-views.json", "coverage.json"]:
    copy(f"{SA}/{f}", f"{OUT}/sales-academy/{f}")
copy(f"{SA}/knowledge-base", f"{OUT}/sales-academy/knowledge-base")
copy(f"{SA}/projects", f"{OUT}/sales-academy/projects", skip_names=("meetings.html", "input.html"))
copy(f"{SA}/integration", f"{OUT}/sales-academy/integration", skip_ext=(".png",))

BH = f"{SL}/brain-hub"
stats["brain-hub"] = filter_graph(f"{BH}/graphify-out/graph.json", f"{OUT}/brain-hub/graph.json")
for f in ["README.md", "WORKSPACE_MAP.md"]:
    copy(f"{BH}/{f}", f"{OUT}/brain-hub/{f}")
copy(f"{BH}/graphify-out/GRAPH_REPORT.md", f"{OUT}/brain-hub/GRAPH_REPORT.md")
copy(f"{BH}/graphify-out/memory", f"{OUT}/brain-hub/memory")
copy(f"{BH}/corpus", f"{OUT}/brain-hub/corpus")
copy(f"{BH}/research", f"{OUT}/brain-hub/research", skip_ext=(".png", ".jpg", ".jpeg", ".webp", ".mp4"))

copy(f"{SL}/SalesAcademyVibes/docs", f"{OUT}/wiki", skip_ext=(".yml",))
# Fichas de recursos y personalidad del Copiloto (lo que ven los reps)
copy(f"{SL}/SalesAcademyVibes/prototypes/smart-agenda-mockup/fichas.js", f"{OUT}/app/fichas.js")
copy(f"{SL}/SalesAcademyVibes/prototypes/copiloto-rep/soul/sales-academy.md", f"{OUT}/app/copiloto-soul.md")
print(json.dumps(stats))
