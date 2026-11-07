# Implementation contract · CP3

CP2 v1 approved 2026-11-07: «si lo apruebo contruye lis artefactis». Source: `../work/features/2026-11-07-growth-mediahub/cp2-spec.md`. No deployment authorized. All tests use temporary data.

## Shared interfaces

Python package `growth.server`, entry `growth.server.app.create_app(config=None)` with config `DATA_ROOT`, `TESTING`, `COOKIE_SECURE`, `PUBLIC_CONTACT_ENABLED` (default false outside local/testing), `RATE_LIMIT_ENABLED`. Configurable ephemeral localhost service port 4186. Persistent SQLite/data outside `growth/site`; default `/private/tmp/salesacademy-growth-local` only in local launch, production requires explicit path. Root `/` and `/ops/` etc are not routed by this service. Public nav demo links use `https://salesacademy.softvibes.art/` to preserve existing app.

Jinja templates at `growth/site/templates`: `landing.html`, `hub.html`, `resource.html`, `diagnostic.html`, `privacy.html`, `cms.html`, optional `analysis.html`, shared `base.html`. Static assets `/growth-assets/{filename}`. Server context for public pages: `doc` (published document), `resources` (public resources only), `preview` bool, `contact_enabled` bool; resource detail also `resource`. Jinja autoescape. Private preview `/cms/preview/` uses draft and `preview=true`, never indexed or cached publicly. Optional `?page=hub` or `?resource=slug` preview with auth. The seed is `growth/content/seed.json`, created by ROOT; no agent duplicates it.

CP3 integration context: `media_items` maps referenced media IDs to only `{id,title,alt,mime,variants}` for rendering approved alt text and choosing image `/web` versus PDF `/download`. Public pages reference only resources in the active public document; authenticated preview may resolve draft references. It never includes original filenames, filesystem paths or unrelated media. This does not change the persisted document or API schema.

Document schema:

```json
{
  "hero": {"eyebrow":"...","title":"...","description":"...","primaryLabel":"Diagnosticar mi sala"},
  "seo":{"title":"...","description":"..."},
  "sections":{"problemTitle":"...","problemBody":"...","practiceTitle":"...","practiceBody":"...","stagesTitle":"...","stagesBody":"...","ctaTitle":"...","ctaBody":"..."},
  "faqs":[{"question":"...","answer":"..."}],
  "resources":[{"id":"before-tour","slug":"antes-del-tour","title":"...","excerpt":"...","body":[{"type":"heading","text":"..."},{"type":"paragraph","text":"..."},{"type":"list","items":["..."]},{"type":"table","headers":["Campo","Nota"],"rows":[["...","..."]]}],"type":"template","role":"rep","topic":"practice","level":"start","coverId":null,"attachments":[],"externalMediaUrl":"","duration":"8 min de lectura","status":"published","evidenceLabel":"Recurso original","sourceNote":"Sales Academy · guía editorial","reviewedAt":"2026-11-07"}]
}
```

Types: guide/template/matrix/video/audio. Roles rep/leader/director. Topics coordination/practice/evidence. Resource status draft/review/published/archived. Text limits enforced by backend. No arbitrary HTML. Slug stable after initial publish. Documents public resource downloads `/mediahub/{slug}/descargar/` generated as UTF-8 `.md` from real content (no fake PDF). Media references limited to known IDs and reviewed/rights-approved before publish.

## CMS JSON contract

- Error: `{error:{code,message}}`, 400/401/403/404/409/413/415/429 as appropriate.
- Login POST `{username,password}` → `{user:{id,username,role},csrf}`. Session GET same shape. Cookie session, header `X-CSRF-Token` every authenticated mutation; logout POST `{}`.
- GET draft → `{document,revision,publishedRevision}`. PUT `{document,revision}` → same shape. Any save conflict 409. `revision` numeric. Server never saves stale state. JS keeps unsaved editor input on conflict.
- GET resources → `{items,nextCursor}`; POST `{resource,revision}`, PATCH resource id `{resource,revision}` → `{document,revision,publishedRevision}`. Shared document revision enforces consistency. IDs immutable.
- POST publish `{revision}` → `{publicationId,revision}`; GET revisions → `{items:[{id,createdAt,author,summary}],nextCursor}`. POST restore `{publicationId,revision}` → draft shape. Restore never automatically publishes.
- Users GET → `{items,nextCursor}`; POST `{username,password,role}`; PATCH id `{role,active,password?}` → `{user}`. Owner only. Last owner protected, sessions invalidated on access/password changes.
- Demo POST `{email,role,roomCountBucket,need,contactConsent:true,marketingOptIn:false,privacyVersion:"2026-11-07"}` plus `Idempotency-Key` UUID → `{id,received:true}`, 201 first and 200 identical replay. Conflict for different body. CMS GET demo-requests → `{items,nextCursor}`; PATCH `{id,status}` status new/contacted/qualified/closed.
- GET `/cms/api/metrics` owner-only aggregate counts (no contact values). No fabricated statistics. CP3 additive refinement: `diagnostic:{startedFlows,completedFlows,completionRate}` uses distinct consented `flowId` values in the last 30 days. `completedFlows` is the intersection of flows with both `diagnostic_started` and `diagnostic_completed` in that window; `completionRate` is a percentage 0–100 rounded to two decimals, or `null` when `startedFlows=0`. Flow IDs are not returned. This rate covers consented diagnostic flows only, not people, visits across pages or commercial conversions; in-memory flow IDs reset across page loads.
- Events body as CP2. Consent proof field `consentVersion:"2026-11-07"`; optional `resourceId`; allowlist properties. UUID eventId/flowId. Request count is transactional; optional client tracking only after consent. CP3 refinement agreed by ROOT/frontend/backend: `resourceId` is the published resource's immutable `id` (e.g. `before-tour`), while `slug` is only for URLs; no free text or unpublished IDs.

## Media module interface (owned by media agent)

`growth.server.media.MediaStore(root)` where root=`DATA_ROOT/media`; methods `upload(stream, filename, metadata) -> dict`, `list(query='',cursor=0,limit=24)->{items,nextCursor}`, `update(id, metadata)->dict`, `get(id)->dict|None`, `path(id,variant)->Path`, `usage()->dict`, `verify_publish(document)->None`, `references(document)->set[str]`. `MediaError(message,status=400,code='invalid_media')` with attributes. Metadata title/alt/origin/rightsStatus pending|approved/reviewStatus pending|approved/archived bool. Item id, filename, mime, bytes, title,alt,origin,rightsStatus,reviewStatus,archived,checksum, variants. Derivative URL `/media/{id}/web` or download. Originals never publicly served. Published snapshots retain derived media even archived.

Backend wires GET/POST/PATCH media, GET media/{id}/usage, GET media-storage, and authorized/public file access. `upload` multipart `file` plus metadata fields. Backend handles role/CSRF. Public access only if referenced by active published snapshot; preview/retained versions require session. New archive not allowed to be newly published, but existing published references remain readable. Media agent implements module and tests only, no app.py.

## Backup

ROOT owns CLI wiring and runbook. Media agent provides `growth.server.backup.create_backup(data_root,destination)` and `verify_backup(snapshot)->dict`, `restore_backup(snapshot,new_empty_destination)`; consistent SQLite backups and hashes, immutable snapshots, refuses overwrite of nonempty data. Never restores into live server. Test restores temporary directory.

## Team boundaries

- backend agent: `growth/server/app.py`, auth/store/content modules, `growth/tests/test_backend.py`, OpenAPI, backend TDD evidence. No templates or seed.
- frontend agent: `growth/site/*`, `growth/tests/diagnostic.test.mjs` and frontend TDD evidence. No backend/seed.
- media agent: `growth/server/media.py`, `backup.py`, `growth/tests/test_media.py`, `test_backup.py`, media TDD evidence. No app/template/seed.
- ROOT: content seed, CLI/start, dependencies, packaging, E2E, docs and integration. Agents may refine contracts by explicit message before using mismatched shapes.

## V3 addendum · cinematic journey and curated films

Authorized by the user's explicit request on2026-11-07 to integrate their six MP4 files, model a simpler DigitalSpace-style scroll journey and show real app interfaces in use cases. CP2 and ADR: `work/features/2026-11-07-cinematic-journey/`. Five unique films; the first and sixth supplied files are identical.

`Resource.videoId` is optional/nullable. Allowed non-null IDs: `smart-agent`, `menos-caos`, `sistema-conectado`, `infraestructura-comercial`, `conocimiento-en-practica`. It is only valid for `type=video`, mutually exclusive with `externalMediaUrl`. Published video requires one source; audio keeps the external-provider rule. Unknown IDs, paths and wrong types are rejected without changing draft revision. Old documents omitting the field still validate and restore.

`growth/content/video-catalog.json` is a trusted build-time dictionary validated by `server/videos.py`: exact local MP4/WebP/VTT paths, reviewed title/dimensions/duration and speech metadata. Jinja context `video_catalog` is available to public/preview/CMS templates; CMS receives escaped inert JSON. No new API route, SQL table, credentials, provider or dependency. The five bundled films are public presentation assets, not private MediaStore uploads; publication controls their editorial appearance, not direct static URL access. CMS can change copy, association and cover. Arbitrary MP4 upload remains outside this scope.

`video_player(r)` renders native controls, playsinline, preload=none, captions and a readable failure/retry state. A chosen CMS cover overrides the catalog poster. The enhancement pauses other films on play and pauses playback when the tab becomes hidden. Resource body contains context and text transcription. URLs resolve only from the current document and trusted catalog; archived/draft resources are not rendered on public pages.

The landing's five-chapter continuous stage is a progressive visual enhancement. It uses native scroll, bounded transforms, a manual motion preference and system reduced-motion handling. Mobile/no-JS remain linear and usable. Full narrated films are chosen by the visitor, not scrubbed with scrolling. Conceptual scenes are distinguished from real demo interfaces.
