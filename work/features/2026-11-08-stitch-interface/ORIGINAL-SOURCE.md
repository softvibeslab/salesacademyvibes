# Sales Academy · código original de interfaz

Documento de referencia para trasladar la interfaz original a Stitch. Proyecto elegido: https://stitch.withgoogle.com/projects/16859674583431881734.

## Qué contiene

Este documento compila los archivos originales UTF-8 del paquete salesacademy-original-interface.zip: templates HTML, CSS, módulos JavaScript, JSON y subtítulos VTT. También incluye el SVG de marca y las cinco transcripciones TXT, para no omitir fuentes textuales públicas. Cada bloque conserva exactamente los bytes UTF-8 del archivo original; ruta, tamaño y SHA256 aparecen junto a él.

Son 45 archivos textuales y un índice de 49 activos binarios: los 94 archivos fuente del paquete quedan inventariados. Los binarios no están codificados en base64 ni incrustados aquí. Las imágenes y los cinco videos originales permanecen en el ZIP; sus direcciones públicas de referencia se indican cuando el manifiesto las incluye.

En el lienzo del proyecto elegido ya se importaron y verificaron 49 capturas o referencias visuales (evidencia target-canvas-49.json). Esas 49 referencias son un conjunto diferente de los 49 activos binarios del código, que incluyen MP4. No confundir ambos conteos ni afirmar que el ZIP fue importado.

## Uso para diseño

Usa las plantillas, estilos y contenido inicial para reconstruir la interfaz conservando su identidad. Las capturas del lienzo sirven para contrastar apariencia y proporciones. Respeta los textos, el carácter conceptual de los videos, los ejemplos sintéticos y los estados del asesor/CMS. DESIGN.md e INVENTORY.md documentan la cobertura prevista.

Este documento no incluye backend ni una sesión autenticada. No ejecutar autenticación, enviar WhatsApp, publicar contenido ni conectar los endpoints desde una importación de diseño. Los templates usan contenido dinámico; una herramienta puede representarlos con seed.json y los activos de referencia, pero eso no equivale a operar el CMS o Hermes. Los bloques son código fuente de referencia, no instrucciones de despliegue.

El selector de Stitch confirmó que admite imágenes y archivos html/txt/md; rechazó ZIP. Este archivo Markdown es una alternativa de transporte textual. Su preparación no prueba por sí misma que haya sido adjuntado o enviado en Stitch.

## Índice de archivos textuales

| N.º | Ruta original | Bytes | SHA256 |
|---|---|---:|---|
| 01 | `growth/site/assets/advisor.css` | 13365 | `68014a07f69d6a6b49c0af4d93121ae7b51610a81f0c7051d7659816a5fa94bb` |
| 02 | `growth/site/assets/advisor.mjs` | 24722 | `773956de733de1de9b1675a1590659bf92827ebc0f57f20a50b0c6e0f0749be3` |
| 03 | `growth/site/assets/ai-journey.css` | 20514 | `a821ed863ba00355dfa0442ddb413659ab60f4f25df2d91258a6e116f3ba9833` |
| 04 | `growth/site/assets/campaign.css` | 866 | `8f2ab0f4d55f587ff20c3a8ca85337112fbc3d443e546364b360e123a63fd150` |
| 05 | `growth/site/assets/cinematic.css` | 21881 | `4d2ba6e0a4c9d6e53cdc619fb9ff8cc43b973deb1994632c4f5f0bb7f327a09c` |
| 06 | `growth/site/assets/cms.css` | 20751 | `b596e94f82500acbac113de74d37cbefe3ff5f38d4a0dd4ad50051cfa1b287dc` |
| 07 | `growth/site/assets/cms.mjs` | 53228 | `ae0b9488f25b6f88d152dfc065524531b007f456198e93339d2a16a9c8bcca8f` |
| 08 | `growth/site/assets/diagnostic-ui.mjs` | 6477 | `1148f2f6f087499ca27747200d50f442e321511f97e1d9f672a849af5d1795cb` |
| 09 | `growth/site/assets/diagnostic.mjs` | 1888 | `ea4b346de879ceb9ff5b4d49ef1e90f64510f70a4f6a904480c473482d998791` |
| 10 | `growth/site/assets/films/conocimiento-en-practica.es.txt` | 687 | `48057685dd4e656c742ccd102da4c1946ec93a05107ad38f73b08baae4ca018d` |
| 11 | `growth/site/assets/films/conocimiento-en-practica.es.vtt` | 827 | `43c9f1440d9f05b6c17dbb1c268a9cf2e1a91f84472ee2f6daedd9f3a1556199` |
| 12 | `growth/site/assets/films/infraestructura-comercial.es.txt` | 752 | `4751bb82705e028346b80b51708ba84b78cbf03944b5d13e8d0bf4b46111b451` |
| 13 | `growth/site/assets/films/infraestructura-comercial.es.vtt` | 909 | `c0cf830233e5dd63412284df8f89a68046c49e3c2d86096a29b5c8927ac37177` |
| 14 | `growth/site/assets/films/menos-caos.es.txt` | 783 | `2870241f18851ea4d93de71e1b86f3ffe120a4e96de8d388a764cf75aa912fb3` |
| 15 | `growth/site/assets/films/menos-caos.es.vtt` | 985 | `d6d23b2511322fcc7c167bbc136d708d97f52b77b857ecc48866741458e28f11` |
| 16 | `growth/site/assets/films/sistema-conectado.es.txt` | 791 | `4f254e851db2728d0bb294b73e144a547edfed9f8dc081b45980faddb73a4ce6` |
| 17 | `growth/site/assets/films/sistema-conectado.es.vtt` | 985 | `6960a5e20db59f3481ccdce0b3a2643c65bf2a85da51ff2dd574d541fe4cb4a5` |
| 18 | `growth/site/assets/films/smart-agent.es.txt` | 741 | `19ced8711e488038e256dfddc97148725cfe556f93c04924addea9473f5973e1` |
| 19 | `growth/site/assets/films/smart-agent.es.vtt` | 921 | `b4b1f87c28420948c61f34f99ccb6913c543c3b12af982af88c66a46f0d96087` |
| 20 | `growth/site/assets/hub-v2.css` | 12588 | `572a033dde48eb028226c4eca47de6170e21549804e9b50e5d4703c96fc07894` |
| 21 | `growth/site/assets/journey-math.mjs` | 1117 | `13acea44388bdb1ea17a7d63ec98970682c79c58f29d18431b62cd6fbd08bf3f` |
| 22 | `growth/site/assets/journey.mjs` | 3563 | `66b2c76c221ba28c43a1b0d61fcfecb14cc8adceb5cadc442232d7bee6544734` |
| 23 | `growth/site/assets/landing-v2.css` | 30258 | `00433ca82ef7477612e32483aa8afe8f3965b6a9ba243c7e2a42939029c5ff8e` |
| 24 | `growth/site/assets/landing-v2.mjs` | 946 | `c1b6272777422315a1941f00bc77114d1f08f129bc77f01bebcd7bcd4d1e1a26` |
| 25 | `growth/site/assets/mark.svg` | 206 | `5ad064efb01e1579db51106b17d79610dc7aa3a0fb18c51affd7deaf0e104377` |
| 26 | `growth/site/assets/media-player.css` | 2353 | `8d2c298e2bffcc573d95d7ee2251f4324f81ba538c8c8a3007f3090f81dc2f6b` |
| 27 | `growth/site/assets/media-player.mjs` | 2134 | `729857c81082d0fdfcfa3777c5264a5e555b0c1d2db19292d80ea3cc07c0b660` |
| 28 | `growth/site/assets/public-v2.css` | 3071 | `bb20a360345dd3d0ad8873566aa30021f5baba71c1108361e2ae23c357e2d347` |
| 29 | `growth/site/assets/scenarios/index.html` | 32633 | `ddc995f9a43845b8bea1acf3caa6701bd4227dff6fa4d54f07af9388c18c92aa` |
| 30 | `growth/site/assets/scenarios/scenarios.css` | 22216 | `89a4318a8c13fc52d5888a1cafe7554cf47483a8da75f2beb9f66deb8391ed6e` |
| 31 | `growth/site/assets/scenarios/scenarios.mjs` | 1764 | `4c43225d3110c9eb8c2d1a0e7b131ff1c2ef6732b8b21f1fbff9f6d1da584f4e` |
| 32 | `growth/site/assets/scenarios-entry.css` | 1232 | `8fa518e67b0036e67ed4d8b6087dadfca3a8f353265911ecf01c21af351d4e58` |
| 33 | `growth/site/assets/site.css` | 35641 | `b4ae24a7bc5d2e315a84b3433e53ccce6f4ef637037177c76b5892dcd2197e7c` |
| 34 | `growth/site/assets/site.mjs` | 4009 | `a2b6fd25d479de5b63484b2f59353e681959da8113811dee6ef38f435f037316` |
| 35 | `growth/site/templates/analysis.html` | 3979 | `68c4e6ffe7ea008e6e92edb08abe4ab6aa52e9d1b157b36acf12554ebffc2c63` |
| 36 | `growth/site/templates/base.html` | 4353 | `8ecf0a11bc559cd1c697f049139a7c5ef7ba286d42eefe48d08492cfe6ef456b` |
| 37 | `growth/site/templates/cms.html` | 4307 | `cb560e15979adf2cb207d88953f97c5fbfdb7110e86ab53419477e695db38492` |
| 38 | `growth/site/templates/diagnostic.html` | 2383 | `d4545cc337b78b659b19e22bfea5e35761c7516e73c4d305b347d7726dd015cd` |
| 39 | `growth/site/templates/hub.html` | 4626 | `e600f5a839b58f1ae3ec70701d5315b6a9b3d4f15e6acf1fb5309ea4ce25a818` |
| 40 | `growth/site/templates/landing.html` | 22497 | `d6521ac07d0ce75f186cbb762dbd20b7f575cfb1da17ad575159d27b53ff64d5` |
| 41 | `growth/site/templates/macros.html` | 3494 | `e2e405fdd8aee22f1fa100a8cbc948d76c936f4a00c7402b8c2907df63f5e756` |
| 42 | `growth/site/templates/privacy.html` | 3886 | `26dddbdeafafa4b0cc6ac906a7f2dbca2277a6167a9e6744a456ff1f9a179915` |
| 43 | `growth/site/templates/resource.html` | 5210 | `b801f11dc7cdfa1f9924dcfa8c2feff342cb23da7d1ae77b179b54068af73689` |
| 44 | `growth/content/seed.json` | 40244 | `787af23076a92234965ac44b9cd2baa703f6441586418124f5cfdadbddc22b79` |
| 45 | `growth/content/video-catalog.json` | 1958 | `01ffa655b73eb7bdd0ac14142a0f08f568d986ed67350869eef58f05d485a34f` |

## Archivos originales completos

### 01 · growth/site/assets/advisor.css

Bytes: 13365. SHA256: `68014a07f69d6a6b49c0af4d93121ae7b51610a81f0c7051d7659816a5fa94bb`.

````css
.advisor-root{--advisor-ink:#182219;--advisor-dark:#101a13;--advisor-gold:#f4bd3f;--advisor-paper:#f6f5ef;--advisor-line:#7c816f;font-family:Arial,Helvetica,sans-serif;color:var(--advisor-ink);font-size:14px;line-height:1.5;text-align:left;letter-spacing:normal}
.advisor-root *{box-sizing:border-box}
.advisor-root [hidden]{display:none!important}
.advisor-root button,.advisor-root input,.advisor-root select,.advisor-root textarea{font:inherit;letter-spacing:normal}
.advisor-root button,.advisor-root a{touch-action:manipulation}
.advisor-root button{cursor:pointer;text-transform:none}
.advisor-root button:disabled{cursor:wait;opacity:.65}
.advisor-root :focus-visible{outline:3px solid #806000;outline-offset:3px;box-shadow:0 0 0 2px #fff}
.advisor-root p{color:var(--advisor-ink);font-size:inherit;line-height:1.55;letter-spacing:normal}
.advisor-root .advisor-launcher{position:fixed;z-index:65;right:max(20px,env(safe-area-inset-right));bottom:calc(20px + env(safe-area-inset-bottom));display:flex;align-items:center;gap:12px;min-height:68px;max-width:calc(100vw - 40px);padding:12px 16px 12px 12px;border:2px solid var(--advisor-gold);border-radius:18px;background:var(--advisor-dark);color:#fff;box-shadow:0 10px 36px #131b1840,0 0 0 4px #d9bd7830;text-align:left;animation:advisor-arrive .35s ease-out}
.advisor-root .advisor-launcher strong{display:block;font-size:14px;letter-spacing:0;font-weight:700;color:#fff}
.advisor-root .advisor-launcher small{display:block;margin-top:2px;color:#f4d894;font-size:12px}
.advisor-root .advisor-mark{display:grid;place-items:center;width:38px;height:38px;flex:none;border:1px solid var(--advisor-gold);border-radius:50%;background:var(--advisor-gold);color:#101a13;font-size:24px}
.advisor-root .advisor-launch-arrow{color:var(--advisor-gold);font-size:22px}
.advisor-root .advisor-launcher:hover{background:#263d2c;box-shadow:0 12px 40px #131b1860,0 0 0 5px #d9bd7840}
.advisor-root .advisor-dialog{position:fixed;inset:auto 20px 20px auto;margin:0;padding:0;width:450px;max-width:calc(100vw - 32px);height:min(790px,calc(100dvh - 40px));max-height:calc(100dvh - 40px);border:2px solid #777f6f;border-radius:22px;background:var(--advisor-paper);color:var(--advisor-ink);box-shadow:0 24px 90px #08100966;overflow:hidden;font:inherit}
.advisor-root .advisor-dialog::backdrop{background:#10191062;backdrop-filter:blur(2px)}
.advisor-root .advisor-shell{display:flex;flex-direction:column;height:100%;min-height:0}
.advisor-root .advisor-header{display:flex;gap:10px;align-items:center;flex:none;padding:16px;background:var(--advisor-dark);color:#fff}
.advisor-root .advisor-header p{margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.3px;color:#f4d894}
.advisor-root .advisor-header h2{margin:0;font-family:Georgia,serif;font-size:23px;font-weight:400;line-height:1.2;letter-spacing:-.3px;color:#fff}
.advisor-root .advisor-close{display:grid;place-items:center;margin-left:auto;width:44px;height:44px;flex:none;padding:0;border:1px solid #b4c4ac;border-radius:50%;background:#263d2c;color:#fff;font-size:26px;line-height:1}
.advisor-root .advisor-tabs{display:grid;grid-template-columns:1fr 1fr;gap:7px;flex:none;padding:9px 12px;border-bottom:1px solid #7c816f;background:#e9eadf}
.advisor-root .advisor-tabs button{min-height:44px;padding:7px;border:1px solid #747c69;border-radius:9px;background:#fff;color:#273424;font-size:14px;font-weight:700}
.advisor-root .advisor-tabs button[aria-pressed=true]{background:var(--advisor-dark);border-color:var(--advisor-dark);color:#fff}
.advisor-root .advisor-chat{display:flex;flex-direction:column;min-height:0;flex:1}
.advisor-root .advisor-messages{position:relative;overflow-y:auto;overscroll-behavior:contain;flex:1;min-height:0;padding:18px 16px 12px;scrollbar-width:thin}
.advisor-root .advisor-message{max-width:96%;margin:0 0 14px;padding:13px 14px;border:1px solid #9b9d90;border-radius:14px 14px 14px 3px;background:#fff;color:var(--advisor-ink);overflow-wrap:anywhere;font-size:14px}
.advisor-root .advisor-message p{margin:5px 0 0;white-space:pre-wrap;line-height:1.6;color:var(--advisor-ink);font-size:inherit}
.advisor-root .advisor-sender{font-size:12px;letter-spacing:.5px;color:#625012;font-weight:700}
.advisor-root .advisor-message-user{margin-left:24px;background:#203c28;border-color:#203c28;border-radius:14px 14px 3px 14px;color:#fff}
.advisor-root .advisor-message-user p{color:#fff}
.advisor-root .advisor-message-user .advisor-sender{color:#f4d894}
.advisor-root .advisor-detail{margin-top:10px;border-top:1px solid #7c816f;padding-top:4px}
.advisor-root .advisor-detail summary{display:list-item;min-height:44px;padding:11px 0;cursor:pointer;font-size:14px;font-weight:700;color:#4c3b00}
.advisor-root .advisor-current{margin-bottom:8px}
.advisor-root .advisor-controls-label{margin:0 0 8px;font-size:12px;font-weight:700;color:#45513d}
.advisor-root .advisor-suggestions{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
.advisor-root .advisor-suggestions button{flex:1 1 44%;min-height:44px;padding:10px 12px;border:1px solid #806000;border-radius:12px;background:#ffe6a1;color:#332800;text-align:left;font-size:14px;font-weight:700;line-height:1.35}
.advisor-root .advisor-suggestions button[data-kind=demo]{background:var(--advisor-gold);color:#251c00}
.advisor-root .advisor-suggestions button:hover{background:#f4ce6c;box-shadow:0 2px 0 #806000}
.advisor-root .advisor-resources{display:grid;gap:12px}
.advisor-root .advisor-resource{padding:13px;border:1px solid #818873;border-radius:14px;background:#fff;overflow:hidden}
.advisor-root .advisor-resource-evidence{margin:0 0 5px;font-size:12px;font-weight:700;color:#5c4a0e;line-height:1.45}
.advisor-root .advisor-resource-title{margin:0 0 7px;font:700 17px/1.35 Arial,Helvetica,sans-serif;color:#182219;letter-spacing:-.2px}
.advisor-root .advisor-resource-excerpt{margin:0 0 10px;font-size:14px;color:#35432d;line-height:1.5}
.advisor-root .advisor-resource-link{display:flex;align-items:center;min-height:44px;margin-top:5px;color:#4b3b00;text-decoration:underline;text-underline-offset:3px;font-size:14px;font-weight:700}
.advisor-root .advisor-video-frame{position:relative;display:flex;align-items:center;justify-content:center;min-height:184px;border-radius:10px;background:#101a13;overflow:hidden}
.advisor-root .advisor-video-frame img,.advisor-root .advisor-video-frame video{display:block;width:100%;height:210px;max-width:100%;object-fit:contain;margin:0;border:0;background:#101a13}
.advisor-root .advisor-video-play{position:absolute;z-index:1;left:50%;bottom:14px;transform:translateX(-50%);width:max-content;max-width:calc(100% - 20px);min-height:48px;padding:10px 15px;border:2px solid #fff;border-radius:12px;background:var(--advisor-gold);color:#251c00;font-size:14px;font-weight:700;box-shadow:0 4px 18px #0008}
.advisor-root .advisor-video-play:hover{background:#ffda78}
.advisor-root .advisor-video-hint{margin:8px 0 0;font-size:12px;color:#45513d;line-height:1.45}
.advisor-root .advisor-chat-feedback{flex:none;padding:0 16px;font-size:12px}
.advisor-root .advisor-chat-feedback p{margin:0 0 7px;color:#584000;font-size:12px}
.advisor-root .advisor-chat-feedback p:empty{margin:0}
.advisor-root .advisor-chat-feedback a{display:inline-flex;align-items:center;min-height:44px;margin:0 0 4px;color:#203c28;text-decoration:underline;font-size:12px}
.advisor-root .advisor-text-button{min-height:44px;border:0;padding:8px 0;background:none;color:#4b3b00;text-decoration:underline;font-size:12px;margin-right:12px;text-align:left}
.advisor-root .advisor-composer{display:flex;align-items:end;gap:8px;flex:none;margin:0 12px;padding:8px;border:1px solid #747c69;border-radius:13px;background:#fff}
.advisor-root .advisor-composer textarea{width:100%;min-width:0;resize:none;min-height:44px;max-height:100px;padding:4px;border:0;border-radius:5px;background:#fff;color:#182219;font-size:14px;line-height:1.5;box-shadow:none}
.advisor-root textarea::placeholder,.advisor-root input::placeholder{color:#58624f;opacity:1}
.advisor-root .advisor-composer button{width:44px;height:44px;flex:none;padding:0;border:1px solid #806000;border-radius:10px;background:var(--advisor-gold);color:#251c00;font-size:26px;font-weight:700}
.advisor-root .advisor-disclosure{flex:none;margin:9px 16px 12px;font-size:12px;line-height:1.45;color:#45513d}
.advisor-root .advisor-disclosure a{color:#203c28;text-decoration:underline;font-weight:700}
.advisor-root .advisor-demo{padding:20px 18px 24px;overflow-y:auto;overscroll-behavior:contain;min-height:0;flex:1;scrollbar-width:thin}
.advisor-root .advisor-eyebrow{margin:0 0 7px;color:#5c4a0e;font-size:12px;font-weight:700;letter-spacing:.4px}
.advisor-root .advisor-demo-intro h3{margin:0 0 8px;font-family:Georgia,serif;font-weight:400;font-size:27px;letter-spacing:-.5px;color:#182219}
.advisor-root .advisor-demo-intro>p:last-child{margin:0 0 18px;font-size:14px;color:#35432d;line-height:1.55}
.advisor-root .advisor-demo-form{display:grid;gap:13px}
.advisor-root .advisor-field-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}
.advisor-root .advisor-demo label{display:block;min-width:0;font-size:14px;font-weight:700;color:#273424}
.advisor-root .advisor-demo label>span,.advisor-root .advisor-demo legend span{font-weight:400;color:#45513d;font-size:12px}
.advisor-root .advisor-demo input:not([type=checkbox]),.advisor-root .advisor-demo select,.advisor-root .advisor-demo textarea{display:block;width:100%;min-width:0;margin-top:5px;padding:10px 9px;border:1px solid #747c69;border-radius:8px;background:#fff;color:#182219;min-height:44px;font-size:14px;line-height:1.5;box-shadow:none}
.advisor-root .advisor-demo textarea{resize:vertical}
.advisor-root .advisor-demo fieldset{min-width:0;margin:0;padding:12px;border:1px solid #747c69;border-radius:11px}
.advisor-root .advisor-demo legend{padding:0 4px;font-size:14px;font-weight:700;color:#273424}
.advisor-root .advisor-demo fieldset>label{margin-top:10px}
.advisor-root .advisor-demo fieldset>small{display:block;margin-top:9px;font-size:12px;color:#45513d;line-height:1.5}
.advisor-root .advisor-primary{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;min-height:48px;padding:12px 14px;border:1px solid #806000;border-radius:10px;background:var(--advisor-gold);color:#251c00;font-size:14px;font-weight:700;text-decoration:none;text-align:left}
.advisor-root .advisor-primary:hover{background:#ffda78}
.advisor-root .advisor-secondary{min-height:44px;width:100%;padding:10px 12px;border:1px solid #747c69;border-radius:9px;background:#e9eadf;color:#203c28;font-size:14px;font-weight:700}
.advisor-root .advisor-form-status{margin:0;font-size:12px;color:#85351b}
.advisor-root .advisor-review{margin-top:22px;padding-top:20px;border-top:1px solid #7c816f}
.advisor-root .advisor-review>.advisor-primary{margin-top:12px}
.advisor-root .advisor-review .advisor-pending{font-size:12px;line-height:1.55;color:#45513d;margin:9px 0 15px}
.advisor-root .advisor-review .advisor-consent{display:flex;align-items:start;gap:10px;padding-top:13px;border-top:1px solid #7c816f;font-weight:400;margin-bottom:12px;cursor:pointer;min-height:44px}
.advisor-root .advisor-consent input{width:22px;height:22px;flex:none;margin:2px 0 0;accent-color:#203c28}
.advisor-root .advisor-review .advisor-consent span{font-size:12px;line-height:1.55;color:#35432d}
.advisor-root .advisor-consent a{color:#203c28;text-decoration:underline}
.advisor-root #sa-advisor-save-status{font-size:12px;line-height:1.55;color:#203c28;margin:8px 0 0;overflow-wrap:anywhere}
.advisor-root .advisor-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
html.advisor-open{overflow:hidden}
@keyframes advisor-arrive{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:600px){.advisor-root .advisor-launcher{right:max(12px,env(safe-area-inset-right));max-width:calc(100vw - 24px);min-height:64px;padding:9px 12px 9px 9px;gap:9px;border-radius:15px}.advisor-root .advisor-launcher .advisor-mark{width:34px;height:34px;font-size:22px}.advisor-root .advisor-dialog{inset:auto 10px max(10px,env(safe-area-inset-bottom)) 10px;width:auto;max-width:none;height:min(800px,calc(100dvh - 20px));max-height:calc(100dvh - 20px);border-radius:18px}.advisor-root .advisor-header{padding:13px 12px;gap:8px}.advisor-root .advisor-header h2{font-size:21px}.advisor-root .advisor-header p{font-size:12px;letter-spacing:0}.advisor-root .advisor-header .advisor-mark{width:32px;height:32px;font-size:20px}.advisor-root .advisor-demo{padding:17px 14px 22px}.advisor-root .advisor-messages{padding:16px 12px 10px}.advisor-root .advisor-message,.advisor-root .advisor-suggestions button,.advisor-root .advisor-resource-excerpt,.advisor-root .advisor-demo-intro>p:last-child,.advisor-root .advisor-demo input:not([type=checkbox]),.advisor-root .advisor-demo select,.advisor-root .advisor-demo textarea,.advisor-root .advisor-composer textarea{font-size:16px}.advisor-root .advisor-header>div{min-width:0}.advisor-root .advisor-video-frame img,.advisor-root .advisor-video-frame video{height:196px}}
@media(prefers-reduced-motion:reduce){.advisor-root *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
````

### 02 · growth/site/assets/advisor.mjs

Bytes: 24722. SHA256: `773956de733de1de9b1675a1590659bf92827ebc0f57f20a50b0c6e0f0749be3`.

````javascript
/** Public advisor UI. All inference and knowledge selection stay on the server. */
const roles={rep:'Representante',leader:'Líder',director:'Dirección',other:'Otro rol'};
const rooms={'1':'1 sala','2-3':'2–3 salas','4+':'4 o más salas',unknown:'Por definir'};
export function buildSummary(v){
 const lines=[v.name&&`Nombre: ${v.name}`,`Rol: ${roles[v.role]||'Por definir'}`,`Salas: ${rooms[v.roomCountBucket]||'Por definir'}`,v.teamSize&&`Equipo: ${v.teamSize}`,v.need&&`Necesidad: ${v.need}`,v.timeframe&&`Plazo: ${v.timeframe}`,v.contact&&`Contacto: ${v.contact}`];
 lines.push(v.preferredDate&&v.preferredTime?`Horario preferido: ${v.preferredDate} a las ${v.preferredTime} (${v.timezone}). Por confirmar con Chris.`:'Fecha y horario: por acordar con Chris.');
 return lines.filter(Boolean).join('\n').slice(0,1500);
}
export function buildWhatsAppUrl(summary){
 return `https://wa.me/529843163268?text=${encodeURIComponent(`Hola Chris, quiero coordinar una demo de Sales Academy.\n\n${String(summary).slice(0,1500)}\n\nSolicitud pendiente de confirmación contigo.`)}`;
}
export function safeResourceUrl(value){return typeof value==='string'&&/^\/mediahub\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(value)?value:null;}
const filmIds=new Set(['smart-agent','menos-caos','sistema-conectado','infraestructura-comercial','conocimiento-en-practica']);
export function safeVideo(value){
 if(!value||!filmIds.has(value.id))return null;
 const base='/growth-assets/films/'+value.id;
 if(value.src!==base+'.mp4'||value.poster!==base+'.webp'||value.captions!==base+'.es.vtt')return null;
 if(!Number.isFinite(value.durationSeconds)||value.durationSeconds<=0||value.durationSeconds>600)return null;
 if(!Number.isInteger(value.width)||!Number.isInteger(value.height)||value.width<1||value.height<1||value.width>4096||value.height>4096)return null;
 return value;
}
export function safeSuggestions(values){
 const seen=new Set();return (Array.isArray(values)?values:[]).filter(v=>{
  if(!v||typeof v.id!=='string'||!/^[-a-z0-9]{1,64}$/.test(v.id)||seen.has(v.id)||typeof v.label!=='string'||!v.label.trim()||v.label.length>48)return false;
  if(v.kind!=='demo'&&(v.kind!=='prompt'||typeof v.prompt!=='string'||!v.prompt.trim()||v.prompt.length>1200))return false;
  seen.add(v.id);return true;
 }).slice(0,3);
}
export function appointmentError(v,now=new Date()){
 if(Boolean(v.preferredDate)!==Boolean(v.preferredTime))return 'Indica fecha y hora juntas, o deja ambas vacías para acordarlas con Chris.';
 try{
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:v.timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
  const current=`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  if(v.preferredDate&&`${v.preferredDate}T${v.preferredTime}`<=current)return 'Elige una fecha y hora futuras en la zona seleccionada, o déjalas vacías para acordarlas con Chris.';
 }catch{return 'Selecciona una zona horaria válida.';}
 return '';
}

function mountAdvisor(){
 if(document.body.dataset.preview==='true'||document.querySelector('[data-advisor-open]'))return;
 const root=document.createElement('div');root.className='advisor-root';
 root.innerHTML=`
 <button class="advisor-launcher" type="button" data-advisor-open aria-haspopup="dialog" aria-controls="sa-advisor-dialog" aria-expanded="false"><span class="advisor-mark" aria-hidden="true">✦</span><span><strong>Pregunta a Sales Academy</strong><small>Tu asesor con IA</small></span><span class="advisor-launch-arrow" aria-hidden="true">↗</span></button>
 <dialog class="advisor-dialog" id="sa-advisor-dialog" aria-labelledby="sa-advisor-title">
  <div class="advisor-shell">
   <header class="advisor-header"><span class="advisor-mark" aria-hidden="true">✦</span><div><p>SALES ACADEMY · ASISTENTE IA</p><h2 id="sa-advisor-title">Tu siguiente paso, claro.</h2></div><button type="button" class="advisor-close" data-advisor-close aria-label="Cerrar asesor">×</button></header>
   <div class="advisor-tabs" role="group" aria-label="Qué quieres hacer"><button type="button" data-advisor-tab="chat" aria-pressed="true">Conversar</button><button type="button" data-advisor-tab="demo" aria-pressed="false">Coordinar demo <span aria-hidden="true">↗</span></button></div>
   <section class="advisor-chat" id="sa-advisor-chat" aria-label="Conversación con el asesor">
    <div class="advisor-messages" id="sa-advisor-messages" role="log" aria-label="Mensajes" aria-live="polite" aria-relevant="additions text"><article class="advisor-message advisor-message-assistant"><span class="advisor-sender">ASESOR IA</span><p>Soy tu asesor IA de Sales Academy. Descubre cómo los agentes pueden ayudar a tu sala y explora una demo con Chris. ¿Qué te gustaría mejorar?</p></article></div>
    <div class="advisor-chat-feedback"><p id="sa-advisor-chat-status" role="status"></p><button type="button" class="advisor-text-button" data-advisor-retry hidden>Reintentar pregunta</button><a href="https://wa.me/529843163268?text=Hola%20Chris%2C%20quiero%20conocer%20Sales%20Academy." target="_blank" rel="noopener noreferrer" data-advisor-fallback hidden>Hablar con Chris por WhatsApp ↗</a></div>
    <form class="advisor-composer" id="sa-advisor-chat-form"><label class="advisor-sr-only" for="sa-advisor-message">Tu pregunta sobre Sales Academy</label><textarea id="sa-advisor-message" name="message" rows="2" maxlength="1200" placeholder="Cuéntame qué quieres mejorar en tu sala…" required></textarea><button type="submit" aria-label="Enviar pregunta"><span aria-hidden="true">↑</span></button></form>
    <p class="advisor-disclosure">Conversación disponible durante 1 hora; borrado automático periódico. IA mediante Hermes y OpenAI. Evita datos de clientes. <a href="/descubre/privacidad/" target="_blank" rel="noopener noreferrer">Privacidad</a></p>
   </section>
   <section class="advisor-demo" id="sa-advisor-demo" aria-label="Solicitud de demo" hidden>
    <div class="advisor-demo-intro"><p class="advisor-eyebrow">CON CHRIS · POR WHATSAPP</p><h3>Una demo para tu contexto.</h3><p>Comparte lo que sea útil. Revisarás el mensaje antes de abrir WhatsApp; la fecha se acuerda con Chris.</p></div>
    <form id="sa-advisor-demo-form" class="advisor-demo-form">
     <div class="advisor-field-row"><label>Tu nombre <span>(opcional)</span><input name="name" autocomplete="given-name" maxlength="80" /></label><label>Tu rol<select name="role"><option value="other">Selecciona tu rol</option value="rep">Representante</option><option value="leader">Líder</option><option value="director">Dirección</option></select></label></div>
     <div class="advisor-field-row"><label>Salas<select name="roomCountBucket"><option value="unknown">Por definir</option><option value="1">1 sala</option><option value="2-3">2–3 salas</option><option value="4+">4 o más salas</option></select></label><label>Tamaño del equipo<input name="teamSize" maxlength="60" placeholder="Ej. 20 representantes" /></label></div>
     <label>¿Qué quieres mejorar?<textarea name="need" rows="2" maxlength="600" placeholder="Preparación, práctica, coaching, conocimiento…"></textarea></label><button type="button" class="advisor-text-button" data-advisor-use-question hidden>Usar mi última pregunta como punto de partida</button>
     <div class="advisor-field-row"><label>¿Para cuándo?<input name="timeframe" maxlength="120" placeholder="Ej. Este mes" /></label><label>Contacto <span>(opcional)</span><input name="contact" autocomplete="off" maxlength="120" placeholder="Correo o WhatsApp" /></label></div>
     <fieldset><legend>Tu horario preferido <span>(opcional)</span></legend><div class="advisor-field-row"><label>Fecha<input type="date" name="preferredDate" /></label><label>Hora<input type="time" name="preferredTime" /></label></div><label>Zona horaria<select name="timezone"><option value="America/Cancun">Cancún · Caribe mexicano</option><option value="America/Mexico_City">Ciudad de México</option><option value="America/Tijuana">Tijuana</option><option value="America/Hermosillo">Hermosillo</option><option value="America/New_York">Este de EE. UU.</option><option value="America/Los_Angeles">Pacífico de EE. UU.</option><option value="America/Bogota">Bogotá</option><option value="Europe/Madrid">Madrid</option></select></label><small>Deja fecha y hora vacías si prefieres acordarlas en la conversación.</small></fieldset>
     <p id="sa-advisor-form-status" class="advisor-form-status" role="status"></p><button type="submit" class="advisor-primary">Preparar mi solicitud <span aria-hidden="true">→</span></button>
    </form>
    <section class="advisor-review" id="sa-advisor-review" hidden><p class="advisor-eyebrow">REVISA ANTES DE COMPARTIR</p><label for="sa-advisor-summary">Tu resumen editable</label><textarea id="sa-advisor-summary" rows="7" maxlength="1500"></textarea><a class="advisor-primary" data-advisor-whatsapp target="_blank" rel="noopener noreferrer">Coordinar mi demo con Chris <span aria-hidden="true">↗</span></a><p class="advisor-pending">Pendiente de confirmación. WhatsApp abre tu mensaje; tú decides si lo envías.</p><label class="advisor-consent"><input type="checkbox" id="sa-advisor-contact-consent" /><span>También quiero guardar esta solicitud en Sales Academy para que Chris pueda darle seguimiento. <a href="/descubre/privacidad/" target="_blank" rel="noopener noreferrer">Ver privacidad</a>.</span></label><button type="button" class="advisor-secondary" data-advisor-save hidden>Guardar solicitud para seguimiento</button><p id="sa-advisor-save-status" role="status"></p></section>
   </section>
  </div>
 </dialog>`;
 document.body.append(root);
 const $=s=>root.querySelector(s),dialog=$('dialog'),launcher=$('[data-advisor-open]'),message=$('#sa-advisor-message'),feed=$('#sa-advisor-messages'),chatStatus=$('#sa-advisor-chat-status'),retry=$('[data-advisor-retry]'),fallback=$('[data-advisor-fallback]');
 const demoForm=$('#sa-advisor-demo-form'),review=$('#sa-advisor-review'),summary=$('#sa-advisor-summary'),wa=$('[data-advisor-whatsapp]'),save=$('[data-advisor-save]'),consent=$('#sa-advisor-contact-consent');
 let session=null,sessionPromise=null,busy=false,pending=null,prepared=null,pendingLead=null,restored=false,lastQuestion='',currentSuggestions=[];
 const uuid=()=>crypto.randomUUID();
 async function api(path,payload){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);
  try{
   const response=await fetch('/growth-api/advisor/'+path,{method:payload?'POST':'GET',credentials:'same-origin',headers:payload?{'Content-Type':'application/json','X-Advisor-CSRF':session?.csrf||''}:{},body:payload?JSON.stringify(payload):undefined,signal:controller.signal});
   const data=await response.json();if(!response.ok){const error=new Error(data.error?.message||'No se pudo completar la solicitud. Puedes reintentar.');error.status=response.status;throw error;}return data;
  }catch(error){if(error.name==='AbortError'||error.message==='Failed to fetch')throw new Error('La conexión tardó más de lo esperado. Puedes reintentar o hablar con Chris.');throw error;}finally{clearTimeout(timer);}
 }
 function pauseMedia(){root.querySelectorAll('video').forEach(v=>v.pause());}
 function clearControls(){pauseMedia();feed.querySelectorAll('[data-advisor-current]').forEach(el=>el.remove());currentSuggestions=[];}
 function addMessage(role,text,detail){
  // Old idempotent replies may predate the brief-answer contract. Preserve their wording.
  if(role==='assistant'&&text.trim().split(/\s+/).length>90){detail=typeof detail==='string'&&detail.trim()?detail:text;text='La explicación completa y sus condiciones están en «Ver detalle». Puedes revisarlas y elegir tu siguiente paso.';}
  const article=document.createElement('article');article.className='advisor-message advisor-message-'+(role==='user'?'user':'assistant');
  const sender=document.createElement('span');sender.className='advisor-sender';sender.textContent=role==='user'?'TÚ':'ASESOR IA';
  const body=document.createElement('p');body.textContent=text;article.append(sender,body);
  if(role==='assistant'&&typeof detail==='string'&&detail.trim()){
   const more=document.createElement('details'),label=document.createElement('summary'),full=document.createElement('p');more.className='advisor-detail';label.textContent='Ver detalle';full.textContent=detail.slice(0,6000);more.append(label,full);article.append(more);
  }
  feed.append(article);feed.scrollTop=feed.scrollHeight;return article;
 }
 function resourceCard(resource){
  const url=safeResourceUrl(resource?.url);if(!url||typeof resource.title!=='string'||!resource.title.trim())return null;
  const card=document.createElement('article');card.className='advisor-resource';card.dataset.advisorResource='';
  const title=document.createElement('h3');title.className='advisor-resource-title';title.textContent=resource.title.slice(0,180);
  const evidence=document.createElement('p');evidence.className='advisor-resource-evidence';evidence.textContent=typeof resource.evidenceLabel==='string'?resource.evidenceLabel.slice(0,140):'Recurso de Sales Academy';
  card.append(evidence,title);
  if(typeof resource.excerpt==='string'&&resource.excerpt.trim()){const excerpt=document.createElement('p');excerpt.className='advisor-resource-excerpt';excerpt.textContent=resource.excerpt.slice(0,220);card.append(excerpt);}
  const clip=resource.type==='video'?safeVideo(resource.video):null;
  if(clip){
   const frame=document.createElement('div'),poster=document.createElement('img'),play=document.createElement('button');frame.className='advisor-video-frame';poster.src=clip.poster;poster.alt='';poster.width=clip.width;poster.height=clip.height;poster.loading='lazy';poster.decoding='async';
   play.type='button';play.className='advisor-video-play';play.dataset.advisorVideoPlay='';play.setAttribute('aria-label','Reproducir video: '+resource.title);play.textContent='▶ Ver video · '+Math.round(clip.durationSeconds)+' s';frame.append(poster,play);card.append(frame);
   const hint=document.createElement('p');hint.className='advisor-video-hint';hint.textContent='Audio y subtítulos en español. Tú decides cuándo reproducir.';card.append(hint);
   let video;
   play.addEventListener('click',()=>{
    if(!video){
     video=document.createElement('video');video.dataset.advisorVideo='';video.controls=true;video.playsInline=true;video.preload='none';video.poster=clip.poster;video.setAttribute('aria-label',resource.title);
     const track=document.createElement('track');track.kind='captions';track.src=clip.captions;track.srclang='es';track.label='Español';track.default=true;video.append(track);video.src=clip.src;frame.append(video);
     video.addEventListener('error',()=>{hint.textContent='No se pudo reproducir aquí. Puedes abrir el recurso en MediaHub.';play.hidden=false;});
    }
    poster.hidden=true;play.hidden=true;video.play().catch(()=>{play.hidden=false;hint.textContent='Pulsa reproducir para volver a intentar. También puedes abrir el recurso.';});
   });
  }
  const link=document.createElement('a');link.href=url;link.textContent=clip?'Ver contexto y transcripción ↗':'Abrir recurso ↗';link.target='_blank';link.rel='noopener noreferrer';link.className='advisor-resource-link';card.append(link);return card;
 }
 function renderControls(suggestions,resources){
  clearControls();const group=document.createElement('div');group.className='advisor-current';group.dataset.advisorCurrent='';currentSuggestions=safeSuggestions(suggestions);
  if(currentSuggestions.length){
   const label=document.createElement('p');label.className='advisor-controls-label';label.textContent='Elige un siguiente paso';const choices=document.createElement('div');choices.className='advisor-suggestions';choices.setAttribute('role','group');choices.setAttribute('aria-label','Sugerencias para continuar');
   for(const suggestion of currentSuggestions){const button=document.createElement('button');button.type='button';button.dataset.advisorSuggestion=suggestion.id;button.dataset.kind=suggestion.kind;button.textContent=suggestion.label;button.disabled=busy;choices.append(button);}group.append(label,choices);
  }
  const cards=(Array.isArray(resources)?resources:[]).filter(r=>safeResourceUrl(r?.url)&&typeof r.title==='string'&&r.title.trim()).slice(0,2).map(resourceCard).filter(Boolean);if(cards.length){const list=document.createElement('div');list.className='advisor-resources';list.setAttribute('aria-label','Contenido recomendado');list.append(...cards);group.append(list);}feed.append(group);
 }
 feed.addEventListener('click',e=>{
  const button=e.target.closest('[data-advisor-suggestion]');if(!button||busy)return;
  const suggestion=currentSuggestions.find(v=>v.id===button.dataset.advisorSuggestion);if(!suggestion)return;
  if(suggestion.kind==='demo')tab('demo');else send(suggestion.prompt);
 });
 document.addEventListener('play',e=>{if(e.target.tagName==='VIDEO')document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause();});},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseMedia();});
 async function ensureSession(){
  if(session)return session;if(sessionPromise)return sessionPromise;
  sessionPromise=api('session').then(data=>{
   session=data;if(!restored&&Array.isArray(data.messages)){for(const m of data.messages)if(['user','assistant'].includes(m.role)&&typeof m.content==='string'){addMessage(m.role,m.content,m.detail);if(m.role==='user')lastQuestion=m.content;}restored=true;$('[data-advisor-use-question]').hidden=!lastQuestion;}
   renderControls(data.suggestions,data.resources);
   if(!data.enabled){chatStatus.textContent='El asesor está en pausa. Puedes preparar tu solicitud o hablar con Chris.';fallback.hidden=false;}
   return data;
  }).finally(()=>{sessionPromise=null;});return sessionPromise;
 }
 function tab(which){
  if(which!=='chat')pauseMedia();
  $('#sa-advisor-chat').hidden=which!=='chat';$('#sa-advisor-demo').hidden=which!=='demo';
  root.querySelectorAll('[data-advisor-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.advisorTab===which)));
  if(which==='chat')message.focus();else demoForm.querySelector('input').focus();
 }
 launcher.addEventListener('click',()=>{
  document.querySelectorAll('video').forEach(v=>v.pause());dialog.showModal();launcher.setAttribute('aria-expanded','true');document.documentElement.classList.add('advisor-open');
  message.focus();ensureSession().catch(e=>{chatStatus.textContent=e.message;fallback.hidden=false;});
 });
 function close(){pauseMedia();dialog.close();}
 dialog.addEventListener('cancel',pauseMedia);
 $('[data-advisor-close]').addEventListener('click',close);
 dialog.addEventListener('close',()=>{pauseMedia();launcher.setAttribute('aria-expanded','false');document.documentElement.classList.remove('advisor-open');launcher.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 root.querySelectorAll('[data-advisor-tab]').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.advisorTab)));
 function loading(value){busy=value;$('#sa-advisor-chat-form button').disabled=value;message.disabled=value;retry.disabled=value;root.querySelectorAll('[data-advisor-suggestion]').forEach(b=>b.disabled=value);feed.setAttribute('aria-busy',String(value));}
 async function send(text,repeating=false){
  if(busy||!text.trim())return;clearControls();loading(true);retry.hidden=true;chatStatus.textContent='Preparando una respuesta breve…';
  if(!repeating){pending={message:text.trim().slice(0,1200),requestId:uuid()};lastQuestion=pending.message;$('[data-advisor-use-question]').hidden=false;addMessage('user',pending.message);message.value='';}
  try{
   const current=await ensureSession();if(!current.enabled){session=null;throw new Error('El asesor está en pausa. Puedes reintentar más tarde o hablar con Chris.');}
   const data=await api('messages',pending);if(typeof data.reply!=='string')throw new Error('La respuesta no llegó completa. Puedes reintentar.');
   const article=addMessage('assistant',data.reply,data.detail);renderControls(data.suggestions,data.resources);feed.scrollTop=Math.max(0,article.offsetTop-8);pending=null;
   chatStatus.textContent=data.remainingTurns===0?'Has llegado al límite de esta conversación. Puedes coordinar tu demo con Chris.':'';
  }catch(e){if([401,403].includes(e.status))session=null;chatStatus.textContent=e.message;retry.hidden=false;fallback.hidden=false;}finally{loading(false);}
 }
 $('#sa-advisor-chat-form').addEventListener('submit',e=>{e.preventDefault();send(message.value);});
 message.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send(message.value);}});
 retry.addEventListener('click',()=>{if(pending)send(pending.message,true);});
 const zone=demoForm.elements.timezone;
 try{const local=Intl.DateTimeFormat().resolvedOptions().timeZone;if(local){if(!Array.from(zone.options).some(o=>o.value===local)){const o=new Option(local+' · tu dispositivo',local);zone.append(o);}zone.value=local;}}catch{}
 demoForm.addEventListener('input',()=>{review.hidden=true;prepared=null;pendingLead=null;consent.checked=false;save.hidden=true;$('#sa-advisor-save-status').textContent='';});
 $('[data-advisor-use-question]').addEventListener('click',()=>{demoForm.elements.need.value=lastQuestion.slice(0,600);demoForm.elements.need.dispatchEvent(new Event('input',{bubbles:true}));demoForm.elements.need.focus();});
 demoForm.addEventListener('submit',e=>{
  e.preventDefault();const values=Object.fromEntries(new FormData(demoForm));const error=appointmentError(values);$('#sa-advisor-form-status').textContent=error;if(error)return;
  prepared=values;summary.value=buildSummary(values);wa.href=buildWhatsAppUrl(summary.value);review.hidden=false;pendingLead=null;$('#sa-advisor-save-status').textContent='';summary.focus();
 });
 summary.addEventListener('input',()=>{wa.href=buildWhatsAppUrl(summary.value);pendingLead=null;$('#sa-advisor-save-status').textContent='';});
 consent.addEventListener('change',()=>{save.hidden=!consent.checked;});
 save.addEventListener('click',async()=>{
  if(!consent.checked||!prepared)return;save.disabled=true;const status=$('#sa-advisor-save-status');status.textContent='Guardando tu solicitud…';
  try{
   await ensureSession();const payload={...prepared,summary:summary.value,contactConsent:true,privacyVersion:'2026-11-07-advisor'};
   const fingerprint=JSON.stringify(payload);if(!pendingLead||pendingLead.fingerprint!==fingerprint)pendingLead={fingerprint,requestId:uuid()};
   const data=await api('leads',{...payload,requestId:pendingLead.requestId});
   if(!data.received||!data.id||data.status!=='pending_confirmation')throw new Error('No pudimos confirmar el guardado. Puedes reintentar.');
   status.textContent=`Solicitud guardada · referencia ${data.id}. La demo sigue pendiente de confirmación con Chris.`;
  }catch(e){if([401,403].includes(e.status))session=null;status.textContent=e.message+' Puedes continuar por WhatsApp sin guardar.';}finally{save.disabled=false;}
 });
 const consentPanel=document.querySelector('#consent-panel');
 function avoidConsent(){
  let offset=20;if(consentPanel&&!consentPanel.hidden){const c=consentPanel.getBoundingClientRect(),b=launcher.getBoundingClientRect();if(b.right>c.left&&b.left<c.right)offset=Math.max(20,innerHeight-c.top+12);}
  launcher.style.bottom=`calc(${offset}px + env(safe-area-inset-bottom, 0px))`;
  const b=launcher.getBoundingClientRect();
  const overlapsPlayingFilm=[...document.querySelectorAll('video')].some(video=>{if(video.paused||video.ended)return false;const v=video.getBoundingClientRect();return b.left<v.right&&b.right>v.left&&b.top<v.bottom&&b.bottom>v.top;});
  launcher.style.visibility=overlapsPlayingFilm?'hidden':'visible';
 }
 if(consentPanel){new MutationObserver(avoidConsent).observe(consentPanel,{attributes:true,attributeFilter:['hidden']});new ResizeObserver(avoidConsent).observe(consentPanel);}
 let layoutQueued=false;
 function queueLayout(){if(layoutQueued)return;layoutQueued=true;requestAnimationFrame(()=>{layoutQueued=false;avoidConsent();});}
 addEventListener('resize',queueLayout,{passive:true});addEventListener('scroll',queueLayout,{passive:true});
 for(const event of ['play','pause','ended'])document.addEventListener(event,queueLayout,true);
 avoidConsent();
}
if(typeof document!=='undefined')mountAdvisor();
````

### 03 · growth/site/assets/ai-journey.css

Bytes: 20514. SHA256: `a821ed863ba00355dfa0442ddb413659ab60f4f25df2d91258a6e116f3ba9833`.

````css
/* The VSL introduces the promise. Native scroll connects people, method and AI. */
.ai-campaign { --ai-cream:#f1eee5; --ai-olive:#a9b29b; }
.ai-campaign .ai-hero { padding:44px 0 0; background:radial-gradient(ellipse at 78% 34%,#66552b23,transparent 48%),#10120f; }
.ai-hero-grid { display:grid; grid-template-columns:1.08fr 1fr; align-items:center; gap:6%; }
.ai-hero-copy { padding:20px 0 30px; position:relative; z-index:2; }
.ai-campaign .ai-hero .sa-kicker { font-size:10px; margin-bottom:28px; max-width:510px; }
.ai-hero h1 { font-size:clamp(52px,5.6vw,82px); line-height:1.01; letter-spacing:-.065em; font-weight:500; margin:0 0 28px; text-wrap:balance; }
.ai-hero h1 em { font-family:Georgia,'Times New Roman',serif; font-weight:400; color:#dac38d; letter-spacing:-.045em; }
.ai-campaign .ai-hero-description { color:#c2c7b9; font-size:16px; line-height:1.8; max-width:480px; margin-bottom:30px; }
.ai-hero .hero-actions { align-items:center; gap:12px 24px; }
.ai-hero .button { font-size:12px; padding-inline:21px; }
.ai-hero-link { display:inline-flex; align-items:center; gap:20px; font-size:12px; min-height:44px; text-decoration:none; color:#e8e8dc; }
.ai-hero-link span { color:#cdb67b; font-size:18px; }
.ai-campaign .ai-hero-note { color:#aeb6a3; font-size:11px; line-height:1.7; margin:18px 0 0; max-width:390px; }
.ai-hero-pillars { margin-top:33px; padding-top:20px; border-top:1px solid #49503d; max-width:390px; display:flex; align-items:center; gap:18px; color:#d6d9cc; font-size:11px; }
.ai-hero-pillars i { color:#d4b574; font-style:normal; }
.ai-vsl-panel { position:relative; min-width:0; padding:0 0 16px; }
.ai-vsl-heading { display:flex; align-items:center; justify-content:space-between; gap:18px; padding:0 0 18px; border-bottom:1px solid #56533d; margin-bottom:18px; }
.ai-vsl-heading>span { font-size:9px; font-weight:600; letter-spacing:.15em; color:#d4b574; }
.ai-vsl-heading strong { font-family:Georgia,serif; font-size:29px; font-weight:400; color:#f3efdf; }
.ai-vsl-heading small { font-family:inherit; font-size:12px; color:#bbc3ac; }
.ai-vsl-stage { position:relative; isolation:isolate; min-height:580px; }
.ai-vsl-context { position:absolute; top:42px; bottom:125px; width:100%; height:calc(100% - 167px); object-fit:cover; object-position:42% center; opacity:.35; border:1px solid #7c7b644f; }
.ai-vsl-stage::after { content:''; position:absolute; inset:42px 0 125px; background:linear-gradient(90deg,#10120f15,#10120fbb 85%); z-index:-1; }
.ai-vsl-context { z-index:-2; }
.ai-vsl-frame { width:min(280px,77%); margin-left:auto; margin-right:12%; }
.ai-vsl-frame .film-player { margin:0; }
.ai-vsl-frame .film-player-video { aspect-ratio:9/16; width:100%; height:auto; max-height:none; border:1px solid #c6b785; border-radius:10px; box-shadow:0 24px 70px #0008,0 0 0 5px #9e92591a; }
.ai-vsl-frame .film-player figcaption { padding-top:14px; }
.ai-vsl-frame .film-player-label { color:#c4cbbb; font-size:8px; line-height:1.7; letter-spacing:.08em; }
.ai-vsl-frame .film-player-hint { font-size:10px; line-height:1.6; color:#b9c2ad; margin-top:4px; }
.ai-vsl-frame .film-player-error { color:#f4d69c; font-size:12px; }
.ai-vsl-side { position:absolute; left:0; top:50px; writing-mode:vertical-rl; transform:rotate(180deg); color:#ccd0c1; letter-spacing:.16em; font-size:8px; padding:14px 10px; }
.ai-vsl-next { margin-top:13px; border-top:1px solid #52553f; padding-top:14px; display:flex; align-items:center; flex-wrap:wrap; justify-content:space-between; gap:5px 15px; }
.ai-vsl-cta { min-height:44px; display:inline-flex; align-items:center; gap:13px; font-size:11px; color:#e4c98d; text-decoration:none; }
.ai-vsl-cta>span { font-size:18px; }
.ai-vsl-transcript { font-size:10px; min-height:44px; display:inline-flex; align-items:center; text-decoration:underline; text-underline-offset:4px; color:#bfc7b3; }
.ai-hero-fallback { margin:0; }
.ai-hero-fallback img { width:100%; height:520px; object-fit:cover; border-radius:3px; }
.ai-hero-fallback figcaption { color:#c1c9b6; font-size:13px; line-height:1.7; padding:18px 0; }
.ai-hero-foot { margin-top:37px; border-top:1px solid #373e2e; padding-block:25px; display:flex; justify-content:space-between; gap:20px; color:#b2baa6; font-size:8px; letter-spacing:.1em; }
.ai-hero-foot>span:last-child { letter-spacing:0; }
.ai-bridge { background:#ece9df; color:#272c22; padding:65px 0; border-top:1px solid #d7d2bd; }
.ai-bridge-grid { display:grid; grid-template-columns:.62fr 1.45fr 1fr; gap:42px; align-items:center; }
.ai-campaign .ai-bridge .sa-section-label { margin:0; max-width:190px; font-size:9px; line-height:1.9; }
.ai-bridge h2 { font-size:clamp(29px,3vw,43px); line-height:1.12; letter-spacing:-.045em; margin:0; font-weight:500; }
.ai-bridge h2 em { font-family:Georgia,serif; font-weight:400; color:#747452; }
.ai-campaign .ai-bridge p:last-child { margin:0; color:#59624e; font-size:12px; line-height:1.8; }

.ai-continuous { background:#10150e; }
.ai-campaign .ai-continuous .journey-copy h2 { font-size:clamp(36px,3.6vw,53px); font-weight:500; }
.ai-continuous .journey-lede { font-size:15px; line-height:1.8; }
.ai-continuous .journey-eyebrow { margin-bottom:25px; }
.ai-continuous .journey-navigation a,.ai-continuous .journey-motion-toggle { min-height:44px; }
.ai-prompt { border-left:1px solid #c4ab6b; padding:5px 0 5px 19px; margin:25px 0 26px; }
.ai-prompt>span { font-size:8px; font-weight:600; letter-spacing:.11em; color:#c7b37d; }
.ai-campaign .ai-prompt>p { font-family:Georgia,serif; font-size:20px; line-height:1.4; color:#e6e8db; margin:11px 0 0; }
.ai-continuous .journey-use-case { padding-top:21px; }
.ai-continuous .journey-use-case h3 { font-size:18px; margin-block:12px 9px; }
.ai-continuous .journey-use-case>p { font-size:12px; line-height:1.8; }
.ai-chapter-cta { display:inline-flex; gap:20px; align-items:center; min-height:44px; margin-top:9px; font-size:12px; color:#e6cb8e; text-decoration:none; }
.ai-chapter-cta>span { font-size:20px; }
.ai-inline-scene { min-height:610px; position:relative; padding-top:0; }
.ai-inline-photo { position:absolute; left:0; top:32px; width:85%; height:485px; object-fit:cover; object-position:42% center; border:1px solid #85876e; }
.ai-inline-device { width:180px; position:absolute; right:0; top:0; padding:6px; border:1px solid #b2b59b; border-radius:24px; background:#363c2c; box-shadow:0 25px 50px #0007; }
.ai-inline-device img { width:100%; height:auto; border-radius:18px; display:block; }
.ai-inline-scene figcaption { position:absolute; bottom:12px; left:0; right:0; margin:0 auto; padding:0 10px; }
.ai-inline-scene figcaption span { font-size:10px; }
.ai-continuous .journey-start { min-height:0; padding-block:75px; }
.ai-inline-retouched { padding-bottom:0; }
.ai-inline-retouched figcaption { position:relative; margin-top:535px; bottom:auto; }
.ai-inline-retouched figcaption a { display:inline-flex; align-items:center; min-height:44px; color:inherit; text-underline-offset:4px; }
@media(max-width:979px) { .ai-inline-retouched figcaption { margin-top:485px; } }
@media(max-width:720px) { .ai-inline-retouched figcaption { margin-top:490px; } }
.ai-retouched-label { display:none; }
.ai-continuous[data-active="method"] .ai-original-label { display:none; }
.ai-continuous[data-active="method"] .ai-retouched-label { display:inline; }

/* One frame stays in place while the context, app screen and camera change. */
@media (min-width:980px) {
  .ai-continuous.journey-enhanced .journey-stage { background:#10150e; }
  .ai-continuous.journey-enhanced .journey-chapter { min-height:108svh; }
  .ai-campaign .ai-continuous.journey-enhanced .journey-start { min-height:108svh; padding:0; }
  .ai-continuous.journey-enhanced .journey-copy { max-width:500px; }
  .ai-continuous.journey-enhanced .journey-tools { top:8px; }
  .ai-continuous.journey-enhanced .journey-chapter-layout { padding-block:112px 86px; }
  .ai-stage-glow { position:absolute; width:90vw; height:90vw; top:-20vw; left:20%; background:radial-gradient(ellipse,#ba984826,transparent 62%); transform:translate3d(calc(var(--journey-progress) * -8vw),calc(var(--chapter-progress) * -20px),0); }
  .ai-stage-line { position:absolute; left:53%; width:1px; height:80%; top:11%; background:linear-gradient(transparent,#a6985c6b,transparent); transform:rotate(calc(-8deg + var(--journey-progress) * 14deg)); transform-origin:center; }
  .ai-room-scene { position:absolute; left:53%; top:17%; width:39%; height:66%; max-width:600px; overflow:hidden; border:1px solid #a3a28559; border-radius:2px; transform:translate3d(calc(var(--chapter-progress) * -12px),calc(var(--chapter-progress) * -20px),0) scale(calc(1 + var(--chapter-progress) * .025)); }
  .ai-room-scene::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 65%,#141a0dd9); pointer-events:none; }
  .ai-scene-world { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:40% center; filter:saturate(.76) brightness(.8); opacity:0; transition:opacity 450ms ease; }
  .ai-world-method { object-position:35% center; }
  .ai-world-practice,.ai-world-coaching { object-position:25% center; }
  [data-active="start"] .ai-world-start,[data-active="method"] .ai-world-method,[data-active="practice"] .ai-world-practice,[data-active="coaching"] .ai-world-coaching,[data-active="scale"] .ai-world-scale { opacity:1; }
  .ai-photo-label { position:absolute; bottom:18px; left:20px; z-index:2; color:#e1e4d7; font-size:8px; letter-spacing:.08em; }
  .ai-device { --phone-width:clamp(180px,15.5vw,220px); position:absolute; left:calc(77% - var(--phone-width)/2); top:calc(50% - var(--phone-width)*1.11); width:var(--phone-width); height:calc(var(--phone-width)*2.19); padding:7px; border:1px solid #c0c2a3; border-radius:30px; background:#343b2a; box-shadow:0 30px 70px #0008,inset 0 2px 2px #ede7ca55; z-index:3; transform:translate3d(calc(var(--chapter-progress)*8px),calc(var(--chapter-progress)*-25px),0) rotate(var(--ai-phone-angle,-3deg)); transition:transform 600ms cubic-bezier(.22,1,.36,1); }
  .ai-device-screens { position:relative; width:100%; height:100%; overflow:hidden; border-radius:23px; background:#f7f7f2; }
  .ai-product-screen { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:top; opacity:0; transition:opacity 140ms ease; }
  [data-active="start"] .ai-screen-start,[data-active="method"] .ai-screen-method,[data-active="practice"] .ai-screen-practice,[data-active="coaching"] .ai-screen-coaching,[data-active="scale"] .ai-screen-scale { opacity:1; }
  .ai-continuous[data-active="method"] { --ai-phone-angle:3deg; }
  .ai-continuous[data-active="practice"] { --ai-phone-angle:-2deg; }
  .ai-continuous[data-active="coaching"] { --ai-phone-angle:2deg; }
  .ai-continuous[data-active="scale"] { --ai-phone-angle:-3deg; }
  .ai-device-label { position:absolute; top:calc(100% + 18px); left:-35px; right:-35px; text-align:center; white-space:nowrap; color:#e2e8d4; font-size:8px; letter-spacing:.08em; text-shadow:0 1px 8px #000; }
  .ai-agent-orbit { position:absolute; left:55%; top:68%; z-index:4; display:flex; gap:12px; align-items:center; max-width:205px; padding:18px; background:#d8c58f; color:#1b2215; box-shadow:0 12px 30px #0004; transform:translate3d(calc(var(--chapter-progress)*-9px),calc(var(--chapter-progress)*-32px),0); }
  .ai-agent-orbit>span { width:34px; height:34px; border:1px solid #746d4a; border-radius:50%; display:grid; place-items:center; flex-shrink:0; font-family:Georgia,serif; font-size:16px; }
  .ai-campaign .ai-agent-orbit p { font-family:Georgia,serif; color:#1b2215; font-size:15px; line-height:1.3; margin:0; }
  .ai-stage-word { position:absolute; left:5%; bottom:3%; color:#d9c9930a; font-family:Georgia,serif; font-size:clamp(70px,10vw,150px); line-height:1; letter-spacing:-.05em; transform:translate3d(calc(var(--journey-progress)*-40px),0,0); }
}

.ai-day { background:#f0ede3; color:#262d21; padding:100px 0; }
.ai-day-grid { display:grid; grid-template-columns:1.15fr 1fr; align-items:center; gap:8%; }
.ai-day-photo { position:relative; }
.ai-day-photo img { width:100%; height:550px; object-fit:cover; object-position:38% center; }
.ai-day-photo>span { position:absolute; bottom:22px; left:24px; right:24px; padding:11px 15px; width:fit-content; background:#ece8dcea; color:#2d3524; font-size:8px; letter-spacing:.1em; }
.ai-day h2 { font-size:clamp(38px,4vw,59px); line-height:1.04; letter-spacing:-.05em; font-weight:500; margin:0 0 26px; }
.ai-day h2 em { font-family:Georgia,serif; font-weight:400; color:#6b7154; }
.ai-campaign .ai-day-copy>p:not(.sa-section-label) { font-size:15px; line-height:1.8; color:#59634d; max-width:425px; }
.ai-day-facts { display:flex; gap:35px; margin:28px 0 30px; padding-top:18px; border-top:1px solid #b8bda9; }
.ai-day-facts>span { font-family:Georgia,serif; font-size:36px; line-height:1; }
.ai-day-facts small { display:block; margin-top:9px; font-family:Arial,sans-serif; font-size:9px; color:#626c54; letter-spacing:.04em; }
.ai-day-guide { display:block; width:fit-content; padding-block:15px 5px; min-height:44px; color:#586341; font-size:12px; text-decoration:underline; text-underline-offset:4px; }
.ai-campaign .journey-film-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
.ai-campaign .journey-films { padding-block:85px; background:#e8e4d9; }
.ai-campaign .journey-film .film-player-video { max-height:440px; }
.ai-campaign .sa-resources { padding-block:85px; }
.ai-campaign .sa-contact-copy { max-width:540px; }
.ai-contact-action { margin-top:20px; }
.ai-campaign .ai-contact-number { font-family:Georgia,serif; font-size:25px; color:#e6d4a9; margin:18px 0; }
.ai-campaign .sa-contact-caption { max-width:370px; }
.ai-campaign .sa-contact-form { border-top:1px solid #645d40; }
.ai-campaign :is(.ai-hero,.ai-day,.ai-bridge) a:focus-visible { outline:3px solid #b79b53; outline-offset:5px; }

@media(min-width:980px) and (max-width:1199px) {
  .ai-hero-grid { gap:5%; grid-template-columns:1.05fr 1fr; }
  .ai-hero h1 { font-size:59px; }
  .ai-vsl-frame { width:250px; margin-right:7%; }
  .ai-vsl-stage { min-height:540px; }
  .ai-bridge-grid { gap:24px; grid-template-columns:.6fr 1.4fr 1fr; }
  .ai-continuous.journey-enhanced .journey-copy { max-width:405px; }
  .ai-campaign .ai-continuous .journey-copy h2 { font-size:39px; }
  .ai-continuous .journey-lede { font-size:14px; }
  .ai-campaign .ai-prompt>p { font-size:18px; }
  .ai-agent-orbit { left:54%; max-width:175px; padding:14px; gap:9px; }
  .ai-campaign .ai-agent-orbit p { font-size:13px; }
  .ai-day-photo img { height:500px; }
}
@media(max-width:979px) {
  .ai-campaign .ai-hero { padding-top:30px; }
  .ai-hero-grid { gap:5%; }
  .ai-hero h1 { font-size:52px; }
  .ai-campaign .ai-hero .sa-kicker { font-size:8px; }
  .ai-campaign .ai-hero-description { font-size:14px; }
  .ai-hero .button { font-size:11px; padding-inline:16px; }
  .ai-vsl-frame { width:min(235px,90%); margin-right:0; }
  .ai-vsl-stage { min-height:500px; }
  .ai-vsl-side { font-size:7px; padding-inline:0; }
  .ai-vsl-next { display:block; }
  .ai-vsl-transcript { display:block; min-height:34px; padding-top:6px; }
  .ai-hero-pillars { gap:12px; margin-top:23px; }
  .ai-bridge-grid { grid-template-columns:1fr 1fr; gap:20px 30px; }
  .ai-bridge .sa-section-label { grid-column:1/-1; }
  .ai-bridge h2 { font-size:36px; }
  .ai-continuous .journey-method .journey-copy,.ai-continuous .journey-coaching .journey-copy { grid-column:1; }
  .ai-continuous .journey-method .chapter-figure,.ai-continuous .journey-coaching .chapter-figure { grid-column:2; }
  .ai-inline-scene { min-height:550px; }
  .ai-inline-photo { height:430px; }
  .ai-inline-device { width:164px; }
  .ai-day-grid { gap:6%; }
  .ai-day-photo img { height:500px; }
  .ai-day h2 { font-size:40px; }
  .ai-campaign .ai-day-copy>p:not(.sa-section-label) { font-size:13px; }
  .ai-campaign .journey-film-grid { grid-template-columns:none; }
}
@media(max-width:720px) {
  .ai-campaign .ai-hero .container,.ai-campaign .ai-bridge .container,.ai-campaign .ai-day .container { width:calc(100% - 40px); }
  .ai-hero-grid { display:flex; flex-direction:column; gap:28px; }
  .ai-hero-copy { padding:0; width:100%; }
  .ai-campaign .ai-hero .sa-kicker { margin-bottom:20px; max-width:320px; font-size:8px; }
  .ai-hero h1 { font-size:clamp(43px,10.8vw,64px); line-height:1.04; margin-bottom:22px; max-width:610px; text-wrap:balance; }
  .ai-campaign .ai-hero-description { font-size:14px; line-height:1.75; max-width:570px; margin-bottom:22px; }
  .ai-hero .hero-actions { gap:4px 16px; }
  .ai-hero .button { min-height:52px; font-size:11px; }
  .ai-hero-link { font-size:11px; }
  .ai-campaign .ai-hero-note { font-size:10px; margin-top:13px; max-width:350px; }
  .ai-hero-pillars { display:none; }
  .ai-vsl-panel { width:100%; max-width:480px; padding:0; margin-top:2px; }
  .ai-vsl-heading { padding-bottom:13px; margin-bottom:18px; }
  .ai-vsl-heading>span { font-size:9px; }
  .ai-vsl-heading strong { font-size:27px; }
  .ai-vsl-stage { min-height:0; }
  .ai-vsl-context { top:30px; bottom:100px; height:calc(100% - 130px); object-position:35% center; opacity:.4; }
  .ai-vsl-frame { width:min(270px,86%); margin:0 auto; }
  .ai-vsl-frame .film-player-label { font-size:9px; }
  .ai-vsl-frame .film-player-hint { font-size:11px; }
  .ai-vsl-side { display:none; }
  .ai-vsl-next { margin-top:17px; display:flex; flex-direction:column; align-items:flex-start; gap:0; }
  .ai-vsl-cta { font-size:12px; }
  .ai-vsl-transcript { font-size:11px; min-height:44px; }
  .ai-hero-foot { margin-top:34px; padding-block:20px; font-size:7px; gap:14px; flex-direction:column; }
  .ai-hero-foot>span:last-child { font-size:9px; }
  .ai-hero-fallback img { height:410px; }
  .ai-bridge { padding-block:48px; }
  .ai-bridge-grid { display:block; }
  .ai-campaign .ai-bridge .sa-section-label { max-width:none; font-size:8px; margin-bottom:21px; }
  .ai-bridge h2 { font-size:35px; margin-bottom:22px; }
  .ai-campaign .ai-bridge p:last-child { font-size:13px; }
  .ai-continuous .journey-tools { padding-block:18px; gap:10px; }
  .ai-continuous .journey-navigation { gap:0 16px; }
  .ai-continuous .journey-navigation a { min-height:44px; }
  .ai-continuous .journey-motion-toggle { min-height:44px; font-size:10px; }
  .ai-continuous .journey-chapter,.ai-campaign .ai-continuous .journey-start { padding-block:45px 55px; }
  .ai-continuous .journey-chapter-layout { gap:31px; }
  .ai-continuous .journey-method .journey-copy,.ai-continuous .journey-coaching .journey-copy,.ai-continuous .journey-method .chapter-figure,.ai-continuous .journey-coaching .chapter-figure { grid-column:auto; grid-row:auto; }
  .ai-campaign .ai-continuous .journey-copy h2 { font-size:39px; }
  .ai-continuous .journey-lede { font-size:14px; }
  .ai-continuous .journey-eyebrow { font-size:11px; margin-bottom:22px; }
  .ai-continuous .journey-eyebrow>span { font-size:9px; }
  .ai-campaign .ai-prompt>p { font-size:20px; }
  .ai-prompt>span { font-size:9px; }
  .ai-continuous .journey-use-case>p { font-size:13px; }
  .ai-continuous .journey-case-label { font-size:9px; }
  .ai-inline-scene { min-height:565px; max-width:460px; width:100%; margin:auto; }
  .ai-inline-photo { width:82%; height:430px; top:36px; object-position:30% center; }
  .ai-inline-device { width:170px; right:0; }
  .ai-inline-scene figcaption { bottom:9px; color:#d2d7c6; font-size:12px; }
  .ai-inline-scene figcaption span { font-size:10px; }
  .ai-day { padding-block:55px; }
  .ai-day-grid { display:flex; flex-direction:column; gap:32px; align-items:stretch; }
  .ai-day-photo img { height:350px; }
  .ai-day-photo>span { left:15px; right:15px; bottom:16px; font-size:7px; padding:10px; }
  .ai-day-copy .sa-section-label { font-size:9px; margin-bottom:20px; }
  .ai-day h2 { font-size:43px; }
  .ai-campaign .ai-day-copy>p:not(.sa-section-label) { font-size:14px; }
  .ai-day-facts { margin:25px 0; }
  .ai-day-guide { font-size:12px; }
  .ai-campaign .journey-films,.ai-campaign .sa-resources { padding-block:60px; }
  .ai-campaign .journey-film .film-player-video { max-height:none; }
  .ai-contact-action { font-size:11px; padding-inline:17px; }
  .ai-campaign .ai-contact-number { font-size:26px; }
}
@media(prefers-reduced-motion:reduce) {
  .ai-campaign .ai-scene-world,.ai-campaign .ai-product-screen,.ai-campaign .ai-device { transition:none; }
  .ai-campaign .ai-vsl-panel { animation:none; transform:none; }
}
````

### 04 · growth/site/assets/campaign.css

Bytes: 866. SHA256: `8f2ab0f4d55f587ff20c3a8ca85337112fbc3d443e546364b360e123a63fd150`.

````css
.campaign-header-cta{max-width:245px;white-space:normal;text-align:center;min-height:44px}.campaign-note{color:#596050;font-size:13px;line-height:1.6;max-width:65ch}.reading-body .campaign-reading-cta{margin:30px 0;padding:28px;border:1px solid #d5d4c7;background:#efede3}.campaign-reading-cta h2{margin:0 0 12px}.campaign-reading-cta p{margin-bottom:20px}.campaign-reading-cta a{white-space:normal}.campaign-link{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:4px}@media(max-width:760px){.public-v2 .site-header .campaign-header-cta{max-width:156px;font-size:11px;line-height:1.35;padding:10px 12px;gap:8px}.public-v2 .brand-sub{max-width:110px;font-size:7px;letter-spacing:.1em}.public-v2 .site-header .nav{gap:12px}.campaign-reading-cta{padding:20px!important}.campaign-reading-cta .button{font-size:12px}}
````

### 05 · growth/site/assets/cinematic.css

Bytes: 21881. SHA256: `4d2ba6e0a4c9d6e53cdc619fb9ff8cc43b973deb1994632c4f5f0bb7f327a09c`.

````css
/* Native-scroll continuity: atmosphere / orbits / product / readable copy.
   The default is a complete linear layout. JS enables the desktop stage. */
.cinematic-page {
  --journey-paper: #f4f1e9;
  --journey-gold: #d4b574;
  --journey-muted: #bbc0b4;
  --journey-night: #10120f;
}
.cinematic-journey {
  position: relative;
  isolation: isolate;
  background: var(--journey-night);
  color: var(--journey-paper);
  --journey-progress: 0;
  --chapter-progress: 0;
  --camera-x: 25vw;
  --camera-y: -2vh;
  --camera-angle: -5deg;
  --camera-scale: 0.96;
}
.journey-stage { display: none; }
.journey-chapters { position: relative; z-index: 4; }
.journey-tools {
  position: relative;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-block: 22px;
}
.journey-navigation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px 18px;
}
.journey-navigation a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 3px 0;
  font-size: 11px;
  font-weight: 500;
  color: #c2c4b9;
  text-decoration: none;
  white-space: nowrap;
}
.journey-navigation a span { color: #b29d70; font-size: 9px; }
.journey-navigation a:hover,
.journey-navigation a[aria-current="step"] { color: #f5dba0; }
.journey-navigation a[aria-current="step"] span { color: #f5dba0; }
.journey-navigation a[aria-current="step"]::after {
  content: "";
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 50%;
}
.journey-motion-toggle {
  flex-shrink: 0;
  min-height: 40px;
  border: 1px solid #6b705e;
  border-radius: 30px;
  padding: 8px 13px;
  color: #e2e4d9;
  background: #151912;
  font: inherit;
  font-size: 10px;
  cursor: pointer;
}
.journey-motion-toggle:hover { border-color: var(--journey-gold); color: #f3d799; }
.cinematic-journey :is(a, button):focus-visible { outline: 3px solid #e5c98b; outline-offset: 5px; }
.cinematic-page .skip:focus-visible { outline-color: #e5c98b; }
.journey-film-grid:focus-visible { outline: 3px solid #765922; outline-offset: 5px; }
.journey-chapter {
  position: relative;
  padding-block: 90px;
  scroll-margin-top: 80px;
  border-top: 1px solid #c9bb8f20;
}
.journey-chapter-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 6%;
}
.cinematic-page .journey-start {
  display: block;
  min-height: 0;
  padding: 60px 0 75px;
  border-top: 0;
  background: transparent;
}
.journey-copy { position: relative; z-index: 4; max-width: 535px; }
.cinematic-page .journey-copy.sa-hero-copy { padding-bottom: 0; }
.cinematic-page .journey-copy h1 { font-size: clamp(58px, 6.15vw, 94px); }
.cinematic-page .journey-copy h2 {
  font-size: clamp(37px, 3.6vw, 55px);
  line-height: 1.08;
  letter-spacing: -0.052em;
  font-weight: 500;
  text-wrap: balance;
  margin-bottom: 26px;
}
.journey-copy h2 em { color: var(--journey-gold); }
.journey-eyebrow {
  font-size: 11px;
  line-height: 1.6;
  color: #c8cbbf;
  margin-bottom: 31px;
}
.journey-eyebrow > span {
  display: block;
  color: var(--journey-gold);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  margin-bottom: 9px;
}
.cinematic-page .journey-lede {
  font-size: 16px;
  line-height: 1.8;
  color: #bbc0b4;
  margin-bottom: 29px;
  max-width: 485px;
}
.journey-use-case { padding-top: 25px; border-top: 1px solid #8b87684d; }
.journey-case-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #beaa7a;
}
.journey-use-case h3 { margin: 14px 0 11px; font-size: 20px; letter-spacing: -0.025em; }
.cinematic-page .journey-use-case > p { color: #b8bdb0; font-size: 13px; line-height: 1.8; margin-bottom: 18px; }
.journey-change { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 12px; font-size: 11px; line-height: 1.7; }
.journey-change > span { color: #b5baac; }
.journey-change > strong { color: #ede7d3; font-weight: 500; }
.journey-change > i { color: #d4b574; font-size: 20px; font-style: normal; }
.journey-film-link {
  display: flex;
  align-items: center;
  gap: 13px;
  width: fit-content;
  max-width: 100%;
  margin-top: 27px;
  padding-block: 7px;
  font-size: 10px;
  font-weight: 500;
  color: #c4c6ba;
  text-decoration: none;
}
.journey-film-link > span:nth-child(2) > span { display: block; margin-top: 4px; color: #e8e5d7; font-size: 12px; line-height: 1.45; }
.journey-film-link > span:last-child { margin-left: 9px; color: #dbbe7e; font-size: 19px; }
.journey-film-link:hover > span:nth-child(2) > span { color: #eace90; }
.journey-play-icon { display: grid; place-items: center; width: 42px; height: 42px; flex-shrink: 0; border: 1px solid #8e7d55; border-radius: 50%; color: #e9ca87; font-size: 19px; }
.journey-inline-link { display: inline-flex; align-items: center; gap: 14px; min-height: 44px; margin-top: 15px; color: #dec386; font-size: 12px; font-weight: 500; text-decoration: none; }
.journey-inline-link:hover { color: #fae3aa; }
.journey-opening-note { display: flex; align-items: center; gap: 21px; margin-top: 43px; }
.journey-opening-note > span { padding-block: 12px; color: #d4b574; font-size: 10px; letter-spacing: 0.14em; border-top: 1px solid #756744; border-bottom: 1px solid #756744; }
.cinematic-page .journey-opening-note p { margin: 0; color: #aeb5a5; font-size: 11px; line-height: 1.7; }
.journey-opening-note strong { color: #d9dece; font-weight: 400; }
.chapter-figure { position: relative; margin: 0; padding-top: 15px; }
.chapter-device { width: min(255px, 65%); margin-inline: auto; padding: 7px; border: 1px solid #8b8976; border-radius: 29px; background: #262922; box-shadow: 0 30px 65px #0007, inset 0 1px 2px #fff4; transform: rotate(-4deg); }
.chapter-device img { display: block; width: 100%; height: auto; border-radius: 21px; }
.chapter-figure figcaption { margin: 31px auto 0; text-align: center; color: #c0c4b7; font-size: 12px; line-height: 1.7; max-width: 360px; }
.chapter-figure figcaption span { display: block; color: #a8b09d; font-size: 10px; margin-top: 4px; }
.chapter-triptych { position: relative; width: 100%; aspect-ratio: 1 / 1.11; perspective: 1500px; }
.chapter-triptych img { position: absolute; display: block; width: 43%; height: auto; border: 6px solid #282b23; outline: 1px solid #777968; border-radius: 24px; box-shadow: 0 25px 55px #0007; }
.chapter-triptych .chapter-center { width: 46%; top: 0; left: 27%; z-index: 3; transform: rotate(-3deg); }
.chapter-triptych .chapter-side-left { top: 14%; left: 1%; z-index: 1; transform: rotate(-12deg); opacity: 0.72; }
.chapter-triptych .chapter-side-right { top: 14%; right: 0; z-index: 2; transform: rotate(11deg); opacity: 0.82; }
.journey-method .journey-copy,
.journey-coaching .journey-copy { grid-column: 2; grid-row: 1; }
.journey-method .chapter-figure,
.journey-coaching .chapter-figure { grid-column: 1; grid-row: 1; }
.journey-room-route { padding: 0; margin: 30px 0 22px; list-style: none; }
.journey-room-route li { display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; position: relative; }
.journey-room-route li:not(:last-child)::after { content: ""; position: absolute; top: 34px; bottom: 0; left: 17px; width: 1px; background: #67664d; }
.journey-room-route li > span { display: grid; place-items: center; width: 35px; height: 35px; border: 1px solid #7c744f; background: #23271c; color: #e4cc91; font-size: 11px; flex-shrink: 0; }
.journey-room-route strong { font-size: 15px; font-weight: 500; color: #e8e7db; }
.cinematic-page .journey-room-route p { font-size: 12px; line-height: 1.6; color: #b7beac; margin: 5px 0 0; }
.cinematic-page .journey-proposal-note { color: #b2baa4; font-size: 11px; line-height: 1.7; max-width: 430px; margin-bottom: 12px; }

/* One native sticky stage; only transforms and opacity vary with scroll. */
@media (min-width: 980px) {
  .cinematic-journey.journey-enhanced .journey-stage {
    position: sticky;
    top: 0;
    display: block;
    height: 100svh;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .journey-enhanced .journey-chapters { margin-top: -100svh; }
  .journey-enhanced .journey-tools { position: sticky; top: 12px; padding-block: 10px; margin-bottom: -60px; }
  .journey-enhanced .journey-navigation { gap: 17px; padding: 5px 18px; border: 1px solid #b6a27136; border-radius: 36px; background: #11160fea; backdrop-filter: blur(14px); }
  .journey-enhanced .journey-chapter { min-height: 110svh; padding: 0; border: 0; }
  .cinematic-page .journey-enhanced .journey-start { min-height: 100svh; padding: 0; }
  .journey-enhanced .journey-chapter-layout { min-height: inherit; padding-block: 118px 92px; }
  .journey-enhanced .journey-copy { grid-column: 1; max-width: 515px; }
  .journey-enhanced .journey-method .journey-copy,
  .journey-enhanced .journey-coaching .journey-copy { grid-column: 1; padding-left: 0; }
  .journey-enhanced .chapter-figure { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); }
  .journey-atmosphere { position: absolute; inset: -8% -2%; overflow: hidden; transform: translate3d(0, calc(var(--journey-progress) * -55px), 0) scale(1.06); }
  .journey-atmosphere::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, #10120f 0%, #10120fe6 28%, #10120f45 70%, #10120f99 100%), linear-gradient(180deg, #10120f38 0%, transparent 55%, #10120f 98%); }
  .journey-world { position: absolute; width: 60%; height: 115%; right: -3%; top: -5%; object-fit: cover; object-position: 50% 40%; opacity: 0; filter: saturate(0.25) brightness(0.42) blur(8px); transition: opacity 1s ease; }
  [data-active="start"] .journey-world-smart-agent,
  [data-active="method"] .journey-world-infraestructura-comercial,
  [data-active="practice"] .journey-world-menos-caos,
  [data-active="coaching"] .journey-world-conocimiento-en-practica,
  [data-active="scale"] .journey-world-sistema-conectado { opacity: 0.62; }
  .journey-light { position: absolute; width: 95vw; height: 95vw; left: 12%; top: -25vw; border-radius: 50%; background: radial-gradient(ellipse, #ad884027 0%, #858d3910 32%, transparent 65%); transform: translate3d(calc(var(--journey-progress) * -15vw), calc(var(--chapter-progress) * -30px), 0); }
  .journey-orbits { position: absolute; width: 1000px; height: 1000px; top: 50%; left: 70%; transform: translate3d(-50%, calc(-50% + var(--chapter-progress) * -40px), 0) rotate(calc(-20deg + var(--journey-progress) * 30deg)); }
  .journey-orbits i { position: absolute; inset: 8%; border: 1px solid #d7c28615; border-radius: 50%; }
  .journey-orbits i:nth-child(2) { inset: 23% -15%; transform: rotate(-25deg); border-color: #d7c28621; }
  .journey-orbits i:nth-child(3) { inset: 44% -30%; transform: rotate(-25deg); border-color: #d7c28635; }
  .journey-device-space {
    --device-width: clamp(235px, 19.7vw, 290px);
    position: absolute;
    width: var(--device-width);
    height: calc(var(--device-width) * 2.2);
    left: calc(50% - var(--device-width) / 2);
    top: calc(50% - var(--device-width) * 1.1);
    z-index: 3;
    perspective: 1500px;
    transform: translate3d(calc(var(--camera-x) + var(--chapter-progress) * 10px), calc(var(--camera-y) + var(--chapter-progress) * -28px), 0) rotate(var(--camera-angle)) scale(var(--camera-scale));
    transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .journey-device { position: relative; width: 100%; height: 100%; background: #292c24; border: 1px solid #b7b59c; border-radius: 35px; padding: 8px; box-shadow: -18px 30px 85px #000b, inset 0 2px 2px #fcf7df66, 0 0 0 3px #c4bf9b0a; z-index: 3; }
  .journey-device-edge { position: absolute; top: 14%; left: -4px; width: 4px; height: 10%; border-radius: 3px; background: #777d68; }
  .journey-device-screens { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 27px; background: #f8f8f4; }
  .journey-screen { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0; transition: opacity 160ms ease; }
  .journey-screen-roadmap { opacity: 1; }
  [data-active="practice"] .journey-screen-roadmap,
  [data-active="coaching"] .journey-screen-roadmap { opacity: 0; }
  [data-active="practice"] .journey-screen-resources,
  [data-active="coaching"] .journey-screen-agenda { opacity: 1; }
  .journey-companion { position: absolute; width: 78%; padding: 6px; top: 14%; background: #2e3026; border: 1px solid #767b65; border-radius: 25px; box-shadow: 0 30px 60px #0008; transition: transform 850ms ease, opacity 700ms ease; }
  .journey-companion img { display: block; width: 100%; height: auto; border-radius: 18px; }
  .journey-companion-left { left: -58%; transform: translate3d(calc(var(--chapter-progress) * -12px), 0, 0) rotate(-12deg); opacity: 0.62; }
  .journey-companion-right { right: -56%; transform: translate3d(calc(var(--chapter-progress) * 16px), 0, 0) rotate(13deg); opacity: 0.8; }
  .journey-device-caption { position: absolute; bottom: -49px; left: -70px; right: -70px; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 8px; letter-spacing: 0.08em; color: #b7c0a9; transform: rotate(calc(var(--camera-angle) * -1)); white-space: nowrap; }
  .journey-device-caption span { width: 4px; height: 4px; border-radius: 50%; background: #d4b574; }
  .journey-horizon { position: absolute; left: -20%; bottom: 9%; width: 140%; height: 1px; background: linear-gradient(90deg, transparent, #a691533d, transparent); transform: rotate(calc(-8deg + var(--journey-progress) * 10deg)); }
  .journey-stage-word { position: absolute; left: 4%; bottom: 4%; font-size: clamp(60px, 9vw, 145px); line-height: 1; letter-spacing: -0.07em; color: #d5bd7f07; white-space: nowrap; transform: translate3d(calc(var(--journey-progress) * -90px), 0, 0); }
  .cinematic-journey[data-active="method"] { --camera-x: 24vw; --camera-y: -3vh; --camera-angle: 6deg; --camera-scale: 1.08; }
  .cinematic-journey[data-active="practice"] { --camera-x: 27vw; --camera-y: -1vh; --camera-angle: -5deg; --camera-scale: 1.04; }
  .cinematic-journey[data-active="coaching"] { --camera-x: 23vw; --camera-y: -4vh; --camera-angle: 4deg; --camera-scale: 1.05; }
  .cinematic-journey[data-active="scale"] { --camera-x: 26vw; --camera-y: 1vh; --camera-angle: -3deg; --camera-scale: 0.86; }
  .cinematic-journey:is([data-active="method"], [data-active="practice"], [data-active="coaching"]) .journey-companion-left { opacity: 0; transform: translate3d(55px, 35px, 0) rotate(-7deg) scale(0.82); }
  .cinematic-journey:is([data-active="method"], [data-active="practice"], [data-active="coaching"]) .journey-companion-right { opacity: 0; transform: translate3d(-55px, 35px, 0) rotate(7deg) scale(0.82); }
}

/* A quiet editorial landing after the continuous scene. */
.journey-films { background: #f3f0e7; color: #23281f; padding-block: 108px 100px; border-top: 1px solid #c8c1ab; }
.journey-films-heading { display: grid; grid-template-columns: 1.4fr 1fr; align-items: end; gap: 10%; margin-bottom: 52px; }
.journey-films-heading h2 { font-size: clamp(38px, 4.3vw, 62px); line-height: 1.07; letter-spacing: -0.055em; margin-bottom: 0; }
.journey-films-heading h2 em { color: #75602f; }
.cinematic-page .journey-films-heading > p { font-size: 14px; line-height: 1.8; color: #59614e; margin-bottom: 4px; }
.journey-film-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 23px; }
.journey-film { min-width: 0; scroll-margin-top: 30px; }
.journey-film-number { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; justify-content: space-between; margin-bottom: 15px; color: #62674f; font-size: 8px; letter-spacing: 0.08em; }
.journey-film .film-player { margin: 0 0 21px; }
.journey-film .film-player-video { display: block; width: 100%; height: auto; max-height: none; aspect-ratio: 9 / 16; object-fit: contain; border: 1px solid #a3a18e; border-radius: 4px; background: #141711; box-shadow: 0 16px 34px #35371b16; }
.journey-film .film-player figcaption { margin-top: 11px; font-size: 9px; line-height: 1.6; color: #59624b; }
.journey-film h3 { font-size: 22px; line-height: 1.16; letter-spacing: -0.035em; margin-bottom: 13px; }
.cinematic-page .journey-film > p { color: #5b644e; font-size: 12px; line-height: 1.75; margin-bottom: 15px; }
.journey-film-detail { display: inline-flex; align-items: center; gap: 9px; color: #4d5b3c; font-size: 11px; line-height: 1.5; min-height: 44px; text-decoration: none; font-weight: 500; }
.journey-film-detail:hover { color: #765922; text-decoration: underline; }
.cinematic-page .sa-resources { border-top: 1px solid #dad7ca; }
.cinematic-page .sa-resources .sa-section-label { color: #75603a; }

@media (min-width: 980px) and (max-width: 1199px) {
  .journey-enhanced .journey-navigation { gap: 12px; padding-inline: 14px; }
  .journey-navigation a { font-size: 10px; }
  .journey-enhanced .journey-copy h2 { font-size: 39px; }
  .journey-enhanced .journey-device-space { --device-width: 225px; }
  .journey-enhanced .journey-companion-left { left: -34%; width: 72%; }
  .journey-enhanced .journey-companion-right { right: -34%; width: 72%; }
  .journey-film-grid { gap: 16px; }
  .journey-film h3 { font-size: 20px; }
}
@media (max-width: 979px) {
  .journey-tools { align-items: flex-start; flex-direction: column; gap: 7px; padding-block: 19px; }
  .journey-navigation { gap: 6px 18px; }
  .journey-navigation a { min-height: 38px; }
  .journey-motion-toggle { align-self: flex-end; margin-top: 0; }
  .journey-chapter { padding-block: 65px 75px; }
  .journey-chapter-layout { gap: 38px; }
  .cinematic-page .journey-start { padding: 35px 0 65px; }
  .cinematic-page .journey-copy h1 { font-size: clamp(49px, 6vw, 72px); }
  .cinematic-page .journey-copy h2 { font-size: 38px; }
  .journey-copy .sa-hero-description { font-size: 16px; }
  .journey-lede { font-size: 15px; }
  .journey-opening-note { margin-top: 26px; }
  .journey-films { padding-block: 75px; }
  .journey-films-heading { gap: 35px; grid-template-columns: 1fr; margin-bottom: 35px; }
  .journey-films-heading > p { max-width: 560px; }
  .journey-film-grid { grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: minmax(250px, 38vw); overflow-x: auto; gap: 24px; padding-block: 4px 26px; scroll-snap-type: x proximity; scrollbar-width: thin; scrollbar-color: #887847 #e1dccb; }
  .journey-film { scroll-snap-align: start; }
}
@media (max-width: 720px) {
  .cinematic-page .cinematic-journey .container,
  .cinematic-page .journey-films .container { width: calc(100% - 40px); }
  .journey-tools { padding-top: 14px; padding-bottom: 16px; gap: 7px; }
  .journey-navigation { width: 100%; gap: 0 17px; }
  .journey-navigation a { font-size: 10px; min-height: 36px; }
  .journey-navigation a span { font-size: 9px; }
  .journey-motion-toggle { min-height: 33px; padding: 6px 11px; font-size: 9px; }
  .cinematic-page .journey-start { padding: 30px 0 55px; }
  .journey-chapter-layout { grid-template-columns: 1fr; gap: 47px; }
  .journey-copy { max-width: 100%; }
  .journey-method .journey-copy,
  .journey-coaching .journey-copy,
  .journey-method .chapter-figure,
  .journey-coaching .chapter-figure { grid-column: auto; grid-row: auto; }
  .cinematic-page .journey-copy h1 { font-size: clamp(48px, 12vw, 72px); margin-bottom: 25px; }
  .cinematic-page .journey-copy h2 { font-size: clamp(34px, 9.2vw, 48px); line-height: 1.09; }
  .cinematic-page .journey-copy .sa-kicker { font-size: 8px; margin-bottom: 25px; letter-spacing: 0.13em; }
  .cinematic-page .journey-copy .sa-hero-description { font-size: 15px; line-height: 1.8; margin-bottom: 26px; }
  .cinematic-page .journey-copy .hero-actions { gap: 15px; }
  .cinematic-page .journey-copy .hero-actions .button { padding-inline: 19px; font-size: 12px; min-height: 52px; }
  .cinematic-page .journey-copy .hero-actions .sa-text-link { font-size: 11px; gap: 13px; }
  .cinematic-page .journey-copy .sa-hero-note { font-size: 10px; margin-top: 19px; }
  .journey-opening-note { margin-top: 29px; }
  .journey-opening-note > span { font-size: 9px; }
  .cinematic-page .journey-opening-note p { font-size: 10px; }
  .journey-chapter { padding-block: 58px; }
  .journey-eyebrow { font-size: 11px; margin-bottom: 25px; }
  .journey-eyebrow > span { font-size: 8px; }
  .cinematic-page .journey-lede { font-size: 14px; line-height: 1.85; }
  .journey-use-case { padding-top: 23px; }
  .journey-case-label { font-size: 8px; }
  .journey-use-case h3 { font-size: 20px; }
  .cinematic-page .journey-use-case > p { font-size: 13px; }
  .chapter-figure { padding-top: 0; }
  .chapter-device { width: 62%; max-width: 245px; border-radius: 27px; }
  .chapter-triptych { max-width: 440px; margin-inline: auto; aspect-ratio: 1 / 1.17; }
  .chapter-triptych img { border-width: 5px; border-radius: 20px; }
  .chapter-triptych .chapter-center { width: 47%; }
  .chapter-figure figcaption { margin-top: 28px; font-size: 11px; padding-inline: 15px; }
  .chapter-figure figcaption span { font-size: 9px; }
  .journey-films { padding-block: 65px 55px; }
  .journey-films-heading { gap: 25px; }
  .journey-films-heading h2 { font-size: 39px; }
  .cinematic-page .journey-films-heading > p { font-size: 13px; }
  .journey-film-grid { grid-auto-columns: minmax(255px, 78vw); width: calc(100% + 40px); margin-inline: -20px; padding-inline: 20px; gap: 22px; scroll-padding-left: 20px; }
  .journey-film h3 { font-size: 26px; }
  .cinematic-page .journey-film > p { font-size: 13px; }
  .journey-film-number { font-size: 9px; }
  .journey-film .film-player figcaption { font-size: 10px; }
  .journey-film-detail { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .cinematic-journey *,
  .cinematic-journey *::before,
  .cinematic-journey *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
````

### 06 · growth/site/assets/cms.css

Bytes: 20751. SHA256: `b596e94f82500acbac113de74d37cbefe3ff5f38d4a0dd4ad50051cfa1b287dc`.

````css
.cms-body {
  background: #f4f4ed;
  font-size: 14px;
}
.cms-body .button {
  font-size: 12px;
}
.login-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.login-story {
  background: #1d241c;
  color: #f7f3e8;
  padding: 55px 65px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 70px;
}
.login-story .brand-mark {
  color: #d1b578;
}
.login-story h1 {
  font-size: 72px;
  line-height: 1.08;
  margin-bottom: 25px;
}
.login-story h1 em {
  color: #cfb16e;
}
.login-story .eyebrow {
  color: #cfb16e;
  font-size: 9px;
}
.login-story p:not(.eyebrow) {
  font-size: 15px;
  line-height: 1.9;
  color: #b6c0ac;
}
.login-foot {
  font-size: 8px;
  letter-spacing: 2px;
  color: #a4af9a;
}
.login-main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 65px;
}
.login-main form {
  max-width: 390px;
  width: 100%;
}
.login-main h2 {
  font-size: 39px;
}
.login-main form > p {
  font-size: 13px;
  line-height: 1.8;
}
.login-main label {
  margin: 22px 0;
}
.login-main .button {
  width: 100%;
  margin-top: 7px;
}
.login-main .caption {
  margin-top: 25px;
  font-size: 11px;
}
.cms-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: 230px;
  background: #1e251d;
  color: #e3e9dc;
  padding: 33px 22px;
  display: flex;
  flex-direction: column;
  z-index: 30;
}
.cms-sidebar .brand {
  font-size: 11px;
  margin: 0 0 55px;
}
.cms-sidebar .brand-mark {
  color: #cfb478;
}
.cms-sidebar .brand-sub {
  color: #a0ad95;
  font-size: 5px;
}
.sidebar-label {
  font-size: 7px;
  letter-spacing: 1.6px;
  color: #aab6a0;
  margin-left: 9px;
  margin-bottom: 15px;
}
.cms-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.cms-sidebar nav button {
  color: #b6c1ac;
  display: flex;
  align-items: center;
  gap: 13px;
  border: 0;
  background: transparent;
  padding: 13px 12px;
  border-radius: 5px;
  font-size: 12px;
  text-align: left;
  min-height: 44px;
}
.cms-sidebar nav button .nav-icon {
  width: 18px;
  font-size: 17px;
}
.cms-sidebar nav button:hover {
  background: #2b3527;
  color: #fff;
}
.cms-sidebar nav button.active {
  background: #d2b779;
  color: #1a2118;
}
.sidebar-bottom {
  margin-top: auto;
  border-top: 1px solid #3b4734;
  padding-top: 20px;
  font-size: 11px;
}
.sidebar-bottom > a {
  text-decoration: none;
  display: block;
  margin-bottom: 23px;
}
.sidebar-bottom .text-button {
  color: #9eac94;
  font-size: 10px;
}
.user-badge {
  color: #e3e9dc;
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: #3a4733;
  color: #cfb478;
  display: grid;
  place-items: center;
  font-size: 12px;
}
.user-badge small {
  display: block;
  color: #a2b098;
  font-size: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 3px;
}
.cms-main {
  margin-left: 230px;
  min-height: 100vh;
}
.cms-topbar {
  height: 84px;
  border-bottom: 1px solid #dddfd3;
  background: #fafaf5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 38px;
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 20;
}
.cms-breadcrumb {
  font-size: 8px;
  letter-spacing: 1.6px;
  color: #626f55;
  display: block;
  margin-bottom: 6px;
}
#save-indicator {
  font-size: 10px;
  color: #616b57;
}
.cms-top-actions {
  display: flex;
  gap: 9px;
  align-items: center;
}
.cms-top-actions .button {
  font-size: 10px;
  min-height: 40px;
  gap: 10px;
}
.cms-toast {
  margin: 22px 38px 0;
  padding: 13px 18px;
  background: #e6eedf;
  border: 1px solid #c9d5bb;
  color: #334c2b;
  border-radius: 4px;
  font-size: 12px;
}
.cms-toast.error {
  background: #f8e9e3;
  border-color: #e4c2b6;
  color: #8c372d;
}
.cms-toast.warn {
  background: #f5eedc;
  border-color: #dfd0a6;
  color: #765d1e;
}
#cms-content {
  padding: 36px 38px 65px;
  outline: none;
}
.cms-heading {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  align-items: flex-end;
  margin-bottom: 30px;
}
.cms-heading .eyebrow {
  font-size: 8px;
  margin-bottom: 10px;
  letter-spacing: 1.5px;
}
.cms-heading h1 {
  font-size: 36px;
  margin-bottom: 10px;
}
.cms-heading p {
  font-size: 12px;
  max-width: 650px;
  margin-bottom: 0;
  line-height: 1.8;
}
.cms-heading .button {
  flex-shrink: 0;
}
.cms-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 25px;
}
.stat-box {
  border: 1px solid #daddcf;
  border-radius: 5px;
  background: #fafaf4;
  padding: 22px;
}
.stat-box > span {
  display: block;
  font-size: 9px;
  color: #65705b;
  margin-bottom: 15px;
}
.stat-box strong {
  font-size: 34px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -1px;
}
.stat-box small {
  display: block;
  font-size: 9px;
  margin-top: 13px;
  color: #626f55;
}
.cms-panels {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 22px;
}
.cms-panel {
  background: #fffef9;
  border: 1px solid #d9dece;
  border-radius: 6px;
  padding: 26px;
  margin-bottom: 22px;
  min-width: 0;
}
.cms-panel h2 {
  font-size: 24px;
  margin-bottom: 18px;
}
.cms-panel h3 {
  font-size: 17px;
  margin-bottom: 12px;
}
.cms-panel > p {
  font-size: 12px;
  line-height: 1.8;
}
.cms-panel .eyebrow {
  font-size: 8px;
  margin-bottom: 12px;
}
.workflow-line {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 1px solid #e3e5db;
}
.workflow-line:last-child {
  border: 0;
}
.workflow-line > span {
  font-size: 10px;
  background: #edece0;
  color: #715e32;
  border-radius: 50%;
  width: 29px;
  height: 29px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
}
.workflow-line h3 {
  margin-bottom: 7px;
}
.workflow-line p {
  font-size: 11px;
  line-height: 1.7;
  margin: 0;
}
.cms-shortcuts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-shortcuts button {
  padding: 15px;
  text-align: left;
  border: 1px solid #dcded2;
  background: #f6f7ef;
  border-radius: 4px;
  min-height: 48px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.cms-editor-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 22px;
}
.cms-editor-layout > .editor-main {
  min-width: 0;
}
.editor-aside {
  position: sticky;
  top: 110px;
  align-self: start;
}
.editor-aside p {
  font-size: 11px;
  line-height: 1.8;
}
.editor-aside .button {
  width: 100%;
  margin-bottom: 12px;
}
.cms-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.cms-field-grid > label {
  font-size: 11px;
  font-weight: 500;
}
.cms-body input,
.cms-body select,
.cms-body textarea {
  font-size: 12px;
  min-height: 44px;
  background: #fff;
}
.cms-body textarea {
  min-height: 100px;
}
.cms-body label > small {
  font-size: 9px;
  font-weight: 400;
  color: #626f55;
  display: block;
  margin-top: 5px;
}
.cms-field-grid .full {
  grid-column: 1/-1;
}
.cms-inline {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.cms-inline > label {
  flex: 1;
  min-width: 140px;
}
.cms-inline .button {
  margin-top: 25px;
}
.editor-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 16px;
}
.faq-editor-item {
  border-top: 1px solid var(--line);
  padding: 20px 0;
}
.faq-editor-item label {
  margin-bottom: 12px;
}
.delete-button {
  background: transparent;
  color: #9a3b2b;
  border: 1px solid #e1c9bf;
  border-radius: 4px;
  min-height: 38px;
  padding: 8px 12px;
  font-size: 10px;
}
.delete-button:hover {
  background: #fbece5;
}
.cms-table-wrap {
  overflow: auto;
  border: 1px solid #daddcf;
  background: #fffef9;
  border-radius: 5px;
}
.cms-table {
  font-size: 11px;
  width: 100%;
}
.cms-table th,
.cms-table td {
  padding: 16px;
  border: 0;
  border-bottom: 1px solid #e0e3d8;
  min-width: 0;
}
.cms-table th {
  font-size: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #626f55;
  background: #ecefe4;
  white-space: nowrap;
}
.cms-table td:first-child {
  min-width: 190px;
}
.cms-table td:last-child {
  text-align: right;
}
.cms-table td > strong {
  display: block;
  font-size: 12px;
  font-weight: 500;
}
.cms-table td > small {
  display: block;
  color: #626f55;
  font-size: 9px;
  margin-top: 7px;
}
.cms-table .button {
  min-height: 35px;
  padding: 7px 11px;
  font-size: 10px;
  white-space: nowrap;
}
.badge {
  display: inline-flex;
  border: 1px solid #d9ddcc;
  background: #f2f4eb;
  color: #5b684e;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 9px;
  white-space: nowrap;
}
.badge.published,
.badge.approved {
  background: #e9f0e0;
  color: #3d602e;
  border-color: #c9d8ba;
}
.badge.draft,
.badge.pending {
  background: #f7eddb;
  color: #7d5d19;
  border-color: #e7d3aa;
}
.badge.archived {
  background: #ecece7;
  color: #64655e;
}
.cms-filterbar {
  display: flex;
  gap: 12px;
  align-items: end;
  margin-bottom: 25px;
}
.cms-filterbar label {
  flex: 1;
}
.cms-filterbar .button {
  height: 44px;
}
.cms-empty {
  padding: 45px 25px;
  text-align: center;
  border: 1px dashed #cdd3bf;
  border-radius: 5px;
  background: #fbfcf4;
}
.cms-empty h2 {
  font-size: 25px;
}
.cms-empty p {
  font-size: 12px;
  line-height: 1.8;
}
.cms-empty .button {
  margin-top: 12px;
}
.block-editor {
  border: 1px solid #d7ddca;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 17px;
  background: #fafbf6;
}
.block-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;
}
.block-top strong {
  font-size: 11px;
}
.block-top .delete-button {
  min-height: 32px;
  padding: 5px 10px;
}
.block-table {
  overflow: auto;
}
.block-table table {
  min-width: 470px;
}
.block-table td,
.block-table th {
  padding: 5px;
  background: #f4f7ed;
}
.block-table input {
  min-width: 140px;
  margin: 0;
  font-size: 11px;
}
.block-tools {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.block-tools button {
  min-height: 38px;
  padding: 8px 12px;
  border: 1px dashed #bdc8ae;
  background: #f4f8ee;
  color: #465c36;
  font-size: 10px;
  border-radius: 4px;
}
.media-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.media-item {
  background: #fffef9;
  border: 1px solid #d9dece;
  border-radius: 5px;
  overflow: hidden;
}
.media-thumb {
  height: 170px;
  background: #e9ecdf;
  display: flex;
  align-items: center;
  justify-content: center;
}
.media-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-file-icon {
  font:
    45px Georgia,
    serif;
  color: #6b785c;
}
.media-info {
  padding: 17px;
}
.media-info h3 {
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 10px;
}
.media-info > p {
  font-size: 10px;
  margin-bottom: 10px;
}
.media-info .badge {
  margin: 0 5px 10px 0;
}
.media-info > .button {
  width: 100%;
  margin-top: 5px;
}
.media-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 25px;
}
.media-detail-preview {
  background: #edf0e4;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  border-radius: 5px;
}
.media-detail-preview img {
  max-height: 400px;
  object-fit: contain;
}
.media-detail-grid label {
  margin-bottom: 16px;
}
.media-attachments {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px 0;
}
.media-attachments label {
  font-size: 11px;
  font-weight: 400;
  display: flex;
  gap: 10px;
  align-items: center;
}
.media-attachments input {
  width: 16px;
  height: 16px;
  min-height: 16px;
  margin: 0;
}
.publication-item {
  padding: 22px;
  border: 1px solid #d8ddcc;
  background: #fffef8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
}
.publication-item strong {
  font-weight: 500;
  display: block;
  font-size: 15px;
}
.publication-item small {
  font-size: 10px;
  color: #626f55;
}
.publication-item p {
  font-size: 11px;
  margin: 8px 0 0;
}
.cms-note {
  padding: 15px 18px;
  background: #ecefe2;
  border-left: 3px solid #aebd99;
  font-size: 11px;
  line-height: 1.8;
  margin: 20px 0;
}
.cms-pagination {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.cms-loading {
  padding: 60px;
  text-align: center;
  font-size: 14px;
  color: #626f55;
}
.cms-body button:focus-visible,
.cms-body a:focus-visible,
.cms-body input:focus-visible,
.cms-body textarea:focus-visible,
.cms-body select:focus-visible {
  outline-color: #8d6c22;
}
.metric-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e3e5da;
  padding: 12px 0;
  font-size: 11px;
}
.metric-detail strong {
  font-size: 15px;
  font-weight: 500;
}
.selected-media {
  display: flex;
  gap: 13px;
  align-items: center;
  background: #f0f3e8;
  padding: 10px;
  margin: 10px 0;
}
.selected-media img {
  width: 55px;
  height: 55px;
  object-fit: cover;
}
.selected-media span {
  font-size: 11px;
}
.danger-zone {
  border-color: #dfc2b7;
}
.cms-body .button-danger {
  background: #8a3b2b;
  border-color: #8a3b2b;
  color: white;
}
.cms-body .button-danger:hover {
  background: #6e2c20;
}
.session-note {
  font-size: 11px;
  margin-top: 25px;
}
.session-note a {
  color: #5a723c;
}
.body-editor-note {
  font-size: 11px;
  margin-top: 15px;
  line-height: 1.8;
}
.cms-field-grid > div > label {
  font-size: 11px;
  font-weight: 500;
}
@media (max-width: 1200px) {
  .cms-sidebar {
    width: 200px;
    padding: 30px 17px;
  }
  .cms-main {
    margin-left: 200px;
  }
  .cms-topbar {
    padding: 0 25px;
  }
  #cms-content {
    padding: 30px 25px;
  }
  .cms-toast {
    margin: 20px 25px 0;
  }
  .cms-editor-layout {
    grid-template-columns: minmax(0, 1fr) 205px;
  }
  .cms-stats {
    gap: 12px;
  }
  .stat-box {
    padding: 18px;
  }
  .cms-panels {
    grid-template-columns: 1fr 1fr;
  }
  .login-story {
    padding: 45px;
  }
  .login-story h1 {
    font-size: 59px;
  }
  .login-main {
    padding: 45px;
  }
  .media-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 900px) {
  .cms-sidebar {
    position: static;
    width: 100%;
    padding: 20px;
    display: block;
  }
  .cms-sidebar .brand {
    margin-bottom: 20px;
  }
  .sidebar-label {
    display: none;
  }
  .cms-sidebar nav {
    display: flex;
    flex-direction: row;
    overflow: auto;
    gap: 6px;
    padding-bottom: 8px;
  }
  .cms-sidebar nav button {
    white-space: nowrap;
    padding: 9px 12px;
    font-size: 11px;
    min-height: 40px;
  }
  .cms-sidebar nav .nav-icon {
    font-size: 14px;
  }
  .sidebar-bottom {
    display: flex;
    align-items: center;
    gap: 22px;
    justify-content: flex-end;
    border: 0;
    padding: 0;
    margin-top: 12px;
  }
  .sidebar-bottom > a {
    margin: 0;
    font-size: 10px;
  }
  .user-badge small {
    font-size: 7px;
  }
  .user-avatar {
    width: 25px;
    height: 25px;
    font-size: 10px;
  }
  .user-badge {
    font-size: 10px;
  }
  .cms-main {
    margin-left: 0;
  }
  .cms-topbar {
    height: 75px;
    position: static;
  }
  .cms-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .cms-editor-layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .editor-aside {
    position: static;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  .editor-aside .button {
    width: auto;
    margin: 0;
  }
  .editor-aside p {
    margin: 0;
    max-width: 330px;
  }
  .cms-panels {
    grid-template-columns: 1fr 1fr;
  }
  .cms-heading h1 {
    font-size: 32px;
  }
  .login-layout {
    grid-template-columns: 1fr;
  }
  .login-story {
    padding: 35px;
    gap: 40px;
    min-height: 350px;
  }
  .login-story h1 {
    font-size: 42px;
    margin-bottom: 15px;
  }
  .login-story h1 br:nth-child(2) {
    display: none;
  }
  .login-story p:not(.eyebrow),
  .login-foot {
    display: none;
  }
  .login-main {
    padding: 50px 35px;
  }
  .login-main form {
    max-width: 500px;
  }
  .login-main h2 {
    font-size: 35px;
  }
  .media-detail-grid {
    grid-template-columns: 1fr;
  }
  .media-detail-preview {
    min-height: 150px;
  }
  .media-detail-preview img {
    max-height: 250px;
  }
}
@media (max-width: 600px) {
  .cms-sidebar {
    padding: 20px 15px;
  }
  .cms-sidebar .brand {
    font-size: 10px;
  }
  .sidebar-bottom {
    justify-content: flex-start;
    gap: 15px;
    flex-wrap: wrap;
  }
  .sidebar-bottom > a {
    order: 3;
  }
  .cms-sidebar nav button {
    gap: 7px;
    padding: 10px;
    font-size: 10px;
  }
  .cms-topbar {
    padding: 16px 20px;
    height: auto;
    align-items: start;
    gap: 15px;
  }
  .cms-topbar > div:first-child {
    max-width: 100px;
  }
  .cms-breadcrumb {
    font-size: 6px;
  }
  .cms-top-actions {
    gap: 7px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .cms-top-actions .button {
    font-size: 9px;
    padding: 9px 11px;
    min-height: 40px;
  }
  #save-indicator {
    font-size: 9px;
  }
  #cms-content {
    padding: 27px 20px 45px;
  }
  .cms-toast {
    margin: 15px 20px 0;
    font-size: 11px;
  }
  .cms-heading {
    display: block;
    margin-bottom: 25px;
  }
  .cms-heading h1 {
    font-size: 31px;
  }
  .cms-heading p {
    font-size: 11px;
  }
  .cms-heading > .button {
    margin-top: 20px;
  }
  .cms-stats {
    gap: 10px;
  }
  .stat-box {
    padding: 17px;
  }
  .stat-box strong {
    font-size: 30px;
  }
  .stat-box > span {
    font-size: 8px;
  }
  .stat-box small {
    font-size: 8px;
  }
  .cms-panels {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .cms-panel {
    padding: 21px;
    margin-bottom: 18px;
  }
  .cms-field-grid {
    grid-template-columns: 1fr;
    gap: 17px;
  }
  .cms-field-grid .full {
    grid-column: auto;
  }
  .cms-panel h2 {
    font-size: 23px;
  }
  .cms-panel p {
    font-size: 11px;
  }
  .cms-inline {
    gap: 10px;
  }
  .cms-inline .button {
    margin-top: 10px;
  }
  .cms-table td,
  .cms-table th {
    padding: 13px;
  }
  .cms-table td:first-child {
    min-width: 145px;
  }
  .cms-table td > strong {
    font-size: 11px;
  }
  .cms-table td > small {
    font-size: 8px;
  }
  .media-grid {
    gap: 13px;
  }
  .media-thumb {
    height: 135px;
  }
  .media-info {
    padding: 13px;
  }
  .media-info h3 {
    font-size: 13px;
  }
  .media-info .badge {
    font-size: 7px;
    padding: 4px 5px;
  }
  .media-info p {
    font-size: 9px;
  }
  .media-info > .button {
    font-size: 9px;
    padding: 8px;
    min-height: 36px;
  }
  .cms-filterbar {
    gap: 9px;
  }
  .cms-filterbar label {
    font-size: 10px;
  }
  .publication-item {
    padding: 20px;
    flex-direction: column;
    align-items: start;
  }
  .publication-item > .button {
    width: 100%;
  }
  .editor-aside {
    display: block;
  }
  .editor-aside > .button {
    margin: 0 0 12px;
    width: 100%;
  }
  .block-editor {
    padding: 15px;
  }
  .block-tools {
    gap: 7px;
  }
  .block-tools button {
    font-size: 9px;
    padding: 7px 10px;
  }
  .cms-loading {
    padding: 40px 15px;
  }
  .login-story h1 {
    font-size: 41px;
  }
  .login-main {
    padding: 40px 25px;
  }
  .login-main h2 {
    font-size: 31px;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.cms-body .role-stat {
  font-size: 24px;
}
.cms-pagination {
  gap: 12px;
}
.cms-table form select {
  min-width: 120px;
  margin-bottom: 9px;
}
.metric-detail small {
  display: block;
}

.cms-diagnostic-metric {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px 30px;
  padding: 25px;
  background: #f0f3e8;
  border: 1px solid #d5deca;
  border-radius: 5px;
  margin-bottom: 22px;
  align-items: center;
}
.cms-diagnostic-metric h3 {
  font-size: 22px;
  margin-bottom: 8px;
}
.cms-diagnostic-metric p {
  margin-bottom: 0;
  font-size: 12px;
}
.cms-diagnostic-metric .eyebrow {
  font-size: 8px;
  margin-bottom: 12px;
}
.cms-diagnostic-metric > strong {
  font-size: 32px;
  font-weight: 500;
  color: #475f38;
  letter-spacing: -1px;
  white-space: nowrap;
}
.cms-diagnostic-metric > .caption {
  grid-column: 1 / -1;
  font-size: 10px;
  line-height: 1.8;
  max-width: 730px;
}
@media (max-width: 600px) {
  .cms-diagnostic-metric {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 18px;
  }
  .cms-diagnostic-metric > strong {
    font-size: 30px;
  }
}

.cms-sidebar :focus-visible,
.login-story :focus-visible {
  outline-color: #cfb478;
}
.advisor-lead-summary{white-space:pre-wrap;overflow-wrap:anywhere;max-width:400px;font-size:12px;line-height:1.6;margin:0 0 8px}
````

### 07 · growth/site/assets/cms.mjs

Bytes: 53228. SHA256: `ae0b9488f25b6f88d152dfc065524531b007f456198e93339d2a16a9c8bcca8f`.

````javascript
const $ = (selector) => document.querySelector(selector);
const h = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const clone = (value) => structuredClone(value);
const videoCatalog = JSON.parse(document.querySelector("#video-catalog").textContent);
const videoOptions = { "": "Sin video local", ...Object.fromEntries(Object.entries(videoCatalog).map(([id, clip]) => [id, clip.title])) };
const labels = {
  role: { rep: "Representante", leader: "Líder", director: "Dirección" },
  type: {
    guide: "Guía",
    template: "Plantilla",
    matrix: "Matriz",
    video: "Video",
    audio: "Audio",
  },
  topic: {
    coordination: "Coordinación",
    practice: "Práctica",
    evidence: "Evidencia",
  },
  status: {
    draft: "Borrador",
    review: "En revisión",
    published: "Publicado",
    archived: "Archivado",
  },
  access: { owner: "Propietario", editor: "Editor" },
  request: {
    new: "Nueva",
    contacted: "Contactada",
    qualified: "Calificada",
    closed: "Cerrada",
  },
  advisorStatus: {
    pending_confirmation: "Pendiente de confirmar",
    contacted: "Contactada",
    qualified: "Calificada",
    closed: "Cerrada",
  },
};
const state = {
  user: null,
  csrf: null,
  document: null,
  revision: 0,
  publishedRevision: null,
  page: "home",
  navigationGeneration: 0,
  mediaGeneration: 0,
  dirty: false,
  resource: null,
  isNew: false,
  media: [],
  mediaCursor: null,
  mediaQuery: "",
  selectedMedia: null,
  requestCursor: null,
  revisionCursor: null,
  userCursor: null,
};
const content = $("#cms-content");
function notice(message, kind = "success") {
  const box = $("#cms-status");
  box.textContent = message;
  box.className = "cms-toast " + kind;
  box.hidden = false;
}
function clearNotice() {
  $("#cms-status").hidden = true;
}
function dirty(value = true) {
  state.dirty = value;
  $("#save-indicator").textContent = value
    ? "Cambios sin guardar"
    : `Borrador guardado · versión ${state.revision}`;
  $("#publish-button").disabled = value;
}
function options(items, value) {
  return Object.entries(items)
    .map(
      ([key, label]) =>
        `<option value="${h(key)}"${value === key ? " selected" : ""}>${h(label)}</option>`,
    )
    .join("");
}
function input(
  label,
  name,
  value,
  {
    area = false,
    max = 500,
    required = true,
    type = "text",
    full = false,
    help = "",
    readOnly = false,
  } = {},
) {
  return `<label${full ? ' class="full"' : ""}>${h(label)}${area ? `<textarea name="${h(name)}" aria-label="${h(label)}" maxlength="${max}"${required ? " required" : ""}>${h(value)}</textarea>` : `<input name="${h(name)}" aria-label="${h(label)}" type="${type}" value="${h(value)}" maxlength="${max}"${required ? " required" : ""}${readOnly ? " readonly" : ""}>`}${help ? `<small>${h(help)}</small>` : ""}</label>`;
}
function select(label, name, items, value, help = "") {
  return `<label>${h(label)}<select name="${h(name)}" aria-label="${h(label)}">${options(items, value)}</select>${help ? `<small>${h(help)}</small>` : ""}</label>`;
}
function heading(eyebrow, title, description, action = "") {
  return `<div class="cms-heading"><div><p class="eyebrow">${h(eyebrow)}</p><h1>${h(title)}</h1><p>${h(description)}</p></div>${action}</div>`;
}
function button(label, action, extra = "", outline = true) {
  return `<button type="button" class="button button-small${outline ? " button-outline" : ""}" data-action="${action}" ${extra}>${label}</button>`;
}
function empty(title, description) {
  return `<div class="cms-empty"><h2>${h(title)}</h2><p>${h(description)}</p></div>`;
}
function date(value) {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.valueOf())
    ? String(value)
    : new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(d);
}
function bytes(value) {
  return (
    new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 }).format(
      (value || 0) / 1048576,
    ) + " MB"
  );
}
async function api(path, method = "GET", payload) {
  const headers = {};
  let body;
  if (payload instanceof FormData) {
    body = payload;
  } else if (payload !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }
  if (method !== "GET" && state.csrf) headers["X-CSRF-Token"] = state.csrf;
  let res;
  try {
    res = await fetch("/cms/api/" + path, {
      method,
      headers,
      body,
      credentials: "same-origin",
    });
  } catch {
    throw new Error(
      "No se pudo conectar. Tus cambios siguen en el editor; vuelve a intentar.",
    );
  }
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("El servidor no devolvió una respuesta válida.");
  }
  if (!res.ok) {
    const error = new Error(
      data.error?.message || "No se pudo completar la acción.",
    );
    error.status = res.status;
    error.code = data.error?.code;
    throw error;
  }
  return data;
}
function failure(error) {
  if (error.status === 409) {
    notice(
      "Otro editor guardó una versión más reciente. Tus cambios siguen aquí. Copia lo que necesites y usa «Recargar borrador» para revisar la versión actual.",
      "warn",
    );
  } else if (error.status === 401) {
    notice(
      "Tu sesión venció. Abre el CMS en otra pestaña e inicia sesión; después vuelve aquí para guardar los cambios.",
      "error",
    );
  } else notice(error.message || "No se pudo completar la acción.", "error");
}
function acceptDraft(data) {
  state.document = data.document;
  state.revision = data.revision;
  state.publishedRevision = data.publishedRevision;
  dirty(false);
}
async function loadDraft() {
  acceptDraft(await api("draft"));
}
function navigation() {
  const items = [
    ["home", "⌂", "Inicio"],
    ["landing", "▤", "Landing"],
    ["resources", "▱", "Recursos"],
    ["media", "▧", "Medios"],
  ];
  if (state.user.role === "owner")
    items.push(
      ["requests", "↗", "Solicitudes"],
      ["advisor", "✦", "Asesor IA"],
      ["publications", "◷", "Publicaciones"],
      ["users", "♙", "Usuarios"],
    );
  $("#cms-nav").innerHTML = items
    .map(
      ([key, icon, label]) =>
        `<button type="button" data-page="${key}" class="${state.page === key ? "active" : ""}"${state.page === key ? ' aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true">${icon}</span>${label}</button>`,
    )
    .join("");
  $("#cms-user").innerHTML =
    `<p class="user-badge"><span class="user-avatar">${h(state.user.username.slice(0, 1).toUpperCase())}</span><span>${h(state.user.username)}<small>${h(labels.access[state.user.role])}</small></span></p>`;
  $("#publish-button").hidden = state.user.role !== "owner";
}
async function enter(session) {
  state.user = session.user;
  state.csrf = session.csrf;
  await loadDraft();
  $("#login-view").hidden = true;
  $("#cms-shell").hidden = false;
  await navigate("home", true);
}
function currentView(generation, page) {
  return generation === state.navigationGeneration && state.page === page;
}
async function navigate(page, force = false) {
  if (
    state.dirty &&
    !force &&
    !confirm(
      "Hay cambios sin guardar. ¿Quieres descartarlos y cambiar de sección?",
    )
  )
    return;
  const generation = ++state.navigationGeneration;
  ++state.mediaGeneration;
  dirty(false);
  state.page = page;
  state.resource = null;
  state.selectedMedia = null;
  navigation();
  clearNotice();
  content.innerHTML = '<p class="cms-loading">Cargando tu espacio…</p>';
  $("#preview-link").href =
    page === "resources" ? "/cms/preview/?page=hub" : "/cms/preview/";
  try {
    if (page === "home") await home();
    else if (page === "landing") landing();
    else if (page === "resources") resourceList();
    else if (page === "media") await mediaLibrary();
    else if (page === "requests") await requests();
    else if (page === "advisor") await advisorLeads();
    else if (page === "publications") await publications();
    else if (page === "users") await users();
  } catch (error) {
    if (!currentView(generation, page)) return;
    content.innerHTML = empty(
      "No pudimos cargar esta sección.",
      "Vuelve a elegirla en el menú para intentarlo de nuevo.",
    );
    failure(error);
  }
}
async function home() {
  const generation = state.navigationGeneration;
  let metrics = null;
  if (state.user.role === "owner") metrics = await api("metrics");
  if (!currentView(generation, "home")) return;
  const resources = state.document.resources;
  content.innerHTML =
    heading(
      "VISTA GENERAL",
      "Una buena sala empieza aquí.",
      "Contenido útil, revisión editorial y una publicación consciente.",
    ) +
    `<div class="cms-stats"><div class="stat-box"><span>RECURSOS EN EL BORRADOR</span><strong>${resources.length}</strong><small>${resources.filter((r) => r.status === "published").length} marcados para publicación</small></div><div class="stat-box"><span>VERSIÓN DEL BORRADOR</span><strong>${state.revision}</strong><small>Guardado independiente del sitio</small></div>${metrics ? `<div class="stat-box"><span>SOLICITUDES RECIBIDAS</span><strong>${h(metrics.requests.total)}</strong><small>${h(metrics.requests.new)} por revisar</small></div><div class="stat-box"><span>PUBLICACIONES</span><strong>${h(metrics.publications)}</strong><small>Versiones recuperables</small></div>` : `<div class="stat-box"><span>TU ROL</span><strong class="role-stat">Editor</strong><small>Prepara y revisa contenido</small></div><div class="stat-box"><span>PREGUNTAS FRECUENTES</span><strong>${state.document.faqs.length}</strong><small>Respuestas en la landing</small></div>`}</div><div class="cms-panels"><section class="cms-panel"><p class="eyebrow">CADA CAMBIO TIENE SU MOMENTO</p><h2>Del borrador al sitio.</h2><div class="workflow-line"><span>01</span><div><h3>Escribe con claridad</h3><p>Edita la landing, organiza recursos y añade medios con origen y derechos documentados.</p></div></div><div class="workflow-line"><span>02</span><div><h3>Revisa en contexto</h3><p>Guarda tus cambios y abre la vista previa privada. Comprueba contenido, enlaces y lectura móvil.</p></div></div><div class="workflow-line"><span>03</span><div><h3>Publica una versión completa</h3><p>Un propietario publica el borrador. Puedes recuperar una versión anterior sin publicarla automáticamente.</p></div></div></section><section class="cms-panel"><p class="eyebrow">SIGUIENTE ACCIÓN</p><h2>Entra al contenido.</h2><div class="cms-shortcuts"><button data-page="landing">Editar la landing <span>→</span></button><button data-page="resources">Organizar los recursos <span>→</span></button><button data-page="media">Gestionar la biblioteca <span>→</span></button></div><p class="cms-note">Los números reflejan datos guardados en este entorno. Las visitas solo se registran con consentimiento.</p></section></div>${
      metrics
        ? `<section class="cms-panel"><p class="eyebrow">SEÑALES CON CONSENTIMIENTO</p><h2>Lo que ocurre en el recorrido.</h2>${diagnosticMetric(metrics.diagnostic)}${Object.entries(
            metrics.events,
          )
            .map(
              ([k, v]) =>
                `<div class="metric-detail"><span>${h({ demo_requested: "Solicitudes recibidas", landing_viewed: "Visitas a la landing", resource_viewed: "Lecturas de recursos", diagnostic_started: "Diagnósticos iniciados", diagnostic_completed: "Diagnósticos completados", recommendation_opened: "Recomendaciones abiertas" }[k] || k)}</span><strong>${h(v)}</strong></div>`,
            )
            .join(
              "",
            )}<p class="caption">Conteos de eventos; no representan visitantes únicos ni resultados comerciales.</p></section>`
        : ""
    }`;
}

function diagnosticMetric(metric) {
  const rate = metric?.completionRate;
  const display =
    rate === null || rate === undefined
      ? "Sin datos"
      : new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 }).format(
          rate,
        ) + " %";
  return `<section class="cms-diagnostic-metric" aria-labelledby="diagnostic-metric-title"><div><p class="eyebrow">TASA DE FINALIZACIÓN · ÚLTIMOS 30 DÍAS</p><h3 id="diagnostic-metric-title">Diagnósticos completados</h3><p>${h(metric?.completedFlows ?? "—")} de ${h(metric?.startedFlows ?? "—")} recorridos consentidos.</p></div><strong data-diagnostic-rate>${h(display)}</strong><p class="caption">Se cuenta cada recorrido iniciado una sola vez y se comprueba si terminó. Un recorrido se reinicia al cambiar de página o recargar; no se enlazan páginas. No representa visitantes únicos ni conversión comercial.</p></section>`;
}

function landing() {
  const d = state.document;
  content.innerHTML =
    heading(
      "LANDING",
      "Palabras que abren la conversación.",
      "Todos los cambios se guardan como borrador antes de publicarse.",
    ) +
    `<form id="landing-form"><div class="cms-editor-layout"><div class="editor-main"><section class="cms-panel"><h2>Primera impresión</h2><div class="cms-field-grid">${input("Antetítulo", "hero.eyebrow", d.hero.eyebrow, { max: 140 })}${input("Texto del botón principal", "hero.primaryLabel", d.hero.primaryLabel, { max: 70 })}${input("Título principal", "hero.title", d.hero.title, { max: 200, area: true, full: true })}${input("Descripción", "hero.description", d.hero.description, { max: 1000, area: true, full: true })}</div></section><section class="cms-panel"><h2>El recorrido de la página</h2><div class="cms-field-grid">${[
      ["problem", "El problema"],
      ["practice", "La práctica"],
      ["stages", "Implementación en tres salas"],
      ["cta", "Invitación a la demo"],
    ]
      .map(
        ([key, label]) =>
          input(
            label + " · título",
            "sections." + key + "Title",
            d.sections[key + "Title"],
            { max: 400, full: true },
          ) +
          input(
            label + " · descripción",
            "sections." + key + "Body",
            d.sections[key + "Body"],
            { max: 2000, area: true, full: true },
          ),
      )
      .join(
        "",
      )}</div></section><section class="cms-panel"><h2>Preguntas frecuentes</h2><div id="faq-fields">${d.faqs.map((faq, i) => faqFields(faq, i)).join("")}</div>${button("+ Añadir pregunta", "add-faq")}</section><section class="cms-panel"><h2>Título y descripción en buscadores</h2><div class="cms-field-grid">${input("Título", "seo.title", d.seo.title, { max: 100, full: true })}${input("Descripción", "seo.description", d.seo.description, { max: 300, area: true, full: true })}</div></section></div><aside class="cms-panel editor-aside"><p class="eyebrow">BORRADOR EDITORIAL</p><button class="button" type="submit">Guardar landing</button>${button("Recargar borrador", "reload")}<p>Guardar conserva tus cambios en el CMS. La versión pública cambia cuando un propietario publica.</p></aside></div></form>`;
}
function faqFields(faq, i) {
  return `<div class="faq-editor-item" data-faq>${input("Pregunta " + (i + 1), "question", faq.question, { max: 300 })}${input("Respuesta", "answer", faq.answer, { max: 2000, area: true })}<button type="button" class="delete-button" data-action="remove-faq">Quitar pregunta</button></div>`;
}
async function saveLanding(form) {
  const doc = clone(state.document);
  for (const field of form.elements) {
    if (field.name?.includes(".")) {
      const [group, key] = field.name.split(".");
      doc[group][key] = field.value;
    }
  }
  doc.faqs = [...form.querySelectorAll("[data-faq]")].map((el) => ({
    question: el.querySelector("[name=question]").value,
    answer: el.querySelector("[name=answer]").value,
  }));
  acceptDraft(
    await api("draft", "PUT", { document: doc, revision: state.revision }),
  );
  notice("Landing guardada. Ya puedes revisar la vista previa.");
}
function resourceList(query = "") {
  const results = state.document.resources.filter((r) =>
    `${r.title} ${r.slug}`.toLowerCase().includes(query.toLowerCase()),
  );
  content.innerHTML =
    heading(
      "MEDIAHUB",
      "Herramientas que sí se usan.",
      "Crea recursos completos y organiza su momento de publicación.",
      button("Crear recurso +", "new-resource", "", false),
    ) +
    `<form id="resource-search" class="cms-filterbar"><label>Buscar en el catálogo<input name="q" value="${h(query)}" placeholder="Título o dirección del recurso"></label><button class="button button-small">Buscar</button></form>` +
    (results.length
      ? `<div class="cms-table-wrap"><table class="cms-table"><thead><tr><th>Recurso</th><th>Formato / rol</th><th>Estado en borrador</th><th>Acciones</th></tr></thead><tbody>${results.map((r) => `<tr><td><strong>${h(r.title)}</strong><small>/mediahub/${h(r.slug)}/</small></td><td>${h(labels.type[r.type])}<small>${h(labels.role[r.role])}</small></td><td><span class="badge ${h(r.status)}">${h(labels.status[r.status])}</span></td><td>${button("Editar →", "edit-resource", `data-id="${h(r.id)}"`)}</td></tr>`).join("")}</tbody></table></div>`
      : empty(
          "El catálogo está listo para una idea.",
          "Crea un recurso o prueba otra búsqueda.",
        )) +
    `<p class="cms-note">El estado «Publicado» indica que el recurso se incluirá en la siguiente publicación del borrador. Archivar retira el recurso al publicar y conserva su historial.</p>`;
}
async function fetchMedia(reset = true) {
  const generation = ++state.mediaGeneration;
  if (reset) {
    state.media = [];
    state.mediaCursor = 0;
  }
  if (state.mediaCursor === null) return;
  const data = await api(
    "media?limit=50&cursor=" +
      state.mediaCursor +
      "&q=" +
      encodeURIComponent(state.mediaQuery),
  );
  if (generation !== state.mediaGeneration) return;
  state.media.push(...data.items);
  state.mediaCursor = data.nextCursor;
}
async function editResource(id) {
  const generation = state.navigationGeneration;
  if (state.dirty && !confirm("¿Descartar los cambios sin guardar?")) return;
  state.isNew = !id;
  state.resource = id
    ? clone(state.document.resources.find((r) => r.id === id))
    : {
        id: "resource-" + crypto.randomUUID().slice(0, 8),
        slug: "",
        title: "",
        excerpt: "",
        body: [{ type: "paragraph", text: "" }],
        type: "guide",
        role: "rep",
        topic: "practice",
        level: "start",
        coverId: null,
        attachments: [],
        externalMediaUrl: "",
        videoId: null,
        duration: "",
        status: "draft",
        evidenceLabel: "Recurso original",
        sourceNote: "Sales Academy · contenido editorial",
        reviewedAt: "",
      };
  if (!state.resource)
    throw new Error(
      "El recurso ya no está en el borrador. Recarga el contenido.",
    );
  state.mediaQuery = "";
  await fetchMedia();
  if (!currentView(generation, "resources")) return;
  dirty(false);
  resourceEditor();
  $("#preview-link").href =
    "/cms/preview/?resource=" + encodeURIComponent(state.resource.slug);
}
function blockEditor(block, index) {
  let fields;
  if (block.type === "heading" || block.type === "paragraph")
    fields = input(
      block.type === "heading" ? "Título" : "Párrafo",
      "block-text",
      block.text,
      { area: block.type === "paragraph", max: 10000 },
    );
  else if (block.type === "list")
    fields = input(
      "Un elemento por línea",
      "block-list",
      block.items.join("\n"),
      { area: true, max: 150000, help: "Las líneas vacías se omiten." },
    );
  else
    fields = `<div class="block-table"><table><thead><tr>${block.headers.map((v, col) => `<th><label class="sr-only">Título de columna ${col + 1}</label><input data-column="${col}" value="${h(v)}" maxlength="200" required aria-label="Título de columna ${col + 1}"></th>`).join("")}<th>Fila</th></tr></thead><tbody>${block.rows.map((row, ri) => `<tr data-row>${row.map((v, ci) => `<td><input value="${h(v)}" maxlength="2000" aria-label="Fila ${ri + 1}, columna ${ci + 1}"></td>`).join("")}<td><button type="button" class="delete-button" data-action="remove-row" data-block-index="${index}" data-row-index="${ri}">Quitar</button></td></tr>`).join("")}</tbody></table></div><div class="block-tools"><button type="button" data-action="add-row" data-index="${index}">+ Fila</button><button type="button" data-action="add-column" data-index="${index}">+ Columna</button>${block.headers.length > 1 ? `<button type="button" data-action="remove-column" data-index="${index}">Quitar última columna</button>` : ""}</div>`;
  return `<div class="block-editor" data-block="${block.type}"><div class="block-top"><strong>${index + 1}. ${h({ heading: "Título de sección", paragraph: "Párrafo", list: "Lista", table: "Tabla" }[block.type])}</strong><div>${index > 0 ? `<button type="button" class="delete-button" data-action="move-block" data-index="${index}" aria-label="Mover bloque ${index + 1} hacia arriba">↑</button> ` : ""}<button type="button" class="delete-button" data-action="remove-block" data-index="${index}">Quitar</button></div></div>${fields}</div>`;
}
function resourceEditor() {
  const r = state.resource,
    available = state.media.filter(
      (m) => !m.archived || m.id === r.coverId || r.attachments.includes(m.id),
    );
  const images = available.filter((m) => m.mime.startsWith("image/"));
  content.innerHTML =
    heading(
      "EDITOR DE RECURSOS",
      state.isNew ? "Una herramienta nueva." : r.title,
      "Estructura el contenido para que alguien pueda usarlo hoy.",
      button("← Volver al catálogo", "back-resources"),
    ) +
    `<form id="resource-form"><div class="cms-editor-layout"><div class="editor-main"><section class="cms-panel"><h2>La idea</h2><div class="cms-field-grid">${input("Título", "title", r.title, { max: 180, full: true })}${input("Dirección del recurso", "slug", r.slug, { max: 100, full: true, help: "Minúsculas, números y guiones. La dirección se conserva después de la primera publicación." })}${input("Descripción breve", "excerpt", r.excerpt, { max: 500, area: true, full: true })}${select("Formato", "type", labels.type, r.type)}${select("Para quién", "role", labels.role, r.role)}${select("Tema", "topic", labels.topic, r.topic)}${input("Nivel", "level", r.level, { max: 40 })}${input("Tiempo de lectura o duración", "duration", r.duration, { max: 80, required: false })}${select("Estado en el borrador", "status", labels.status, r.status)}</div></section><section class="cms-panel"><h2>Contenido del recurso</h2><p class="body-editor-note">Añade texto, listas o tablas. En audio y video, incluye aquí la transcripción o un resumen útil. El contenido se guarda como bloques seguros.</p><div id="body-blocks">${r.body.map(blockEditor).join("")}</div><div class="block-tools">${Object.entries(
      {
        heading: "Título",
        paragraph: "Párrafo",
        list: "Lista",
        table: "Tabla",
      },
    )
      .map(
        ([type, label]) =>
          `<button type="button" data-action="add-block" data-type="${type}">+ ${label}</button>`,
      )
      .join(
        "",
      )}</div></section><section class="cms-panel"><h2>Medios y archivos</h2><div class="cms-field-grid"><label class="full">Portada<select name="coverId" aria-label="Portada"><option value="">Composición tipográfica, sin imagen</option>${images.map((m) => `<option value="${h(m.id)}"${r.coverId === m.id ? " selected" : ""}>${h(m.title)}${m.archived ? " · archivada" : ""}</option>`).join("")}</select><small>Las imágenes necesitan revisión y derechos aprobados antes de publicar.</small></label>${select("Video de la colección", "videoId", videoOptions, r.videoId || "", "Elige formato Video y deja vacío el enlace externo. Estos archivos forman parte de la colección pública; retirar la ficha no elimina el archivo.")}${input("Enlace de video o audio", "externalMediaUrl", r.externalMediaUrl, { type: "url", max: 500, required: false, full: true, help: "YouTube (watch?v= o youtu.be) o Vimeo. El visitante decide cuándo abrirlo." })}<div class="full"><label>Adjuntos descargables</label><div class="media-attachments">${available.length ? available.map((m) => `<label><input type="checkbox" name="attachment" value="${h(m.id)}"${r.attachments.includes(m.id) ? " checked" : ""}>${h(m.title)} · ${h(m.mime === "application/pdf" ? "PDF" : "Imagen")}${m.archived ? " · archivado" : ""}</label>`).join("") : '<p class="caption">Todavía no hay medios. Guarda el recurso y sube un archivo desde Medios.</p>'}</div>${state.mediaCursor !== null ? button("Cargar más medios", "resource-more-media") : ""}</div></div></section><section class="cms-panel"><h2>Fuente y revisión</h2><div class="cms-field-grid">${input("Etiqueta de evidencia", "evidenceLabel", r.evidenceLabel, { max: 140, full: true, help: "Ejemplo: Recurso original. Evita atribuir resultados que no estén documentados." })}${input("Fuente o nota editorial", "sourceNote", r.sourceNote, { max: 600, area: true, full: true, required: false })}${input("Fecha de revisión", "reviewedAt", r.reviewedAt, { type: "date", max: 10, required: false })}</div></section></div><aside class="cms-panel editor-aside"><p class="eyebrow">${state.isNew ? "RECURSO NUEVO" : "REVISIÓN EDITORIAL"}</p><button class="button" type="submit">Guardar recurso</button>${button("Recargar borrador", "reload")}<p>Guarda antes de abrir la vista previa. Para retirar este recurso, cambia el estado a «Archivado» y publica el borrador.</p></aside></div></form>`;
}
function collectResource() {
  const form = $("#resource-form");
  if (!form) return state.resource;
  const r = clone(state.resource),
    f = new FormData(form);
  for (const key of [
    "slug",
    "title",
    "excerpt",
    "type",
    "role",
    "topic",
    "level",
    "externalMediaUrl",
    "duration",
    "status",
    "evidenceLabel",
    "sourceNote",
    "reviewedAt",
  ])
    r[key] = String(f.get(key) || "");
  r.coverId = f.get("coverId") || null;
  r.videoId = f.get("videoId") || null;
  r.attachments = f.getAll("attachment");
  r.body = [...form.querySelectorAll("[data-block]")].map((el) => {
    const type = el.dataset.block;
    if (type === "heading" || type === "paragraph")
      return { type, text: el.querySelector("[name=block-text]").value };
    if (type === "list")
      return {
        type,
        items: el
          .querySelector("[name=block-list]")
          .value.split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };
    return {
      type,
      headers: [...el.querySelectorAll("[data-column]")].map((e) => e.value),
      rows: [...el.querySelectorAll("[data-row]")].map((row) =>
        [...row.querySelectorAll("input")].map((e) => e.value),
      ),
    };
  });
  state.resource = r;
  return r;
}
async function saveResource() {
  const r = collectResource();
  const data = await api(
    "resources" + (state.isNew ? "" : "/" + encodeURIComponent(r.id)),
    state.isNew ? "POST" : "PATCH",
    { resource: r, revision: state.revision },
  );
  acceptDraft(data);
  state.isNew = false;
  state.resource = clone(state.document.resources.find((x) => x.id === r.id));
  $("#preview-link").href =
    "/cms/preview/?resource=" + encodeURIComponent(r.slug);
  notice("Recurso guardado. La vista previa muestra este borrador.");
}
async function mediaLibrary(more = false) {
  const generation = state.navigationGeneration;
  if (!more) {
    state.mediaQuery = "";
    await fetchMedia();
  } else await fetchMedia(false);
  if (!currentView(generation, "media")) return;
  const storage = await api("media-storage");
  if (!currentView(generation, "media")) return;
  content.innerHTML =
    heading(
      "BIBLIOTECA",
      "Cada archivo, con contexto.",
      "Imágenes y PDF con procedencia, accesibilidad y revisión.",
      button("Subir archivo +", "upload-media", "", false),
    ) +
    `<p class="cms-note">${h(storage.count)} archivos · ${bytes(storage.bytes)} de ${bytes(storage.quotaBytes)} utilizados. Los medios archivados se conservan si están referenciados por una publicación.</p><form id="media-search" class="cms-filterbar"><label>Buscar medios<input name="q" value="${h(state.mediaQuery)}" placeholder="Título, archivo o descripción"></label><button class="button button-small">Buscar</button></form><div id="media-grid">${mediaCards()}</div>${state.mediaCursor !== null ? `<div class="cms-pagination">${button("Cargar más medios", "more-media")}</div>` : ""}`;
}
function mediaCards() {
  return state.media.length
    ? `<div class="media-grid">${state.media.map((m) => `<article class="media-item"><div class="media-thumb">${m.mime.startsWith("image/") ? `<img src="/media/${encodeURIComponent(m.id)}/thumbnail" alt="${h(m.alt)}" loading="lazy">` : '<span class="media-file-icon" aria-label="Archivo PDF">PDF</span>'}</div><div class="media-info"><h3>${h(m.title)}</h3><p>${h(m.filename)} · ${bytes(m.bytes)}</p><span class="badge ${h(m.reviewStatus)}">${m.reviewStatus === "approved" ? "Revisado" : "Por revisar"}</span><span class="badge ${h(m.rightsStatus)}">${m.rightsStatus === "approved" ? "Derechos aprobados" : "Derechos pendientes"}</span>${m.archived ? '<span class="badge archived">Archivado</span>' : ""}${button("Editar detalles →", "edit-media", `data-id="${h(m.id)}"`)}</div></article>`).join("")}</div>`
    : empty(
        "Tu biblioteca empieza aquí.",
        "Sube una imagen o un PDF. Añade su origen y revisa los derechos antes de publicarlo.",
      );
}
function mediaFields(m) {
  return `<div class="cms-field-grid">${input("Título del archivo", "title", m.title, { max: 180, full: true })}${input("Texto alternativo", "alt", m.alt, { max: 500, area: true, full: true, required: m.mime !== "application/pdf", help: "Describe lo relevante de la imagen sin repetir “imagen de”. Para PDF es opcional." })}${input("Origen y procedencia", "origin", m.origin, { max: 1000, area: true, full: true, help: "Autor, fuente o creación propia y evidencia que respalda el uso." })}${select("Derechos de uso", "rightsStatus", { pending: "Pendiente de verificar", approved: "Aprobados" }, m.rightsStatus)}${select("Revisión editorial", "reviewStatus", { pending: "Pendiente", approved: "Aprobada" }, m.reviewStatus)}</div>`;
}
function uploadMedia() {
  state.selectedMedia = null;
  content.innerHTML =
    heading(
      "BIBLIOTECA",
      "Una pieza nueva.",
      "Sube imágenes JPEG, PNG o WebP, o un documento PDF.",
      button("← Biblioteca", "back-media"),
    ) +
    `<form id="upload-form" class="cms-panel"><label>Archivo<input type="file" name="file" aria-label="Archivo" accept="image/jpeg,image/png,image/webp,application/pdf" required><small>Hasta 10 MB por archivo. Los documentos se comprueban antes de aceptarse.</small></label><div class="cms-note">Revisa que tengas permiso de usar este material. La aprobación de derechos es una declaración editorial, no una licencia automática.</div>${mediaFields({ title: "", alt: "", origin: "", rightsStatus: "pending", reviewStatus: "pending", mime: "image/" })}<div class="editor-actions"><button class="button" type="submit">Subir y guardar</button></div></form>`;
}
async function editMedia(id) {
  const generation = state.navigationGeneration;
  state.selectedMedia = state.media.find((m) => m.id === id);
  if (!state.selectedMedia)
    throw new Error(
      "El medio no está en esta lista. Vuelve a cargar la biblioteca.",
    );
  const m = state.selectedMedia;
  const usage = await api("media/" + encodeURIComponent(id) + "/usage");
  if (!currentView(generation, "media")) return;
  content.innerHTML =
    heading(
      "DETALLE DEL MEDIO",
      m.title,
      "Conserva su procedencia y revisa dónde se utiliza.",
      button("← Biblioteca", "back-media"),
    ) +
    `<div class="media-detail-grid"><div><div class="media-detail-preview">${m.mime.startsWith("image/") ? `<img src="/media/${encodeURIComponent(m.id)}/web" alt="${h(m.alt)}">` : `<a class="button button-outline" href="/media/${encodeURIComponent(m.id)}/download" target="_blank" rel="noopener">Abrir PDF ↗</a>`}</div><p class="caption">${h(m.filename)} · ${h(m.mime)} · ${bytes(m.bytes)}</p><section class="cms-panel"><h2>Dónde se utiliza</h2>${usage.uses?.length ? usage.uses.map((u) => `<div class="metric-detail"><span>${h(typeof u === "string" ? u : u.title)}<small class="caption">${h(typeof u === "string" ? "" : u.label)}${u.revisionId ? " · " + h(u.revisionId) : ""}</small></span></div>`).join("") : "<p>Este archivo todavía no está referenciado por un recurso.</p>"}<p class="caption">Archivar no elimina los archivos de las versiones conservadas.</p></section></div><form id="media-edit-form" class="cms-panel">${mediaFields(m)}${select("Disponibilidad", "archived", { false: "Disponible en biblioteca", true: "Archivado" }, String(m.archived))}<div class="editor-actions"><button class="button" type="submit">Guardar detalles</button></div></form></div>`;
}
async function saveMedia(form) {
  const f = new FormData(form);
  const payload = Object.fromEntries(
    ["title", "alt", "origin", "rightsStatus", "reviewStatus"].map((k) => [
      k,
      f.get(k),
    ]),
  );
  payload.archived = f.get("archived") === "true";
  await api(
    "media/" + encodeURIComponent(state.selectedMedia.id),
    "PATCH",
    payload,
  );
  dirty(false);
  await mediaLibrary();
  notice("Detalles del medio guardados.");
}
async function requests(cursor = 0) {
  const generation = state.navigationGeneration;
  const data = await api("demo-requests?limit=20&cursor=" + cursor);
  if (!currentView(generation, "requests")) return;
  state.requestCursor = data.nextCursor;
  content.innerHTML =
    heading(
      "CONVERSACIONES",
      "Solicitudes con intención.",
      "Revisa el contexto y actualiza el seguimiento. Las solicitudes no envían correos automáticamente.",
    ) +
    (data.items.length
      ? `<div class="cms-table-wrap"><table class="cms-table"><thead><tr><th>Contacto</th><th>Contexto</th><th>Consentimiento</th><th>Seguimiento</th></tr></thead><tbody>${data.items.map((r) => `<tr><td><strong>${h(r.email)}</strong><small>${h(date(r.createdAt))}</small><small>Referencia ${h(r.id)}</small></td><td>${h(labels.role[r.role] || "Otro rol")}<small>${h({ one: "1 sala", two: "2 salas", three: "3 salas", more: "Más de 3 salas" }[r.roomCountBucket])} · ${h({ coordination: "Coordinación", practice: "Práctica", coaching: "Coaching", pilot: "Piloto" }[r.need])}</small></td><td><small>Contacto: ${h(date(r.contactConsentAt))}</small><small>Comunicaciones opcionales: ${r.marketingOptIn ? "Sí" : "No"}</small><small>Aviso ${h(r.privacyVersion)}</small></td><td><form data-request-form="${h(r.id)}"><label class="sr-only" for="request-${h(r.id)}">Estado de ${h(r.email)}</label><select id="request-${h(r.id)}" name="status">${options(labels.request, r.status)}</select><button class="button button-small button-outline" type="submit">Guardar estado</button></form></td></tr>`).join("")}</tbody></table></div>`
      : empty(
          "Aún no hay solicitudes.",
          "Cuando una persona envíe el formulario con su consentimiento, aparecerá aquí.",
        )) +
    pagination("requests", cursor, data.nextCursor);
}
async function advisorLeads(cursor = 0) {
  const generation = state.navigationGeneration;
  const [data, metrics] = await Promise.all([
    api("advisor-leads?limit=20&cursor=" + cursor),
    api("advisor-metrics"),
  ]);
  if (!currentView(generation, "advisor")) return;
  content.innerHTML = heading(
    "ASESOR IA · SEGUIMIENTO HUMANO",
    "De la conversación al siguiente paso.",
    "Solicitudes guardadas con consentimiento. Chris confirma la fecha por WhatsApp; abrir un enlace no significa una cita reservada.",
  ) + `<div class="cms-stats"><div class="stat-box"><span>SESIONES SIN EXPIRAR (1 H)</span><strong>${h(metrics.sessions)}</strong></div><div class="stat-box"><span>MENSAJES EN ESAS SESIONES</span><strong>${h(metrics.messages)}</strong></div><div class="stat-box"><span>SOLICITUDES</span><strong>${h(metrics.leads)}</strong><small>${h(metrics.pendingConfirmation)} pendientes de confirmación</small></div><div class="stat-box"><span>CALIFICADAS</span><strong>${h(metrics.qualified)}</strong></div></div><p class="cms-note">Las sesiones y sus mensajes corresponden a conversaciones sin expirar, no a un acumulado histórico. Las solicitudes se conservan durante 90 días sin actividad, con eliminación automática periódica. El conocimiento del asesor usa el contenido publicado del MediaHub y la ficha comercial revisada.</p>` +
    (data.items.length ? `<div class="cms-table-wrap"><table class="cms-table"><thead><tr><th>Persona y contexto</th><th>Solicitud revisada</th><th>Preferencia de horario</th><th>Seguimiento</th></tr></thead><tbody>${data.items.map(r => `<tr><td><strong>${h(r.name || "Sin nombre indicado")}</strong><small>${h(r.contact || "Sin contacto adicional")}</small><small>${h(labels.role[r.role] || "Otro rol")} · ${h({"1":"1 sala","2-3":"2–3 salas","4+":"4 o más salas",unknown:"Salas por definir"}[r.roomCountBucket])}</small><small>${h(r.teamSize || "Equipo por definir")}</small><small>${h(date(r.createdAt))}</small></td><td><p class="advisor-lead-summary">${h(r.summary)}</p><small>Necesidad: ${h(r.need || "Por explorar")}</small><small>Plazo: ${h(r.timeframe || "Por acordar")}</small><small>Consentimiento de seguimiento · ${h(r.privacyVersion)}</small></td><td>${r.preferredDate && r.preferredTime ? `<strong>${h(r.preferredDate)} · ${h(r.preferredTime)}</strong><small>${h(r.timezone)}</small>` : "Por acordar con Chris"}<small>Preferencia, no reserva</small></td><td><form data-advisor-lead-form="${h(r.id)}"><label class="sr-only" for="advisor-lead-${h(r.id)}">Estado de solicitud ${h(r.id)}</label><select id="advisor-lead-${h(r.id)}" name="status">${options(labels.advisorStatus, r.status)}</select><button class="button button-small button-outline" type="submit">Guardar seguimiento</button></form><small>Actualizada ${h(date(r.updatedAt))}</small><small>Referencia ${h(r.id)}</small></td></tr>`).join("")}</tbody></table></div>` : empty("Aún no hay solicitudes del asesor.", "Aparecerán aquí cuando el visitante elija guardar su resumen para seguimiento.")) + pagination("advisor", cursor, data.nextCursor);
}
function pagination(type, cursor, next) {
  return `<div class="cms-pagination">${cursor ? button("← Primera página", "page-list", `data-list="${type}" data-cursor="0"`) : ""}${next !== null ? button("Siguiente página →", "page-list", `data-list="${type}" data-cursor="${next}"`) : ""}</div>`;
}
async function publications(cursor = 0) {
  const generation = state.navigationGeneration;
  const data = await api("revisions?limit=20&cursor=" + cursor);
  if (!currentView(generation, "publications")) return;
  content.innerHTML =
    heading(
      "HISTORIAL",
      "El contenido tiene memoria.",
      "Recupera cualquier publicación como borrador y revísala antes de publicarla otra vez.",
    ) +
    `<p class="cms-note">Borrador actual: versión ${state.revision}. Restaurar reemplaza el borrador, conserva las publicaciones anteriores y no cambia el sitio público.</p>` +
    (data.items.length
      ? data.items
          .map(
            (p) =>
              `<article class="publication-item"><div><strong>Publicación ${h(p.id)}</strong><small>${h(date(p.createdAt))} · ${h(p.author)}</small><p>${h(p.summary)}</p></div>${button("Recuperar como borrador", "restore", `data-id="${h(p.id)}"`)}</article>`,
          )
          .join("")
      : empty(
          "Todavía no hay publicaciones.",
          "Un propietario puede publicar el borrador cuando el contenido esté revisado.",
        )) +
    pagination("publications", cursor, data.nextCursor);
}
async function users(cursor = 0) {
  const generation = state.navigationGeneration;
  const data = await api("users?limit=20&cursor=" + cursor);
  if (!currentView(generation, "users")) return;
  state.users = data.items;
  content.innerHTML =
    heading(
      "EQUIPO EDITORIAL",
      "Cada persona, el acceso que necesita.",
      "Los editores preparan contenido; los propietarios gestionan publicaciones, solicitudes y cuentas.",
      button("Crear usuario +", "new-user", "", false),
    ) +
    `<div class="cms-table-wrap"><table class="cms-table"><thead><tr><th>Usuario</th><th>Rol</th><th>Acceso</th><th>Acciones</th></tr></thead><tbody>${data.items.map((u) => `<tr><td><strong>${h(u.username)}</strong><small>${u.id === state.user.id ? "Tu cuenta" : "Equipo editorial"}</small></td><td>${h(labels.access[u.role])}</td><td><span class="badge ${u.active ? "approved" : "archived"}">${u.active ? "Activo" : "Desactivado"}</span></td><td>${button("Gestionar →", "edit-user", `data-id="${u.id}"`)}</td></tr>`).join("")}</tbody></table></div>` +
    pagination("users", cursor, data.nextCursor);
}
function userEditor(id) {
  const u = id ? state.users.find((u) => u.id === Number(id)) : null;
  state.editUser = u;
  content.innerHTML =
    heading(
      "ACCESOS",
      u ? "Gestionar " + u.username : "Una nueva cuenta.",
      "Las contraseñas no se muestran ni se envían por correo.",
      button("← Usuarios", "back-users"),
    ) +
    `<form id="user-form" class="cms-panel"><div class="cms-field-grid">${input("Nombre de usuario", "username", u?.username || "", { max: 64, readOnly: !!u })}${select("Rol editorial", "role", labels.access, u?.role || "editor")}${input(u ? "Nueva contraseña (opcional)" : "Contraseña inicial", "password", "", { type: "password", max: 128, required: !u, full: true, help: "Al menos 12 caracteres. Compártela por un canal privado." })}${u ? select("Acceso", "active", { true: "Activo", false: "Desactivado" }, String(u.active)) : ""}</div><p class="cms-note">Cambiar el rol, el acceso o la contraseña cierra las sesiones de esa cuenta. El sistema conserva al menos un propietario activo.</p><button class="button" type="submit">${u ? "Guardar acceso" : "Crear cuenta"}</button></form>`;
  const p = $("#user-form [name=password]");
  p.minLength = 12;
  p.autocomplete = "new-password";
}
async function saveUser(form) {
  const f = new FormData(form);
  const u = state.editUser;
  const payload = u
    ? { role: f.get("role"), active: f.get("active") === "true" }
    : {
        username: f.get("username"),
        role: f.get("role"),
        password: f.get("password"),
      };
  if (u && f.get("password")) payload.password = f.get("password");
  await api("users" + (u ? "/" + u.id : ""), u ? "PATCH" : "POST", payload);
  dirty(false);
  if (u?.id === state.user.id) {
    state.user = null;
    $("#cms-shell").hidden = true;
    $("#login-view").hidden = false;
    $("#login-status").textContent =
      "Acceso actualizado. Vuelve a iniciar sesión con tus credenciales.";
    $("#login-form [name=password]").value = "";
    return;
  }
  await users();
  notice(u ? "Acceso actualizado." : "Usuario creado.");
}
async function publish() {
  if (state.dirty) {
    notice("Guarda tus cambios antes de publicar.", "warn");
    return;
  }
  if (
    !confirm(
      "¿Publicar el borrador completo en el sitio de este entorno? La landing y los recursos marcados como publicados quedarán disponibles.",
    )
  )
    return;
  const result = await api("publish", "POST", { revision: state.revision });
  await loadDraft();
  notice(
    "Publicación " +
      result.publicationId +
      " creada. La landing y el mediahub ya muestran esta versión en este entorno.",
  );
  if (state.page === "home") await home();
  if (state.page === "publications") await publications();
}
async function restore(id) {
  if (
    !confirm(
      "¿Recuperar esta publicación como borrador? Reemplazará el borrador actual, sin modificar el sitio público.",
    )
  )
    return;
  acceptDraft(
    await api("restore", "POST", {
      publicationId: Number(id),
      revision: state.revision,
    }),
  );
  await publications();
  notice(
    "Versión recuperada como borrador. Revisa la vista previa antes de publicar.",
  );
}
async function action(name, target) {
  if (name === "reload") {
    if (
      state.dirty &&
      !confirm("¿Descartar tus cambios y cargar el último borrador guardado?")
    )
      return;
    await loadDraft();
    await navigate(state.page, true);
    notice("Borrador actualizado desde el servidor.");
  } else if (name === "add-faq") {
    const fields = $("#faq-fields");
    if (fields.children.length >= 20)
      throw new Error("Puedes añadir hasta 20 preguntas.");
    fields.insertAdjacentHTML(
      "beforeend",
      faqFields({ question: "", answer: "" }, fields.children.length),
    );
    dirty();
    fields.lastElementChild.querySelector("input").focus();
  } else if (name === "remove-faq") {
    if ($("#faq-fields").children.length < 2)
      throw new Error("Conserva al menos una pregunta frecuente.");
    target.closest("[data-faq]").remove();
    dirty();
  } else if (name === "new-resource") await editResource();
  else if (name === "edit-resource") await editResource(target.dataset.id);
  else if (name === "back-resources") await navigate("resources");
  else if (
    [
      "add-block",
      "remove-block",
      "move-block",
      "add-row",
      "remove-row",
      "add-column",
      "remove-column",
    ].includes(name)
  ) {
    const r = collectResource(),
      i = Number(target.dataset.index ?? target.dataset.blockIndex);
    if (name === "add-block") {
      if (r.body.length >= 100)
        throw new Error("El recurso admite hasta 100 bloques.");
      const type = target.dataset.type;
      r.body.push(
        type === "list"
          ? { type, items: [""] }
          : type === "table"
            ? { type, headers: ["Campo", "Nota"], rows: [["", ""]] }
            : { type, text: "" },
      );
    } else if (name === "remove-block") {
      if (r.body.length === 1)
        throw new Error("Conserva al menos un bloque de contenido.");
      r.body.splice(i, 1);
    } else if (name === "move-block") {
      [r.body[i - 1], r.body[i]] = [r.body[i], r.body[i - 1]];
    } else if (name === "add-row") {
      if (r.body[i].rows.length >= 100)
        throw new Error("La tabla admite hasta 100 filas.");
      r.body[i].rows.push(Array(r.body[i].headers.length).fill(""));
    } else if (name === "remove-row") {
      if (r.body[i].rows.length === 1)
        throw new Error("Conserva al menos una fila.");
      r.body[i].rows.splice(Number(target.dataset.rowIndex), 1);
    } else if (name === "add-column") {
      if (r.body[i].headers.length >= 8)
        throw new Error("La tabla admite hasta 8 columnas.");
      r.body[i].headers.push("Columna");
      r.body[i].rows.forEach((row) => row.push(""));
    } else {
      r.body[i].headers.pop();
      r.body[i].rows.forEach((row) => row.pop());
    }
    resourceEditor();
    dirty();
  } else if (name === "resource-more-media") {
    collectResource();
    await fetchMedia(false);
    resourceEditor();
  } else if (name === "upload-media") uploadMedia();
  else if (name === "edit-media") await editMedia(target.dataset.id);
  else if (name === "back-media") await navigate("media");
  else if (name === "more-media") await mediaLibrary(true);
  else if (name === "page-list") {
    const fn = { requests, advisor: advisorLeads, publications, users }[target.dataset.list];
    await fn(Number(target.dataset.cursor));
  } else if (name === "restore") await restore(target.dataset.id);
  else if (name === "new-user") userEditor();
  else if (name === "edit-user") userEditor(target.dataset.id);
  else if (name === "back-users") await navigate("users");
}
document.addEventListener("click", async (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    await navigate(pageButton.dataset.page);
    return;
  }
  const target = event.target.closest("[data-action]");
  if (!target) return;
  target.disabled = true;
  try {
    await action(target.dataset.action, target);
  } catch (error) {
    failure(error);
  } finally {
    if (target.isConnected) target.disabled = false;
  }
});
content.addEventListener("input", (event) => {
  if (
    event.target.closest(
      "#landing-form,#resource-form,#media-edit-form,#upload-form,#user-form",
    )
  )
    dirty();
});
content.addEventListener("change", (event) => {
  if (
    event.target.closest(
      "#landing-form,#resource-form,#media-edit-form,#upload-form,#user-form",
    )
  )
    dirty();
  if (event.target.matches("#upload-form [name=file]")) {
    const file = event.target.files[0];
    const alt = $("#upload-form [name=alt]");
    alt.required = file?.type !== "application/pdf";
    if (file && !$("#upload-form [name=title]").value)
      $("#upload-form [name=title]").value = file.name
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]/g, " ");
  }
});
content.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  if (!form.reportValidity()) return;
  const submit =
    form.querySelector("[type=submit]") ||
    form.querySelector("button:not([type=button])");
  if (submit) submit.disabled = true;
  clearNotice();
  try {
    if (form.id === "landing-form") await saveLanding(form);
    else if (form.id === "resource-form") await saveResource();
    else if (form.id === "resource-search")
      resourceList(new FormData(form).get("q"));
    else if (form.id === "media-search") {
      state.mediaQuery = String(new FormData(form).get("q"));
      await fetchMedia();
      content.querySelector("#media-grid").innerHTML = mediaCards();
      const more = content.querySelector("[data-action=more-media]");
      if (more) more.parentElement.remove();
      if (state.mediaCursor !== null)
        content.insertAdjacentHTML(
          "beforeend",
          `<div class="cms-pagination">${button("Cargar más medios", "more-media")}</div>`,
        );
    } else if (form.id === "upload-form") {
      await api("media", "POST", new FormData(form));
      dirty(false);
      await mediaLibrary();
      notice("Archivo subido y guardado. Ya puedes usarlo en un recurso.");
    } else if (form.id === "media-edit-form") await saveMedia(form);
    else if (form.id === "user-form") await saveUser(form);
    else if (form.dataset.requestForm) {
      await api("demo-requests", "PATCH", {
        id: form.dataset.requestForm,
        status: new FormData(form).get("status"),
      });
      notice("Seguimiento actualizado.");
    } else if (form.dataset.advisorLeadForm) {
      await api("advisor-leads", "PATCH", {
        id: form.dataset.advisorLeadForm,
        status: new FormData(form).get("status"),
      });
      await advisorLeads();
      notice("Seguimiento del asesor actualizado. La fecha se confirma con Chris.");
    }
  } catch (error) {
    failure(error);
  } finally {
    if (submit?.isConnected) submit.disabled = false;
  }
});
$("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target,
    submit = form.querySelector("button"),
    status = $("#login-status");
  submit.disabled = true;
  status.textContent = "Comprobando acceso…";
  try {
    const f = new FormData(form),
      session = await api("login", "POST", {
        username: f.get("username"),
        password: f.get("password"),
      });
    form.reset();
    await enter(session);
    status.textContent = "";
  } catch (error) {
    status.textContent = error.message;
  } finally {
    submit.disabled = false;
  }
});
$("#logout-button").addEventListener("click", async () => {
  if (
    state.dirty &&
    !confirm("Hay cambios sin guardar. ¿Cerrar sesión y descartarlos?")
  )
    return;
  try {
    await api("logout", "POST", {});
    state.user = null;
    state.csrf = null;
    state.document = null;
    dirty(false);
    $("#cms-shell").hidden = true;
    $("#login-view").hidden = false;
    $("#login-status").textContent = "Sesión cerrada.";
    $("#login-form [name=username]").focus();
  } catch (error) {
    failure(error);
  }
});
$("#publish-button").addEventListener("click", async (event) => {
  event.target.disabled = true;
  try {
    await publish();
  } catch (error) {
    failure(error);
  } finally {
    event.target.disabled = state.dirty;
  }
});
$("#preview-link").addEventListener("click", (event) => {
  if (
    state.dirty &&
    !confirm(
      "La vista previa muestra el último borrador guardado. ¿Abrirla con cambios aún sin guardar?",
    )
  )
    event.preventDefault();
});
window.addEventListener("beforeunload", (event) => {
  if (state.dirty) {
    event.preventDefault();
    event.returnValue = "";
  }
});
try {
  const session = await api("session");
  await enter(session);
} catch (error) {
  if (error.status !== 401) $("#login-status").textContent = error.message;
}
````

### 08 · growth/site/assets/diagnostic-ui.mjs

Bytes: 6477. SHA256: `1148f2f6f087499ca27747200d50f442e321511f97e1d9f672a849af5d1795cb`.

````javascript
import {
  evaluateDiagnostic,
  questions,
  recommendations,
} from "./diagnostic.mjs";
import { track } from "./site.mjs";
const form = document.getElementById("diagnostic-form"),
  container = document.getElementById("question-container"),
  resultEl = document.getElementById("diagnostic-result"),
  back = document.getElementById("question-back"),
  next = document.getElementById("question-next"),
  error = document.getElementById("diagnostic-error");
const dimensions = {
  coordination: "Coordinación",
  practice: "Práctica",
  evidence: "Evidencia",
};
const options = [
  [0, "No existe"],
  [1, "Existe de forma parcial"],
  [2, "Está definido y se aplica"],
  ["unknown", "No lo sé"],
];
let index = 0,
  answers = Array(6).fill(null),
  started = false;
function el(tag, text, attrs = {}) {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}
function render() {
  container.replaceChildren();
  const field = el("fieldset");
  field.append(
    el("span", dimensions[questions[index][0]], {
      class: "question-dimension",
    }),
    el("legend", questions[index][1]),
  );
  options.forEach(([value, label]) => {
    const l = el("label", undefined, { class: "question-choice" }),
      radio = el("input", undefined, {
        type: "radio",
        name: "answer",
        value: String(value),
      });
    radio.checked = answers[index] === value;
    radio.addEventListener("change", () => {
      answers[index] = value;
      error.textContent = "";
      if (!started) {
        track("diagnostic_started");
        started = true;
      }
    });
    l.append(radio, el("span", label));
    field.append(l);
  });
  container.append(field);
  document.getElementById("question-counter").textContent =
    `Pregunta ${index + 1} de 6`;
  document.getElementById("question-progress").value = index + 1;
  back.disabled = index === 0;
  next.textContent = index === 5 ? "Ver mi orientación ↗" : "Siguiente →";
}
back.addEventListener("click", () => {
  if (index > 0) {
    index--;
    error.textContent = "";
    render();
    container.querySelector("input")?.focus();
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (answers[index] === null) {
    error.textContent =
      "Elige una respuesta para continuar. También puedes elegir «No lo sé».";
    container.querySelector("input")?.focus();
    return;
  }
  if (index < 5) {
    index++;
    render();
    container.querySelector("input")?.focus();
  } else showResult();
});
function showResult() {
  const r = evaluateDiagnostic(answers);
  form.hidden = true;
  resultEl.hidden = false;
  resultEl.replaceChildren();
  const titles = {
    essential: "Acordar lo esencial.",
    routine: "Hacer consistente la rutina.",
    pilot: "Preparar un piloto medible.",
  };
  resultEl.append(
    el("span", "TU ORIENTACIÓN", { class: "result-label" }),
    el("h2", titles[r.band], { id: "result-title" }),
    el(
      "p",
      r.baseline
        ? "Tienes definidos los elementos de esta autoevaluación. El siguiente paso es documentar una línea base y revisar las condiciones de un piloto."
        : "Elige una acción pequeña y observable en la dimensión con menos evidencia.",
    ),
  );
  const scores = el("div", undefined, { class: "score-list" });
  Object.entries(r.scores).forEach(([k, v]) => {
    const line = el("div", undefined, { class: "score-row" });
    line.append(el("span", dimensions[k]), el("strong", `${v} / 4`));
    scores.append(line);
  });
  resultEl.append(scores);
  const box = el("div", undefined, { class: "result-priorities" });
  box.append(
    el(
      "h3",
      r.priorities.length > 1
        ? "Prioridades compartidas"
        : `Empieza por ${dimensions[r.priorities[0]].toLowerCase()}`,
    ),
    el(
      "p",
      r.priorities.length > 1
        ? `Hay un empate en ${r.priorities.map((k) => dimensions[k].toLowerCase()).join(", ")}. Tú eliges por cuál comenzar.`
        : "Esta dimensión obtuvo la menor puntuación de tus respuestas. No es una calificación de tu equipo.",
    ),
  );
  if (r.unknown)
    box.append(
      el(
        "p",
        `${r.unknown} respuesta${r.unknown === 1 ? "" : "s"} «No lo sé»: queda${r.unknown === 1 ? "" : "n"} por confirmar; no significa que el proceso no exista.`,
      ),
    );
  resultEl.append(box);
  const links = el("div", undefined, { class: "result-links" });
  r.priorities.forEach((k) => {
    const { slug, id, label } = recommendations[k],
      a = el("a", label + " ↗", { href: `/mediahub/${slug}/` });
    a.addEventListener("click", () =>
      track("recommendation_opened", "result", id),
    );
    links.append(a);
  });
  resultEl.append(links);
  const details = el("details", undefined, { class: "result-answers" });
  details.append(el("summary", "Ver respuestas y cómo se calculó"));
  const ol = el("ol");
  answers.forEach((v, i) =>
    ol.append(
      el("li", questions[i][1] + " — " + options.find((o) => o[0] === v)[1]),
    ),
  );
  details.append(
    ol,
    el(
      "p",
      `Total ${r.total}/12. Cada respuesta suma 0, 1 o 2. «No lo sé» suma 0 y se señala por confirmar. 0–4: acordar lo esencial; 5–8: rutina consistente; 9–12: preparar piloto. La menor suma orienta la prioridad y los empates se muestran completos.`,
      { class: "caption" },
    ),
  );
  resultEl.append(details);
  const bottom = el("div", undefined, { class: "result-bottom" }),
    reset = el("button", "Volver a responder", {
      type: "button",
      class: "button button-outline button-small",
    });
  reset.addEventListener("click", () => {
    answers = Array(6).fill(null);
    index = 0;
    started = false;
    form.hidden = false;
    resultEl.hidden = true;
    render();
    container.querySelector("input")?.focus();
  });
  bottom.append(
    reset,
    el("a", "Solicitar demo por WhatsApp ↗", {
      href: resultEl.dataset.demoUrl || "/descubre/#demo",
      class: "button button-small",
      target: "_blank",
      rel: "noopener noreferrer",
      "data-whatsapp-demo": "",
    }),
  );
  resultEl.append(
    bottom,
    el(
      "p",
      "Orientación de proceso; no certifica seguridad, preparación técnica ni resultados de venta.",
      { class: "caption" },
    ),
  );
  resultEl.focus();
  track("diagnostic_completed", "result");
}
render();
````

### 09 · growth/site/assets/diagnostic.mjs

Bytes: 1888. SHA256: `ea4b346de879ceb9ff5b4d49ef1e90f64510f70a4f6a904480c473482d998791`.

````javascript
export const questions = [
  [
    "coordination",
    "¿Cada tour tiene un responsable y un horario que el representante puede consultar?",
  ],
  [
    "coordination",
    "¿Los cambios de asignación llegan al representante mediante un proceso acordado?",
  ],
  [
    "practice",
    "¿El equipo identifica la versión aprobada del método y dónde consultarla?",
  ],
  [
    "practice",
    "¿La práctica termina con una observación concreta y una siguiente acción?",
  ],
  [
    "evidence",
    "¿Están definidos los estados y resultados que se registran después del tour?",
  ],
  [
    "evidence",
    "¿Las salas usan las mismas definiciones para revisar su operación?",
  ],
];
export function evaluateDiagnostic(answers) {
  if (
    !Array.isArray(answers) ||
    answers.length !== 6 ||
    answers.some((v) => ![0, 1, 2, "unknown"].includes(v))
  )
    throw new Error("Responde las seis preguntas antes de ver tu orientación.");
  const scores = { coordination: 0, practice: 0, evidence: 0 };
  answers.forEach((v, i) => {
    scores[questions[i][0]] += v === "unknown" ? 0 : v;
  });
  const total = Object.values(scores).reduce((a, b) => a + b, 0),
    min = Math.min(...Object.values(scores));
  return {
    scores,
    total,
    priorities: Object.keys(scores).filter((k) => scores[k] === min),
    unknown: answers.filter((v) => v === "unknown").length,
    band: total <= 4 ? "essential" : total <= 8 ? "routine" : "pilot",
    baseline: total === 12,
  };
}

export const recommendations = {
  coordination: {
    id: "before-tour",
    slug: "antes-del-tour",
    label: "Abrir la hoja de preparación",
  },
  practice: {
    id: "coaching",
    slug: "coaching-con-una-accion",
    label: "Leer la guía de coaching",
  },
  evidence: {
    id: "three-rooms",
    slug: "piloto-en-tres-salas",
    label: "Abrir la matriz de tres salas",
  },
};
````

### 10 · growth/site/assets/films/conocimiento-en-practica.es.txt

Bytes: 687. SHA256: `48057685dd4e656c742ccd102da4c1946ec93a05107ad38f73b08baae4ca018d`.

````text
Transcripción del video · Del conocimiento a la práctica diaria

Sé que hoy en día el entrenamiento depende de la energía y consistencia de un gerente. Y eso no es consistente, ni escalable. Por eso, hoy no vengo a darte otro entrenamiento. Hoy vengo a presentarte a un nuevo colaborador. El Smart Agent de Sales Academy. Coach de ventas disponible 24/7. Con el roadmap del Top Producer. Videos, guiones y recursos de alto valor. Creados desde el conocimiento de tus Top Producers, la cultura de tu empresa y la dirección de tus líderes. Y aquí es donde todo se conecta. El GoalSheet. Esa actividad alimenta la inteligencia del sistema. Y le da a los líderes métricas claras.
````

### 11 · growth/site/assets/films/conocimiento-en-practica.es.vtt

Bytes: 827. SHA256: `43c9f1440d9f05b6c17dbb1c268a9cf2e1a91f84472ee2f6daedd9f3a1556199`.

````text
WEBVTT

00:00.000 --> 00:04.340
Sé que hoy en día el entrenamiento depende
de la energía y consistencia de un

00:04.340 --> 00:10.600
gerente. Y eso no es consistente, ni
escalable. Por eso, hoy no vengo a darte

00:10.600 --> 00:16.160
otro entrenamiento. Hoy vengo a
presentarte a un nuevo colaborador. El

00:16.160 --> 00:20.840
Smart Agent de Sales Academy. Coach de
ventas disponible 24/7. Con el roadmap del

00:20.840 --> 00:23.880
Top Producer. Videos, guiones y recursos
de alto valor. Creados desde el

00:23.880 --> 00:26.980
conocimiento de tus Top Producers, la
cultura de tu empresa y la dirección de

00:26.980 --> 00:32.240
tus líderes. Y aquí es donde todo se
conecta. El GoalSheet. Esa actividad

00:32.240 --> 00:36.500
alimenta la inteligencia del sistema. Y le
da a los líderes métricas claras.

````

### 12 · growth/site/assets/films/infraestructura-comercial.es.txt

Bytes: 752. SHA256: `4751bb82705e028346b80b51708ba84b78cbf03944b5d13e8d0bf4b46111b451`.

````text
Transcripción del video · De depender del gerente a compartir el método

No te voy a hablar de capacitación, te voy a presentar al nuevo integrante del equipo. Un agente inteligente que vive dentro de Sales Academy, aprende de tu proceso, organiza tu conocimiento y guía tu equipo de ventas en tiempo real. Sales Academy no es una plataforma de cursos, es infraestructura comercial. Antes de culpar al talento, hay que revisar si tus sistemas de entrenamiento son los correctos. Si tu equipo depende del tiempo del gerente para mejorar, no tienes un sistema sustentable, tienes una dependencia. Por eso creamos el agente de Sales Academy, para convertir el conocimiento de tus líderes en entrenamiento disponible en tiempo real. Agenda una demo.
````

### 13 · growth/site/assets/films/infraestructura-comercial.es.vtt

Bytes: 909. SHA256: `c0cf830233e5dd63412284df8f89a68046c49e3c2d86096a29b5c8927ac37177`.

````text
WEBVTT

00:00.000 --> 00:02.900
No te voy a hablar de capacitación, te voy
a presentar al nuevo integrante del

00:02.900 --> 00:06.480
equipo. Un agente inteligente que vive
dentro de Sales Academy, aprende de tu

00:06.480 --> 00:10.200
proceso, organiza tu conocimiento y guía
tu equipo de ventas en tiempo real. Sales

00:10.200 --> 00:14.620
Academy no es una plataforma de cursos, es
infraestructura comercial. Antes de culpar

00:14.620 --> 00:17.200
al talento, hay que revisar si tus
sistemas de entrenamiento son los

00:17.200 --> 00:20.280
correctos. Si tu equipo depende del tiempo
del gerente para mejorar, no tienes un

00:20.280 --> 00:23.340
sistema sustentable, tienes una
dependencia. Por eso creamos el agente de

00:23.340 --> 00:26.300
Sales Academy, para convertir el
conocimiento de tus líderes en

00:26.300 --> 00:28.900
entrenamiento disponible en tiempo real.
Agenda una demo.

````

### 14 · growth/site/assets/films/menos-caos.es.txt

Bytes: 783. SHA256: `2870241f18851ea4d93de71e1b86f3ffe120a4e96de8d388a764cf75aa912fb3`.

````text
Transcripción del video · Menos caos. Más criterio.

Imagina tener un asistente que no solo responde preguntas, sino que entiende tus objetivos, recuerda lo importante y te ayuda a actuar. Eso es un agente inteligente, una inteligencia artificial capaz de analizar información, utilizar herramientas y ejecutar tareas con cierto nivel de autonomía. En el día a día puede organizar pendientes, resumir mensajes, preparar reuniones, revisar métricas, detectar problemas y recordarte qué necesita atención. También puede aprender tus procesos, adaptarse a tu forma de trabajar y ayudarte a dar el siguiente paso. No se trata de reemplazar tu criterio, sino de reducir el trabajo repetitivo para que te concentres en las decisiones importantes, con menos caos y más control.
````

### 15 · growth/site/assets/films/menos-caos.es.vtt

Bytes: 985. SHA256: `d6d23b2511322fcc7c167bbc136d708d97f52b77b857ecc48866741458e28f11`.

````text
WEBVTT

00:00.000 --> 00:04.020
Imagina tener un asistente que no solo
responde preguntas, sino que entiende tus

00:04.020 --> 00:08.440
objetivos, recuerda lo importante y te
ayuda a actuar. Eso es un agente

00:08.440 --> 00:13.020
inteligente, una inteligencia artificial
capaz de analizar información, utilizar

00:13.020 --> 00:18.100
herramientas y ejecutar tareas con cierto
nivel de autonomía. En el día a día puede

00:18.100 --> 00:22.520
organizar pendientes, resumir mensajes,
preparar reuniones, revisar métricas,

00:22.820 --> 00:27.120
detectar problemas y recordarte qué
necesita atención. También puede aprender

00:27.120 --> 00:31.400
tus procesos, adaptarse a tu forma de
trabajar y ayudarte a dar el siguiente

00:31.400 --> 00:35.340
paso. No se trata de reemplazar tu
criterio, sino de reducir el trabajo

00:35.340 --> 00:40.360
repetitivo para que te concentres en las
decisiones importantes, con menos caos y

00:40.360 --> 00:40.920
más control.

````

### 16 · growth/site/assets/films/sistema-conectado.es.txt

Bytes: 791. SHA256: `4f254e851db2728d0bb294b73e144a547edfed9f8dc081b45980faddb73a4ce6`.

````text
Transcripción del video · Del proceso a un sistema conectado

Imagina tener un asistente que no solo responde preguntas, sino que entiende tus objetivos, recuerda lo importante y te ayuda a actuar. Eso es un agente inteligente, una inteligencia artificial capaz de analizar información, utilizar herramientas y ejecutar tareas con cierto nivel de autonomía. En el día a día puede organizar pendientes, resumir mensajes, preparar reuniones, revisar métricas, detectar problemas y recordarte qué necesita atención. También puede aprender tus procesos, adaptarse a tu forma de trabajar y ayudarte a dar el siguiente paso. No se trata de reemplazar tu criterio, sino de reducir el trabajo repetitivo para que te concentres en las decisiones importantes, con menos caos y más control.
````

### 17 · growth/site/assets/films/sistema-conectado.es.vtt

Bytes: 985. SHA256: `6960a5e20db59f3481ccdce0b3a2643c65bf2a85da51ff2dd574d541fe4cb4a5`.

````text
WEBVTT

00:00.000 --> 00:04.020
Imagina tener un asistente que no solo
responde preguntas, sino que entiende tus

00:04.020 --> 00:08.420
objetivos, recuerda lo importante y te
ayuda a actuar. Eso es un agente

00:08.420 --> 00:13.020
inteligente, una inteligencia artificial
capaz de analizar información, utilizar

00:13.020 --> 00:18.080
herramientas y ejecutar tareas con cierto
nivel de autonomía. En el día a día puede

00:18.080 --> 00:22.520
organizar pendientes, resumir mensajes,
preparar reuniones, revisar métricas,

00:22.840 --> 00:27.100
detectar problemas y recordarte qué
necesita atención. También puede aprender

00:27.100 --> 00:31.400
tus procesos, adaptarse a tu forma de
trabajar y ayudarte a dar el siguiente

00:31.400 --> 00:35.340
paso. No se trata de reemplazar tu
criterio, sino de reducir el trabajo

00:35.340 --> 00:40.360
repetitivo para que te concentres en las
decisiones importantes, con menos caos y

00:40.360 --> 00:40.920
más control.

````

### 18 · growth/site/assets/films/smart-agent.es.txt

Bytes: 741. SHA256: `19ced8711e488038e256dfddc97148725cfe556f93c04924addea9473f5973e1`.

````text
Transcripción del video · El método, acompañado

No te voy a hablar de capacitación, te voy a presentar al nuevo integrante del equipo. Un agente inteligente que vive dentro de Sales Academy, aprende de tu proceso, organiza tu conocimiento y guía tu equipo de ventas en tiempo real. Tu hoja de objetivos SMART te muestra exactamente dónde estás y qué hacer a continuación. Roleplay Live es tan simple como una llamada, pero diseñada para entrenar a tu fuerza de ventas. Con Sales Academy, los líderes tienen la visibilidad que necesitan para guiar a su equipo hacia el éxito. Por eso creamos el agente de Sales Academy, para convertir el conocimiento de tus líderes en entrenamiento disponible en tiempo real. Agenda una demo.
````

### 19 · growth/site/assets/films/smart-agent.es.vtt

Bytes: 921. SHA256: `b4b1f87c28420948c61f34f99ccb6913c543c3b12af982af88c66a46f0d96087`.

````text
WEBVTT

00:00.000 --> 00:02.900
No te voy a hablar de capacitación, te voy
a presentar al nuevo integrante del

00:02.900 --> 00:06.480
equipo. Un agente inteligente que vive
dentro de Sales Academy, aprende de tu

00:06.480 --> 00:10.100
proceso, organiza tu conocimiento y guía
tu equipo de ventas en tiempo real. Tu

00:10.100 --> 00:14.440
hoja de objetivos SMART te muestra
exactamente dónde estás y qué hacer a

00:14.440 --> 00:18.800
continuación. Roleplay Live es tan simple
como una llamada, pero diseñada para

00:18.800 --> 00:23.240
entrenar a tu fuerza de ventas. Con Sales
Academy, los líderes tienen la visibilidad

00:23.240 --> 00:27.260
que necesitan para guiar a su equipo hacia
el éxito. Por eso creamos el agente de

00:27.260 --> 00:30.220
Sales Academy, para convertir el
conocimiento de tus líderes en

00:30.220 --> 00:32.780
entrenamiento disponible en tiempo real.
Agenda una demo.

````

### 20 · growth/site/assets/hub-v2.css

Bytes: 12588. SHA256: `572a033dde48eb028226c4eca47de6170e21549804e9b50e5d4703c96fc07894`.

````css
.hub-v2 {
  background: #f5f2e9;
  color: #252a20;
}
.hub-v2 .container {
  width: min(1280px, calc(100% - 96px));
}
.hub-v2 .sa-hub-hero {
  padding: 84px 0 0;
  color: #f2f0e6;
  background: #101110;
}
.sa-hub-hero-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.85fr;
  gap: 80px;
  align-items: center;
}
.hub-v2 .sa-hub-kicker {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: #ceb47b;
  font-weight: 600;
  margin: 0 0 29px;
}
.hub-v2 .sa-hub-hero h1 {
  font-size: clamp(58px, 6.1vw, 88px);
  letter-spacing: -0.06em;
  line-height: 1.02;
  font-weight: 500;
  margin: 0 0 30px;
}
.sa-hub-hero h1 em {
  color: #d4b574;
  letter-spacing: -0.05em;
}
.hub-v2 .sa-hub-lead {
  color: #b6beac;
  max-width: 460px;
  font-size: 15px;
  line-height: 1.85;
  margin-bottom: 0;
}
.sa-hub-index {
  padding-top: 17px;
}
.sa-hub-index > span {
  display: block;
  color: #919d84;
  font-size: 9px;
  letter-spacing: 0.14em;
  margin-bottom: 20px;
}
.sa-hub-index a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #d6ddca;
  font-size: 14px;
  padding: 24px 0;
  gap: 30px;
  border-top: 1px solid #38422e;
}
.sa-hub-index a:last-child {
  border-bottom: 1px solid #38422e;
}
.sa-hub-index b {
  color: #d4b574;
  font-weight: 400;
  font-size: 25px;
}
.sa-hub-index a:hover {
  color: #edcf91;
}
.sa-hub-meta {
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  border-top: 1px solid #343d2c;
  margin-top: 70px;
  gap: 30px;
  color: #a5b098;
  font-size: 10px;
}
.sa-hub-meta > span:first-child {
  font-size: 8px;
  letter-spacing: 0.13em;
}
.hub-v2 .sa-hub-content {
  padding-top: 46px;
  padding-bottom: 95px;
}
.hub-v2 .hub-filters {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr 1fr auto;
  gap: 18px;
  border: 0;
  border-bottom: 1px solid #cbd2be;
  border-radius: 0;
  padding: 0 0 33px;
  background: transparent;
  align-items: end;
}
.hub-v2 .hub-filters label {
  font-size: 10px;
  color: #5d684e;
}
.hub-v2 .hub-filters input,
.hub-v2 .hub-filters select {
  min-height: 48px;
  border: 1px solid #d0d7c5;
  background: #fffef8;
  color: #344129;
  border-radius: 2px;
  padding: 12px;
  font-size: 12px;
  width: 100%;
}
.hub-v2 .hub-filters input::placeholder {
  color: #5c684f;
  opacity: 1;
}
.hub-v2 .hub-filters .button {
  min-height: 48px;
  padding-inline: 25px;
  background: #27311f;
  border-color: #27311f;
  color: #f4f4e8;
}
.hub-v2 .results-line {
  margin-top: 27px;
  margin-bottom: 30px;
  font-size: 10px;
}
.hub-v2 .results-line p {
  color: #667255;
}
.hub-v2 .results-line a {
  color: #465735;
}
.sa-hub-collection {
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  gap: 35px 46px;
  align-items: start;
}
.sa-hub-resource {
  position: relative;
  min-width: 0;
}
.sa-hub-resource:first-child {
  grid-row: span 2;
}
.sa-hub-resource:nth-child(n + 2) .resource-card {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 25px;
}
.hub-v2 .sa-hub-resource .resource-art {
  min-height: 0;
  height: 220px;
  aspect-ratio: auto;
  background: #e3d9c0;
  border-radius: 2px;
}
.hub-v2 .sa-hub-resource:first-child .resource-art {
  height: 407px;
}
.hub-v2 .sa-hub-resource .resource-art > span {
  opacity: 0;
}
.hub-v2 .sa-hub-resource .resource-art > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sa-hub-document {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 220px;
  padding: 23px 18px;
  pointer-events: none;
  color: #3d3b2c;
  display: flex;
  flex-direction: column;
}
.sa-hub-resource:first-child .sa-hub-document {
  width: 100%;
  height: 407px;
  padding: 38px;
}
.sa-hub-document > span {
  font-size: 7px;
  letter-spacing: 0.14em;
  margin-bottom: 27px;
}
.sa-hub-document > strong {
  font-size: 25px;
  font-family: Georgia, serif;
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 1.06;
  overflow-wrap: anywhere;
}
.sa-hub-resource:first-child .sa-hub-document > strong {
  font-size: 52px;
  max-width: 390px;
  letter-spacing: -0.045em;
}
.hub-v2 .sa-hub-document > p {
  font-size: 9px;
  color: #625f49;
  margin: 12px 0 18px;
  line-height: 1.7;
}
.hub-v2 .sa-hub-resource:first-child .sa-hub-document > p {
  font-size: 12px;
  max-width: 330px;
  margin-top: 23px;
}
.sa-hub-document-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 13px;
  border-top: 1px solid #98845c60;
  margin-top: auto;
}
.sa-hub-document-foot > span {
  font-size: 7px;
  letter-spacing: 0.1em;
}
.sa-hub-document-foot b {
  font-size: 23px;
  font-weight: 400;
  line-height: 1;
}
.hub-v2 .sa-hub-resource-guide .resource-art {
  background: #2b3525;
}
.sa-hub-resource-guide .sa-hub-document {
  color: #eeeedf;
}
.hub-v2 .sa-hub-resource-guide .sa-hub-document > p {
  color: #c3cbb6;
}
.sa-hub-resource-guide .sa-hub-document-foot {
  border-color: #adba945e;
}
.hub-v2 .sa-hub-resource-matrix .resource-art {
  background: #dfe5d7;
}
.sa-hub-resource-matrix .sa-hub-document {
  color: #405330;
}
.sa-hub-resource-matrix .sa-hub-document > strong {
  font-family: Arial, sans-serif;
  font-weight: 500;
}
.hub-v2 .sa-hub-resource-matrix .sa-hub-document > p {
  color: #5b6c4d;
}
.hub-v2 .sa-hub-resource .resource-info {
  padding: 3px 0 0;
}
.hub-v2 .sa-hub-resource:first-child .resource-info {
  padding-top: 23px;
}
.hub-v2 .sa-hub-resource .resource-info .meta {
  color: #5c684f;
  font-size: 9px;
  margin-bottom: 13px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.hub-v2 .sa-hub-resource .resource-info h3 {
  font-size: 24px;
  line-height: 1.13;
  letter-spacing: -0.045em;
  margin-bottom: 14px;
}
.hub-v2 .sa-hub-resource:first-child .resource-info h3 {
  font-size: 31px;
}
.hub-v2 .sa-hub-resource .resource-info > p {
  font-size: 12px;
  color: #626f51;
  line-height: 1.8;
  margin-bottom: 16px;
}
.hub-v2 .sa-hub-resource .resource-role {
  color: #66734f;
  font-size: 9px;
}
.hub-v2 .sa-hub-collection .empty-state {
  grid-column: 1 / -1;
  padding: 60px 25px;
  background: #e8eadf;
  border-radius: 2px;
  width: 100%;
}
.hub-v2 .sa-hub-collection .empty-state p {
  color: #586a47;
}
.sa-hub-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  margin-top: 94px;
  padding: 45px 50px;
  background: #e6e5d7;
  border: 1px solid #d4d8c5;
}
.hub-v2 .sa-hub-next > div > p {
  font-size: 8px;
  color: #5c684f;
  letter-spacing: 0.14em;
  margin: 0 0 18px;
}
.sa-hub-next h2 {
  font-size: clamp(31px, 3.2vw, 46px);
  line-height: 1.07;
  letter-spacing: -0.045em;
  margin-bottom: 18px;
}
.sa-hub-next h2 em {
  color: #657a50;
}
.sa-hub-next > div > span {
  font-size: 12px;
  line-height: 1.7;
  color: #5c684f;
}
.sa-hub-next > .button {
  flex-shrink: 0;
  min-height: 54px;
  background: #29361e;
  border-color: #29361e;
  color: #f5f6e9;
}
.sa-hub-next > .button:hover {
  background: #3f512e;
}
.sa-hub-hero a:focus-visible {
  outline-color: #e6c885;
}
@media (max-width: 1180px) {
  .hub-v2 .container {
    width: calc(100% - 64px);
  }
  .sa-hub-hero-grid {
    gap: 50px;
    grid-template-columns: 1.4fr 1fr;
  }
  .hub-v2 .sa-hub-hero h1 {
    font-size: 68px;
  }
  .hub-v2 .hub-filters {
    grid-template-columns: 1.45fr 1fr 1fr 1fr auto;
    gap: 12px;
  }
  .sa-hub-collection {
    gap: 30px;
  }
  .sa-hub-resource:nth-child(n + 2) .resource-card {
    grid-template-columns: 150px 1fr;
    gap: 20px;
  }
  .sa-hub-document {
    width: 150px;
    padding: 22px 16px;
  }
  .sa-hub-document > strong {
    font-size: 23px;
  }
  .hub-v2 .sa-hub-document > p {
    font-size: 8px;
  }
  .sa-hub-resource:first-child .sa-hub-document > strong {
    font-size: 43px;
  }
  .hub-v2 .sa-hub-resource .resource-info h3 {
    font-size: 21px;
  }
  .sa-hub-next {
    padding: 40px 35px;
    gap: 35px;
  }
}
@media (max-width: 940px) {
  .sa-hub-hero-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .hub-v2 .sa-hub-hero h1 {
    font-size: 76px;
  }
  .sa-hub-index {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding-top: 0;
  }
  .sa-hub-index > span {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }
  .sa-hub-index a {
    font-size: 12px;
    gap: 14px;
    padding: 18px 0;
  }
  .sa-hub-index a:last-child {
    border-bottom: 0;
  }
  .sa-hub-meta {
    margin-top: 35px;
  }
  .hub-v2 .hub-filters {
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 15px;
  }
  .hub-v2 .hub-filters .search-field {
    grid-column: 1 / -1;
  }
  .sa-hub-collection {
    grid-template-columns: 1fr 1fr;
    gap: 34px;
  }
  .sa-hub-resource:first-child {
    grid-row: auto;
    grid-column: 1 / -1;
  }
  .sa-hub-resource:first-child .resource-card {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 28px;
  }
  .hub-v2 .sa-hub-resource:first-child .resource-art {
    height: 300px;
  }
  .sa-hub-resource:first-child .sa-hub-document {
    width: calc((100% - 28px) * 1.1 / 2.1);
    height: 300px;
    padding: 27px;
  }
  .sa-hub-resource:first-child .sa-hub-document > strong {
    font-size: 37px;
  }
  .sa-hub-resource:nth-child(n + 2) .resource-card {
    display: block;
  }
  .sa-hub-document {
    width: 100%;
    height: 250px;
    padding: 28px;
  }
  .hub-v2 .sa-hub-resource .resource-art {
    height: 250px;
  }
  .sa-hub-document > strong {
    font-size: 31px;
    max-width: 260px;
  }
  .hub-v2 .sa-hub-document > p {
    font-size: 10px;
  }
  .hub-v2 .sa-hub-resource .resource-info {
    padding-top: 21px;
  }
  .hub-v2 .sa-hub-resource:first-child .resource-info {
    padding-top: 7px;
  }
  .hub-v2 .sa-hub-resource:first-child .resource-info h3 {
    font-size: 29px;
  }
  .sa-hub-next {
    flex-direction: column;
    align-items: flex-start;
    gap: 27px;
  }
}
@media (max-width: 680px) {
  .hub-v2 .container {
    width: calc(100% - 40px);
  }
  .hub-v2 .sa-hub-hero {
    padding-top: 48px;
  }
  .hub-v2 .sa-hub-kicker {
    font-size: 8px;
    letter-spacing: 0.14em;
    margin-bottom: 23px;
  }
  .hub-v2 .sa-hub-hero h1 {
    font-size: clamp(43px, 11.7vw, 64px);
    letter-spacing: -0.06em;
    margin-bottom: 24px;
  }
  .hub-v2 .sa-hub-lead {
    font-size: 13px;
    line-height: 1.8;
  }
  .sa-hub-hero-grid {
    gap: 27px;
  }
  .sa-hub-index {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .sa-hub-index > span {
    margin-bottom: 14px;
    font-size: 8px;
  }
  .sa-hub-index a {
    font-size: 12px;
    padding: 13px 0;
  }
  .sa-hub-index b {
    font-size: 22px;
  }
  .sa-hub-meta {
    margin-top: 23px;
    padding: 20px 0;
    font-size: 9px;
    gap: 20px;
    align-items: center;
  }
  .sa-hub-meta > span:first-child {
    max-width: 130px;
    font-size: 7px;
    line-height: 1.6;
  }
  .hub-v2 .sa-hub-content {
    padding-top: 30px;
    padding-bottom: 55px;
  }
  .hub-v2 .hub-filters {
    grid-template-columns: 1fr 1fr;
    gap: 15px 12px;
    padding-bottom: 27px;
  }
  .hub-v2 .hub-filters .search-field {
    grid-column: 1 / -1;
  }
  .hub-v2 .hub-filters input,
  .hub-v2 .hub-filters select {
    font-size: 11px;
    padding: 10px 12px;
  }
  .hub-v2 .hub-filters .button {
    align-self: end;
  }
  .hub-v2 .results-line {
    font-size: 9px;
    margin-top: 21px;
    margin-bottom: 24px;
  }
  .sa-hub-collection {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .sa-hub-resource:first-child {
    grid-column: auto;
  }
  .sa-hub-resource:first-child .resource-card {
    display: block;
  }
  .hub-v2 .sa-hub-resource:first-child .resource-art {
    height: 300px;
  }
  .sa-hub-resource:first-child .sa-hub-document {
    width: 100%;
    padding: 28px;
  }
  .sa-hub-resource:first-child .sa-hub-document > strong {
    font-size: 41px;
  }
  .hub-v2 .sa-hub-resource:first-child .sa-hub-document > p {
    font-size: 11px;
    margin-top: 17px;
  }
  .hub-v2 .sa-hub-resource .resource-art {
    height: 275px;
  }
  .sa-hub-document {
    height: 275px;
    padding: 28px;
  }
  .sa-hub-document > strong {
    font-size: 34px;
    max-width: 285px;
  }
  .hub-v2 .sa-hub-resource:first-child .resource-info {
    padding-top: 23px;
  }
  .hub-v2 .sa-hub-resource .resource-info h3 {
    font-size: 24px;
  }
  .hub-v2 .sa-hub-resource:first-child .resource-info h3 {
    font-size: 28px;
  }
  .sa-hub-next {
    margin-top: 54px;
    padding: 30px 24px;
    gap: 24px;
  }
  .sa-hub-next h2 {
    font-size: 32px;
  }
  .sa-hub-next > div > span {
    font-size: 11px;
  }
  .sa-hub-next > .button {
    width: 100%;
    font-size: 12px;
  }
}
````

### 21 · growth/site/assets/journey-math.mjs

Bytes: 1117. SHA256: `13acea44388bdb1ea17a7d63ec98970682c79c58f29d18431b62cd6fbd08bf3f`.

````javascript
// Measured document geometry, independent of DOM, scrolling direction and time.
const clamp = value => Math.min(1, Math.max(0, value));
export function journeyState(scrollY, viewportHeight, chapters) {
  const empty = {index: 0, id: '', progress: 0, chapterProgress: 0};
  if (!Array.isArray(chapters) || !chapters.length || chapters.some(chapter =>
    !chapter || typeof chapter.id !== 'string' || !Number.isFinite(chapter.top) ||
    !Number.isFinite(chapter.height) || chapter.height <= 0)) return empty;
  if (!Number.isFinite(scrollY) || !Number.isFinite(viewportHeight)) {
    return {...empty, id: chapters[0].id};
  }
  const focus = scrollY + Math.max(0, viewportHeight) / 2;
  let index = 0;
  for (let cursor = 1; cursor < chapters.length; cursor++) {
    if (focus >= chapters[cursor].top) index = cursor;
  }
  const current = chapters[index];
  const first = chapters[0], last = chapters.at(-1);
  return {
    index, id: current.id,
    progress: clamp((focus - first.top) / Math.max(1, last.top + last.height - first.top)),
    chapterProgress: clamp((focus - current.top) / current.height),
  };
}
````

### 22 · growth/site/assets/journey.mjs

Bytes: 3563. SHA256: `66b2c76c221ba28c43a1b0d61fcfecb14cc8adceb5cadc442232d7bee6544734`.

````javascript
import {journeyState} from './journey-math.mjs';

// Progressive enhancement: native scrolling and all chapter text work without JS.
const root = document.querySelector('[data-journey]');
if (root) {
  const chapters = [...root.querySelectorAll('[data-chapter]')];
  const links = [...root.querySelectorAll('a[href^="#"]')];
  const toggle = root.querySelector('[data-motion-toggle]');
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 980px) and (pointer: fine)');
  const preferenceKey = 'sa-journey-motion';
  let userReduced = false;
  try { userReduced = localStorage.getItem(preferenceKey) === 'reduced'; } catch { /* Private storage may be unavailable. */ }
  let enhanced = false, inView = true, frame = 0, geometry = [];

  function paint() {
    frame = 0;
    if (!enhanced || !inView || document.hidden) return;
    // Batch geometry reads before style writes. No perpetual animation loop.
    geometry = chapters.map(chapter => {
      const rect = chapter.getBoundingClientRect();
      return {id: chapter.dataset.chapter, top: rect.top + scrollY, height: rect.height};
    });
    const state = journeyState(scrollY, innerHeight, geometry);
    root.dataset.active = state.id;
    root.style.setProperty('--journey-progress', state.progress.toFixed(5));
    root.style.setProperty('--chapter-progress', state.chapterProgress.toFixed(5));
    for (const link of links) {
      if (link.getAttribute('href') === `#${state.id}`) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
  }
  function schedule() {
    if (enhanced && inView && !document.hidden && !frame) frame = requestAnimationFrame(paint);
  }
  function setPreference() {
    const reduced = systemMotion.matches || userReduced;
    enhanced = !reduced && desktop.matches;
    root.classList.toggle('journey-enhanced', enhanced);
    root.classList.toggle('journey-reduced', reduced);
    if (toggle) {
      toggle.hidden = false;
      toggle.disabled = systemMotion.matches;
      toggle.setAttribute('aria-pressed', String(reduced));
      toggle.textContent = systemMotion.matches ? 'Movimiento reducido' : userReduced ? 'Activar movimiento' : 'Reducir movimiento';
    }
    if (!enhanced) {
      cancelAnimationFrame(frame); frame = 0;
      root.style.removeProperty('--journey-progress');
      root.style.removeProperty('--chapter-progress');
      for (const link of links) link.removeAttribute('aria-current');
    } else schedule();
  }
  toggle?.addEventListener('click', () => {
    userReduced = !userReduced;
    try { localStorage.setItem(preferenceKey, userReduced ? 'reduced' : 'full'); } catch { /* The current page still honors the preference. */ }
    setPreference();
  });
  systemMotion.addEventListener('change', setPreference);
  desktop.addEventListener('change', setPreference);
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else schedule();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (inView) schedule();
      else { cancelAnimationFrame(frame); frame = 0; }
    }).observe(root);
  }
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(root);
  setPreference();
}
````

### 23 · growth/site/assets/landing-v2.css

Bytes: 30258. SHA256: `00433ca82ef7477612e32483aa8afe8f3965b6a9ba243c7e2a42939029c5ff8e`.

````css
.landing-v2 {
  --sa-night: #101110;
  --sa-panel: #1c1e1b;
  --sa-gold: #d4b574;
  --sa-paper: #f4f1e9;
  --sa-ink: #1a1c18;
  background: var(--sa-night);
  color: var(--sa-paper);
}
.landing-v2 .container {
  width: min(1280px, calc(100% - 96px));
}
.landing-v2 main {
  overflow: clip;
}
.landing-v2 .sa-section-label,
.landing-v2 .sa-kicker {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.7;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.landing-v2 .sa-section-label {
  margin-bottom: 24px;
  color: #75603a;
}
.landing-v2 .sa-text-link {
  display: inline-flex;
  gap: 24px;
  align-items: center;
  color: #e9e7df;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  padding: 12px 0;
}
.landing-v2 .sa-text-link span {
  font-size: 22px;
  font-weight: 400;
}
.landing-v2 .sa-text-link:hover {
  color: var(--sa-gold);
}
.landing-v2 .sa-link-dark {
  color: #242720;
}
.landing-v2 .sa-link-dark:hover {
  color: #7b5b24;
}
.landing-v2 .sa-button-gold {
  background: var(--sa-gold);
  border-color: var(--sa-gold);
  color: #171914;
  min-height: 56px;
  padding-inline: 26px;
  border-radius: 3px;
}
.landing-v2 .sa-button-gold:hover {
  background: #e5c98b;
  border-color: #e5c98b;
}
.landing-v2 .sa-button-dark {
  background: #1b1e18;
  border-color: #1b1e18;
  color: #faf8f0;
  min-height: 56px;
}
.landing-v2 .sa-button-dark:hover {
  background: #373d30;
}
.landing-v2 .sa-hero {
  display: block;
  min-height: 0;
  padding: 70px 0 0;
  background:
    radial-gradient(ellipse at 81% 35%, #39362a55 0, transparent 43%),
    var(--sa-night);
}
.sa-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  align-items: center;
  gap: 26px;
}
.sa-hero-copy {
  position: relative;
  z-index: 2;
  padding-bottom: 40px;
}
.landing-v2 .sa-kicker {
  color: #d2bb8a;
  max-width: 420px;
  margin: 0 0 31px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.sa-kicker > span {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  background: #d4b574;
  border-radius: 50%;
  box-shadow: 0 0 0 5px #d4b57410;
}
.landing-v2 .sa-hero h1 {
  color: #f7f4ec;
  font-size: clamp(60px, 6.3vw, 94px);
  font-weight: 500;
  letter-spacing: -0.065em;
  line-height: 0.99;
  margin: 0 0 31px;
  max-width: 680px;
}
.sa-hero h1 > span {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.055em;
  color: var(--sa-gold);
}
.landing-v2 .sa-hero-description {
  color: #b8bbb1;
  max-width: 440px;
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 28px;
}
.landing-v2 .hero-actions {
  gap: 24px;
  margin-top: 0;
  flex-wrap: wrap;
}
.landing-v2 .sa-hero-note {
  color: #a4a99b;
  font-size: 11px;
  margin: 22px 0 0;
}
.sa-hero-note span {
  color: #dad9ce;
}
.sa-product-scene {
  height: 610px;
  margin: 0 -25px 0 -5px;
  position: relative;
  isolation: isolate;
  perspective: 1400px;
}
.sa-device {
  padding: 7px;
  border: 1px solid #777668;
  border-radius: 28px;
  background: #20221f;
  overflow: hidden;
  position: absolute;
  transform-origin: center;
  box-shadow:
    0 28px 70px #0009,
    inset 0 1px 1px #fffff533;
}
.sa-device img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  background: #f4f3eb;
}
.sa-device-front {
  width: 248px;
  top: 10px;
  left: 29%;
  z-index: 3;
  transform: rotate(-2deg);
}
.sa-device-back {
  width: 211px;
  top: 79px;
  left: -1%;
  z-index: 1;
  transform: rotate(-11deg) rotateY(8deg);
  opacity: 0.77;
}
.sa-device-side {
  width: 217px;
  top: 78px;
  right: -1%;
  z-index: 2;
  transform: rotate(10deg) rotateY(-8deg);
  opacity: 0.88;
}
.sa-product-scene figcaption {
  position: absolute;
  bottom: 17px;
  left: 14%;
  right: 0;
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.03em;
  color: #b6b8ad;
}
.sa-orbit {
  position: absolute;
  border: 1px solid #9c875c40;
  border-radius: 50%;
  width: 610px;
  height: 215px;
  left: -3%;
  top: 345px;
  transform: rotate(-18deg);
  z-index: -1;
}
.sa-orbit-two {
  width: 540px;
  height: 540px;
  left: 12%;
  top: 35px;
  transform: none;
  border-color: #d4b57412;
}
.sa-hero-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 26px;
  padding-bottom: 28px;
  border-top: 1px solid #33362d;
  margin-top: 27px;
}
.landing-v2 .sa-hero-bottom p {
  margin: 0;
  color: #909789;
  font-size: 11px;
  line-height: 1.7;
}
.sa-hero-bottom strong {
  color: #c6cabd;
  font-weight: 400;
}
.sa-hero-bottom a {
  display: inline-flex;
  align-items: center;
  gap: 25px;
  color: #dfc48e;
  font-size: 12px;
  text-decoration: none;
  padding: 12px 0;
}
.sa-hero-bottom a:hover {
  color: #fff5d9;
}
.sa-hero-bottom a span {
  font-size: 24px;
}
.sa-method {
  padding: 108px 0 94px;
  color: var(--sa-ink);
  background: var(--sa-paper);
}
.sa-method-intro {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 0 80px;
  align-items: end;
}
.sa-method-intro .sa-section-label {
  grid-column: 1 / -1;
}
.sa-method-intro h2 {
  font-size: clamp(42px, 4.3vw, 63px);
  line-height: 1.06;
  max-width: 680px;
  margin-bottom: 0;
  letter-spacing: -0.055em;
}
.landing-v2 .sa-method-lead {
  font-size: 16px;
  line-height: 1.8;
  margin: 0 0 5px;
  color: #5f6458;
}
.sa-practice-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 90px;
  align-items: center;
  margin-top: 76px;
}
.sa-practice-visual {
  min-height: 582px;
  position: relative;
  background: #e5e5da;
  overflow: hidden;
  border-radius: 2px;
  isolation: isolate;
}
.sa-practice-word {
  position: absolute;
  top: 29px;
  left: 26px;
  font-family: Georgia, serif;
  font-size: clamp(65px, 6.2vw, 95px);
  font-style: italic;
  color: #738066;
  letter-spacing: -0.06em;
  z-index: -1;
}
.sa-resource-device {
  width: 255px;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%) rotate(6deg);
  background: #242a20;
  padding: 6px;
  border-radius: 25px;
  box-shadow: -12px 26px 34px #28322039;
}
.sa-resource-device img {
  width: 100%;
  height: auto;
  border-radius: 20px;
}
.landing-v2 .sa-visual-caption {
  position: absolute;
  bottom: 18px;
  left: 22px;
  color: #3e4c37;
  font-size: 10px;
  line-height: 1.65;
  margin: 0;
  padding: 12px 15px;
  background: #f4f1e9;
  border: 1px solid #d4d6c8;
  box-shadow: 2px 4px 12px #27302112;
}
.sa-visual-caption span {
  color: #69715f;
}
.sa-practice-copy > h3 {
  font-size: clamp(34px, 3.2vw, 48px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.05em;
  margin-bottom: 22px;
}
.sa-practice-copy > p {
  color: #606657;
  font-size: 15px;
  line-height: 1.7;
  max-width: 470px;
}
.sa-practice-steps {
  margin: 31px 0 16px;
}
.sa-practice-steps article {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 18px;
  padding: 22px 0;
  border-top: 1px solid #d5d7ca;
}
.sa-step-index {
  color: #7a673f;
  font-size: 11px;
  padding-top: 2px;
}
.sa-practice-steps h4 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.4;
}
.sa-practice-steps p {
  font-size: 13px;
  line-height: 1.7;
  margin: 0;
  color: #666d5d;
}
.sa-resources {
  padding: 95px 0 109px;
  color: var(--sa-ink);
  background: #fffdf7;
}
.sa-resource-heading {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: end;
  gap: 90px;
  margin-bottom: 48px;
}
.sa-resource-heading h2 {
  margin: 0;
  font-size: clamp(38px, 4.3vw, 62px);
  letter-spacing: -0.055em;
  line-height: 1.06;
}
.sa-resource-heading h2 em {
  color: #787c68;
}
.sa-resource-heading > div:last-child > p {
  font-size: 15px;
  line-height: 1.8;
  color: #636858;
  max-width: 340px;
  margin-bottom: 12px;
}
.sa-resources-grid {
  display: grid;
  grid-template-columns: 1.22fr 1fr 1fr;
  gap: 28px;
  align-items: start;
}
.sa-editorial-resource {
  position: relative;
  min-width: 0;
}
.landing-v2 .sa-editorial-resource .resource-art {
  height: 275px;
  min-height: 0;
  aspect-ratio: auto;
  border-radius: 2px;
  background: #e7dec9;
}
.landing-v2 .sa-editorial-resource:nth-child(2) {
  margin-top: 42px;
}
.landing-v2 .sa-editorial-resource:nth-child(3) {
  margin-top: 84px;
}
.landing-v2 .sa-editorial-resource .resource-art > span {
  opacity: 0;
}
.landing-v2 .sa-editorial-resource .resource-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sa-document-preview {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 275px;
  padding: 27px;
  color: #302d23;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}
.sa-document-brand {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.18em;
  margin-bottom: 36px;
}
.sa-document-preview strong {
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.04em;
  max-width: 270px;
}
.landing-v2 .sa-document-preview p {
  margin: 12px 0 16px;
  font-size: 10px;
  line-height: 1.6;
  color: #615a47;
  max-width: 260px;
}
.sa-document-rule {
  height: 1px;
  background: #a3946f6b;
  margin-top: auto;
}
.sa-document-bottom {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-top: 13px;
  font-size: 7px;
  letter-spacing: 0.08em;
}
.sa-document-bottom > span {
  font-size: 19px;
  line-height: 1;
}
.landing-v2 .sa-editorial-guide .resource-art {
  background: #283025;
}
.sa-editorial-guide .sa-document-preview {
  color: #eef0df;
}
.landing-v2 .sa-editorial-guide .sa-document-preview p {
  color: #c9cfbb;
}
.sa-editorial-guide .sa-document-rule {
  background: #93a0806b;
}
.landing-v2 .sa-editorial-matrix .resource-art {
  background: #e5e8de;
}
.sa-editorial-matrix .sa-document-preview {
  color: #34412c;
}
.sa-editorial-matrix .sa-document-preview strong {
  font-family: Arial, sans-serif;
  font-size: 29px;
  font-weight: 500;
}
.landing-v2 .sa-editorial-matrix .sa-document-preview p {
  color: #59644f;
}
.landing-v2 .sa-editorial-resource .resource-info {
  padding: 20px 0 0;
}
.landing-v2 .sa-editorial-resource .resource-info h3 {
  font-size: 22px;
  line-height: 1.2;
  letter-spacing: -0.04em;
}
.landing-v2 .sa-editorial-resource .resource-info .meta {
  color: #6e735f;
  font-size: 9px;
  margin-bottom: 14px;
}
.landing-v2 .sa-editorial-resource .resource-info > p {
  font-size: 12px;
  color: #646c5b;
  line-height: 1.75;
}
.landing-v2 .sa-editorial-resource .resource-role {
  font-size: 9px;
  color: #666d59;
}
.sa-room-section {
  padding: 108px 0 54px;
  background: #181b16;
}
.landing-v2 .sa-room-section .sa-section-label {
  color: #cdb684;
}
.sa-room-heading {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0 100px;
  align-items: end;
}
.sa-room-heading .sa-section-label {
  grid-column: 1 / -1;
}
.sa-room-heading h2 {
  color: #eeeee4;
  font-size: clamp(41px, 4.3vw, 63px);
  letter-spacing: -0.055em;
  margin: 0;
}
.landing-v2 .sa-room-heading > p:last-child {
  font-size: 13px;
  line-height: 1.9;
  color: #b4bba8;
  margin: 0;
}
.sa-room-path {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  position: relative;
  margin-top: 80px;
}
.sa-room {
  position: relative;
  min-width: 0;
  padding: 0 0 45px;
}
.sa-room-name {
  display: block;
  color: #d0d7c3;
  font-size: 10px;
  letter-spacing: 0.16em;
  margin-bottom: 16px;
}
.sa-room-glyph {
  height: 154px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 700px;
}
.sa-room-glyph i {
  position: absolute;
  width: 133px;
  height: 94px;
  left: 20px;
  top: 32px;
  border: 1px solid #a28f6180;
  background: #3d43332b;
  transform: rotateX(58deg) rotateZ(-33deg);
  box-shadow: inset 0 1px 0 #cdb47b20;
}
.sa-room-glyph i:nth-child(2) {
  left: 60px;
  top: 15px;
  background: #5b64403b;
}
.sa-room-glyph i:nth-child(3) {
  left: 100px;
  top: 0;
  background: #bba26235;
  border-color: #c7aa72;
}
.sa-room-second .sa-room-glyph i:nth-child(2) {
  background: #bba26235;
  border-color: #c7aa72;
}
.sa-room-third .sa-room-glyph i {
  background: #bba26235;
  border-color: #c7aa72;
}
.sa-room-rail {
  position: absolute;
  height: 1px;
  left: 0;
  right: 0;
  top: 192px;
  background: #76825666;
}
.sa-room-rail span {
  position: absolute;
  width: 7px;
  height: 7px;
  border: 1px solid #d4b574;
  background: #181b16;
  border-radius: 50%;
  top: -3px;
}
.sa-room-rail span:nth-child(1) {
  left: 0;
  background: #d4b574;
}
.sa-room-rail span:nth-child(2) {
  left: calc(33.333% + 16px);
}
.sa-room-rail span:nth-child(3) {
  left: calc(66.666% + 32px);
}
.sa-room-content {
  padding-top: 38px;
}
.sa-room-number {
  font-family: Georgia, serif;
  color: #cdb17a;
  font-size: 16px;
}
.sa-room h3 {
  color: #edeee2;
  font-size: 35px;
  margin: 14px 0;
  letter-spacing: -0.045em;
}
.landing-v2 .sa-room p {
  font-size: 13px;
  line-height: 1.8;
  max-width: 270px;
  margin-bottom: 25px;
  color: #b4bba8;
}
.sa-room-outcome {
  color: #d3d8c7;
  font-size: 10px;
  display: block;
  padding-top: 14px;
  border-top: 1px solid #3c4433;
}
.sa-room-footnote {
  display: grid;
  grid-template-columns: 6px 1fr auto;
  gap: 14px;
  align-items: start;
  padding-top: 32px;
  border-top: 1px solid #3d4434;
}
.sa-status-mark {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c6ad78;
  margin-top: 5px;
}
.landing-v2 .sa-room-footnote p {
  color: #a7af99;
  font-size: 10px;
  line-height: 1.8;
  max-width: 620px;
  margin: 0;
}
.sa-room-footnote a {
  color: #ddc58f;
  font-size: 11px;
  text-decoration: none;
  padding: 4px 0 10px 22px;
  white-space: nowrap;
}
.sa-room-footnote a:hover {
  color: #fff3ce;
}
.sa-room-footnote a span {
  padding-left: 14px;
}
.sa-diagnostic {
  padding: 74px 0;
  background: #d8bf89;
  color: #272c20;
}
.sa-diagnostic-layout {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 40px;
  align-items: center;
}
.sa-diagnostic .sa-section-label {
  color: #574b2d;
  margin-bottom: 15px;
}
.sa-diagnostic h2 {
  font-size: clamp(30px, 3vw, 43px);
  max-width: 620px;
  margin-bottom: 16px;
  letter-spacing: -0.045em;
}
.landing-v2 .sa-diagnostic p {
  color: #4d503b;
  font-size: 12px;
  line-height: 1.8;
  max-width: 550px;
  margin-bottom: 0;
}
.sa-diagnostic-mark {
  width: 94px;
  height: 94px;
  position: relative;
}
.sa-diagnostic-mark > span {
  font-family: Georgia, serif;
  font-size: 84px;
  line-height: 1;
  letter-spacing: -0.07em;
  color: #332f20;
}
.sa-diagnostic-mark i {
  position: absolute;
  inset: -12px 2px 4px -11px;
  border: 1px solid #71623d70;
  border-radius: 50%;
}
.sa-diagnostic .button {
  white-space: nowrap;
  font-size: 12px;
}
.sa-faq {
  padding: 100px 0;
  color: #252a20;
  background: #f4f1e9;
}
.sa-faq-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 100px;
}
.sa-faq h2 {
  font-size: clamp(39px, 4vw, 57px);
  letter-spacing: -0.05em;
  margin-bottom: 22px;
}
.sa-faq h2 em {
  color: #757c65;
}
.landing-v2 .sa-faq-grid > div > p:not(.sa-section-label) {
  color: #6a705e;
  max-width: 250px;
  font-size: 13px;
  line-height: 1.8;
}
.landing-v2 .sa-faq .faq-list {
  border-top: 1px solid #cdd2c0;
}
.landing-v2 .sa-faq details {
  border-color: #d7dbce;
}
.landing-v2 .sa-faq summary {
  padding: 23px 0;
  font-size: 14px;
  line-height: 1.6;
  color: #303729;
  gap: 24px;
}
.landing-v2 .sa-faq details p {
  color: #626b55;
  font-size: 13px;
  line-height: 1.85;
}
.sa-contact {
  padding: 104px 0 100px;
  background: #101110;
}
.sa-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 120px;
}
.landing-v2 .sa-contact .sa-section-label {
  color: #bfa66d;
  margin-bottom: 29px;
}
.sa-contact h2 {
  font-size: clamp(42px, 4.3vw, 64px);
  letter-spacing: -0.06em;
  color: #edece3;
  line-height: 1.03;
  margin-bottom: 30px;
}
.sa-contact h2 em {
  color: #d4b574;
}
.landing-v2 .sa-contact-copy > p:not(.sa-section-label) {
  color: #aeb5a3;
  max-width: 340px;
  font-size: 15px;
  line-height: 1.8;
}
.sa-contact-signature {
  font-family: Georgia, serif;
  color: #363c2e;
  font-size: 102px;
  line-height: 1;
  letter-spacing: -0.13em;
  margin: 40px 0 26px;
}
.landing-v2 .sa-contact-copy > .sa-contact-caption {
  font-size: 10px;
  color: #969f87;
  max-width: 300px;
}
.sa-contact-form {
  padding: 0;
  min-width: 0;
}
.landing-v2 .sa-form-intro {
  color: #dedfcf;
  font-size: 19px;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}
.landing-v2 .sa-contact-form label {
  color: #bdc3b0;
  font-size: 11px;
}
.landing-v2 .sa-contact-form input:not([type="checkbox"]),
.landing-v2 .sa-contact-form select {
  background: #1a1e17;
  border: 1px solid #3a4232;
  border-radius: 2px;
  min-height: 48px;
  color: #edf0e2;
  padding: 13px 14px;
  font-size: 13px;
}
.landing-v2 .sa-contact-form input::placeholder {
  color: #919b84;
  opacity: 1;
}
.landing-v2 .sa-contact-form select {
  color-scheme: dark;
}
.landing-v2 .sa-contact-form .form-grid {
  gap: 20px 18px;
}
.landing-v2 .sa-contact-form .check-label {
  font-size: 10px;
  line-height: 1.7;
  gap: 10px;
  margin: 19px 0;
}
.landing-v2 .sa-contact-form .check-label a {
  color: #e5cb92;
}
.landing-v2 .sa-contact-form input[type="checkbox"] {
  accent-color: #d4b574;
}
.landing-v2 .sa-contact-form .button {
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.landing-v2 .sa-contact-form .caption,
.landing-v2 .sa-contact-form noscript p {
  color: #b4bca8;
  font-size: 11px;
  line-height: 1.7;
}
.landing-v2 .sa-contact-form .form-status.error {
  color: #ffb7a9;
}
.landing-v2 .sa-contact-form .form-status.success {
  color: #c8dfac;
}
.landing-v2 .sa-hero a:focus-visible,
.landing-v2 .sa-room-section a:focus-visible,
.landing-v2 .sa-contact :is(a, button, input, select):focus-visible {
  outline-color: #f0d398;
}
@media (min-width: 1600px) {
  .sa-hero-grid {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 40px;
  }
}
@media (max-width: 1180px) {
  .landing-v2 .container {
    width: calc(100% - 64px);
  }
  .landing-v2 .sa-hero h1 {
    font-size: 72px;
  }
  .sa-product-scene {
    height: 570px;
    transform: scale(0.93);
    transform-origin: center right;
    margin-left: -40px;
    margin-right: -18px;
  }
  .sa-device-front {
    left: 24%;
  }
  .sa-device-back {
    left: -10%;
  }
  .sa-device-side {
    right: -10%;
  }
  .sa-practice-grid {
    gap: 55px;
  }
  .sa-method-intro,
  .sa-room-heading,
  .sa-resource-heading {
    gap: 0 55px;
  }
  .sa-contact-grid,
  .sa-faq-grid {
    gap: 60px;
  }
  .sa-diagnostic-layout {
    grid-template-columns: 80px 1fr;
    gap: 30px;
  }
  .sa-diagnostic-layout > .button {
    grid-column: 2;
    justify-self: start;
    margin-top: 0;
  }
  .sa-document-preview {
    padding: 22px;
  }
  .sa-document-preview strong {
    font-size: 24px;
  }
  .sa-editorial-matrix .sa-document-preview strong {
    font-size: 26px;
  }
  .sa-document-bottom {
    font-size: 6px;
  }
}
@media (max-width: 940px) {
  .landing-v2 .sa-hero {
    padding-top: 54px;
  }
  .sa-hero-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .sa-hero-copy {
    text-align: center;
    padding-bottom: 0;
  }
  .landing-v2 .sa-kicker {
    max-width: none;
    justify-content: center;
    margin-bottom: 25px;
  }
  .landing-v2 .sa-hero h1 {
    font-size: clamp(64px, 10vw, 88px);
    max-width: 850px;
    margin-inline: auto;
  }
  .landing-v2 .sa-hero-description {
    max-width: 480px;
    margin-inline: auto;
  }
  .landing-v2 .hero-actions {
    justify-content: center;
  }
  .sa-product-scene {
    width: min(610px, 100%);
    height: 610px;
    margin: 47px auto 0;
    transform: none;
  }
  .sa-device-front {
    left: 29%;
  }
  .sa-device-back {
    left: 0;
  }
  .sa-device-side {
    right: 0;
  }
  .sa-method-intro {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .sa-method-intro .sa-section-label {
    margin-bottom: 0;
  }
  .sa-method-intro h2 {
    max-width: 620px;
  }
  .landing-v2 .sa-method-lead {
    max-width: 590px;
  }
  .sa-practice-grid {
    gap: 40px;
  }
  .sa-practice-visual {
    min-height: 570px;
  }
  .sa-practice-word {
    font-size: 72px;
    left: 14px;
  }
  .sa-resource-device {
    width: 245px;
  }
  .sa-resource-heading {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .sa-resource-heading > div:last-child {
    display: flex;
    align-items: center;
    gap: 40px;
    justify-content: space-between;
  }
  .sa-resource-heading > div:last-child > p {
    margin: 0;
    max-width: 360px;
  }
  .sa-resource-heading .sa-text-link {
    white-space: nowrap;
  }
  .sa-resources-grid {
    grid-template-columns: 1fr 1fr;
  }
  .landing-v2 .sa-editorial-resource:nth-child(2) {
    margin-top: 0;
  }
  .landing-v2 .sa-editorial-resource:nth-child(3) {
    margin-top: 0;
    grid-column: 1 / -1;
    max-width: none;
  }
  .sa-editorial-resource:nth-child(3) .resource-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .landing-v2 .sa-editorial-resource:nth-child(3) .resource-info {
    padding-top: 15px;
  }
  .sa-editorial-resource:nth-child(3) .sa-document-preview {
    right: calc(50% + 14px);
  }
  .sa-room-heading {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .sa-room-heading .sa-section-label {
    margin-bottom: 0;
  }
  .sa-room-heading h2 {
    max-width: 650px;
  }
  .landing-v2 .sa-room-heading > p:last-child {
    max-width: 650px;
  }
  .sa-room-path {
    gap: 24px;
  }
  .sa-room-glyph {
    transform: scale(0.8);
    transform-origin: left center;
  }
  .sa-room-rail span:nth-child(2) {
    left: calc(33.333% + 8px);
  }
  .sa-room-rail span:nth-child(3) {
    left: calc(66.666% + 16px);
  }
  .sa-room h3 {
    font-size: 30px;
  }
  .sa-room-footnote {
    grid-template-columns: 6px 1fr;
  }
  .sa-room-footnote a {
    grid-column: 2;
    padding-left: 0;
  }
  .sa-faq-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
  .sa-faq-grid h2 br {
    display: none;
  }
  .landing-v2 .sa-faq-grid > div > p:not(.sa-section-label) {
    max-width: none;
  }
  .sa-contact-grid {
    gap: 40px;
  }
  .sa-contact h2 {
    font-size: 43px;
  }
}
@media (max-width: 680px) {
  .landing-v2 .container {
    width: calc(100% - 40px);
  }
  .landing-v2 .sa-hero {
    padding-top: 38px;
  }
  .landing-v2 .sa-kicker {
    font-size: 8px;
    letter-spacing: 0.11em;
    line-height: 1.6;
    margin-bottom: 25px;
    gap: 9px;
  }
  .landing-v2 .sa-hero h1 {
    font-size: clamp(53px, 12.8vw, 77px);
    line-height: 1.02;
    margin-bottom: 24px;
    letter-spacing: -0.065em;
  }
  .landing-v2 .sa-hero-description {
    font-size: 14px;
    line-height: 1.75;
    max-width: 340px;
    margin-bottom: 24px;
  }
  .landing-v2 .hero-actions {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
  .landing-v2 .hero-actions .button {
    min-height: 53px;
    min-width: 224px;
    font-size: 12px;
  }
  .landing-v2 .hero-actions .sa-text-link {
    font-size: 11px;
    padding-block: 10px;
  }
  .landing-v2 .sa-hero-note {
    margin-top: 13px;
    font-size: 9px;
  }
  .sa-product-scene {
    height: 480px;
    width: 360px;
    max-width: 100%;
    margin-top: 40px;
  }
  .sa-device {
    border-radius: 21px;
    padding: 5px;
  }
  .sa-device img {
    border-radius: 16px;
  }
  .sa-device-front {
    width: 183px;
    left: calc(50% - 91px);
    top: 15px;
  }
  .sa-device-back {
    width: 154px;
    left: -16px;
    top: 58px;
    transform: rotate(-9deg);
  }
  .sa-device-side {
    width: 154px;
    right: -16px;
    top: 57px;
    transform: rotate(9deg);
  }
  .sa-product-scene figcaption {
    bottom: 19px;
    left: 0;
    right: 0;
    font-size: 9px;
  }
  .sa-orbit {
    width: 390px;
    height: 160px;
    left: -25px;
    top: 260px;
  }
  .sa-orbit-two {
    width: 380px;
    height: 380px;
    top: 40px;
    left: -20px;
  }
  .sa-hero-bottom {
    margin-top: 0;
    padding: 19px 0;
  }
  .landing-v2 .sa-hero-bottom p {
    font-size: 9px;
    max-width: 185px;
  }
  .sa-hero-bottom a {
    font-size: 10px;
    gap: 13px;
  }
  .sa-method {
    padding: 65px 0;
  }
  .landing-v2 .sa-section-label {
    font-size: 8px;
    letter-spacing: 0.13em;
    margin-bottom: 21px;
  }
  .sa-method-intro {
    gap: 19px;
  }
  .sa-method-intro .sa-section-label {
    margin-bottom: 0;
  }
  .sa-method-intro h2 {
    font-size: 40px;
    letter-spacing: -0.055em;
  }
  .landing-v2 .sa-method-lead {
    font-size: 13px;
    line-height: 1.85;
  }
  .sa-practice-grid {
    margin-top: 36px;
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .sa-practice-visual {
    min-height: 430px;
  }
  .sa-practice-word {
    font-size: 76px;
    top: 21px;
    left: 22px;
  }
  .sa-resource-device {
    width: 213px;
    top: 95px;
    left: 57%;
    transform: translateX(-50%) rotate(7deg);
  }
  .landing-v2 .sa-visual-caption {
    bottom: 15px;
    left: 16px;
    font-size: 9px;
    padding: 10px 13px;
  }
  .sa-practice-copy > h3 {
    font-size: 36px;
  }
  .sa-practice-copy > p {
    font-size: 13px;
  }
  .sa-practice-steps {
    margin-top: 25px;
  }
  .sa-practice-steps article {
    padding: 19px 0;
    gap: 13px;
    grid-template-columns: 24px 1fr;
  }
  .sa-practice-steps h4 {
    font-size: 15px;
  }
  .sa-practice-steps p {
    font-size: 12px;
  }
  .sa-resources {
    padding: 63px 0 68px;
  }
  .sa-resource-heading {
    gap: 22px;
    margin-bottom: 32px;
  }
  .sa-resource-heading h2 {
    font-size: 39px;
  }
  .sa-resource-heading > div:last-child {
    display: block;
  }
  .sa-resource-heading > div:last-child > p {
    font-size: 13px;
    margin-bottom: 12px;
  }
  .sa-resources-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
  .sa-editorial-resource:nth-child(3) .resource-card {
    display: block;
  }
  .landing-v2 .sa-editorial-resource .resource-art {
    height: 260px;
  }
  .sa-document-preview {
    height: 260px;
    padding: 26px;
  }
  .sa-editorial-resource:nth-child(3) .sa-document-preview {
    right: 0;
  }
  .sa-document-preview strong {
    font-size: 31px;
    max-width: 285px;
  }
  .sa-editorial-matrix .sa-document-preview strong {
    font-size: 32px;
  }
  .sa-document-brand {
    margin-bottom: 28px;
  }
  .sa-document-bottom {
    font-size: 7px;
  }
  .landing-v2 .sa-editorial-resource .resource-info {
    padding-top: 18px;
  }
  .landing-v2 .sa-editorial-resource .resource-info h3 {
    font-size: 22px;
    margin-bottom: 10px;
  }
  .landing-v2 .sa-editorial-resource .resource-info > p {
    margin-bottom: 12px;
  }
  .sa-room-section {
    padding: 65px 0 42px;
  }
  .sa-room-heading {
    gap: 20px;
  }
  .sa-room-heading h2 {
    font-size: 42px;
  }
  .landing-v2 .sa-room-heading > p:last-child {
    font-size: 12px;
    line-height: 1.85;
  }
  .sa-room-path {
    grid-template-columns: 1fr;
    gap: 27px;
    margin-top: 38px;
  }
  .sa-room {
    padding: 0 0 27px 21px;
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 0 15px;
    border-bottom: 1px solid #424a36;
  }
  .sa-room-name {
    grid-column: 1 / -1;
    margin-bottom: 10px;
    font-size: 9px;
  }
  .sa-room-glyph {
    height: 98px;
    transform: scale(0.47);
    transform-origin: top left;
    margin-top: 23px;
  }
  .sa-room-glyph i {
    left: -1px;
  }
  .sa-room-glyph i:nth-child(2) {
    left: 38px;
  }
  .sa-room-glyph i:nth-child(3) {
    left: 77px;
  }
  .sa-room-content {
    padding-top: 12px;
  }
  .sa-room-number {
    display: none;
  }
  .sa-room h3 {
    font-size: 29px;
    margin: 0 0 12px;
  }
  .landing-v2 .sa-room p {
    font-size: 12px;
    margin-bottom: 15px;
    max-width: none;
  }
  .sa-room-outcome {
    font-size: 9px;
    padding-top: 0;
    border: none;
  }
  .sa-room-rail {
    top: 0;
    bottom: 27px;
    left: 0;
    right: auto;
    height: auto;
    width: 1px;
  }
  .sa-room-rail span {
    left: -3px !important;
    top: 0;
  }
  .sa-room-rail span:nth-child(2),
  .sa-room-rail span:nth-child(3) {
    display: none;
  }
  .sa-room-footnote {
    padding-top: 2px;
    border: 0;
  }
  .landing-v2 .sa-room-footnote p {
    font-size: 9px;
  }
  .sa-room-footnote a {
    font-size: 10px;
  }
  .sa-diagnostic {
    padding: 49px 0;
  }
  .sa-diagnostic-layout {
    grid-template-columns: 52px 1fr;
    gap: 16px 24px;
  }
  .sa-diagnostic-mark {
    width: 52px;
    height: 66px;
    align-self: start;
    margin-top: 30px;
  }
  .sa-diagnostic-mark > span {
    font-size: 67px;
  }
  .sa-diagnostic-mark i {
    inset: -2px -6px -1px -8px;
  }
  .sa-diagnostic h2 {
    font-size: 29px;
  }
  .sa-diagnostic .sa-section-label {
    margin-bottom: 14px;
  }
  .landing-v2 .sa-diagnostic p {
    font-size: 11px;
  }
  .sa-diagnostic .button {
    grid-column: 1 / -1;
    width: 100%;
    margin-top: 12px;
  }
  .sa-faq {
    padding: 62px 0;
  }
  .sa-faq-grid {
    gap: 22px;
  }
  .sa-faq h2 {
    font-size: 38px;
    margin-bottom: 17px;
  }
  .sa-faq-grid h2 br {
    display: inline;
  }
  .landing-v2 .sa-faq-grid > div > p:not(.sa-section-label) {
    font-size: 12px;
    max-width: 250px;
  }
  .landing-v2 .sa-faq summary {
    padding: 21px 0;
    font-size: 13px;
    gap: 20px;
  }
  .landing-v2 .sa-faq details p {
    font-size: 12px;
  }
  .sa-contact {
    padding: 64px 0 62px;
  }
  .sa-contact-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .sa-contact h2 {
    font-size: 47px;
    margin-bottom: 24px;
  }
  .landing-v2 .sa-contact .sa-section-label {
    margin-bottom: 24px;
  }
  .landing-v2 .sa-contact-copy > p:not(.sa-section-label) {
    font-size: 13px;
  }
  .sa-contact-signature {
    display: none;
  }
  .landing-v2 .sa-contact-copy > .sa-contact-caption {
    margin-top: 20px;
    font-size: 10px;
    max-width: none;
  }
  .landing-v2 .sa-form-intro {
    font-size: 17px;
    margin-bottom: 23px;
  }
  .landing-v2 .sa-contact-form .form-grid {
    gap: 16px 12px;
  }
  .landing-v2 .sa-contact-form input:not([type="checkbox"]),
  .landing-v2 .sa-contact-form select {
    font-size: 12px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sa-product-scene,
  .sa-device,
  .sa-orbit,
  .sa-room-glyph {
    transition: none !important;
    animation: none !important;
  }
}
````

### 24 · growth/site/assets/landing-v2.mjs

Bytes: 946. SHA256: `c1b6272777422315a1941f00bc77114d1f08f129bc77f01bebcd7bcd4d1e1a26`.

````javascript
/* Decorative motion only. Content is readable before JS and without animation. */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let observer;
function applyMotionPreference() {
  observer?.disconnect();
  document.body.classList.remove('motion-ready');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, {threshold: 0.08});
  for (const element of document.querySelectorAll('[data-reveal]')) {
    if (element.getBoundingClientRect().top < innerHeight) element.classList.add('is-revealed');
    else observer.observe(element);
  }
  document.body.classList.add('motion-ready');
}
applyMotionPreference();
reduceMotion.addEventListener('change', applyMotionPreference);
````

### 25 · growth/site/assets/mark.svg

Bytes: 206. SHA256: `5ad064efb01e1579db51106b17d79610dc7aa3a0fb18c51affd7deaf0e104377`.

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#151714"/><text x="9" y="44" font-family="Georgia,serif" font-size="37" fill="#d5b76a">SA</text></svg>
````

### 26 · growth/site/assets/media-player.css

Bytes: 2353. SHA256: `8d2c298e2bffcc573d95d7ee2251f4324f81ba538c8c8a3007f3090f81dc2f6b`.

````css
.film-player {
  margin: 0 0 2rem;
  min-width: 0;
}
.film-player-video {
  display: block;
  width: 100%;
  height: auto;
  max-height: 76vh;
  max-height: 76svh;
  object-fit: contain;
  background: #10120f;
  border: 1px solid #494a40;
  border-radius: 6px;
}
.film-player-video:focus-visible {
  outline: 3px solid #9a732f;
  outline-offset: 5px;
}
.film-player-stage { position:relative; }
.film-play-button {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10px;
  width:min(190px,calc(100% - 32px));
  min-height:162px;
  padding:20px 16px 18px;
  border:1px solid #d4ba7a;
  border-radius:22px;
  background:#10150ef2;
  color:#fff8e5;
  box-shadow:0 16px 44px #0008;
  font-family:inherit;
  cursor:pointer;
  transition:background 160ms ease,box-shadow 160ms ease;
  -webkit-tap-highlight-color:transparent;
}
.film-play-icon {
  display:grid;
  place-items:center;
  width:68px;
  height:68px;
  border-radius:50%;
  background:#e0c584;
  color:#182014;
  box-shadow:0 0 0 7px #d4ba7a24;
  animation:film-play-pulse 1.5s ease-out 3;
}
.film-play-icon svg { display:block; width:34px; height:34px; margin-left:3px; fill:currentColor; }
.film-play-text { font-size:14px; font-weight:700; line-height:1.2; letter-spacing:.02em; }
.film-play-detail { font-size:10px; line-height:1.4; color:#dddfd1; }
.film-play-button:hover { background:#222b1c; box-shadow:0 16px 44px #0009,0 0 0 2px #d4ba7a55; }
.film-play-button:focus-visible { outline:3px solid #fff0bb; outline-offset:5px; }
.film-play-button:disabled { cursor:progress; }
@keyframes film-play-pulse {
  0% { box-shadow:0 0 0 0 #e0c58470; }
  100% { box-shadow:0 0 0 17px #e0c58400; }
}
.film-player figcaption { padding-top: 14px; }
.film-player-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
}
.film-player-hint,
.film-player-error { font-size: 13px; line-height: 1.65; margin: 7px 0 0; }
.film-player-error { font-weight: 600; }
.film-player [data-video-retry] { margin-top: 12px; min-height: 44px; }
.film-player [hidden] { display: none !important; }
@media (prefers-reduced-motion: reduce) {
  .film-player { scroll-behavior: auto; }
  .film-play-icon { animation:none; }
  .film-play-button { transition:none; }
}
````

### 27 · growth/site/assets/media-player.mjs

Bytes: 2134. SHA256: `729857c81082d0fdfcfa3777c5264a5e555b0c1d2db19292d80ea3cc07c0b660`.

````javascript
/* Native controls remain usable without JavaScript. Media loads only after a gesture. */
const players = [...document.querySelectorAll('[data-film-player]')];
const videos = players.map(player => player.querySelector('video'));

for (const player of players) {
  const video = player.querySelector('video');
  const error = player.querySelector('[data-video-error]');
  const retry = player.querySelector('[data-video-retry]');
  const play = player.querySelector('[data-video-play]');
  function syncPlayButton() {
    if (!play) return;
    play.hidden = !video.paused || !error.hidden;
    play.querySelector('[data-play-text]').textContent = video.ended ? 'Volver a ver' : 'Ver película';
  }
  function setError(visible) {
    error.hidden = !visible;
    retry.hidden = !visible;
    syncPlayButton();
  }
  video.addEventListener('play', () => {
    syncPlayButton();
    for (const other of videos) {
      if (other !== video && !other.paused) other.pause();
    }
  });
  video.addEventListener('pause', syncPlayButton);
  video.addEventListener('ended', syncPlayButton);
  video.addEventListener('loadeddata', () => setError(false));
  video.addEventListener('error', () => setError(true));
  for (const source of video.querySelectorAll('source')) {
    source.addEventListener('error', () => setError(true));
  }
  async function startPlayback(reload = false) {
    setError(false);
    if (play) play.disabled = true;
    if (reload) video.load();
    video.focus({preventScroll:true});
    try {
      await video.play();
    } catch (failure) {
      // A pause or another player can legitimately interrupt a pending play request.
      if (failure?.name !== 'AbortError') {
        setError(true);
        retry.focus({preventScroll:true});
      }
    } finally {
      if (play) play.disabled = false;
      syncPlayButton();
    }
  }
  play?.addEventListener('click', () => startPlayback());
  retry.addEventListener('click', () => startPlayback(true));
  syncPlayButton();
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) return;
  for (const video of videos) video.pause();
});
````

### 28 · growth/site/assets/public-v2.css

Bytes: 3071. SHA256: `bb20a360345dd3d0ad8873566aa30021f5baba71c1108361e2ae23c357e2d347`.

````css
/* Shared public identity. Editorial data and CMS styling stay independent. */
.public-v2 {
  --paper: #f5f3ed;
  --ink: #20211e;
  --muted: #62655e;
  --gold: #d4b574;
  --gold-dark: #765922;
  --dark: #111310;
  background: var(--paper);
  -webkit-font-smoothing: antialiased;
}
.public-v2 .site-header {
  background: #f5f3ed;
  border-bottom: 1px solid #dcdcd2;
}
.public-v2 .nav { min-height: 94px; }
.public-v2 .brand { gap: 15px; }
.public-v2 .brand-mark { font-size: 39px; letter-spacing: -5px; }
.public-v2 .brand-sub { font-size: 6px; letter-spacing: 2px; }
.public-v2 .nav > .button { border-radius: 3px; min-height: 46px; }
.public-v2 .nav nav a { font-size: 13px; }
.public-v2 .site-footer {
  background: #10120f;
  border-top: 1px solid #383b32;
  color: #f4f2e9;
  padding-top: 72px;
}
.public-v2 .site-footer p { font-size: 30px; line-height: 1.2; letter-spacing: -1px; color: #ecece3; }
.public-v2 .footer-grid { grid-template-columns: .8fr 1.25fr 1fr; }
.public-v2 .footer-grid > div { align-items: flex-start; }
.public-v2 .footer-bottom { color: #b6b8ab; border-color: #36392f; }
.public-v2 .site-footer .brand-mark { color: #d4b574; }
.public-v2 .site-footer a:focus-visible,
.public-v2 .site-footer button:focus-visible { outline-color: #e0c485; }
.public-v2 .consent-panel {
  width: min(510px, calc(100% - 32px));
  border: 1px solid #d4b574;
  border-radius: 8px;
  box-shadow: 0 16px 60px #0003;
  background: #fffdf7;
  color: #20211e;
}
.public-v2 .consent-panel p { color: #56594f; }
.public-v2 .consent-panel .button { background: #171b17; border-color: #171b17; color: #fffdf7; }
.public-v2 .consent-panel .button-outline { background: transparent; color: #171b17; }
.landing-v2 .site-header,
.hub-v2 .site-header {
  background: #10120f;
  color: #f4f2e9;
  border-color: #30342a;
}
.landing-v2 .site-header .brand-mark,
.hub-v2 .site-header .brand-mark { color: #d4b574; }
.landing-v2 .site-header .button,
.hub-v2 .site-header .button { background: #d4b574; border-color: #d4b574; color: #171b17; }
.landing-v2 .site-header a:focus-visible,
.hub-v2 .site-header a:focus-visible { outline-color: #e0c485; }
.public-v2 .preview-bar { position: relative; z-index: 60; }
.public-v2 [data-reveal] { transition: transform 700ms cubic-bezier(.16,1,.3,1); }
.public-v2.motion-ready [data-reveal]:not(.is-revealed) { transform: translateY(18px); }
@media (max-width: 720px) {
  .public-v2 .nav { min-height: 82px; padding-block: 15px; gap: 14px; }
  .public-v2 .brand { gap: 11px; }
  .public-v2 .nav .brand-mark { font-size: 33px; }
  .public-v2 .nav > .button { font-size: 10px; padding-inline: 14px; min-height: 44px; }
  .public-v2 .site-footer { padding-top: 50px; }
  .public-v2 .footer-grid { grid-template-columns: 1fr; gap: 35px; }
  .public-v2 .site-footer p { font-size: 29px; }
  .public-v2 .footer-grid > div { display: flex; flex-wrap: wrap; gap: 14px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .public-v2 [data-reveal],
  .public-v2.motion-ready [data-reveal]:not(.is-revealed) { transform: none; transition: none; }
}
````

### 29 · growth/site/assets/scenarios/index.html

Bytes: 32633. SHA256: `ddc995f9a43845b8bea1acf3caa6701bd4227dff6fa4d54f07af9388c18c92aa`.

````html
<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Un día con agentes de IA · Sales Academy</title>
<meta name="description" content="Seis situaciones de una jornada de time share con agentes de IA: pantallas de la app, preguntas propuestas y decisiones del equipo. Solicita una demo por WhatsApp." />
<meta name="theme-color" content="#121610" />
<link rel="stylesheet" href="scenarios.css" />
<script type="module" src="scenarios.mjs"></script>
<link rel="stylesheet" href="/growth-assets/advisor.css" />
<script type="module" src="/growth-assets/advisor.mjs"></script>
</head>
<body>
<a class="skip-link" href="#daily-intention">Ir al primer momento</a>
<header class="site-header"><a class="brand" href="/descubre/" aria-label="Sales Academy · Volver al inicio"><span class="brand-symbol" aria-hidden="true">SA</span><span>SALES<br />ACADEMY</span></a><div class="header-links"><a href="#catalogo">Ver las 16 pantallas <span aria-hidden="true">↓</span></a><a class="header-whatsapp" data-whatsapp-cta href="https://wa.me/529843163268?text=Hola%2C%20quiero%20conocer%20los%20agentes%20de%20IA%20de%20Sales%20Academy%20y%20agendar%20una%20demo%20para%20mi%20sala%20de%20ventas." target="_blank" rel="noopener noreferrer">Solicitar demo por WhatsApp <span aria-hidden="true">↗</span></a></div></header>
<main>
<section class="intro" aria-labelledby="page-title">
  <div class="intro-copy"><p class="eyebrow">AGENTES DE IA &nbsp; · &nbsp; SALES ACADEMY EN CONTEXTO</p><h1 id="page-title">Un día<br />con <em>IA.</em></h1><p class="intro-lede">Tu método, acompañado por<br />agentes de inteligencia artificial.</p><p class="intro-description">Acompaña a Ana y Jorge en seis momentos de una jornada con IA. Mira qué consultar, qué preguntar al agente y qué decisión corresponde al equipo.</p><a class="button button-dark" href="#daily-intention">Entrar a la jornada <span aria-hidden="true">↘</span></a><div class="intro-stats"><span><strong>06</strong> momentos</span><span><strong>16</strong> pantallas de la app</span><span><strong>01</strong> siguiente paso</span></div></div>
  <figure class="intro-visual"><img src="scenes/consultation.webp" width="1672" height="941" alt="Escena ilustrativa generada de una conversación entre representante y huéspedes ficticios en una sala de time share." fetchpriority="high" /><div class="intro-photo-frame" aria-hidden="true"></div><figcaption><span class="photo-caption">ESCENA ILUSTRATIVA GENERADA</span><strong>La IA acompaña.<br />Tu equipo decide.</strong><span>Agentes de IA en el contexto de tu sala.</span></figcaption><span class="intro-coordinate" aria-hidden="true">08:45 — 16:30</span></figure>
</section>
<aside class="reading-key" aria-label="Cómo leer este recorrido"><p><span class="key-dot key-real"></span><strong>Captura de la demo</strong><span>Interfaz real, datos de ejemplo.</span></p><p><span class="key-dot key-story"></span><strong>Simulación de uso</strong><span>Personajes ficticios y preguntas propuestas para IA.</span></p><p><span class="key-dot key-scene"></span><strong>Escena ilustrativa generada</strong><span>Fotografía conceptual para situar la historia.</span></p></aside>
<nav class="chapter-index" aria-label="Momentos de la jornada"><span class="index-label">LA JORNADA CON IA</span><ol>
<li><a href="#daily-intention"><span>01</span>Una intención</a></li>
<li><a href="#tour-preparation"><span>02</span>La bienvenida</a></li>
<li><a href="#needs-discovery"><span>03</span>La conversación</a></li>
<li><a href="#objection-practice"><span>04</span>La práctica</a></li>
<li><a href="#leader-coaching"><span>05</span>El coaching</a></li>
<li><a href="#learning-close"><span>06</span>Lo que sigue</a></li>
</ol><span class="index-progress" data-progress aria-live="off">01 / 06</span></nav><div class="scenarios">
<article class="scenario scenario-1" id="daily-intention" aria-labelledby="title-daily-intention">
  <div class="scenario-top"><p class="eyebrow"><span class="moment-number">01</span> / Ana + Jorge · Antes de abrir</p><p class="scenario-time"><span>HORA SIMULADA</span><strong>08:45</strong></p></div>
  <div class="scenario-layout">
    <div class="scene-visual">
      <figure class="context-photo"><img src="scenes/briefing.webp" width="1672" height="941" alt="Escena ilustrativa generada: representante y líder preparan una conversación en una sala luminosa de time share." loading="lazy" /><figcaption>Escena ilustrativa generada</figcaption></figure>
      <div class="scene-note"><span aria-hidden="true">↗</span><p>Habilidad de ejemplo: preguntar antes de presentar</p></div>
      <figure class="product-screen"><a class="screen-original" href="screens/10-monthly-goal-mobile.png" target="_blank" rel="noopener" aria-label="Abrir captura original: Meta del mes"><img src="screens/10-monthly-goal-mobile.png" width="390" height="844" alt="Captura real de Sales Academy: Meta del mes. Conserva los datos de ejemplo originales de la demo." loading="lazy" /></a><figcaption><strong>Captura de la demo</strong><span>Meta del mes · datos de ejemplo</span></figcaption></figure>
    </div>
    <div class="scenario-copy"><p class="story-label"><span></span>Simulación de uso · agentes de IA</p><h2 id="title-daily-intention">Llegar con una intención.</h2><p class="situation">Ana elige una habilidad y prepara una pregunta para el agente de IA antes de abrir la jornada.</p><div class="dialogue" aria-label="Diálogo ficticio"><p><span>Ana</span>“Hoy quiero escuchar mejor antes de presentar.”</p><p><span>Jorge</span>“Elige una pregunta que te ayude a entender qué buscan.”</p></div><div class="agent-question"><span class="detail-label">PREGUNTA PROPUESTA PARA EL AGENTE DE IA</span><p>«Quiero practicar escucha. Ayúdame a preparar una pregunta abierta.»</p></div><div class="app-action"><span class="detail-label">EN LA APLICACIÓN</span><p>Consultar Hoy y la plantilla Meta del mes.</p></div><div class="next-decision"><span class="detail-label">Siguiente decisión</span><p>Elegir una pregunta abierta y compartirla con Jorge para revisión.</p></div></div>
  </div>
  <div class="scenario-source"><span class="detail-label">CONTEXTO Y FUENTE</span><p>Meta del mes es una plantilla de la demo. No se observó una hoja SMART equivalente al montaje; sus valores no pertenecen a Ana. Interfaz capturada el 7 de noviembre de 2026; historia y fotografía ilustrativas.</p></div>
  <footer class="scenario-footer"><span class="export-brand">SA / SALES ACADEMY <span>UNA JORNADA CON IA · SIMULACIÓN · 01 / 06</span></span><div class="scenario-pagination">
<span class="pagination-disabled" aria-disabled="true">← Anterior</span>
<a class="composition-link" href="compositions/01-daily-intention.png" download>Descargar composición <span aria-hidden="true">↓</span></a>
<a class="scenario-next" href="#tour-preparation">Siguiente <span aria-hidden="true">→</span></a>
</div></footer></article>
<article class="scenario scenario-2" id="tour-preparation" aria-labelledby="title-tour-preparation">
  <div class="scenario-top"><p class="eyebrow"><span class="moment-number">02</span> / Ana · Antes de la conversación</p><p class="scenario-time"><span>HORA SIMULADA</span><strong>09:10</strong></p></div>
  <div class="scenario-layout">
    <div class="scene-visual">
      <figure class="context-photo"><img src="scenes/briefing.webp" width="1672" height="941" alt="Escena ilustrativa generada: representante y líder preparan una conversación en una sala luminosa de time share." loading="lazy" /><figcaption>Escena ilustrativa generada</figcaption></figure>
      <div class="scene-note"><span aria-hidden="true">↗</span><p>La bienvenida marca el tono de la conversación</p></div>
      <figure class="product-screen"><a class="screen-original" href="screens/16-meet-greet-original.png" target="_blank" rel="noopener" aria-label="Abrir captura original aportada: Meet &amp; Greet"><img src="screens/16-meet-greet-retouched.webp" width="390" height="844" alt="Meet &amp; Greet: presentación retocada de una captura aportada, con video, guion y errores frecuentes." loading="lazy" /></a><figcaption><strong>Presentación retocada</strong><span>Meet &amp; Greet · abrir captura original</span></figcaption></figure>
    </div>
    <div class="scenario-copy"><p class="story-label"><span></span>Simulación de uso · agentes de IA</p><h2 id="title-tour-preparation">Dar la bienvenida con claridad.</h2><p class="situation">Ana revisa Meet &amp; Greet antes de recibir a dos huéspedes ficticios y prepara una pregunta para el agente de IA.</p><div class="dialogue" aria-label="Diálogo ficticio"><p><span>Jorge</span>“¿Cómo harás que la bienvenida se sienta natural?”</p><p><span>Ana</span>“Me presento, explico cuánto dura la visita y pregunto cómo prefieren que los llame.”</p></div><div class="agent-question"><span class="detail-label">PREGUNTA PROPUESTA PARA EL AGENTE DE IA</span><p>«Ayúdame a ensayar una bienvenida natural usando el guion de Meet &amp; Greet.»</p></div><div class="app-action"><span class="detail-label">EN LA APLICACIÓN</span><p>Consultar el video, el guion y los errores frecuentes del paso Meet &amp; Greet.</p></div><div class="next-decision"><span class="detail-label">Siguiente decisión</span><p>Practicar la bienvenida con Jorge e incluir a todas las personas de la conversación.</p></div></div>
  </div>
  <div class="scenario-source"><span class="detail-label">CONTEXTO Y FUENTE</span><p>Captura aportada el 7 de noviembre de 2026, con acabado y espaciado retocados. El original está enlazado en la pantalla. Video, guion y errores frecuentes proceden del adjunto; la pregunta a la IA, los personajes y la fotografía son ilustrativos.</p></div>
  <footer class="scenario-footer"><span class="export-brand">SA / SALES ACADEMY <span>UNA JORNADA CON IA · SIMULACIÓN · 02 / 06</span></span><div class="scenario-pagination">
<a class="scenario-prev" href="#daily-intention"><span aria-hidden="true">←</span> Anterior</a>
<a class="composition-link" href="compositions/02-meet-greet.png" download>Descargar composición <span aria-hidden="true">↓</span></a>
<a class="scenario-next" href="#needs-discovery">Siguiente <span aria-hidden="true">→</span></a>
</div></footer></article>
<article class="scenario scenario-3" id="needs-discovery" aria-labelledby="title-needs-discovery">
  <div class="scenario-top"><p class="eyebrow"><span class="moment-number">03</span> / Ana + Elena + Diego · En la mesa</p><p class="scenario-time"><span>HORA SIMULADA</span><strong>10:10</strong></p></div>
  <div class="scenario-layout">
    <div class="scene-visual">
      <figure class="context-photo"><img src="scenes/consultation.webp" width="1672" height="941" alt="Escena ilustrativa generada: representante escucha a una pareja de huéspedes ficticios alrededor de una mesa." loading="lazy" /><figcaption>Escena ilustrativa generada</figcaption></figure>
      <div class="scene-note"><span aria-hidden="true">↗</span><p>Escuchar → aclarar → revisar información confirmada</p></div>
      <figure class="product-screen"><a class="screen-original" href="screens/04-discovery-mobile.png" target="_blank" rel="noopener" aria-label="Abrir captura original: Descubrimiento"><img src="screens/04-discovery-mobile.png" width="390" height="844" alt="Captura real de Sales Academy: Descubrimiento. Conserva los datos de ejemplo originales de la demo." loading="lazy" /></a><figcaption><strong>Captura de la demo</strong><span>Descubrimiento · datos de ejemplo</span></figcaption></figure>
    </div>
    <div class="scenario-copy"><p class="story-label"><span></span>Simulación de uso · agentes de IA</p><h2 id="title-needs-discovery">Entender antes de proponer.</h2><p class="situation">Elena y Diego quieren entender la membresía. Ana prepara qué aclarar antes de consultar un recurso con apoyo de IA.</p><div class="dialogue" aria-label="Diálogo ficticio"><p><span>Elena</span>“No siempre sabemos con tiempo cuándo podremos viajar.”</p><p><span>Ana</span>“¿Qué flexibilidad necesitarían?”</p></div><div class="agent-question"><span class="detail-label">PREGUNTA PROPUESTA PARA EL AGENTE DE IA</span><p>«Ayúdame a revisar qué necesito aclarar antes de explicar una opción.»</p></div><div class="app-action"><span class="detail-label">EN LA APLICACIÓN</span><p>Consultar el paso de descubrimiento del Roadmap después de escuchar.</p></div><div class="next-decision"><span class="detail-label">Siguiente decisión</span><p>Revisar información oficial y señalar qué dudas necesitan confirmación.</p></div></div>
  </div>
  <div class="scenario-source"><span class="detail-label">CONTEXTO Y FUENTE</span><p>Diálogo ficticio. El reproductor del módulo aparece sin iniciar, tal como se observó en la demo. No incluye precios, disponibilidad, garantías ni condiciones comerciales inventadas. Interfaz capturada el 7 de noviembre de 2026; historia y fotografía ilustrativas.</p></div>
  <footer class="scenario-footer"><span class="export-brand">SA / SALES ACADEMY <span>UNA JORNADA CON IA · SIMULACIÓN · 03 / 06</span></span><div class="scenario-pagination">
<a class="scenario-prev" href="#tour-preparation"><span aria-hidden="true">←</span> Anterior</a>
<a class="composition-link" href="compositions/03-needs-discovery.png" download>Descargar composición <span aria-hidden="true">↓</span></a>
<a class="scenario-next" href="#objection-practice">Siguiente <span aria-hidden="true">→</span></a>
</div></footer></article>
<article class="scenario scenario-4" id="objection-practice" aria-labelledby="title-objection-practice">
  <div class="scenario-top"><p class="eyebrow"><span class="moment-number">04</span> / Ana + Jorge · Entre conversaciones</p><p class="scenario-time"><span>HORA SIMULADA</span><strong>12:20</strong></p></div>
  <div class="scenario-layout">
    <div class="scene-visual">
      <figure class="context-photo"><img src="scenes/coaching.webp" width="1672" height="941" alt="Escena ilustrativa generada: representante y líder conversan sobre una práctica en una sala de ventas." loading="lazy" /><figcaption>Escena ilustrativa generada</figcaption></figure>
      <div class="scene-note"><span aria-hidden="true">↗</span><p>Práctica simulada: escuchar y aclarar</p></div>
      <figure class="product-screen"><a class="screen-original" href="screens/07-objection-practice-mobile.png" target="_blank" rel="noopener" aria-label="Abrir captura original: Practicar objeción"><img src="screens/07-objection-practice-mobile.png" width="390" height="844" alt="Captura real de Sales Academy: Practicar objeción. Conserva los datos de ejemplo originales de la demo." loading="lazy" /></a><figcaption><strong>Captura de la demo</strong><span>Practicar objeción · datos de ejemplo</span></figcaption></figure>
    </div>
    <div class="scenario-copy"><p class="story-label"><span></span>Simulación de uso · agentes de IA</p><h2 id="title-objection-practice">Practicar una duda concreta.</h2><p class="situation">Ana prepara un ejercicio para el agente de IA y lo ensaya con Jorge, que interpreta al huésped.</p><div class="dialogue" aria-label="Diálogo ficticio"><p><span>Jorge · papel de huésped</span>“Nos interesa, pero queremos pensarlo.”</p><p><span>Ana</span>“Claro. ¿Qué información les falta para valorar si encaja con ustedes?”</p></div><div class="agent-question"><span class="detail-label">PREGUNTA PROPUESTA PARA EL AGENTE DE IA</span><p>«Quiero ensayar cómo aclarar la duda: «queremos pensarlo».»</p></div><div class="app-action"><span class="detail-label">EN LA APLICACIÓN</span><p>Abrir la vista previa Practicar objeción.</p></div><div class="next-decision"><span class="detail-label">Siguiente decisión</span><p>Ensayar una pregunta de clarificación y explicar solo lo confirmado.</p></div></div>
  </div>
  <div class="scenario-source"><span class="detail-label">CONTEXTO Y FUENTE</span><p>Roleplay Live no se observó en la demo. La captura de recurso no representa llamada activa, evaluación ni ejercicio enviado. Interfaz capturada el 7 de noviembre de 2026; historia y fotografía ilustrativas.</p></div>
  <footer class="scenario-footer"><span class="export-brand">SA / SALES ACADEMY <span>UNA JORNADA CON IA · SIMULACIÓN · 04 / 06</span></span><div class="scenario-pagination">
<a class="scenario-prev" href="#needs-discovery"><span aria-hidden="true">←</span> Anterior</a>
<a class="composition-link" href="compositions/04-objection-practice.png" download>Descargar composición <span aria-hidden="true">↓</span></a>
<a class="scenario-next" href="#leader-coaching">Siguiente <span aria-hidden="true">→</span></a>
</div></footer></article>
<article class="scenario scenario-5" id="leader-coaching" aria-labelledby="title-leader-coaching">
  <div class="scenario-top"><p class="eyebrow"><span class="moment-number">05</span> / Ana + Jorge · En equipo</p><p class="scenario-time"><span>HORA SIMULADA</span><strong>15:30</strong></p></div>
  <div class="scenario-layout">
    <div class="scene-visual">
      <figure class="context-photo"><img src="scenes/coaching.webp" width="1672" height="941" alt="Escena ilustrativa generada: representante y líder conversan sobre una práctica en una sala de ventas." loading="lazy" /><figcaption>Escena ilustrativa generada</figcaption></figure>
      <div class="scene-note"><span aria-hidden="true">↗</span><p>Siguiente práctica: confirmar lo que escuché</p></div>
      <figure class="product-screen"><a class="screen-original" href="screens/09-after-tour-mobile.png" target="_blank" rel="noopener" aria-label="Abrir captura original: Después del tour"><img src="screens/09-after-tour-mobile.png" width="390" height="844" alt="Captura real de Sales Academy: Después del tour. Conserva los datos de ejemplo originales de la demo." loading="lazy" /></a><figcaption><strong>Captura de la demo</strong><span>Después del tour · datos de ejemplo</span></figcaption></figure>
    </div>
    <div class="scenario-copy"><p class="story-label"><span></span>Simulación de uso · agentes de IA</p><h2 id="title-leader-coaching">Convertir observación en coaching.</h2><p class="situation">Jorge y Ana preparan una reflexión con apoyo de IA para elegir juntos un ajuste observable.</p><div class="dialogue" aria-label="Diálogo ficticio"><p><span>Jorge</span>“¿Qué cambió cuando preguntaste qué información faltaba?”</p><p><span>Ana</span>“Dejé de asumir la duda y pude escucharla.”</p></div><div class="agent-question"><span class="detail-label">PREGUNTA PROPUESTA PARA EL AGENTE DE IA</span><p>«Ayúdame a ordenar una reflexión sobre lo que escuché y lo que debo practicar.»</p></div><div class="app-action"><span class="detail-label">EN LA APLICACIÓN</span><p>Consultar Después del tour; el tablero de sala puede aportar contexto operativo separado.</p></div><div class="next-decision"><span class="detail-label">Siguiente decisión</span><p>Acordar resumir lo escuchado antes de responder en la siguiente práctica.</p></div></div>
  </div>
  <div class="scenario-source"><span class="detail-label">CONTEXTO Y FUENTE</span><p>El tablero /ops/ muestra operación de ejemplo; no acredita evaluación de coaching, sincronización de aprendizaje ni rendimiento del equipo. Interfaz capturada el 7 de noviembre de 2026; historia y fotografía ilustrativas.</p></div>
  <footer class="scenario-footer"><span class="export-brand">SA / SALES ACADEMY <span>UNA JORNADA CON IA · SIMULACIÓN · 05 / 06</span></span><div class="scenario-pagination">
<a class="scenario-prev" href="#objection-practice"><span aria-hidden="true">←</span> Anterior</a>
<a class="composition-link" href="compositions/05-leader-coaching.png" download>Descargar composición <span aria-hidden="true">↓</span></a>
<a class="scenario-next" href="#learning-close">Siguiente <span aria-hidden="true">→</span></a>
</div></footer></article>
<article class="scenario scenario-6" id="learning-close" aria-labelledby="title-learning-close">
  <div class="scenario-top"><p class="eyebrow"><span class="moment-number">06</span> / Ana · Al cerrar la jornada</p><p class="scenario-time"><span>HORA SIMULADA</span><strong>16:30</strong></p></div>
  <div class="scenario-layout">
    <div class="scene-visual">
      <figure class="context-photo"><img src="scenes/briefing.webp" width="1672" height="941" alt="Escena ilustrativa generada: representante y líder preparan una conversación en una sala luminosa de time share." loading="lazy" /><figcaption>Escena ilustrativa generada</figcaption></figure>
      <div class="scene-note"><span aria-hidden="true">↗</span><p>Una reflexión hoy. Una práctica para mañana.</p></div>
      <figure class="product-screen"><a class="screen-original" href="screens/11-weekly-progress-mobile.png" target="_blank" rel="noopener" aria-label="Abrir captura original: Progreso semanal"><img src="screens/11-weekly-progress-mobile.png" width="390" height="844" alt="Captura real de Sales Academy: Progreso semanal. Conserva los datos de ejemplo originales de la demo." loading="lazy" /></a><figcaption><strong>Captura de la demo</strong><span>Progreso semanal · datos de ejemplo</span></figcaption></figure>
    </div>
    <div class="scenario-copy"><p class="story-label"><span></span>Simulación de uso · agentes de IA</p><h2 id="title-learning-close">Cerrar con el siguiente paso.</h2><p class="situation">Ana prepara una pregunta al agente de IA para convertir la reflexión de hoy en una práctica para mañana.</p><div class="dialogue" aria-label="Diálogo ficticio"><p><span>Ana</span>“La pregunta abierta me ayudó a entender mejor la duda.”</p><p><span>Jorge</span>“¿Qué practicarás mañana?”</p></div><div class="agent-question"><span class="detail-label">PREGUNTA PROPUESTA PARA EL AGENTE DE IA</span><p>«Quiero convertir la reflexión de hoy en una práctica para mañana.»</p></div><div class="app-action"><span class="detail-label">EN LA APLICACIÓN</span><p>Consultar Después del tour y volver al Roadmap o al progreso demostrativo.</p></div><div class="next-decision"><span class="detail-label">Siguiente decisión</span><p>Preparar una práctica de escucha y confirmación para la siguiente jornada.</p></div></div>
  </div>
  <div class="scenario-source"><span class="detail-label">CONTEXTO Y FUENTE</span><p>No se alteran porcentajes de la demo ni se afirman mejoras de ventas; el aprendizaje pertenece al guion ficticio. Interfaz capturada el 7 de noviembre de 2026; historia y fotografía ilustrativas.</p></div>
  <footer class="scenario-footer"><span class="export-brand">SA / SALES ACADEMY <span>UNA JORNADA CON IA · SIMULACIÓN · 06 / 06</span></span><div class="scenario-pagination">
<a class="scenario-prev" href="#leader-coaching"><span aria-hidden="true">←</span> Anterior</a>
<a class="composition-link" href="compositions/06-learning-close.png" download>Descargar composición <span aria-hidden="true">↓</span></a>
<a class="scenario-next" href="#catalogo">Ver las pantallas <span aria-hidden="true">↓</span></a>
</div></footer></article>
</div><section class="catalog" id="catalogo" aria-labelledby="catalog-title"><div class="catalog-heading"><div><p class="eyebrow">EL PRODUCTO, EN CONTEXTO</p><h2 id="catalog-title">Dieciséis pantallas.<br /><em>Una mirada más cercana.</em></h2></div><p>Quince capturas de la demo y una pantalla aportada de Meet &amp; Greet con presentación retocada. Abre cada imagen y consulta también el original aportado; ninguna representa la actividad real de los personajes de esta historia.</p></div><div class="catalog-grid">
<a class="catalog-card" href="screens/01-today-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/01-today-mobile.png" width="390" height="844" alt="Captura original de la demo: Hoy · Preparar la jornada." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>01 / MÓVIL</span><h3>Hoy · Preparar la jornada</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/02-calendar-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/02-calendar-mobile.png" width="390" height="844" alt="Captura original de la demo: Calendario · Ordenar el día." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>02 / MÓVIL</span><h3>Calendario · Ordenar el día</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/03-roadmap-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/03-roadmap-mobile.png" width="390" height="844" alt="Captura original de la demo: Roadmap · Encontrar el método." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>03 / MÓVIL</span><h3>Roadmap · Encontrar el método</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/04-discovery-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/04-discovery-mobile.png" width="390" height="844" alt="Captura original de la demo: Descubrimiento · Escuchar primero." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>04 / MÓVIL</span><h3>Descubrimiento · Escuchar primero</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/05-negotiation-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/05-negotiation-mobile.png" width="390" height="844" alt="Captura original de la demo: Negociación · Explorar el paso." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>05 / MÓVIL</span><h3>Negociación · Explorar el paso</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/06-tour-preparation-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/06-tour-preparation-mobile.png" width="390" height="844" alt="Captura original de la demo: Preparar mi tour · Consultar la guía." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>06 / MÓVIL</span><h3>Preparar mi tour · Consultar la guía</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/07-objection-practice-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/07-objection-practice-mobile.png" width="390" height="844" alt="Captura original de la demo: Practicar objeción · Vista previa." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>07 / MÓVIL</span><h3>Practicar objeción · Vista previa</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/08-price-objection-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/08-price-objection-mobile.png" width="390" height="844" alt="Captura original de la demo: Objeción de precio · Revisar el recurso." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>08 / MÓVIL</span><h3>Objeción de precio · Revisar el recurso</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/09-after-tour-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/09-after-tour-mobile.png" width="390" height="844" alt="Captura original de la demo: Después del tour · Reflexionar." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>09 / MÓVIL</span><h3>Después del tour · Reflexionar</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/10-monthly-goal-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/10-monthly-goal-mobile.png" width="390" height="844" alt="Captura original de la demo: Meta del mes · Consultar la plantilla." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>10 / MÓVIL</span><h3>Meta del mes · Consultar la plantilla</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/11-weekly-progress-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/11-weekly-progress-mobile.png" width="390" height="844" alt="Captura original de la demo: Progreso semanal · Vista de ejemplo." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>11 / MÓVIL</span><h3>Progreso semanal · Vista de ejemplo</h3><p>Ver captura original</p></div></a>
<a class="catalog-card" href="screens/12-copilot-mobile.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/12-copilot-mobile.png" width="390" height="844" alt="Captura original de la demo: Copiloto · Pantalla inicial." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>12 / MÓVIL</span><h3>Copiloto · Pantalla inicial</h3><p>Ver captura original</p></div></a>
<a class="catalog-card catalog-desktop" href="screens/13-today-desktop.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/13-today-desktop.png" width="1240" height="900" alt="Captura original de la demo: Hoy · Vista de escritorio." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>13 / ESCRITORIO</span><h3>Hoy · Vista de escritorio</h3><p>Ver captura original</p></div></a>
<a class="catalog-card catalog-desktop" href="screens/14-roadmap-desktop.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/14-roadmap-desktop.png" width="1240" height="900" alt="Captura original de la demo: Roadmap · Vista de escritorio." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>14 / ESCRITORIO</span><h3>Roadmap · Vista de escritorio</h3><p>Ver captura original</p></div></a>
<a class="catalog-card catalog-desktop" href="screens/15-room-board-desktop.png" target="_blank" rel="noopener"><div class="catalog-image"><img src="screens/15-room-board-desktop.png" width="1240" height="900" alt="Captura original de la demo: Tablero de sala · Operación de ejemplo." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>15 / ESCRITORIO</span><h3>Tablero de sala · Operación de ejemplo</h3><p>Ver captura original</p></div></a>
<article class="catalog-card catalog-retouched"><a href="screens/16-meet-greet-retouched.png" target="_blank" rel="noopener" aria-label="Abrir presentación retocada de Meet &amp; Greet"><div class="catalog-image"><img src="screens/16-meet-greet-retouched.webp" width="390" height="844" alt="Meet &amp; Greet · Presentación retocada de la captura aportada." loading="lazy" /><span aria-hidden="true">↗</span></div><div class="catalog-meta"><span>16 / MÓVIL · RETOCADA</span><h3>Meet &amp; Greet · Dar la bienvenida</h3><p>Ver presentación retocada</p></div></a><a class="closing-back" href="screens/16-meet-greet-original.png" target="_blank" rel="noopener">Ver captura original <span aria-hidden="true">↗</span></a></article>
</div></section><section class="closing"><p class="eyebrow">AGENTES DE IA EN TU DÍA A DÍA</p><h2>Veamos dónde puede ayudar<br /><em>la IA en tu sala.</em></h2><p>Lleva estos seis momentos a una demo de Sales Academy. Conversemos sobre tu método, las tareas de tu equipo y el alcance de los agentes de IA.</p><div class="closing-actions"><a class="button button-gold" data-whatsapp-cta href="https://wa.me/529843163268?text=Hola%2C%20quiero%20conocer%20los%20agentes%20de%20IA%20de%20Sales%20Academy%20y%20agendar%20una%20demo%20para%20mi%20sala%20de%20ventas." target="_blank" rel="noopener noreferrer">Solicitar demo por WhatsApp <span aria-hidden="true">↗</span></a><a class="closing-back" href="/descubre/">Volver a Sales Academy <span aria-hidden="true">↗</span></a></div><p class="whatsapp-note">WhatsApp abre un mensaje que puedes revisar y enviar. La demo se acuerda en la conversación.</p></section></main><footer class="site-footer"><span>SALES ACADEMY / SOFTVIBES</span><p>Quince capturas de salesacademy.softvibes.art y una captura aportada retocada · 7 de noviembre de 2026.<br />Escenarios de IA simulados y fotos generadas. Las preguntas son propuestas editoriales, no consultas ejecutadas.</p><a href="#page-title">Volver al inicio ↑</a></footer></body></html>
````

### 30 · growth/site/assets/scenarios/scenarios.css

Bytes: 22216. SHA256: `89a4318a8c13fc52d5888a1cafe7554cf47483a8da75f2beb9f66deb8391ed6e`.

````css
@charset "UTF-8";
:root{color-scheme:light;--ink:#151a13;--cream:#f3f0e7;--paper:#e9e6dc;--gold:#d6bd82;--muted:#b6bdaf;--line:rgba(243,240,231,.18);font-family:Arial,Helvetica,sans-serif;color:var(--ink);background:var(--cream);scroll-behavior:smooth;scroll-padding-top:84px}
*{box-sizing:border-box}body{margin:0}a{color:inherit;text-decoration:none}button,a{-webkit-tap-highlight-color:transparent}a:focus-visible{outline:3px solid #a4782c;outline-offset:6px}img{display:block;max-width:100%}p,h1,h2,h3,figure,ol{margin:0}p{line-height:1.6}h1,h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.055em}em{font-weight:400}::selection{background:#d6bd82;color:#151a13}.skip-link{position:fixed;top:12px;left:16px;z-index:20;background:var(--cream);padding:16px;transform:translateY(-150%)}.skip-link:focus{transform:translateY(0)}
.site-header{height:100px;padding:0 5.5%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #d4d4c8;gap:24px}.brand{display:flex;gap:12px;align-items:center;font-size:11px;line-height:1.3;letter-spacing:.19em;font-weight:700}.brand-symbol{width:45px;height:45px;border:1px solid var(--ink);display:grid;place-items:center;letter-spacing:-.1em;font-family:Georgia,serif;font-size:24px;font-weight:400;padding-right:2px}.header-links{display:flex;gap:34px;font-size:12px}.header-links a{min-height:44px;display:flex;gap:22px;align-items:center}.header-links a:hover{text-decoration:underline;text-underline-offset:5px}.eyebrow,.detail-label{font-size:10px;line-height:1.5;letter-spacing:.16em;font-weight:700;text-transform:uppercase}.intro{display:grid;grid-template-columns:1fr 1fr;min-height:730px;padding:64px 5.5% 72px;gap:6%}.intro-copy{padding:10px 0}.intro h1{font-size:clamp(72px,7.6vw,132px);line-height:.93;margin:28px 0 28px}.intro h1 em{color:#747b63}.intro-lede{font-size:23px;line-height:1.3;letter-spacing:-.025em}.intro-description{font-size:14px;color:#535c4b;max-width:430px;margin:20px 0 28px}.button{display:inline-flex;align-items:center;justify-content:space-between;gap:38px;min-height:50px;padding:16px 22px;font-size:12px;font-weight:700;border:1px solid transparent}.button-dark{background:var(--ink);color:var(--cream)}.button-gold{background:var(--gold);color:var(--ink)}.button:hover{filter:brightness(1.08)}.intro-stats{display:flex;gap:27px;padding-top:34px;margin-top:24px;border-top:1px solid #d4d4c8;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#626955;max-width:440px}.intro-stats span{display:flex;flex-direction:column;gap:5px}.intro-stats strong{font-family:Georgia,serif;letter-spacing:-.04em;font-size:29px;font-weight:400;color:var(--ink)}.intro-visual{position:relative;min-height:650px;background:#2d3526;isolation:isolate}.intro-visual>img{width:100%;height:100%;position:absolute;object-fit:cover;object-position:44% center;z-index:-2}.intro-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 42%,rgba(14,22,13,.91));z-index:-1}.intro-photo-frame{position:absolute;inset:18px;border:1px solid rgba(255,255,255,.38)}.intro-visual figcaption{position:absolute;bottom:47px;left:38px;right:38px;color:var(--cream);display:flex;flex-direction:column;gap:17px}.photo-caption{font-size:9px;letter-spacing:.16em;color:#e3d7bb}.intro-visual figcaption strong{font-family:Georgia,serif;font-size:35px;line-height:1.08;letter-spacing:-.03em;font-weight:400}.intro-visual figcaption>span:last-child{font-size:11px;color:#d9ddcf}.intro-coordinate{position:absolute;top:36px;right:36px;background:var(--cream);padding:9px 12px;font-size:10px;letter-spacing:.16em}.reading-key{background:#e7e7dc;padding:27px 5.5%;display:grid;grid-template-columns:repeat(3,1fr);gap:25px;border-top:1px solid #d2d6c6}.reading-key p{position:relative;padding-left:20px;display:flex;flex-direction:column;font-size:10px;color:#525c49}.reading-key strong{font-size:11px;color:var(--ink);margin-bottom:3px}.key-dot{position:absolute;left:0;top:5px;width:7px;height:7px;border-radius:50%}.key-real{background:#4a694d}.key-story{background:#a07937}.key-scene{background:#777765}.chapter-index{position:sticky;top:0;z-index:10;min-height:76px;padding:10px 4%;background:rgba(19,24,17,.96);backdrop-filter:blur(12px);color:var(--cream);display:flex;gap:25px;align-items:center;border-bottom:1px solid var(--line)}.index-label{font-size:9px;letter-spacing:.17em;white-space:nowrap;color:#c0c7b5}.chapter-index ol{list-style:none;padding:0;display:flex;flex:1;justify-content:center;gap:12px}.chapter-index a{font-size:10px;display:flex;gap:10px;align-items:center;min-height:44px;padding:5px 9px;border-bottom:1px solid transparent;color:#c7cdbf;white-space:nowrap}.chapter-index a span{font-size:9px;color:#7f8b72}.chapter-index a:hover,.chapter-index a[aria-current=step]{color:#f0d9a5;border-bottom-color:#d6bd82}.chapter-index a[aria-current=step] span{color:#d6bd82}.index-progress{font-size:10px;letter-spacing:.13em;color:#d6bd82;white-space:nowrap;min-width:45px;text-align:right}
.scenario{background:#121810;color:var(--cream);padding:35px 5.5% 22px;position:relative;scroll-margin-top:75px;overflow:clip}.scenario:nth-child(even){background:#1b2218}.scenario-top{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:25px}.scenario-top .eyebrow{color:#b6c0a9;font-size:9px;display:flex;align-items:center;gap:12px}.moment-number{font-family:Georgia,serif;font-size:35px;font-weight:400;letter-spacing:-.05em;color:var(--gold)}.scenario-time{display:flex;gap:15px;align-items:center}.scenario-time span{font-size:8px;letter-spacing:.16em;color:#b6c0a9}.scenario-time strong{font-family:Georgia,serif;font-size:28px;font-weight:400;letter-spacing:-.04em}.scenario-layout{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:7%;align-items:center}.scene-visual{position:relative;min-height:680px;isolation:isolate}.context-photo{position:absolute;left:0;top:32px;width:82%;height:558px;background:#3b4631;overflow:hidden}.context-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 64%,rgba(11,19,9,.65))}.context-photo img{height:100%;width:100%;object-fit:cover;object-position:43% center}.context-photo figcaption{position:absolute;left:20px;bottom:18px;color:#fff;font-size:8px;letter-spacing:.12em;text-transform:uppercase;z-index:1}.scene-note{position:absolute;left:-15px;bottom:38px;max-width:260px;padding:22px 24px;background:#d8c38e;color:#171e11;z-index:2;display:flex;gap:20px;box-shadow:0 9px 30px rgba(0,0,0,.12)}.scene-note>span{font-size:22px;font-family:Georgia,serif}.scene-note p{font-family:Georgia,serif;font-size:20px;line-height:1.15;letter-spacing:-.025em}.product-screen{position:absolute;right:0;top:0;width:214px;z-index:3}.screen-original{display:block;border:7px solid #394132;border-radius:21px;overflow:hidden;background:#fff;box-shadow:0 22px 45px rgba(0,0,0,.35);transition:transform .25s ease}.screen-original:hover{transform:translateY(-3px)}.screen-original img{width:100%;height:auto;aspect-ratio:390/844}.product-screen figcaption{margin-top:12px;text-align:center;color:#dbe0d4;font-size:9px;line-height:1.5}.product-screen figcaption strong{font-weight:500;display:block;color:#ebd9af;font-size:9px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:3px}.scenario-copy{padding:12px 0}.story-label{display:flex;align-items:center;gap:9px;color:#ddc796;font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:18px}.story-label span{height:5px;width:5px;background:var(--gold);border-radius:50%}.scenario h2{font-size:clamp(39px,4.4vw,66px);line-height:1.04;max-width:620px;margin-bottom:21px}.situation{font-size:15px;line-height:1.65;color:#c8d0bf;max-width:560px}.dialogue{margin:23px 0;padding:0 0 0 20px;border-left:1px solid #647052;display:grid;gap:13px}.dialogue p{font-family:Georgia,serif;font-size:17px;line-height:1.38;color:#f0ede2;max-width:540px}.dialogue p span{display:block;color:#afbca0;font-family:Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:.08em;line-height:1.5;margin-bottom:4px}.app-action,.next-decision{padding:17px 0;border-top:1px solid var(--line)}.detail-label{display:block;font-size:8px;letter-spacing:.14em;color:#b2bea1;margin-bottom:6px}.app-action p,.next-decision p{font-size:12px;line-height:1.55;max-width:560px}.app-action p{color:#c6cfbc}.next-decision{padding-bottom:0}.next-decision .detail-label{color:#dcc696}.next-decision p{color:#f1e9d7}.scenario-source{margin-top:19px;border-top:1px solid var(--line);padding-top:15px;display:grid;grid-template-columns:130px 1fr;gap:20px;align-items:start}.scenario-source .detail-label{margin:2px 0}.scenario-source p{font-size:9px;line-height:1.6;color:#abb99e;max-width:1060px}.scenario-footer{margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:20px}.export-brand{font-size:9px;letter-spacing:.16em;font-weight:700;color:#e3e9d9;line-height:1.8}.export-brand span{display:block;font-size:7px;color:#a5b193;font-weight:400}.scenario-pagination{display:flex;align-items:center;gap:26px;font-size:10px}.scenario-pagination a,.pagination-disabled{min-height:44px;display:flex;gap:12px;align-items:center}.scenario-pagination a:hover{color:#e9d39e;text-decoration:underline;text-underline-offset:5px}.pagination-disabled{color:#849078}.composition-link{color:#bcc6af;font-size:9px}.scenario-pagination a:focus-visible{outline-color:#ebd39d}
.catalog{padding:90px 5.5% 100px;background:var(--cream);scroll-margin-top:90px}.catalog-heading{display:flex;justify-content:space-between;gap:60px;margin-bottom:45px;align-items:flex-end}.catalog-heading h2{font-size:52px;line-height:1.04;margin-top:20px}.catalog-heading em{color:#747b63}.catalog-heading>p{font-size:13px;color:#535d4b;max-width:355px}.catalog-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:34px 20px}.catalog-card{min-width:0}.catalog-image{height:262px;background:#dde0d3;padding:20px 22px 0;overflow:hidden;position:relative}.catalog-image img{width:100%;height:auto;box-shadow:0 3px 18px rgba(40,50,25,.1);transition:transform .25s ease}.catalog-image>span{position:absolute;right:10px;top:10px;width:26px;height:26px;display:grid;place-items:center;background:var(--cream);font-size:14px}.catalog-card:hover .catalog-image img{transform:translateY(-5px)}.catalog-meta{padding-top:13px}.catalog-meta>span{font-size:8px;letter-spacing:.16em;color:#637153}.catalog-meta h3{font-size:12px;line-height:1.45;letter-spacing:-.01em;margin-top:6px}.catalog-meta p{font-size:10px;color:#66725a;margin-top:7px}.catalog-desktop .catalog-image{display:grid;align-items:center;padding:18px 8px}.catalog-desktop .catalog-image img{object-fit:contain}.closing{padding:85px 5.5% 95px;background:#d7ddcd;text-align:center}.closing h2{font-size:64px;line-height:1.05;margin:23px 0}.closing h2 em{color:#627056}.closing>p:not(.eyebrow){font-size:14px;max-width:510px;margin:auto;color:#4d5b41}.closing-actions{display:flex;gap:36px;align-items:center;justify-content:center;margin-top:30px}.closing .button-gold{background:var(--ink);color:var(--cream)}.closing-back{font-size:11px;min-height:44px;display:flex;align-items:center;gap:17px}.site-footer{padding:35px 5.5%;display:flex;justify-content:space-between;align-items:center;gap:30px;background:var(--ink);color:var(--cream)}.site-footer>span{font-size:9px;letter-spacing:.16em}.site-footer p{font-size:9px;color:#b8c1ab}.site-footer a{font-size:10px;min-height:44px;display:flex;align-items:center;white-space:nowrap}
/* Each export is a complete, explicitly labelled composition, not a new app screenshot. */
body.export-mode{width:1600px;background:#121810}body.export-mode .site-header,body.export-mode .intro,body.export-mode .reading-key,body.export-mode .chapter-index,body.export-mode .catalog,body.export-mode .closing,body.export-mode .site-footer,body.export-mode .skip-link{display:none}body.export-mode .scenario{width:1600px;height:1000px;min-height:1000px;padding:32px 64px 24px;scroll-margin:0;overflow:visible}body.export-mode .scenario-top{height:58px;margin-bottom:15px}body.export-mode .scenario-layout{height:716px;grid-template-columns:760px 1fr;gap:62px}body.export-mode .scene-visual{height:716px;min-height:716px}body.export-mode .context-photo{top:30px;width:81%;height:620px}body.export-mode .product-screen{width:292px;top:8px;right:2px}body.export-mode .scene-note{left:-14px;bottom:25px;width:325px;max-width:325px;padding:26px 28px}body.export-mode .scene-note p{font-size:24px}body.export-mode .scenario h2{font-size:62px;line-height:1.03;margin-bottom:22px}body.export-mode .situation{font-size:17px}body.export-mode .dialogue{margin:24px 0;gap:14px}body.export-mode .dialogue p{font-size:20px}body.export-mode .dialogue p span{font-size:10px}body.export-mode .app-action p,body.export-mode .next-decision p{font-size:14px}body.export-mode .detail-label{font-size:9px}body.export-mode .app-action,body.export-mode .next-decision{padding-top:18px}body.export-mode .scenario-source{margin-top:15px;padding-top:14px;grid-template-columns:145px 1fr;min-height:55px}body.export-mode .scenario-source p{font-size:10px;max-width:none}body.export-mode .scenario-footer{margin-top:12px;height:40px}body.export-mode .export-brand{font-size:11px}body.export-mode .export-brand span{font-size:8px}body.export-mode .scenario-pagination{display:none}body.export-mode .scenario-footer:after{content:"COMPOSICIÓN EDITORIAL · ESCENA GENERADA + CAPTURA REAL";font-size:9px;letter-spacing:.13em;color:#b2bea1}body.export-mode .screen-original{transform:none}
@media(min-width:1700px){.intro,.site-header,.reading-key,.catalog,.closing,.site-footer{padding-left:max(5.5%,calc((100vw - 1500px)/2));padding-right:max(5.5%,calc((100vw - 1500px)/2))}.scenario{padding-left:max(5.5%,calc((100vw - 1500px)/2));padding-right:max(5.5%,calc((100vw - 1500px)/2))}.product-screen{width:226px}.scenario h2{max-width:610px}}
@media(max-width:1190px){.index-label{display:none}.chapter-index{gap:14px;padding-inline:3%}.chapter-index a{font-size:9px;gap:7px;padding-inline:5px}.chapter-index ol{gap:6px}.scenario-layout{gap:5%;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.product-screen{width:184px}.scene-visual{min-height:620px}.context-photo{height:510px;width:81%}.scene-note{max-width:210px;left:-12px;bottom:45px;padding:18px}.scene-note p{font-size:17px}.scenario h2{font-size:43px}.dialogue p{font-size:16px}.situation{font-size:13px}.catalog-grid{gap:25px 14px}.catalog-image{height:230px;padding-inline:15px}.intro-visual{min-height:620px}.intro-visual figcaption{left:28px;right:25px}.intro-visual figcaption strong{font-size:29px}}
@media(max-width:900px){:root{scroll-padding-top:0}.site-header{height:82px}.header-links{gap:16px;font-size:10px}.header-links a{gap:10px}.intro{padding-top:42px;gap:5%;min-height:620px}.intro h1{font-size:78px}.intro-lede{font-size:19px}.intro-description{font-size:12px}.intro-visual{min-height:575px}.intro-visual figcaption{bottom:33px}.intro-visual figcaption strong{font-size:26px}.intro-stats{gap:18px}.reading-key{gap:15px}.reading-key p{font-size:9px}.reading-key strong{font-size:10px}.chapter-index{position:relative;display:block;padding:15px 5.5%;min-height:100px}.chapter-index ol{display:grid;grid-template-columns:repeat(3,1fr);gap:0 17px}.chapter-index a{font-size:10px;padding:0;gap:9px}.index-progress{display:none}.scenario{padding-top:28px;scroll-margin-top:0}.scenario-layout{display:flex;flex-direction:column;align-items:stretch;gap:18px}.scene-visual{width:100%;max-width:640px;min-height:650px;margin:auto}.context-photo{width:80%;height:570px;top:20px}.product-screen{width:218px}.scene-note{bottom:30px;max-width:270px;padding:23px}.scene-note p{font-size:21px}.scenario-copy{padding:0 0 15px;max-width:640px;width:100%;margin:auto}.scenario h2{font-size:55px;max-width:600px}.situation{font-size:16px}.dialogue p{font-size:19px}.app-action p,.next-decision p{font-size:14px}.scenario-source{grid-template-columns:1fr;gap:4px;margin-top:14px}.scenario-source p{font-size:10px}.scenario-footer{align-items:flex-start}.scenario-pagination{gap:18px}.export-brand{font-size:8px;max-width:150px}.composition-link{font-size:9px}.catalog-heading{gap:30px}.catalog-heading h2{font-size:44px}.catalog-heading>p{max-width:290px;font-size:12px}.catalog-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 18px}.catalog-image{height:285px;padding:18px 25px 0}.catalog-desktop .catalog-image{padding:12px}.closing h2{font-size:53px}.site-footer{flex-wrap:wrap}.site-footer p{max-width:330px}}
@media(max-width:600px){.site-header{padding-inline:6%;height:76px}.brand{font-size:8px;gap:9px}.brand-symbol{width:34px;height:34px;font-size:19px}.header-links{font-size:10px;gap:8px}.header-links a:first-child{display:none}.header-links a{gap:8px}.intro{display:flex;flex-direction:column;padding:36px 6% 30px;gap:32px}.intro-copy{padding:0}.intro .eyebrow{font-size:8px;letter-spacing:.12em}.intro h1{font-size:88px;line-height:.92;margin:24px 0}.intro-lede{font-size:21px}.intro-description{font-size:13px;max-width:340px;margin-top:17px}.intro-stats{margin-top:24px;padding-top:20px;gap:25px;font-size:8px}.intro-visual{min-height:440px}.intro-visual>img{object-position:center 48%}.intro-visual figcaption{bottom:31px;left:27px;right:24px;gap:12px}.intro-visual figcaption strong{font-size:28px}.intro-coordinate{top:29px;right:28px;font-size:8px}.reading-key{display:flex;flex-direction:column;gap:15px;padding:24px 6%}.reading-key p{font-size:10px;padding-left:19px}.reading-key strong{font-size:11px}.chapter-index{padding:12px 6%}.chapter-index ol{column-gap:15px}.chapter-index a{font-size:9px;gap:7px;min-height:44px}.chapter-index a span{font-size:8px}.scenario{padding:21px 6% 23px}.scenario-top{margin-bottom:16px;gap:10px;align-items:flex-start}.scenario-top .eyebrow{font-size:7px;letter-spacing:.08em;gap:8px;max-width:220px;line-height:1.6}.moment-number{font-size:29px;flex-shrink:0}.scenario-time{display:flex;flex-direction:column;gap:2px;align-items:flex-end}.scenario-time span{font-size:6px;letter-spacing:.08em;white-space:nowrap}.scenario-time strong{font-size:24px}.scenario-layout{gap:20px}.scene-visual{min-height:560px}.context-photo{width:85%;height:450px;top:20px}.context-photo img{object-position:39% center}.context-photo figcaption{left:11px;bottom:11px;font-size:6px;letter-spacing:.07em;max-width:90px}.product-screen{width:165px;top:0;right:0}.screen-original{border-width:5px;border-radius:16px}.product-screen figcaption{font-size:8px;margin-top:9px}.product-screen figcaption strong{font-size:7px}.scene-note{left:-8px;bottom:13px;max-width:205px;padding:19px 17px;gap:14px}.scene-note>span{font-size:18px}.scene-note p{font-size:18px}.scenario-copy{padding:0 0 6px}.story-label{font-size:8px;margin-bottom:14px}.scenario h2{font-size:42px;line-height:1.05;margin-bottom:18px}.situation{font-size:14px}.dialogue{padding-left:16px;margin:21px 0;gap:15px}.dialogue p{font-size:18px}.dialogue p span{font-size:9px}.app-action p,.next-decision p{font-size:13px}.detail-label{font-size:8px}.scenario-source{margin-top:17px;padding-top:14px}.scenario-source p{font-size:9px;line-height:1.65}.scenario-footer{flex-direction:column;gap:7px;margin-top:18px}.export-brand{max-width:none;font-size:8px}.export-brand span{display:inline;margin-left:12px;font-size:6px}.scenario-pagination{width:100%;display:flex;justify-content:space-between;gap:8px;font-size:9px;flex-wrap:wrap}.scenario-pagination a,.pagination-disabled{gap:6px;min-height:44px}.composition-link{font-size:8px;order:3;width:100%;justify-content:center;border:1px solid #657254}.catalog{padding:55px 6%}.catalog-heading{display:block;margin-bottom:28px}.catalog-heading .eyebrow{font-size:8px}.catalog-heading h2{font-size:40px;margin-top:15px}.catalog-heading>p{font-size:12px;max-width:none;margin-top:22px}.catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:25px 14px}.catalog-image{height:220px;padding:15px 14px 0}.catalog-image>span{width:23px;height:23px;right:8px;top:8px;font-size:12px}.catalog-meta>span{font-size:7px}.catalog-meta h3{font-size:11px}.catalog-meta p{font-size:9px}.catalog-desktop .catalog-image{padding:7px}.closing{padding:52px 6% 57px}.closing .eyebrow{font-size:8px}.closing h2{font-size:42px;margin:21px 0}.closing>p:not(.eyebrow){font-size:13px}.closing-actions{flex-direction:column;gap:11px;margin-top:26px}.closing .button{font-size:11px;gap:30px}.site-footer{padding:27px 6%;gap:17px;align-items:flex-start}.site-footer>span{font-size:8px;width:100%}.site-footer p{font-size:8px;width:100%}.site-footer a{font-size:9px}}
@media(prefers-reduced-motion:reduce){:root{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}.screen-original:hover,.catalog-card:hover .catalog-image img{transform:none}}

/* Proposed prompts stay outside the unchanged product screenshots. */
body.export-mode .scenario-2 .scenario-footer:after{content:"COMPOSICIÓN EDITORIAL · ESCENA GENERADA + CAPTURA APORTADA RETOCADA"}
.agent-question{margin:20px 0 0;padding:14px 16px;border-left:2px solid #d6bd82;background:#20291b}
.agent-question .detail-label{display:block;color:#e3c98e;font-size:10px;letter-spacing:.1em}
.agent-question p{font-size:14px;line-height:1.55;color:#f3f0e7;margin-top:6px}
.closing .whatsapp-note{font-size:11px;line-height:1.6;margin:18px auto 0;max-width:490px}
.header-whatsapp{font-weight:700}
body.export-mode .scenario h2{font-size:54px;margin-bottom:16px}
body.export-mode .situation{font-size:16px}
body.export-mode .dialogue{margin:18px 0;gap:10px}
body.export-mode .dialogue p{font-size:18px}
body.export-mode .agent-question{margin-top:10px;padding:11px 14px}
body.export-mode .agent-question p{font-size:13px;line-height:1.5}
body.export-mode .agent-question .detail-label{font-size:9px}
body.export-mode .app-action,body.export-mode .next-decision{padding-top:12px}
@media(max-width:600px){.header-links .header-whatsapp{font-size:9px;gap:6px}.agent-question p{font-size:14px}.agent-question .detail-label{font-size:10px}.closing .whatsapp-note{font-size:11px}}
````

### 31 · growth/site/assets/scenarios/scenarios.mjs

Bytes: 1764. SHA256: `4c43225d3110c9eb8c2d1a0e7b131ff1c2ef6732b8b21f1fbff9f6d1da584f4e`.

````javascript
// The complete story and anchor navigation work before this enhancement runs.
const index = document.querySelector('.chapter-index');
const chapters = [...document.querySelectorAll('article.scenario[id]')];
const links = index ? [...index.querySelectorAll('a[href^="#"]')] : [];
const progress = document.querySelector('[data-progress]');

if (index && chapters.length && links.length === chapters.length) {
  const setCurrent = id => {
    const current = chapters.findIndex(chapter => chapter.id === id);
    if (current < 0) return;
    for (const link of links) {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
    if (progress) progress.textContent = `${String(current + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;
  };

  let frame = 0;
  let anchoredUntil = 0;
  const updateFromViewport = () => {
    frame = 0;
    if (performance.now() < anchoredUntil) return;
    const threshold = Math.min(innerHeight * .4, 300);
    const current = [...chapters].reverse().find(chapter => chapter.getBoundingClientRect().top <= threshold) || chapters[0];
    setCurrent(current.id);
  };
  const scheduleUpdate = () => {
    if (!frame) frame = requestAnimationFrame(updateFromViewport);
  };
  const updateFromAnchor = () => {
    const id = location.hash.slice(1);
    if (chapters.some(chapter => chapter.id === id)) {
      anchoredUntil = performance.now() + 1100;
      setCurrent(id);
    }
  };

  addEventListener('scroll', scheduleUpdate, {passive: true});
  addEventListener('resize', scheduleUpdate, {passive: true});
  addEventListener('hashchange', updateFromAnchor);
  setCurrent(chapters[0].id);
  updateFromAnchor();
  scheduleUpdate();
}
````

### 32 · growth/site/assets/scenarios-entry.css

Bytes: 1232. SHA256: `8fa518e67b0036e67ed4d8b6087dadfca3a8f353265911ecf01c21af351d4e58`.

````css
.room-entry{background:#f0ede4;color:#252a25;padding:100px 0}.room-entry-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(32px,5vw,84px);align-items:center}.room-entry-visual{margin:0;position:relative}.room-entry-visual img{width:100%;height:auto;aspect-ratio:16/11;object-fit:cover;border-radius:4px}.room-entry-visual figcaption{font-size:10px;letter-spacing:.12em;margin-top:12px;color:#565c50}.room-entry-copy h2{font-size:clamp(36px,4vw,60px);line-height:1.05;letter-spacing:-.04em;margin:18px 0 24px}.room-entry-copy h2 em{font-family:Georgia,serif;font-weight:400;color:#65633f}.room-entry-copy>p:not(.sa-section-label){line-height:1.65;max-width:48ch}.room-entry-facts{font-size:12px;font-weight:600;padding:12px 0 20px}.room-entry-facts span{padding:0 7px}.room-entry-guide{display:block;width:fit-content;min-height:44px;padding:15px 0 6px;font-size:13px;color:#343a30;text-decoration:underline;text-underline-offset:5px}.room-entry a:focus-visible{outline:3px solid #655b16;outline-offset:5px}@media(max-width:760px){.room-entry{padding:64px 0}.room-entry-grid{grid-template-columns:1fr;gap:30px}.room-entry-visual img{aspect-ratio:16/10}.room-entry-copy h2{font-size:40px}.room-entry-facts{font-size:11px}}
````

### 33 · growth/site/assets/site.css

Bytes: 35641. SHA256: `b4ae24a7bc5d2e315a84b3433e53ccce6f4ef637037177c76b5892dcd2197e7c`.

````css
:root {
  --paper: #f7f5f0;
  --white: #fffefa;
  --ink: #1b1d19;
  --muted: #60635b;
  --line: #dcdcd2;
  --gold: #c9a24a;
  --gold-dark: #775b1b;
  --dark: #171b17;
  --green: #354e3c;
  --soft: #ecece3;
  --radius: 8px;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--ink);
  background: var(--paper);
  font-size: 16px;
  line-height: 1.6;
  font-synthesis: none;
}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}
body {
  margin: 0;
}
button,
input,
select,
textarea {
  font: inherit;
}
button,
a,
input,
select {
  touch-action: manipulation;
}
button {
  cursor: pointer;
}
a {
  color: inherit;
}
img {
  max-width: 100%;
  display: block;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
input,
select,
textarea {
  max-width: 100%;
  min-width: 0;
}
a,
button,
input,
select,
textarea,
summary {
  outline-offset: 5px;
}
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
summary:focus-visible {
  outline: 3px solid var(--gold-dark);
}
[hidden] {
  display: none !important;
}
h1,
h2,
h3,
p {
  margin-top: 0;
}
h1,
h2,
h3 {
  line-height: 1.08;
  letter-spacing: -0.045em;
}
h1 {
  font-size: clamp(46px, 5.3vw, 78px);
  font-weight: 500;
}
h2 {
  font-size: clamp(35px, 3.8vw, 55px);
  font-weight: 500;
}
h3 {
  font-size: 23px;
  font-weight: 500;
}
p {
  color: var(--muted);
}
em {
  font-family: Georgia, serif;
  font-weight: 400;
}
::selection {
  background: #e7d7ac;
  color: var(--ink);
}
.container {
  width: min(1280px, calc(100% - 104px));
  margin-inline: auto;
}
.section {
  padding-block: 100px;
}
.eyebrow {
  font-size: 10px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  margin: 0 0 22px;
  color: var(--gold-dark);
}
.caption {
  font-size: 12px;
  line-height: 1.7;
}
.skip {
  position: fixed;
  left: 20px;
  top: -80px;
  background: var(--dark);
  color: white;
  padding: 12px;
  z-index: 100;
}
.skip:focus {
  top: 12px;
}
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  min-height: 50px;
  padding: 13px 23px;
  background: var(--ink);
  color: #fff;
  border: 1px solid var(--ink);
  border-radius: 4px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  transition:
    background 0.2s,
    transform 0.2s;
}
.button:hover {
  background: #394235;
  transform: translateY(-1px);
}
.button span {
  font-size: 19px;
  font-weight: 400;
}
.button-small {
  min-height: 44px;
  padding: 10px 16px;
  font-size: 12px;
  gap: 15px;
}
.button-outline {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}
.button-outline:hover {
  background: #e9e8df;
}
.button-gold {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--dark);
}
.button-gold:hover {
  background: #dcc17f;
}
.quiet-link {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  font-weight: 600;
  padding: 12px 0;
  min-height: 44px;
}
.quiet-link:hover {
  text-decoration: underline;
}
.text-button {
  border: 0;
  background: transparent;
  padding: 0;
  min-height: 44px;
  color: inherit;
  text-align: left;
  text-decoration: underline;
}
.site-header {
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  min-height: 104px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.13;
  letter-spacing: 2px;
  flex-shrink: 0;
}
.brand-mark {
  font:
    48px/0.8 Georgia,
    serif;
  letter-spacing: -7px;
  color: var(--gold-dark);
  padding-right: 7px;
}
.brand-mark span {
  font-size: 43px;
}
.brand-sub {
  display: block;
  font-size: 6px;
  letter-spacing: 1.5px;
  font-weight: 400;
  margin-top: 8px;
}
.nav nav {
  display: flex;
  gap: 26px;
  align-items: center;
  font-size: 12px;
}
.nav nav a {
  text-decoration: none;
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav nav a:hover {
  color: var(--gold-dark);
}
.nav-demo {
  padding-left: 25px;
  border-left: 1px solid var(--line);
}
.preview-bar {
  background: #775b1b;
  color: #fff;
  padding: 9px;
  text-align: center;
  font-size: 13px;
}
.preview-bar a {
  margin-left: 15px;
}
.hero {
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  gap: 6%;
  padding-top: 80px;
  padding-bottom: 70px;
  align-items: center;
}
.hero-copy .eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 1.1px;
}
.gold-line {
  width: 25px;
  height: 1px;
  background: var(--gold-dark);
}
.hero h1 {
  margin: 0 0 27px;
  max-width: 680px;
}
.hero-description {
  font-size: 17px;
  line-height: 1.7;
  max-width: 485px;
  margin-bottom: 30px;
}
.hero-actions {
  display: flex;
  gap: 23px;
  align-items: center;
  flex-wrap: wrap;
}
.hero-footnote {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 11px;
  color: var(--muted);
  margin-top: 37px;
}
.tiny-star {
  font-size: 31px;
  color: var(--gold-dark);
}
.hero-visual {
  position: relative;
  min-height: 540px;
  background: #e9e9df;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.visual-top {
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  letter-spacing: 1.5px;
  color: #5f6558;
}
.visual-circle {
  position: absolute;
  width: 380px;
  height: 380px;
  border: 1px solid #c9cdbc;
  border-radius: 50%;
  right: -140px;
  top: 80px;
}
.visual-circle:after {
  content: "";
  position: absolute;
  inset: 25px;
  border: 1px solid #d6d9cc;
  border-radius: 50%;
}
.visual-letter {
  position: absolute;
  bottom: 40px;
  left: 10px;
  font:
    270px/1 Georgia,
    serif;
  letter-spacing: -50px;
  color: #d5d6c6;
  opacity: 0.7;
  transform: rotate(-10deg);
}
.visual-letter span {
  font-size: 230px;
}
.product-window {
  position: relative;
  width: 75%;
  max-width: 355px;
  z-index: 1;
  background: #fffef8;
  box-shadow: 0 24px 55px #22291c1c;
  transform: rotate(-3deg);
  border: 1px solid #d6d9cd;
}
.product-window-head {
  display: flex;
  gap: 9px;
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding: 13px 14px;
  font-size: 9px;
}
.product-window-head > span:last-child {
  margin-left: auto;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold-dark);
}
.product-window-body {
  padding: 32px 25px;
}
.product-window-body .eyebrow {
  font-size: 7px;
  letter-spacing: 1.3px;
}
.product-window h2 {
  font-size: 45px;
  margin-bottom: 23px;
  letter-spacing: -0.045em;
}
.product-window h2 em {
  color: var(--gold-dark);
}
.product-window p {
  font-size: 12px;
  margin-bottom: 0;
}
.progress-route {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 22px;
}
.progress-route span {
  height: 25px;
  width: 25px;
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 8px;
}
.progress-route span:first-child {
  background: var(--dark);
  color: #fff;
}
.progress-route i {
  height: 1px;
  background: var(--line);
  width: 35px;
}
.product-window-bottom {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  font-size: 6px;
  letter-spacing: 1px;
  color: var(--muted);
}
.visual-tag {
  position: absolute;
  right: 10px;
  bottom: 80px;
  z-index: 2;
  transform: rotate(5deg);
  background: var(--dark);
  color: #f7f0df;
  padding: 18px 20px;
  font-size: 11px;
  line-height: 1.4;
  box-shadow: 0 8px 12px #0002;
}
.visual-tag span {
  float: left;
  color: var(--gold);
  font-size: 35px;
  margin-right: 15px;
}
.visual-caption {
  position: absolute;
  bottom: 15px;
  left: 25px;
  right: 25px;
  text-align: center;
  font-size: 9px;
  letter-spacing: 0.3px;
}
.principle-strip {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.principle-strip .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 77px;
  font-size: 11px;
  color: var(--muted);
}
.principle-strip span:first-child {
  font-size: 13px;
  color: var(--ink);
}
.split-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12%;
}
.split-intro h2 {
  max-width: 470px;
}
.section-lead {
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 30px;
}
.moment {
  display: flex;
  gap: 24px;
  padding: 21px 0;
  border-top: 1px solid var(--line);
}
.moment > span {
  font-size: 10px;
  color: var(--gold-dark);
  padding-top: 5px;
}
.moment h3 {
  font-size: 19px;
  margin: 0 0 8px;
}
.moment p {
  font-size: 13px;
  margin: 0;
  line-height: 1.65;
}
.platform-section {
  background: var(--dark);
  color: var(--paper);
  padding: 80px 0;
}
.platform-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 12%;
  align-items: center;
}
.platform-copy .eyebrow {
  color: #d6b66d;
}
.platform-copy > p {
  color: #bec4b8;
  font-size: 15px;
  line-height: 1.8;
}
.platform-copy .caption {
  font-size: 11px;
  margin: 24px 0 0;
}
.platform-copy .button {
  margin-top: 10px;
}
.platform-preview {
  position: relative;
  overflow: hidden;
  border: 1px solid #525749;
  background: #242a22;
  border-radius: 6px;
  padding: 20px;
}
.platform-preview > img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  object-position: center;
  border-radius: 4px;
  background: #eceae4;
}
.platform-label {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  letter-spacing: 2px;
  padding: 18px 0;
  color: #d5b76a;
}
.platform-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid #41493d;
  padding-top: 18px;
  gap: 18px;
}
.platform-steps b {
  font-size: 14px;
  font-weight: 400;
  display: block;
}
.platform-steps span {
  font-size: 10px;
  line-height: 1.6;
  color: #b1b9aa;
  display: block;
  margin-top: 6px;
}
.section-heading {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 12%;
  align-items: end;
  margin-bottom: 45px;
}
.section-heading h2 {
  margin-bottom: 0;
}
.section-heading > div > p:not(.eyebrow),
.section-heading > p {
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 8px;
}
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}
.resource-card {
  min-width: 0;
}
.resource-art {
  height: 255px;
  background: #e9e5d8;
  display: block;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}
.resource-art > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.art-overline {
  position: absolute;
  top: 21px;
  left: 23px;
  font-size: 7px;
  letter-spacing: 1.7px;
}
.art-number {
  position: absolute;
  left: 20px;
  top: 35px;
  font-family: Georgia, serif;
  font-size: 148px;
  line-height: 1.1;
  font-style: italic;
  letter-spacing: -13px;
  color: #a08445;
}
.art-lines {
  position: absolute;
  right: 30px;
  top: 77px;
  transform: rotate(-20deg);
}
.art-lines i {
  display: block;
  width: 70px;
  height: 70px;
  border: 1px solid #b9b09a;
  border-radius: 50%;
  margin-bottom: -35px;
}
.art-caption {
  position: absolute;
  left: 25px;
  bottom: 18px;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 2px;
}
.art-guide {
  background: #dfe4d8;
}
.art-guide .art-number {
  color: #617452;
}
.art-guide .art-lines i {
  border-color: #96a88c;
  border-radius: 0;
  width: 70px;
  height: 70px;
  transform: rotate(20deg);
  margin-bottom: -45px;
}
.art-matrix {
  background: #282e25;
  color: #d9e2cf;
}
.art-matrix .art-number {
  color: #c6bd9c;
}
.art-matrix .art-lines i {
  border-color: #8e9a80;
  border-radius: 0;
  width: 65px;
  height: 25px;
  margin-bottom: 10px;
}
.resource-info {
  padding-top: 20px;
}
.meta {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: var(--muted);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 13px;
}
.resource-info h3 {
  margin-bottom: 12px;
  font-size: 22px;
  line-height: 1.25;
}
.resource-info h3 a {
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.resource-info h3 a:hover {
  text-decoration: underline;
}
.resource-info h3 span {
  font-size: 18px;
  font-weight: 400;
}
.resource-info p {
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 16px;
}
.resource-role {
  font-size: 10px;
  display: inline-block;
  border-top: 1px solid var(--line);
  padding-top: 14px;
  width: 100%;
}
.stages-section {
  background: #eceee6;
}
.stages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid #cdd1c5;
}
.stages article {
  padding: 32px 35px 35px 0;
}
.stages article + article {
  border-left: 1px solid #cdd1c5;
  padding-left: 35px;
}
.stage-no {
  display: block;
  font:
    55px/1 Georgia,
    serif;
  color: var(--gold-dark);
  margin-bottom: 36px;
}
.stage-no span {
  font:
    9px/1.5 Arial,
    sans-serif;
  letter-spacing: 1px;
  color: var(--muted);
}
.stages h3 {
  font-size: 30px;
}
.stages p {
  font-size: 13px;
  line-height: 1.8;
}
.stage-note {
  font-size: 8px;
  letter-spacing: 1.6px;
  display: block;
  margin-top: 28px;
}
.stages-section .caption {
  border-top: 1px solid #cdd1c5;
  padding-top: 20px;
  max-width: 850px;
  margin-bottom: 0;
}
.diagnosis-teaser {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 14%;
  align-items: center;
}
.diagnosis-teaser > div > p:not(.eyebrow) {
  font-size: 15px;
  line-height: 1.8;
  max-width: 480px;
}
.diagnosis-teaser .button {
  margin-top: 15px;
}
.diagnosis-graphic {
  padding: 35px;
  background: #ebe7dc;
  border-left: 4px solid var(--gold);
}
.diagnosis-graphic > span {
  font-size: 8px;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 25px;
}
.diagnosis-graphic > div {
  padding: 20px 0;
  border-bottom: 1px solid #cbc6b8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.diagnosis-graphic b {
  font-size: 19px;
  font-weight: 400;
}
.diagnosis-graphic i {
  width: 16px;
  height: 16px;
  border: 1px solid #a3936e;
  border-radius: 50%;
}
.diagnosis-graphic > div:nth-child(3) i {
  background: var(--gold-dark);
  box-shadow: 0 0 0 5px #d7c9a7;
}
.diagnosis-graphic p {
  font:
    italic 21px Georgia,
    serif;
  margin: 25px 0 0;
  color: #60593e;
}
.faq-section {
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 12%;
  padding-top: 70px;
}
.faq-list details {
  border-bottom: 1px solid var(--line);
}
.faq-list summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  padding: 22px 0;
  font-size: 15px;
  line-height: 1.5;
}
.faq-list summary::-webkit-details-marker {
  display: none;
}
.faq-list summary > span {
  font-size: 22px;
  color: var(--gold-dark);
}
.faq-list details[open] summary > span {
  transform: rotate(45deg);
}
.faq-list details > p {
  font-size: 13px;
  line-height: 1.8;
  margin-bottom: 25px;
  max-width: 90%;
}
.contact-section {
  background: #e9e8df;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12%;
  align-items: start;
}
.contact-grid h2 {
  font-size: 45px;
}
.contact-grid > div > p {
  font-size: 14px;
  line-height: 1.8;
}
.contact-grid > div > .caption {
  font-size: 12px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.full {
  grid-column: 1/-1;
}
label {
  display: block;
  font-size: 12px;
  font-weight: 600;
}
input,
select,
textarea {
  border: 1px solid #c8cabe;
  background: #fffefa;
  border-radius: 4px;
  width: 100%;
  min-height: 48px;
  padding: 11px 12px;
  color: var(--ink);
  margin-top: 7px;
  font-size: 14px;
  line-height: 1.5;
}
textarea {
  resize: vertical;
  min-height: 115px;
}
.check-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 11px;
  font-weight: 400;
  margin-block: 19px;
}
.check-label > input {
  width: 17px;
  height: 17px;
  min-height: 17px;
  flex-shrink: 0;
  margin: 3px 0 0;
  accent-color: var(--gold-dark);
}
.form-status {
  font-size: 13px;
  line-height: 1.6;
  margin-top: 14px;
}
.form-status.error {
  color: #9c3127;
}
.form-status.success {
  color: #2b5a37;
}
.site-footer {
  padding-top: 60px;
  background: var(--dark);
  color: #eeeee5;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  align-items: start;
  padding-bottom: 50px;
}
.footer-grid .brand-mark {
  color: #d6b66d;
}
.footer-grid > p {
  font-size: 20px;
  line-height: 1.5;
  color: #b9c0b1;
}
.footer-grid > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-self: end;
  font-size: 12px;
}
.footer-grid > div > a {
  display: block;
  min-height: 35px;
  text-decoration: none;
}
.footer-grid > div > a:hover {
  text-decoration: underline;
}
.footer-grid .text-button {
  font-size: 12px;
  color: #b9c0b1;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid #3d4438;
  padding-block: 20px;
  font-size: 9px;
  letter-spacing: 0.5px;
  color: #a1ac97;
}
.consent-panel {
  position: fixed;
  z-index: 60;
  bottom: 20px;
  left: 20px;
  right: 20px;
  max-width: 780px;
  margin: auto;
  display: flex;
  gap: 20px;
  align-items: center;
  border: 1px solid var(--line);
  background: #fffefa;
  box-shadow: 0 10px 50px #0003;
  padding: 20px;
  border-radius: 8px;
}
.consent-panel strong {
  font-size: 13px;
}
.consent-panel p {
  font-size: 11px;
  line-height: 1.7;
  margin: 4px 0 0;
}
.consent-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-direction: column;
}
.consent-panel .button {
  min-width: 175px;
}
.hub-hero {
  padding-top: 76px;
  padding-bottom: 35px;
}
.hub-intro {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 8%;
  align-items: center;
}
.hub-intro h1 {
  font-size: 72px;
  line-height: 1.04;
  margin-bottom: 45px;
}
.hub-intro h1 em {
  color: var(--gold-dark);
}
.hub-intro p {
  font-size: 15px;
  line-height: 1.8;
}
.hub-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 1.5px;
  border-top: 1px solid var(--line);
  padding-top: 23px;
}
.hub-meta span:last-child {
  letter-spacing: 0;
  color: var(--muted);
}
.hub-content {
  padding-bottom: 90px;
}
.hub-filters {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr auto;
  gap: 16px;
  align-items: end;
  background: #ecece3;
  padding: 22px;
  margin: 15px 0;
}
.hub-filters label > span {
  font-size: 9px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}
.hub-filters input,
.hub-filters select {
  font-size: 12px;
  min-height: 44px;
}
.results-line {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin: 25px 0;
}
.results-line p {
  margin: 0;
}
.hub-content .resource-grid {
  row-gap: 45px;
}
.empty-state {
  padding: 50px;
  background: #ecece3;
  text-align: center;
  grid-column: 1/-1;
}
.empty-state h2 {
  font-size: 30px;
  max-width: 550px;
  margin: 15px auto;
}
.empty-symbol {
  font-size: 45px;
  color: var(--gold-dark);
}
.hub-cta {
  margin-top: 80px;
  padding: 40px;
  background: #e9e5d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 35px;
}
.hub-cta .eyebrow {
  margin-bottom: 12px;
}
.hub-cta h2 {
  font-size: 33px;
  margin-bottom: 15px;
}
.hub-cta p {
  font-size: 13px;
  margin-bottom: 0;
}
.reading-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 0 9%;
  padding-top: 45px;
  padding-bottom: 100px;
  max-width: 1150px;
}
.reading-head {
  grid-column: 1/-1;
  max-width: 900px;
}
.reading-head > .quiet-link {
  margin-bottom: 40px;
  color: var(--muted);
  font-size: 12px;
}
.reading-head h1 {
  font-size: 62px;
  max-width: 880px;
}
.reading-excerpt {
  font-size: 20px;
  max-width: 750px;
}
.reading-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding-block: 25px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 40px;
  font-size: 11px;
}
.reading-body {
  grid-column: 1;
  grid-row: 2;
  min-width: 0;
}
.reading-body > h2 {
  font-size: 31px;
  margin: 38px 0 20px;
}
.reading-body > h2:first-child {
  margin-top: 0;
}
.reading-body p,
.reading-body li {
  font-size: 16px;
  line-height: 1.9;
  color: var(--muted);
}
.reading-body ul {
  padding-left: 22px;
}
.reading-body li {
  margin-bottom: 12px;
}
.reading-aside {
  grid-column: 2;
  grid-row: 2;
}
.sticky-note {
  position: sticky;
  top: 30px;
  border-top: 3px solid var(--gold);
  padding: 25px 22px;
  background: #ebe8dc;
}
.sticky-note h2 {
  font:
    italic 32px Georgia,
    serif;
  margin-bottom: 20px;
}
.sticky-note p {
  font-size: 12px;
  line-height: 1.8;
}
.sticky-note .eyebrow {
  font-size: 8px;
  line-height: 1.7;
}
.sticky-note .caption {
  font-size: 10px;
  margin-top: 17px;
}
.article-source {
  font-size: 11px !important;
  border-top: 1px solid var(--line);
  padding-top: 20px;
  margin-top: 45px;
}
.article-next {
  margin-top: 50px;
  border: 1px solid var(--line);
  padding: 35px;
}
.article-next h2 {
  font-size: 32px;
}
.article-next > p {
  font-size: 14px;
}
.article-next > .eyebrow {
  font-size: 9px;
}
.table-scroll {
  overflow: auto;
  margin: 30px 0;
  max-width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th,
td {
  text-align: left;
  vertical-align: top;
  padding: 14px;
  border: 1px solid var(--line);
  min-width: 120px;
}
th {
  background: #ebece2;
  font-weight: 600;
}
.article-cover {
  border-radius: 5px;
  margin-bottom: 35px;
}
.external-media {
  border: 1px solid var(--line);
  padding: 25px;
  margin: 25px 0;
}
.legal-page {
  max-width: 860px;
  padding-block: 75px;
}
.legal-page h1 {
  margin-bottom: 35px;
}
.legal-page h2 {
  font-size: 27px;
  margin: 40px 0 20px;
}
.legal-page p {
  line-height: 1.9;
}
.diagnostic-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10%;
  padding-block: 80px 100px;
  align-items: start;
}
.diagnostic-intro h1 {
  font-size: 58px;
}
.diagnostic-intro > p {
  font-size: 15px;
  line-height: 1.9;
}
.diagnostic-intro em {
  color: var(--gold-dark);
}
.diagnostic-promise {
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin: 30px 0;
  gap: 16px;
}
.diagnostic-intro > .caption {
  font-size: 12px;
  max-width: 420px;
}
.diagnostic-workspace {
  background: #fffefa;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 32px;
}
.diagnostic-progress {
  font-size: 10px;
  display: flex;
  gap: 22px;
  align-items: center;
  color: var(--muted);
  margin-bottom: 30px;
}
.diagnostic-progress progress {
  accent-color: var(--gold-dark);
  height: 4px;
  flex: 1;
  width: auto;
}
.question-dimension {
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold-dark);
  display: block;
  margin-bottom: 15px;
}
.diagnostic-workspace fieldset {
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}
.diagnostic-workspace legend {
  font-size: 24px;
  line-height: 1.4;
  letter-spacing: -0.5px;
  margin-bottom: 25px;
}
.question-choice {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  border: 1px solid var(--line);
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
}
.question-choice:has(input:checked) {
  border-color: #7d662e;
  background: #f4eddc;
}
.question-choice input {
  width: 17px;
  height: 17px;
  min-height: 17px;
  margin: 0;
  accent-color: var(--gold-dark);
}
.diagnostic-controls {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 30px;
}
.diagnostic-controls .button {
  font-size: 12px;
  min-height: 46px;
  padding: 10px 17px;
}
.result-label {
  font-size: 10px;
  letter-spacing: 1.5px;
  color: var(--gold-dark);
}
#result-title {
  font-size: 34px;
  margin: 20px 0;
}
.score-list {
  margin: 25px 0;
}
.score-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  border-bottom: 1px solid var(--line);
  padding: 13px 0;
  font-size: 12px;
}
.score-row strong {
  color: var(--gold-dark);
}
.result-priorities {
  padding: 20px;
  background: #ecece3;
}
.result-priorities h3 {
  font-size: 20px;
}
.result-priorities p {
  font-size: 13px;
}
.result-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0;
}
.result-links a {
  font-size: 13px;
  padding: 10px 0;
}
.result-answers summary {
  cursor: pointer;
  font-size: 12px;
  padding: 15px 0;
}
.result-answers ol {
  padding-left: 20px;
  font-size: 11px;
  color: var(--muted);
}
.result-answers li {
  margin-bottom: 12px;
}
.result-bottom {
  margin-top: 25px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.notice {
  padding: 20px;
  background: #f2ead4;
  font-size: 14px;
}
.diagnostic-workspace .caption {
  margin-top: 20px;
}
@media (min-width: 1450px) {
  .hero {
    padding-top: 100px;
    padding-bottom: 90px;
  }
  .hero-visual {
    min-height: 590px;
  }
}
@media (max-width: 1100px) {
  .container {
    width: calc(100% - 64px);
  }
  .nav nav {
    gap: 18px;
  }
  .nav-demo {
    padding-left: 15px;
  }
  .hero {
    gap: 5%;
    padding-top: 55px;
  }
  .hero-visual {
    min-height: 510px;
  }
  .hero h1 {
    font-size: 62px;
  }
  .hero-actions {
    gap: 12px;
  }
  .hero .quiet-link {
    font-size: 12px;
  }
  .visual-tag {
    right: 4px;
    font-size: 10px;
  }
  .product-window h2 {
    font-size: 39px;
  }
  .resource-art {
    height: 220px;
  }
  .platform-grid {
    gap: 7%;
  }
  .hub-filters {
    grid-template-columns: 1fr 1fr;
  }
  .hub-filters .search-field {
    grid-column: 1/-1;
  }
  .hub-filters > .button {
    grid-column: 2;
    align-self: end;
  }
  .reading-layout {
    gap: 0 5%;
    grid-template-columns: minmax(0, 1fr) 240px;
  }
  .diagnostic-layout {
    gap: 6%;
  }
  .diagnostic-intro h1 {
    font-size: 48px;
  }
  .nav > .button {
    font-size: 11px;
    padding: 10px 12px;
    gap: 10px;
  }
}
@media (max-width: 800px) {
  .container {
    width: calc(100% - 40px);
  }
  .nav {
    min-height: 89px;
    gap: 15px;
  }
  .nav nav {
    display: none;
  }
  .brand {
    font-size: 10px;
  }
  .brand-mark {
    font-size: 43px;
  }
  .brand-mark span {
    font-size: 38px;
  }
  .brand-sub {
    font-size: 5px;
  }
  .hero {
    grid-template-columns: 1fr;
    padding-top: 50px;
    gap: 42px;
  }
  .hero h1 {
    font-size: 58px;
    max-width: 650px;
  }
  .hero-description {
    font-size: 16px;
    max-width: 550px;
  }
  .hero-visual {
    min-height: 480px;
    width: 100%;
    max-width: none;
  }
  .product-window {
    width: 320px;
    max-width: 75%;
  }
  .visual-tag {
    right: 8%;
    bottom: 75px;
  }
  .hero-footnote {
    margin-top: 25px;
  }
  .principle-strip .container {
    flex-wrap: wrap;
    gap: 10px 22px;
    padding-block: 20px;
  }
  .principle-strip span:first-child {
    width: 100%;
  }
  .principle-strip span {
    font-size: 10px;
  }
  .section {
    padding-block: 65px;
  }
  .split-intro {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .split-intro h2 {
    max-width: 550px;
  }
  .section-lead {
    font-size: 16px;
  }
  .platform-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .platform-section {
    padding-block: 60px;
  }
  .platform-preview > img {
    max-height: 360px;
  }
  .platform-copy h2 {
    max-width: 520px;
  }
  .section-heading {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .section-heading h2 {
    font-size: 42px;
  }
  .section-heading > p,
  .section-heading > div > p {
    max-width: 550px;
  }
  .resource-grid {
    gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
  .resource-grid .resource-card:last-child:nth-child(odd) {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
  .resource-grid .resource-card:last-child:nth-child(odd) .resource-art {
    height: 230px;
  }
  .stages article {
    padding-right: 20px;
  }
  .stages article + article {
    padding-left: 20px;
  }
  .stage-no {
    font-size: 43px;
  }
  .stages h3 {
    font-size: 25px;
  }
  .stages p {
    font-size: 12px;
  }
  .diagnosis-teaser {
    grid-template-columns: 1fr 1fr;
    gap: 6%;
  }
  .diagnosis-teaser h2 {
    font-size: 36px;
  }
  .diagnosis-graphic {
    padding: 25px;
  }
  .faq-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .faq-section h2 br {
    display: none;
  }
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .contact-grid h2 {
    font-size: 42px;
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  .footer-grid > p {
    font-size: 16px;
  }
  .footer-grid > div {
    grid-column: 1/-1;
    justify-self: start;
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }
  .footer-grid > div > a {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  .hub-intro {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .hub-intro h1 {
    font-size: 58px;
    margin-bottom: 20px;
  }
  .hub-intro > p {
    max-width: 500px;
  }
  .hub-meta {
    margin-top: 25px;
  }
  .hub-cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
  }
  .reading-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .reading-head h1 {
    font-size: 50px;
  }
  .reading-excerpt {
    font-size: 18px;
  }
  .reading-aside {
    grid-column: 1;
    grid-row: 3;
    margin-top: 25px;
  }
  .sticky-note {
    position: static;
  }
  .reading-body {
    grid-row: 2;
  }
  .diagnostic-layout {
    grid-template-columns: 1fr;
    padding-top: 50px;
    gap: 30px;
  }
  .diagnostic-intro h1 {
    font-size: 49px;
  }
  .diagnostic-promise {
    display: none;
  }
  .diagnostic-intro > .caption {
    max-width: 600px;
  }
  .diagnostic-workspace {
    padding: 28px;
  }
  .consent-panel {
    padding: 16px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    gap: 15px;
  }
  .consent-panel .button {
    min-width: 150px;
  }
  .consent-panel p {
    font-size: 10px;
  }
  .legal-page h1 {
    font-size: 52px;
  }
}
@media (max-width: 500px) {
  .hero h1 {
    font-size: 46px;
    line-height: 1.06;
  }
  .hero .eyebrow {
    font-size: 8px;
    letter-spacing: 0.8px;
    gap: 8px;
  }
  .hero-actions {
    display: block;
  }
  .hero-actions > .quiet-link {
    margin-top: 10px;
  }
  .hero-visual {
    min-height: 450px;
  }
  .product-window {
    max-width: 78%;
  }
  .product-window h2 {
    font-size: 40px;
  }
  .product-window-body {
    padding: 25px 20px;
  }
  .visual-tag {
    right: 0;
    font-size: 9px;
    padding: 14px;
    bottom: 70px;
  }
  .visual-tag span {
    font-size: 26px;
  }
  .visual-caption {
    font-size: 8px;
    bottom: 12px;
  }
  .principle-strip .container {
    gap: 9px 16px;
  }
  .principle-strip span {
    font-size: 8px;
  }
  .section-heading h2,
  h2 {
    font-size: 35px;
  }
  .resource-grid {
    grid-template-columns: 1fr;
  }
  .resource-art {
    height: 260px;
  }
  .resource-grid .resource-card:last-child:nth-child(odd) {
    display: block;
  }
  .resource-grid .resource-card:last-child:nth-child(odd) .resource-art {
    height: 260px;
  }
  .resource-card {
    margin-bottom: 15px;
  }
  .stages {
    grid-template-columns: 1fr;
  }
  .stages article,
  .stages article + article {
    border-left: 0;
    border-bottom: 1px solid #cdd1c5;
    padding: 28px 0;
    display: grid;
    grid-template-columns: 82px 1fr;
    gap: 0 20px;
  }
  .stage-no {
    grid-row: 1/4;
    margin: 0;
    font-size: 43px;
    line-height: 1.2;
  }
  .stage-no > span {
    display: block;
    font-size: 8px;
    margin-top: 12px;
  }
  .stages h3 {
    font-size: 28px;
    margin-bottom: 12px;
  }
  .stages p {
    font-size: 13px;
  }
  .stage-note {
    grid-column: 2;
    margin-top: 8px;
  }
  .stages-section .caption {
    border-top: 0;
  }
  .diagnosis-teaser {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .diagnosis-graphic {
    padding: 30px;
  }
  .contact-grid h2 {
    font-size: 36px;
  }
  .form-grid {
    gap: 14px;
  }
  .form-grid label {
    font-size: 11px;
  }
  .check-label {
    font-size: 11px;
  }
  .nav > .button {
    font-size: 10px;
    padding: 10px;
    gap: 6px;
  }
  .nav > .button > span {
    font-size: 15px;
  }
  .brand {
    gap: 10px;
  }
  .brand-mark {
    font-size: 37px;
    letter-spacing: -5px;
  }
  .brand-mark span {
    font-size: 33px;
  }
  .brand-sub {
    font-size: 4px;
    letter-spacing: 1px;
  }
  .brand {
    font-size: 9px;
    letter-spacing: 1px;
  }
  .footer-grid {
    gap: 22px;
  }
  .footer-grid > p {
    font-size: 14px;
  }
  .footer-bottom {
    font-size: 8px;
    flex-direction: column;
    gap: 8px;
  }
  .hub-hero {
    padding-top: 50px;
  }
  .hub-intro h1 {
    font-size: 47px;
  }
  .hub-meta {
    font-size: 8px;
    letter-spacing: 1px;
    gap: 10px;
  }
  .hub-filters {
    padding: 17px;
    gap: 14px;
  }
  .hub-filters select {
    font-size: 11px;
  }
  .hub-filters > label:nth-child(4) {
    grid-column: 1;
  }
  .hub-filters > .button {
    height: 44px;
  }
  .hub-content {
    padding-bottom: 60px;
  }
  .hub-cta {
    margin-top: 45px;
    padding: 25px;
  }
  .hub-cta h2 {
    font-size: 30px;
  }
  .reading-head h1 {
    font-size: 43px;
  }
  .reading-excerpt {
    font-size: 17px;
  }
  .reading-meta {
    font-size: 10px;
    gap: 12px 20px;
  }
  .reading-body > h2 {
    font-size: 28px;
  }
  .reading-body p,
  .reading-body li {
    font-size: 15px;
  }
  .article-next {
    padding: 25px;
  }
  .article-next h2 {
    font-size: 29px;
  }
  .diagnostic-layout {
    padding-bottom: 65px;
  }
  .diagnostic-intro h1 {
    font-size: 43px;
  }
  .diagnostic-workspace {
    padding: 22px;
  }
  .diagnostic-workspace legend {
    font-size: 22px;
  }
  .question-choice {
    font-size: 12px;
    padding: 13px;
  }
  .diagnostic-controls .button {
    padding: 10px 13px;
    font-size: 11px;
  }
  .consent-panel {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .consent-actions {
    flex-direction: row;
    gap: 8px;
  }
  .consent-panel .button {
    min-width: 0;
    flex: 1;
    font-size: 10px;
    padding: 9px;
  }
  .consent-panel p {
    font-size: 10px;
  }
  .consent-panel strong {
    font-size: 12px;
  }
  .legal-page {
    padding-block: 50px;
  }
  .legal-page h1 {
    font-size: 43px;
  }
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *:before,
  *:after {
    transition: none !important;
    animation: none !important;
  }
}
@media print {
  .site-header,
  .site-footer,
  .consent-panel,
  .reading-aside,
  .article-next,
  .reading-head > .quiet-link {
    display: none !important;
  }
  .reading-layout {
    display: block;
    width: 100%;
    padding: 0;
  }
  .reading-head h1 {
    font-size: 32px;
  }
  .reading-body p,
  .reading-body li {
    font-size: 11pt;
    color: black;
  }
  .reading-body h2 {
    font-size: 19pt;
  }
  body {
    background: white;
  }
}

.platform-section :focus-visible,
.site-footer :focus-visible {
  outline-color: #d6b66d;
}
.preview-bar :focus-visible {
  outline-color: #fffefa;
}
````

### 34 · growth/site/assets/site.mjs

Bytes: 4009. SHA256: `a2b6fd25d479de5b63484b2f59353e681959da8113811dee6ef38f435f037316`.

````javascript
const PREVIEW = document.body.dataset.preview === "true";
let preference = null,
  flowId = null;
try {
  preference = localStorage.getItem("sa.growth.consent");
} catch {}
if (preference === "granted") flowId = crypto.randomUUID();
const panel = document.getElementById("consent-panel");
if (panel && !preference && !PREVIEW) panel.hidden = false;
export function track(event, placement = "hero", resourceId) {
  if (preference !== "granted" || PREVIEW) return;
  const payload = {
    eventId: crypto.randomUUID(),
    flowId: flowId || (flowId = crypto.randomUUID()),
    event,
    placement,
    consentVersion: "2026-11-07",
  };
  if (resourceId) payload.resourceId = resourceId;
  fetch("/growth-api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
function pageEvent() {
  const type = document.body.dataset.page;
  if (type === "landing") track("landing_viewed", "hero");
  if (type === "resource")
    track(
      "resource_viewed",
      "resource",
      document.querySelector("[data-resource-id]")?.dataset.resourceId,
    );
}
document.querySelectorAll("[data-consent-settings]").forEach((b) =>
  b.addEventListener("click", () => {
    panel.hidden = false;
    panel.querySelector("button").focus();
  }),
);
document.querySelectorAll("[data-consent]").forEach((b) =>
  b.addEventListener("click", () => {
    const before = preference;
    preference = b.dataset.consent;
    try {
      localStorage.setItem("sa.growth.consent", preference);
    } catch {}
    flowId = preference === "granted" ? crypto.randomUUID() : null;
    panel.hidden = true;
    if (before !== "granted" && preference === "granted") pageEvent();
  }),
);
pageEvent();
const form = document.getElementById("demo-form");
if (form) {
  const status = document.getElementById("demo-status");
  form.querySelector("[type=submit]").disabled =
    form.dataset.enabled !== "true" || PREVIEW;
  let pending = null;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.dataset.enabled !== "true" || PREVIEW) return;
    if (!form.reportValidity()) return;
    const f = new FormData(form),
      payload = {
        email: f.get("email"),
        role: f.get("role"),
        roomCountBucket: f.get("roomCountBucket"),
        need: f.get("need"),
        contactConsent: f.get("contactConsent") === "on",
        marketingOptIn: f.get("marketingOptIn") === "on",
        privacyVersion: "2026-11-07",
      };
    const body = JSON.stringify(payload);
    if (!pending || pending.body !== body)
      pending = { body, key: crypto.randomUUID() };
    const submit = form.querySelector("[type=submit]");
    submit.disabled = true;
    status.className = "form-status";
    status.textContent = "Enviando tu solicitud…";
    try {
      const res = await fetch("/growth-api/demo-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": pending.key,
        },
        body,
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error?.message ||
            "No pudimos recibir tu solicitud. Inténtalo de nuevo.",
        );
      if (!data.received || !data.id)
        throw new Error(
          "No se pudo confirmar la recepción. Conservamos tus datos para reintentar.",
        );
      status.className = "form-status success";
      status.textContent =
        "Recibimos tu solicitud. La revisaremos para responder sobre Sales Academy. Tu referencia: " +
        data.id +
        ".";
      form.reset();
      pending = null;
    } catch (err) {
      status.className = "form-status error";
      status.textContent =
        err.message === "Failed to fetch"
          ? "No pudimos enviar tu solicitud. Tus datos siguen aquí para reintentar."
          : err.message;
    } finally {
      submit.disabled = false;
    }
  });
}
````

### 35 · growth/site/templates/analysis.html

Bytes: 3979. SHA256: `68c4e6ffe7ea008e6e92edb08abe4ab6aa52e9d1b157b36acf12554ebffc2c63`.

````html
{% extends 'base.html' %}
{% block title %}Agentes de IA en la sala · Análisis del recorrido{% endblock %}
{% block page %}analysis{% endblock %}
{% block content %}
<section class="container hub-hero">
  <p class="eyebrow">SALES ACADEMY / VISIÓN Y CASOS DE USO</p>
  <div class="hub-intro"><h1>Tu método.<br /><em>Con agentes de IA.</em></h1><p>Una propuesta para conectar conocimiento, práctica y acompañamiento con los momentos concretos de la jornada.</p></div>
  <div class="hub-meta"><span>PREPARAR · PRACTICAR · ACOMPAÑAR</span><span>7 de noviembre de 2026</span></div>
</section>
<article class="container legal-page">
  <h2>La IA cobra sentido cuando ayuda con una tarea.</h2>
  <p>Antes del tour, una pregunta para preparar la conversación. Entre visitas, una objeción que ensayar. Al terminar, una reflexión para revisar con el líder. Sales Academy propone agentes de inteligencia artificial alrededor del método y los recursos de cada sala.</p>
  <p>La nueva experiencia conecta esa visión con pantallas reales de la demo y situaciones ficticias. El visitante puede imaginar una jornada y reconocer qué quiere explorar en una demostración.</p>
  <h2>Cinco pilares, una jornada conectada.</h2>
  <ol>
    <li><strong>Preparar:</strong> ubicar la siguiente conversación y formular una consulta útil al agente.</li>
    <li><strong>Aprender:</strong> conectar la pregunta con el método y los materiales aprobados.</li>
    <li><strong>Practicar:</strong> ensayar una objeción con contexto y volver a intentarlo.</li>
    <li><strong>Acompañar:</strong> convertir una reflexión en una conversación de coaching con el líder.</li>
    <li><strong>Escalar:</strong> acordar cómo adaptar agentes, recursos y responsabilidades a cada sala.</li>
  </ol>
  <h2>Una historia breve para abrir la conversación.</h2>
  <p>El video principal de 33 segundos presenta la visión de un agente dentro de Sales Academy. Sus interfaces conceptuales se acompañan de capturas reales en el recorrido. Puedes reproducirlo cuando quieras y solicitar una demo en cualquier momento.</p>
  <p>Los <a href="/growth-assets/scenarios/index.html">seis escenarios de uso</a> muestran preguntas propuestas para los agentes y decisiones humanas. Las fotos son ilustraciones generadas; las pantallas conservan los datos de ejemplo de la demo. Las escenas no representan consultas enviadas ni resultados comerciales medidos.</p>
  <h2>De explorar a agendar una demo.</h2>
  <ol>
    <li><strong>Descubrir:</strong> comprender en el video qué propone Sales Academy.</li>
    <li><strong>Reconocer:</strong> encontrar una tarea de tu sala en los casos de uso.</li>
    <li><strong>Profundizar:</strong> consultar recursos o responder el diagnóstico sin entregar datos de contacto.</li>
    <li><strong>Conversar:</strong> abrir WhatsApp con una solicitud preparada, revisar el texto y enviarlo si quieres.</li>
    <li><strong>Acordar:</strong> confirmar con el equipo el horario y el alcance de la demostración.</li>
  </ol>
  <h2>Un punto de partida para tres salas.</h2>
  <p>La propuesta es establecer una base, probar qué se puede repetir y adaptar el contexto de cada sala. Se acuerdan materiales, responsabilidades y alcance antes de operar con información real. Las pantallas de ejemplo no acreditan una implementación ya completada.</p>
  <h2>Qué revisar en una demo.</h2>
  <ul><li>Qué tareas del representante conviene apoyar primero con IA.</li><li>Qué conocimiento y reglas necesita el agente de tu sala.</li><li>Qué revisa el líder y qué decisiones conserva el equipo.</li><li>Qué funciones están disponibles y qué requiere configurar o desarrollar para el piloto.</li></ul>
  <div class="hero-actions"><a class="button" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer" data-whatsapp-demo>Solicitar demo por WhatsApp ↗</a><a class="campaign-link" href="/descubre/">Volver al recorrido →</a></div>
</article>
{% endblock %}
````

### 36 · growth/site/templates/base.html

Bytes: 4353. SHA256: `8ecf0a11bc559cd1c697f049139a7c5ef7ba286d42eefe48d08492cfe6ef456b`.

````html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{% block title %}{{ doc.seo.title }}{% endblock %}</title>
    <meta
      name="description"
      content="{% block description %}{{ doc.seo.description }}{% endblock %}"
    />
    {% if preview %}
    <meta name="robots" content="noindex, nofollow" />
    {% endif %}
    <meta name="theme-color" content="#151714" />
    <link rel="icon" href="/growth-assets/mark.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/growth-assets/site.css" />
    <link rel="stylesheet" href="/growth-assets/public-v2.css" />
    <link rel="stylesheet" href="/growth-assets/campaign.css" />
    <link rel="stylesheet" href="/growth-assets/advisor.css" />
    {% block styles %}{% endblock %}
    <script type="module" src="/growth-assets/site.mjs"></script>
    {% if not preview %}<script type="module" src="/growth-assets/advisor.mjs"></script>{% endif %}
    {% block scripts %}{% endblock %}
  </head>
  <body
    class="public-v2 {% block bodyclass %}{% endblock %}"
    data-page="{% block page %}landing{% endblock %}"
    data-preview="{{ 'true' if preview else 'false' }}"
  >
    <a class="skip" href="#main">Saltar al contenido</a>
    {% if preview %}
    <div class="preview-bar">
      Vista previa privada · Los cambios todavía no se publican.
      <a href="/cms/">Volver al editor</a>
    </div>
    {% endif %}
    <header class="site-header">
      <div class="container nav">
        <a
          class="brand"
          href="{{ '/cms/preview/' if preview else '/descubre/' }}"
          aria-label="Sales Academy, inicio"
          ><span class="brand-mark">S<span>A</span></span
          ><span
            >SALES<br />ACADEMY<span class="brand-sub"
              >AGENTES DE IA PARA TU SALA</span
            ></span
          ></a
        >
        <nav aria-label="Navegación principal">
          <a href="/descubre/#recorrido">Agentes en acción</a
          ><a href="{{ '/cms/preview/?page=hub' if preview else '/mediahub/' }}"
            >Mediahub</a
          ><a class="nav-demo" href="https://salesacademy.softvibes.art/"
            >Ver la demo <span aria-hidden="true">↗</span></a
          >
        </nav>
        <a class="button button-small campaign-header-cta" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer" data-whatsapp-demo
          >Solicitar demo por WhatsApp <span aria-hidden="true">↗</span></a
        >
      </div>
    </header>
    <main id="main">{% block content %}{% endblock %}</main>
    <footer class="site-footer">
      <div class="container footer-grid">
        <a class="brand" href="/descubre/"
          ><span class="brand-mark">S<span>A</span></span
          ><span>SALES<br />ACADEMY</span></a
        >
        <p>Tu método. Tus agentes de IA.<br />El siguiente paso de tu sala.</p>
        <div>
          <a href="/mediahub/">Recursos abiertos</a
          ><a href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer" data-whatsapp-demo>Solicitar demo por WhatsApp ↗</a
          ><a href="https://salesacademy.softvibes.art/">Ver la demo ↗</a
          ><a href="/descubre/privacidad/">Privacidad</a
          ><button class="text-button" data-consent-settings>
            Preferencias de medición
          </button>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>Sales Academy · Softvibes</span
        ><span>Inteligencia artificial para preparar, practicar y acompañar.</span>
      </div>
    </footer>
    <section
      class="consent-panel"
      id="consent-panel"
      aria-label="Preferencias de medición"
      hidden
    >
      <div>
        <strong>Tú decides qué compartes.</strong>
        <p>
          Podemos medir visitas y uso de recursos para mejorar esta experiencia.
          No enviamos tus respuestas del diagnóstico.
        </p>
      </div>
      <div class="consent-actions">
        <button class="button button-small" data-consent="granted">
          Permitir medición</button
        ><button
          class="button button-small button-outline"
          data-consent="denied"
        >
          Solo lo necesario
        </button>
      </div>
    </section>
  </body>
</html>
````

### 37 · growth/site/templates/cms.html

Bytes: 4307. SHA256: `cb560e15979adf2cb207d88953f97c5fbfdb7110e86ab53419477e695db38492`.

````html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>Estudio editorial · Sales Academy</title>
    <meta name="theme-color" content="#171b17" />
    <link rel="icon" href="/growth-assets/mark.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/growth-assets/site.css" />
    <link rel="stylesheet" href="/growth-assets/cms.css" />
    <script type="module" src="/growth-assets/cms.mjs"></script>
  </head>
  <body class="cms-body">
    <script id="video-catalog" type="application/json">{{ video_catalog|tojson }}</script>
    <a class="skip" href="#cms-content">Saltar al editor</a>
    <div id="login-view" class="login-layout">
      <div class="login-story">
        <a class="brand" href="/descubre/"
          ><span class="brand-mark">S<span>A</span></span
          ><span>SALES<br />ACADEMY</span></a
        >
        <div>
          <p class="eyebrow">ESTUDIO EDITORIAL</p>
          <h1>El conocimiento<br />merece una<br /><em>buena casa.</em></h1>
          <p>
            Prepara el contenido.<br />Revisa cada detalle.<br />Publica con
            intención.
          </p>
        </div>
        <span class="login-foot">SALES ACADEMY / CONTENT STUDIO</span>
      </div>
      <div class="login-main">
        <form id="login-form">
          <p class="eyebrow">ACCESO PRIVADO</p>
          <h2>Bienvenido al estudio.</h2>
          <p>
            Entra con tu cuenta editorial para trabajar en la landing y el
            mediahub.
          </p>
          <label
            >Usuario<input
              name="username"
              autocomplete="username"
              required
              maxlength="80"
              autofocus /></label
          ><label
            >Contraseña<input
              type="password"
              name="password"
              autocomplete="current-password"
              required /></label
          ><button class="button" type="submit">
            Entrar al CMS <span>↗</span>
          </button>
          <p id="login-status" class="form-status" role="status"></p>
          <p class="caption">
            ¿Necesitas acceso o recuperar tu cuenta? Contacta al administrador
            del proyecto.
          </p>
          <a href="/descubre/" class="quiet-link">← Volver al sitio</a>
        </form>
        <noscript
          ><p>
            El editor necesita JavaScript. Los recursos públicos se pueden leer
            sin activarlo.
          </p></noscript
        >
      </div>
    </div>
    <div id="cms-shell" hidden>
      <aside class="cms-sidebar">
        <a class="brand" href="/cms/"
          ><span class="brand-mark">S<span>A</span></span
          ><span
            >SALES<br />ACADEMY<span class="brand-sub"
              >ESTUDIO EDITORIAL</span
            ></span
          ></a
        >
        <p class="sidebar-label">TU ESPACIO DE TRABAJO</p>
        <nav id="cms-nav" aria-label="Módulos del CMS"></nav>
        <div class="sidebar-bottom">
          <a href="/descubre/" target="_blank" rel="noopener"
            >Ver sitio público ↗</a
          >
          <div id="cms-user"></div>
          <button id="logout-button" class="text-button">Cerrar sesión</button>
        </div>
      </aside>
      <div class="cms-main">
        <header class="cms-topbar">
          <div>
            <span class="cms-breadcrumb">SALES ACADEMY / ESTUDIO</span
            ><span id="save-indicator">Cargando contenido…</span>
          </div>
          <div class="cms-top-actions">
            <a
              class="button button-small button-outline"
              id="preview-link"
              href="/cms/preview/"
              target="_blank"
              rel="noopener"
              >Vista previa ↗</a
            ><button class="button button-small" id="publish-button" hidden>
              Publicar cambios
            </button>
          </div>
        </header>
        <div
          id="cms-status"
          class="cms-toast"
          role="status"
          aria-live="polite"
          hidden
        ></div>
        <main id="cms-content" tabindex="-1"></main>
      </div>
    </div>
  </body>
</html>
````

### 38 · growth/site/templates/diagnostic.html

Bytes: 2383. SHA256: `d4545cc337b78b659b19e22bfea5e35761c7516e73c4d305b347d7726dd015cd`.

````html
{% extends 'base.html' %}{% block title %}Diagnostica tu sala · Sales Academy{%
endblock %}{% block page %}diagnostic{% endblock %}{% block scripts %}
<script type="module" src="/growth-assets/diagnostic-ui.mjs"></script>
{% endblock %} {% block content %}
<section class="container diagnostic-layout">
  <div class="diagnostic-intro">
    <p class="eyebrow">AGENTES DE IA / 6 PREGUNTAS PARA EMPEZAR</p>
    <h1>Encuentra dónde<br />la IA puede <em>ayudarte.</em></h1>
    <p>
      Identifica qué preparar, practicar u ordenar en el día a día de tu sala.
      Piensa en el proceso; tus respuestas se quedan en esta página.
    </p>
    <div class="diagnostic-promise">
      <span>01 / Responde con honestidad</span
      ><span>02 / Recibe una orientación</span
      ><span>03 / Elige una acción</span>
    </div>
    <p class="caption">
      Autoevaluación orientativa. No certifica preparación técnica ni desempeño
      individual.
    </p>
    <a class="campaign-link" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer" data-whatsapp-demo>Conocer los agentes en una demo ↗</a>
  </div>
  <div class="diagnostic-workspace">
    <noscript
      ><div class="notice">
        El diagnóstico necesita JavaScript para calcular tu orientación sin
        enviar respuestas. Puedes leer todos los
        <a href="/mediahub/">recursos abiertos</a>.
      </div></noscript
    >
    <form id="diagnostic-form">
      <div class="diagnostic-progress">
        <span id="question-counter">Pregunta 1 de 6</span
        ><progress
          id="question-progress"
          max="6"
          value="1"
          aria-label="Progreso del diagnóstico"
        ></progress>
      </div>
      <div id="question-container"></div>
      <p id="diagnostic-error" class="form-status" role="alert"></p>
      <div class="diagnostic-controls">
        <button
          type="button"
          class="button button-outline"
          id="question-back"
          disabled
        >
          ← Anterior</button
        ><button type="submit" class="button" id="question-next">
          Siguiente →
        </button>
      </div>
    </form>
    <section
      id="diagnostic-result"
      data-demo-url="{{ whatsapp_demo_url }}"
      hidden
      tabindex="-1"
      aria-labelledby="result-title"
    ></section>
  </div>
</section>
{% endblock %}
````

### 39 · growth/site/templates/hub.html

Bytes: 4626. SHA256: `e600f5a839b58f1ae3ec70701d5315b6a9b3d4f15e6acf1fb5309ea4ce25a818`.

````html
{% extends 'base.html' %}
{% from 'macros.html' import resource_card with context %}
{% block title %}Mediahub · Sales Academy{% endblock %}
{% block page %}hub{% endblock %}
{% block bodyclass %}hub-v2{% endblock %}
{% block styles %}<link rel="stylesheet" href="/growth-assets/hub-v2.css" />{% endblock %}
{% block content %}
<section class="hub-hero sa-hub-hero">
  <div class="container sa-hub-hero-grid">
    <div><p class="sa-hub-kicker">SALES ACADEMY / AGENTES DE IA</p><h1>Tu método.<br /><em>Tu agente. Tu día.</em></h1><p class="sa-hub-lead">Recursos para llevar la inteligencia artificial a la preparación, la práctica y el acompañamiento de tu sala. Elige una tarea y encuentra por dónde empezar.</p></div>
    <div class="sa-hub-index"><span>¿QUÉ NECESITAS HOY?</span><a href="{{ '/cms/preview/?page=hub&role=rep' if preview else '/mediahub/?role=rep' }}"><span>Preparar mi conversación</span><b aria-hidden="true">↗</b></a><a href="{{ '/cms/preview/?page=hub&role=leader' if preview else '/mediahub/?role=leader' }}"><span>Acompañar a mi equipo</span><b aria-hidden="true">↗</b></a><a href="{{ '/cms/preview/?page=hub&role=director' if preview else '/mediahub/?role=director' }}"><span>Dar forma a un piloto</span><b aria-hidden="true">↗</b></a></div>
  </div>
  <div class="container sa-hub-meta"><span>IDEAS PARA LLEVAR A LA SALA</span><span>Recursos completos. Sin registro.</span></div>
</section>
<section class="container hub-content sa-hub-content">
  <form class="hub-filters" method="get" action="{{ '/cms/preview/' if preview else '/mediahub/' }}" aria-label="Filtrar recursos">
    {% if preview %}<input type="hidden" name="page" value="hub" />{% endif %}
    <label class="search-field"><span>Buscar un recurso</span><input type="search" name="q" value="{{ request.args.get('q','') }}" placeholder="Coaching, preparación, piloto…" maxlength="120" /></label>
    <label><span>Para quién</span><select name="role"><option value="">Todos los roles</option>{% for v,l in [('rep','Representantes'),('leader','Líderes'),('director','Dirección')] %}<option value="{{ v }}" {% if request.args.get('role')==v %}selected{% endif %}>{{ l }}</option>{% endfor %}</select></label>
    <label><span>Necesidad</span><select name="topic"><option value="">Todas las necesidades</option>{% for v,l in [('coordination','Coordinación'),('practice','Práctica'),('evidence','Evidencia')] %}<option value="{{ v }}" {% if request.args.get('topic')==v %}selected{% endif %}>{{ l }}</option>{% endfor %}</select></label>
    <label><span>Formato</span><select name="type"><option value="">Todos los formatos</option>{% for v,l in [('template','Plantilla'),('guide','Guía'),('matrix','Matriz'),('video','Video'),('audio','Audio')] %}<option value="{{ v }}" {% if request.args.get('type')==v %}selected{% endif %}>{{ l }}</option>{% endfor %}</select></label>
    <button class="button button-small" type="submit">Filtrar</button>
  </form>
  <div class="results-line"><p role="status">{{ resources|length }} recurso{{ 's' if resources|length != 1 else '' }} disponible{{ 's' if resources|length != 1 else '' }}</p><a href="{{ '/cms/preview/?page=hub' if preview else '/mediahub/' }}">Limpiar filtros</a></div>
  <div class="sa-hub-collection">
    {% for r in resources %}
    <div class="sa-hub-resource sa-hub-resource-{{ r.type }}">
      {{ resource_card(r, loop.index, preview) }}
      {% if not r.coverId and not r.get('videoId') %}<div class="sa-hub-document" aria-hidden="true"><span>SA / FIELD NOTES</span><strong>{{ r.title }}</strong><p>{{ r.excerpt|truncate(110) }}</p><div class="sa-hub-document-foot"><span>{{ {'template':'PREPARAR','guide':'ACOMPAÑAR','matrix':'IMPLEMENTAR','video':'EXPLORAR','audio':'ESCUCHAR'}.get(r.type, 'APRENDER') }}</span><b>↗</b></div></div>{% endif %}
    </div>
    {% else %}
    <div class="empty-state"><span class="empty-symbol" aria-hidden="true">↗</span><h2>No encontramos un recurso con esos filtros.</h2><p>Prueba con otra palabra o vuelve a ver la biblioteca completa.</p><a class="button" href="{{ '/cms/preview/?page=hub' if preview else '/mediahub/' }}">Ver todos los recursos</a></div>
    {% endfor %}
  </div>
  <aside class="sa-hub-next"><div><p>DE LA IDEA A TU SALA</p><h2>Conoce tus agentes de IA.<br /><em>Empieza con una demo.</em></h2><span>Conversemos sobre tu método, tu equipo y el primer caso de uso.</span></div><a class="button" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer" data-whatsapp-demo>Solicitar demo por WhatsApp <span aria-hidden="true">↗</span></a></aside>
</section>
{% endblock %}
````

### 40 · growth/site/templates/landing.html

Bytes: 22497. SHA256: `d6521ac07d0ce75f186cbb762dbd20b7f575cfb1da17ad575159d27b53ff64d5`.

````html
{% extends 'base.html' %}
{% from 'macros.html' import resource_card %}
{% from 'macros.html' import video_player with context %}
{% block bodyclass %}landing-v2 cinematic-page ai-campaign{% endblock %}
{% block styles %}
<link rel="stylesheet" href="/growth-assets/landing-v2.css" />
<link rel="stylesheet" href="/growth-assets/media-player.css" />
<link rel="stylesheet" href="/growth-assets/cinematic.css" />
<link rel="stylesheet" href="/growth-assets/ai-journey.css" />
{% endblock %}
{% block scripts %}
<script type="module" src="/growth-assets/journey.mjs"></script>
<script type="module" src="/growth-assets/media-player.mjs"></script>
{% endblock %}
{% block content %}
{% set collection = namespace(items={}) %}
{% for r in resources if r.type == 'video' and r.videoId and r.videoId in video_catalog %}
  {% if r.videoId not in collection.items %}{% set _ = collection.items.update({r.videoId: r}) %}{% endif %}
{% endfor %}
{% set featured = collection.items.get('smart-agent') %}
{% macro demo_link(class_name='button sa-button-gold', label='Solicitar demo por WhatsApp') %}<a class="{{ class_name }}" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer">{{ label }} <span aria-hidden="true">↗</span></a>{% endmacro %}
{% macro scene_figure(photo, screen, label, retouched=false) %}
<figure class="chapter-figure ai-inline-scene{{ ' ai-inline-retouched' if retouched else '' }}">
  <img class="ai-inline-photo" src="/growth-assets/ai-scenes/{{ photo }}.webp" width="1672" height="941" alt="Escena ilustrativa generada de un equipo ficticio en una sala de ventas" loading="lazy" />
  <div class="ai-inline-device"><img src="/growth-assets/{{ 'scenarios/screens' if retouched else 'ai-screens' }}/{{ screen }}.webp" width="390" height="844" loading="lazy" alt="{{ label }}. {{ 'Presentación retocada de una captura aportada.' if retouched else 'Captura real de la demo con datos de ejemplo.' }}" /></div>
  <figcaption>{{ label }}.<span>{{ 'Captura aportada · presentación retocada · escena ilustrativa generada.' if retouched else 'Pantalla real de la demo · escena ilustrativa generada.' }}</span>{% if retouched %}<a href="/growth-assets/scenarios/screens/16-meet-greet-original.png" target="_blank" rel="noopener">Ver captura original ↗</a>{% endif %}</figcaption>
</figure>
{% endmacro %}

<section class="ai-hero" aria-labelledby="ai-title">
  <div class="container ai-hero-grid">
    <div class="ai-hero-copy">
      <p class="sa-kicker"><span aria-hidden="true"></span>{{ doc.hero.eyebrow }}</p>
      <h1 id="ai-title">{% set headline = doc.hero.title.split('. ', 1) %}{% if headline|length > 1 %}{{ headline[0] }}.<br /><em>{{ headline[1] }}</em>{% else %}{{ doc.hero.title }}{% endif %}</h1>
      <p class="ai-hero-description">{{ doc.hero.description }}</p>
      <div class="hero-actions">{{ demo_link(label=doc.hero.primaryLabel) }}<a class="ai-hero-link" href="#recorrido">Explorar los pilares <span aria-hidden="true">↓</span></a></div>
      <p class="ai-hero-note">Conversemos sobre el proceso de tu sala y el alcance que necesitas.</p>
      <div class="ai-hero-pillars" aria-label="La IA en tu jornada"><span>Preparar</span><i aria-hidden="true">·</i><span>Practicar</span><i aria-hidden="true">·</i><span>Acompañar</span></div>
    </div>
    {% if featured %}
    <div class="ai-vsl-panel" id="vision" data-vsl>
      <div class="ai-vsl-heading"><span>CONOCE LA VISIÓN</span><strong>33 <small>segundos</small></strong></div>
      <div class="ai-vsl-stage">
        <img class="ai-vsl-context" src="/growth-assets/ai-scenes/consultation.webp" width="1672" height="941" alt="" />
        <div class="ai-vsl-frame">{{ video_player(featured) }}</div>
        <span class="ai-vsl-side" aria-hidden="true">UN NUEVO APOYO PARA TU EQUIPO</span>
      </div>
      <div class="ai-vsl-next">{{ demo_link('ai-vsl-cta') }}<a class="ai-vsl-transcript" href="{{ '/cms/preview/?resource=' ~ featured.slug if preview else '/mediahub/' ~ featured.slug ~ '/' }}">Leer el contenido del video</a></div>
    </div>
    {% else %}
    <figure class="ai-hero-fallback"><img src="/growth-assets/ai-scenes/consultation.webp" width="1672" height="941" alt="Escena ilustrativa generada de una conversación en una sala de ventas" /><figcaption>Explora cómo plantear agentes de IA alrededor de tu método.</figcaption></figure>
    {% endif %}
  </div>
  <div class="container ai-hero-foot"><span>SALES ACADEMY / INTELIGENCIA ARTIFICIAL EN CONTEXTO</span><span>Tu equipo. Tu método. El siguiente paso.</span></div>
</section>

<section class="ai-bridge" aria-labelledby="ai-pillars-title"><div class="container ai-bridge-grid"><p class="sa-section-label">CINCO PILARES / UNA JORNADA CON IA</p><h2 id="ai-pillars-title">El agente acompaña.<br /><em>Tu equipo lo lleva a la práctica.</em></h2><p>De la preparación al siguiente aprendizaje. Mira cómo el método, las preguntas al agente y las conversaciones humanas se conectan durante el día.</p></div></section>

<section class="cinematic-journey ai-continuous" id="recorrido" data-journey data-active="start" aria-label="Cinco pilares para llevar agentes de IA a la jornada de la sala">
  <div class="journey-stage" data-journey-stage aria-hidden="true">
    <div class="ai-stage-glow"></div>
    <div class="ai-stage-line"></div>
    <div class="ai-room-scene">
      <img class="ai-scene-world ai-world-start" src="/growth-assets/ai-scenes/briefing.webp" width="1672" height="941" alt="" loading="lazy" />
      <img class="ai-scene-world ai-world-method" src="/growth-assets/ai-scenes/consultation.webp" width="1672" height="941" alt="" loading="lazy" />
      <img class="ai-scene-world ai-world-practice" src="/growth-assets/ai-scenes/coaching.webp" width="1672" height="941" alt="" loading="lazy" />
      <img class="ai-scene-world ai-world-coaching" src="/growth-assets/ai-scenes/coaching.webp" width="1672" height="941" alt="" loading="lazy" />
      <img class="ai-scene-world ai-world-scale" src="/growth-assets/ai-scenes/briefing.webp" width="1672" height="941" alt="" loading="lazy" />
      <span class="ai-photo-label">ESCENAS ILUSTRATIVAS GENERADAS</span>
    </div>
    <div class="ai-device">
      <div class="ai-device-screens">
        <img class="ai-product-screen ai-screen-start" src="/growth-assets/ai-screens/06-tour-preparation-mobile.webp" width="390" height="844" alt="" loading="lazy" />
        <img class="ai-product-screen ai-screen-method" src="/growth-assets/scenarios/screens/16-meet-greet-retouched.webp" width="390" height="844" alt="" loading="lazy" />
        <img class="ai-product-screen ai-screen-practice" src="/growth-assets/ai-screens/07-objection-practice-mobile.webp" width="390" height="844" alt="" loading="lazy" />
        <img class="ai-product-screen ai-screen-coaching" src="/growth-assets/ai-screens/09-after-tour-mobile.webp" width="390" height="844" alt="" loading="lazy" />
        <img class="ai-product-screen ai-screen-scale" src="/growth-assets/ai-screens/03-roadmap-mobile.webp" width="390" height="844" alt="" loading="lazy" />
      </div>
      <span class="ai-device-label"><span class="ai-original-label">INTERFAZ REAL · DATOS DE EJEMPLO</span><span class="ai-retouched-label">MEET &amp; GREET · PRESENTACIÓN RETOCADA</span></span>
    </div>
    <div class="ai-agent-orbit"><span>IA</span><p>Tu método.<br />Tu siguiente pregunta.</p></div>
    <span class="ai-stage-word">Un paso más claro.</span>
  </div>
  <div class="journey-chapters">
    <div class="journey-tools container"><nav class="journey-navigation" aria-label="Pilares del recorrido"><a href="#start"><span>01</span>Preparar</a><a href="#method"><span>02</span>Aprender</a><a href="#practice"><span>03</span>Practicar</a><a href="#coaching"><span>04</span>Acompañar</a><a href="#scale"><span>05</span>Escalar</a></nav><button class="journey-motion-toggle" type="button" data-motion-toggle aria-pressed="false" hidden>Reducir movimiento</button></div>

    <article class="journey-chapter journey-start" id="start" data-chapter="start" aria-labelledby="start-title"><div class="container journey-chapter-layout"><div class="journey-copy"><p class="journey-eyebrow"><span>01 / PREPARAR CON IA</span>08:45 — 09:10 · Antes del tour</p><h2 id="start-title">Llega con<br /><em>una intención.</em></h2><p class="journey-lede">La jornada empieza antes del tour. Consulta la preparación y lleva al agente de IA una petición concreta, con el método de tu sala como punto de partida.</p><div class="ai-prompt"><span>PREGUNTA PROPUESTA AL AGENTE</span><p>«Quiero preparar preguntas para comprender cómo prefieren viajar.»</p></div><div class="journey-use-case"><span class="journey-case-label">CASO SIMULADO / ANA, REPRESENTANTE</span><h3>Preparar antes de presentar.</h3><p>Ana revisa Preparar mi tour, elige dos preguntas y acuerda con Jorge qué observar durante la conversación.</p></div></div>{{ scene_figure('briefing', '06-tour-preparation-mobile', 'Preparar mi tour') }}</div></article>

    <article class="journey-chapter journey-method" id="method" data-chapter="method" aria-labelledby="method-title"><div class="container journey-chapter-layout"><div class="journey-copy"><p class="journey-eyebrow"><span>02 / APRENDER CON IA</span>09:10 · En la bienvenida</p><h2 id="method-title">{{ doc.sections.problemTitle }}</h2><p class="journey-lede">{{ doc.sections.problemBody }}</p><div class="ai-prompt"><span>PREGUNTA PROPUESTA AL AGENTE</span><p>«Ayúdame a preparar una bienvenida natural a partir del guion de Meet &amp; Greet.»</p></div><div class="journey-use-case"><span class="journey-case-label">CASO SIMULADO / CONSULTA DEL MÉTODO</span><h3>La bienvenida también se practica.</h3><p>Ana consulta el video, el guion y los errores frecuentes de Meet &amp; Greet. Prepara una pregunta para el agente de IA y revisa con Jorge cómo presentarse, explicar la duración de la visita y preguntar cómo prefieren que los llamen.</p></div></div>{{ scene_figure('consultation', '16-meet-greet-retouched', 'Meet & Greet · La bienvenida', retouched=true) }}</div></article>

    <article class="journey-chapter journey-practice" id="practice" data-chapter="practice" aria-labelledby="practice-title"><div class="container journey-chapter-layout"><div class="journey-copy"><p class="journey-eyebrow"><span>03 / PRACTICAR CON IA</span>12:20 · Entre conversaciones</p><h2 id="practice-title">{{ doc.sections.practiceTitle }}</h2><p class="journey-lede">{{ doc.sections.practiceBody }}</p><div class="ai-prompt"><span>PREGUNTA PROPUESTA AL AGENTE</span><p>«Quiero ensayar cómo aclarar la duda: queremos pensarlo.»</p></div><div class="journey-use-case"><span class="journey-case-label">CASO SIMULADO / PRÁCTICA DE OBJECIONES</span><h3>Una duda concreta. Una práctica útil.</h3><p>Ana abre Practicar objeción y ensaya con Jorge una pregunta de clarificación. La IA forma parte de la preparación; el equipo lleva la práctica a la conversación.</p></div></div>{{ scene_figure('coaching', '07-objection-practice-mobile', 'Practicar objeción') }}</div></article>

    <article class="journey-chapter journey-coaching" id="coaching" data-chapter="coaching" aria-labelledby="coaching-title"><div class="container journey-chapter-layout"><div class="journey-copy"><p class="journey-eyebrow"><span>04 / ACOMPAÑAR CON IA</span>15:30 — 16:30 · Aprender de la jornada</p><h2 id="coaching-title">Una observación.<br /><em>Un siguiente paso.</em></h2><p class="journey-lede">Usa el contexto de Sales Academy para preparar una reflexión con IA y revisarla con el líder. El equipo decide qué practicar después.</p><div class="ai-prompt"><span>PREGUNTA PROPUESTA AL AGENTE</span><p>«Ayúdame a ordenar lo que escuché y lo que quiero practicar mañana.»</p></div><div class="journey-use-case"><span class="journey-case-label">CASO SIMULADO / ANA Y JORGE</span><h3>El aprendizaje vuelve al equipo.</h3><p>Después del tour ofrece un punto de partida. Ana y Jorge conversan, eligen una conducta y la convierten en la siguiente práctica.</p></div></div>{{ scene_figure('coaching', '09-after-tour-mobile', 'Después del tour') }}</div></article>

    <article class="journey-chapter journey-scale" id="scale" data-chapter="scale" aria-labelledby="rooms-title"><div class="container journey-chapter-layout"><div class="journey-copy"><p class="journey-eyebrow"><span>05 / ESCALAR CON CONTEXTO</span>Agentes de IA, sala por sala</p><h2 id="rooms-title">{{ doc.sections.stagesTitle }}</h2><p class="journey-lede">{{ doc.sections.stagesBody }}</p><ol class="journey-room-route" aria-label="Ruta propuesta para tres salas"><li><span>A</span><div><strong>Establecer.</strong><p>Acordar el método, los materiales y las tareas del agente.</p></div></li><li><span>B</span><div><strong>Replicar.</strong><p>Adaptar preguntas y acompañamiento al contexto de la siguiente sala.</p></div></li><li><span>C</span><div><strong>Consolidar.</strong><p>Revisar lo aprendido y decidir juntos cómo continuar.</p></div></li></ol><p class="journey-proposal-note">Ruta de implementación propuesta para validar en una demo.</p>{{ demo_link('ai-chapter-cta') }}</div>{{ scene_figure('briefing', '03-roadmap-mobile', 'Roadmap de entrenamiento') }}</div></article>
  </div>
</section>

{% for room_guide in resources if room_guide.id == 'room-day' %}
<section class="ai-day" aria-labelledby="ai-day-title"><div class="container ai-day-grid"><div class="ai-day-photo"><img src="/growth-assets/ai-scenes/consultation.webp" width="1672" height="941" alt="Escena ilustrativa generada de una conversación entre representante y huéspedes ficticios" loading="lazy" /><span>UNA JORNADA SIMULADA · SEIS MOMENTOS</span></div><div class="ai-day-copy"><p class="sa-section-label">EL AGENTE DE IA, EN EL DÍA A DÍA</p><h2 id="ai-day-title">Imagina el día.<br /><em>Reconoce cada acción.</em></h2><p>Acompaña a Ana y Jorge en seis situaciones. Mira qué consultar, qué preguntar al agente de IA y qué decisión corresponde al equipo. La galería reúne quince capturas de la demo y una pantalla aportada con presentación retocada.</p><div class="ai-day-facts"><span>06 <small>momentos</small></span><span>16 <small>pantallas de la app</small></span></div><a class="button sa-button-dark" href="/growth-assets/scenarios/index.html">Explorar la jornada con IA <span aria-hidden="true">↗</span></a><a class="ai-day-guide" href="{{ '/cms/preview/?resource=' ~ room_guide.slug if preview else '/mediahub/' ~ room_guide.slug ~ '/' }}">Leer la guía para tu equipo →</a></div></div></section>
{% endfor %}

{% if collection.items|length > (1 if featured else 0) %}
<section class="journey-films" id="historias" aria-labelledby="films-title"><div class="container"><div class="journey-films-heading"><div><p class="sa-section-label">MÁS FORMAS DE IMAGINAR LA IA</p><h2 id="films-title">El conocimiento<br /><em>encuentra su lugar.</em></h2></div><p>Explora la visión de agentes que conectan método, práctica y acompañamiento. Los videos muestran conceptos; el recorrido combina capturas de la demo y la pantalla aportada de Meet &amp; Greet, identificada como presentación retocada.</p></div><div class="journey-film-grid" tabindex="0" aria-label="Más películas sobre agentes de IA; desplázate horizontalmente para explorar">{% for video_id, r in collection.items.items() if video_id != 'smart-agent' %}<article class="journey-film" id="film-{{ r.id }}"><div class="journey-film-number"><span>VISIÓN {{ '%02d'|format(loop.index) }}</span><span>{{ r.duration }}</span></div>{{ video_player(r) }}<h3>{{ r.title }}</h3><p>{{ r.excerpt }}</p><a class="journey-film-detail" href="{{ '/cms/preview/?resource=' ~ r.slug if preview else '/mediahub/' ~ r.slug ~ '/' }}">Ver contexto y transcripción <span aria-hidden="true">↗</span></a></article>{% endfor %}</div></div></section>
{% endif %}

<section class="sa-resources">
  <div class="container">
    <div class="sa-resource-heading" data-reveal>
      <div>
        <p class="sa-section-label">MEDIAHUB / MÉTODO + AGENTES DE IA</p>
        <h2>Tu método, listo<br /><em>para conversar con IA.</em></h2>
      </div>
      <div>
        <p>
          Recursos para preparar una pregunta al agente de IA, practicar una situación y revisar el siguiente paso con tu equipo.
        </p>
        <a
          class="sa-text-link sa-link-dark"
          href="{{ '/cms/preview/?page=hub' if preview else '/mediahub/' }}"
          >Explorar el mediahub <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
    <div class="sa-resources-grid">
      {% set written_resources = resources|rejectattr('type', 'equalto', 'video')|list %}
      {% for r in written_resources[:3] %}
      <div class="sa-editorial-resource sa-editorial-{{ r.type }}" data-reveal>
        {{ resource_card(r, loop.index, preview) }} {% if not r.coverId %}
        <div class="sa-document-preview" aria-hidden="true">
          <span class="sa-document-brand">SA / FIELD NOTES</span
          ><strong>{{ r.title }}</strong>
          <p>{{ r.excerpt }}</p>
          <div class="sa-document-rule"></div>
          <span class="sa-document-bottom"
            >{{ {'template':'UNA HOJA PARA PREPARAR','guide':'UNA GUÍA PARA
            ACOMPAÑAR','matrix':'UNA MATRIZ PARA EMPEZAR','video':'UNA IDEA PARA
            EXPLORAR','audio':'UNA CONVERSACIÓN PARA ESCUCHAR'}.get(r.type, 'UN
            RECURSO PARA APLICAR') }}<span>↗</span></span
          >
        </div>
        {% endif %}
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="sa-diagnostic">
  <div class="container sa-diagnostic-layout" data-reveal>
    <div class="sa-diagnostic-mark" aria-hidden="true">
      <span>6</span><i></i>
    </div>
    <div>
      <p class="sa-section-label">ENCUENTRA DÓNDE PUEDE AYUDAR LA IA</p>
      <h2>{{ doc.sections.ctaTitle }}</h2>
      <p>{{ doc.sections.ctaBody }}</p>
    </div>
    <a class="button sa-button-dark" href="/descubre/diagnostico/"
      >Diagnosticar mi sala <span aria-hidden="true">↗</span></a
    >
  </div>
</section>

<section class="sa-faq">
  <div class="container sa-faq-grid">
    <div data-reveal>
      <p class="sa-section-label">HABLEMOS CON CLARIDAD</p>
      <h2>Las preguntas<br /><em>que importan.</em></h2>
      <p>Lo que necesitas saber antes de dar el siguiente paso.</p>
    </div>
    <div class="faq-list" data-reveal>
      {% for faq in doc.faqs %}
      <details>
        <summary>{{ faq.question }}<span aria-hidden="true">+</span></summary>
        <p>{{ faq.answer }}</p>
      </details>
      {% endfor %}
    </div>
  </div>
</section>

<section class="sa-contact" id="demo">
  <div class="container sa-contact-grid">
    <div class="sa-contact-copy" data-reveal>
      <p class="sa-section-label">AGENTES DE IA / LLEVÉMOSLO A TU SALA</p>
      <h2>Imagina tu jornada.<br /><em>Veámosla en una demo.</em></h2>
      <p>Conversemos sobre tus materiales, tu equipo y las tareas que quieres apoyar con agentes de inteligencia artificial.</p>
      <a class="button sa-button-gold ai-contact-action" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer">Solicitar demo por WhatsApp <span aria-hidden="true">↗</span></a><p class="ai-contact-number">+52 984 316 3268</p>
      <p class="sa-contact-caption">
        WhatsApp abrirá un mensaje preparado. Tú decides cuándo enviarlo; acordaremos la disponibilidad contigo.
      </p>
    </div>
    <form
      id="demo-form"
      method="post"
      action="/growth-api/demo-requests"
      data-enabled="{{ 'true' if contact_enabled else 'false' }}"
      class="sa-contact-form"
    >
      <p class="sa-form-intro">¿Prefieres dejar tu solicitud aquí?</p>
      <div class="form-grid">
        <label class="full"
          >Correo de contacto<input
            type="email"
            name="email"
            maxlength="254"
            autocomplete="email"
            placeholder="tu@organizacion.com"
            required
        /></label>
        <label
          >Tu rol<select name="role" required>
            <option value="">Selecciona</option>
            <option value="director">Dirección</option>
            <option value="leader">Líder de sala</option>
            <option value="rep">Representante</option>
            <option value="other">Otro</option>
          </select></label
        >
        <label
          >Salas de tu equipo<select name="roomCountBucket" required>
            <option value="">Selecciona</option>
            <option value="one">1 sala</option>
            <option value="two">2 salas</option>
            <option value="three">3 salas</option>
            <option value="more">4 o más</option>
          </select></label
        >
        <label class="full"
          >¿Qué quieres revisar?<select name="need" required>
            <option value="">Selecciona una prioridad</option>
            <option value="coordination">Coordinación de sala</option>
            <option value="practice">Práctica del equipo</option>
            <option value="coaching">Coaching y acompañamiento</option>
            <option value="pilot">Alcance de un piloto</option>
          </select></label
        >
      </div>
      <label class="check-label"
        ><input type="checkbox" name="contactConsent" required /><span
          >Acepto que se utilice mi correo para responder esta solicitud.
          <a href="/descubre/privacidad/">Ver privacidad</a>.</span
        ></label
      >
      <label class="check-label"
        ><input type="checkbox" name="marketingOptIn" /><span
          >Quiero recibir novedades y recursos cuando estén disponibles. Es
          opcional.</span
        ></label
      >
      <button class="button sa-button-gold" type="submit" disabled>
        Solicitar una demo <span aria-hidden="true">↗</span>
      </button>
      {% if not contact_enabled %}
      <p class="caption">
        La recepción de solicitudes todavía no está habilitada. Puedes explorar
        los recursos abiertos y la demo.
      </p>
      {% endif %}
      <p
        class="form-status"
        id="demo-status"
        role="status"
        aria-live="polite"
      ></p>
      <noscript
        ><p>
          Activa JavaScript para enviar la solicitud. Los recursos permanecen
          disponibles sin registro.
        </p></noscript
      >
    </form>
  </div>
</section>
{% endblock %}
````

### 41 · growth/site/templates/macros.html

Bytes: 3494. SHA256: `e2e405fdd8aee22f1fa100a8cbc948d76c936f4a00c7402b8c2907df63f5e756`.

````html
{% macro resource_card(r, index=1, preview=false) %}
<article
  class="resource-card"
  data-resource-card
  data-title="{{ r.title|lower }}"
  data-role="{{ r.role }}"
  data-topic="{{ r.topic }}"
  data-type="{{ r.type }}"
>
  <a
    class="resource-art art-{{ r.type }}"
    href="{{ '/cms/preview/?resource=' ~ r.slug if preview else '/mediahub/' ~ r.slug ~ '/' }}"
    tabindex="-1"
    aria-hidden="true"
  >
    {% if r.coverId %}<img
      src="/media/{{ r.coverId }}/web"
      alt=""
      loading="lazy"
    />{% elif r.get('videoId') %}{% set clip = video_catalog.get(r.videoId) %}{% if clip %}<img
      src="{{ clip.poster }}"
      alt=""
      width="{{ clip.width }}"
      height="{{ clip.height }}"
      loading="lazy"
    />{% endif %}{% else %}<span class="art-overline">SALES ACADEMY / FIELD NOTES</span
    ><span class="art-number">0{{ index }}</span
    ><span class="art-lines"><i></i><i></i><i></i></span
    ><span class="art-caption"
      >{{
      {'template':'PREPARAR','guide':'ACOMPAÑAR','matrix':'IMPLEMENTAR','video':'EXPLORAR','audio':'ESCUCHAR'}.get(r.type,'APRENDER')
      }}</span
    >{% endif %}
  </a>
  <div class="resource-info">
    <div class="meta">
      <span
        >{{
        {'template':'Plantilla','guide':'Guía','matrix':'Matriz','video':'Video','audio':'Audio'}.get(r.type,r.type)
        }}</span
      ><span>{{ r.duration }}</span>
    </div>
    <h3>
      <a
        href="{{ '/cms/preview/?resource=' ~ r.slug if preview else '/mediahub/' ~ r.slug ~ '/' }}"
        >{{ r.title }} <span aria-hidden="true">↗</span></a
      >
    </h3>
    <p>{{ r.excerpt }}</p>
    <span class="resource-role"
      >Para {{ {'rep':'representantes','leader':'líderes de
      sala','director':'dirección'}.get(r.role,r.role) }}</span
    >
  </div>
</article>
{% endmacro %}

{% macro video_player(r) %}
{% set clip = video_catalog.get(r.get('videoId')) %}
{% if clip %}
<figure class="film-player" data-film-player>
  <div class="film-player-stage">
  <video
    class="film-player-video"
    controls
    playsinline
    preload="none"
    width="{{ clip.width }}"
    height="{{ clip.height }}"
    poster="{{ '/media/' ~ r.coverId ~ '/web' if r.coverId else clip.poster }}"
    aria-label="{{ r.title }}. Película con subtítulos en español."
  >
    <source src="{{ clip.src }}" type="video/mp4" />
    <track kind="captions" src="{{ clip.captions }}" srclang="es" label="Español" default />
    Tu navegador no puede reproducir este video. Puedes leer su contenido en esta página.
  </video>
  <button class="film-play-button" type="button" data-video-play aria-label="Reproducir película: {{ r.title }}" hidden>
    <span class="film-play-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M8 5v14l11-7z" /></svg></span>
    <span class="film-play-text" data-play-text>Ver película</span>
    <span class="film-play-detail">Audio y subtítulos</span>
  </button>
  </div>
  <figcaption>
    <span class="film-player-label">PELÍCULA CONCEPTUAL · SALES ACADEMY</span>
    <p class="film-player-hint">Reproduce cuando quieras. Audio y subtítulos disponibles.</p>
    <p class="film-player-error" data-video-error role="status" hidden>No se pudo cargar la película. Puedes reintentar o continuar con el contenido escrito.</p>
    <button class="button button-small button-outline" type="button" data-video-retry hidden>Reintentar video</button>
  </figcaption>
</figure>
{% endif %}
{% endmacro %}
````

### 42 · growth/site/templates/privacy.html

Bytes: 3886. SHA256: `26dddbdeafafa4b0cc6ac906a7f2dbca2277a6167a9e6744a456ff1f9a179915`.

````html
{% extends 'base.html' %}{% block title %}Privacidad · Sales Academy{% endblock
%}{% block page %}privacy{% endblock %}{% block content %}
<article class="container legal-page">
  <p class="eyebrow">CLARIDAD Y CONTROL</p>
  <h1>Tu información.<br />Tus decisiones.</h1>
  <p class="section-lead">
    Recursos abiertos y diagnóstico sin registro. Tú eliges si conversas con el
    asesor IA, preparas un mensaje para Chris o guardas una solicitud de seguimiento.
  </p>
  <h2>El diagnóstico</h2>
  <p>
    Las respuestas se procesan en tu navegador y no se envían al servidor. Al
    reiniciar o cerrar la página se pierde ese diagnóstico. No pedimos datos de
    representantes o de clientes.
  </p>
  <h2>Solicitudes de demostración</h2>
  <p>Los enlaces generales abren WhatsApp con una solicitud preparada. En el asesor puedes añadir tu contexto, fecha, horario y zona horaria preferidos, y editar el resumen antes de compartirlo. Tú decides si envías el mensaje. No añadimos las respuestas del diagnóstico ni la transcripción completa del chat. La visita por sí sola no contacta WhatsApp ni confirma una cita.</p>
  <p>
    Guardar la solicitud para seguimiento es opcional y requiere marcar una casilla
    independiente, desactivada por defecto. Se conserva únicamente el resumen
    revisado y los campos que compartes: nombre y contacto opcionales, rol, salas,
    equipo, necesidad, plazo y preferencia de horario. Los propietarios autorizados
    del CMS pueden consultar y actualizar su seguimiento. La solicitud queda
    pendiente de confirmación con Chris; no constituye una reserva, compra ni suscripción.
  </p>
  <h2>Conversaciones con el asesor IA</h2>
  <p>Al abrir el asesor se crea una sesión funcional propia mediante una cookie. Al enviar una pregunta, el servidor procesa los mensajes con Hermes y OpenAI, el proveedor de IA configurado para Sales Academy. Este servicio necesita los mensajes para responder; no envíes datos de clientes, contraseñas o información sensible.</p>
  <p>La conversación está disponible durante una hora desde el inicio de la sesión. Después caduca y sus mensajes se eliminan en la siguiente limpieza automática, programada cada cinco minutos. Las conversaciones de visitantes se mantienen separadas y no se incorporan automáticamente a la base de conocimiento del asesor. Las respuestas pueden contener errores; las condiciones comerciales y las fechas de demo se confirman con Chris.</p>
  <h2>Medición opcional</h2>
  <p>
    Solo con tu permiso se registran eventos como abrir un recurso o completar
    el diagnóstico. No se envían respuestas, correo, nombres ni texto libre en
    esos eventos. Puedes cambiar la preferencia desde el pie de página.
  </p>
  <button class="button button-outline" data-consent-settings>
    Revisar mis preferencias
  </button>
  <h2>Conservación y atención</h2>
  <p>
    Las sesiones de conversación caducan tras una hora. Las solicitudes guardadas
    se eliminan después de 90 días sin actividad; los eventos de medición, después
    de 30 días. La limpieza automática se ejecuta cada cinco minutos; la eliminación
    se realiza en el siguiente ciclo después de vencer el plazo.
  </p>
  <p>
    Para consultar, corregir o solicitar la eliminación de tu información,
    contacta a Chris, atención de Sales Academy, por
    <a href="https://wa.me/529843163268?text=Hola%20Chris%2C%20quiero%20consultar%20sobre%20mi%20informaci%C3%B3n%20en%20Sales%20Academy." target="_blank" rel="noopener noreferrer">WhatsApp al +52 984 316 3268</a>.
    Si guardaste una solicitud, puedes proporcionar su referencia. Al abrir WhatsApp,
    tu interacción con ese servicio también está sujeta a sus propias condiciones de privacidad.
  </p>
  <p class="caption">Aviso del asesor: 2026-11-07-advisor · 7 de noviembre de 2026.</p>
</article>
{% endblock %}
````

### 43 · growth/site/templates/resource.html

Bytes: 5210. SHA256: `b801f11dc7cdfa1f9924dcfa8c2feff342cb23da7d1ae77b179b54068af73689`.

````html
{% extends 'base.html' %} {% from 'macros.html' import video_player with context %}
{% block styles %}<link rel="stylesheet" href="/growth-assets/media-player.css" />{% endblock %}
{% block scripts %}<script type="module" src="/growth-assets/media-player.mjs"></script>{% endblock %}
{% block title %}{{ resource.title }} · Sales
Academy{% endblock %}{% block description %}{{ resource.excerpt }}{% endblock
%}{% block page %}resource{% endblock %} {% block content %}
<article class="container reading-layout" data-resource-id="{{ resource.id }}">
  <header class="reading-head">
    <a
      class="quiet-link"
      href="{{ '/cms/preview/?page=hub' if preview else '/mediahub/' }}"
      >← Volver al mediahub</a
    >
    <p class="eyebrow">
      {{
      {'template':'PLANTILLA','guide':'GUÍA','matrix':'MATRIZ','video':'VIDEO','audio':'AUDIO'}.get(resource.type,resource.type)
      }} / {{ resource.evidenceLabel }}
    </p>
    <h1>{{ resource.title }}</h1>
    <p class="reading-excerpt">{{ resource.excerpt }}</p>
    <div class="reading-meta">
      <span>{{ resource.duration }}</span
      ><span
        >Para {{
        {'rep':'representantes','leader':'líderes','director':'dirección'}.get(resource.role,resource.role)
        }}</span
      ><span>Revisión: {{ resource.reviewedAt }}</span>
    </div>
  </header>
  <aside class="reading-aside">
    <div class="sticky-note">
      <p class="eyebrow">DE ESTA PÁGINA A TU EQUIPO</p>
      <h2>Hazlo tuyo.</h2>
      <p>
        Descarga el recurso en formato de texto editable y llévalo a la próxima
        conversación.
      </p>
      {% if not preview %}<a
        class="button button-small"
        href="/mediahub/{{ resource.slug }}/descargar/"
        download
        >Descargar recurso ↓</a
      >{% else %}
      <p class="caption">
        La descarga pública estará disponible después de publicar.
      </p>
      {% endif %}
      <p class="caption">
        Formato Markdown (.md). Se abre con cualquier editor de texto.
      </p>
    </div>
  </aside>
  <div class="reading-body">
    <p class="campaign-note">Agentes de IA para el trabajo de tu sala: usa este recurso para preparar una consulta, ensayar una habilidad y decidir el siguiente paso con tu equipo.</p>
    {% if resource.id == 'room-day' %}
    <p><a class="button button-small" href="/growth-assets/scenarios/index.html">Explorar las seis escenas y las pantallas ↗</a></p>
    {% endif %}
    {% if resource.get('videoId') %}{{ video_player(resource) }}{% endif %}
    {% if resource.coverId and not resource.get('videoId') %}<img
      class="article-cover"
      src="/media/{{ resource.coverId }}/web"
      alt="{{ media_items.get(resource.coverId, {}).get('alt', 'Portada de ' ~ resource.title) }}"
    />{% endif %}{% for b in resource.body %}{% if b.type=='heading' %}
    <h2>{{ b.text }}</h2>
    {% elif b.type=='paragraph' %}
    <p>{{ b.text }}</p>
    {% elif b.type=='list' %}
    <ul>
      {% for item in b['items'] %}
      <li>{{ item }}</li>
      {% endfor %}
    </ul>
    {% elif b.type=='table' %}
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            {% for h in b.headers %}
            <th>{{ h }}</th>
            {% endfor %}
          </tr>
        </thead>
        <tbody>
          {% for row in b.rows %}
          <tr>
            {% for cell in row %}
            <td>{{ cell }}</td>
            {% endfor %}
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
    {% endif %}{% endfor %} {% if resource.externalMediaUrl %}
    <div class="external-media">
      <p>Material audiovisual complementario</p>
      <a
        class="button button-outline"
        href="{{ resource.externalMediaUrl }}"
        target="_blank"
        rel="noopener noreferrer"
        >Abrir contenido audiovisual ↗</a
      >
      <p class="caption">
        Se abrirá el proveedor externo. No se carga contenido de terceros hasta
        que lo elijas.
      </p>
    </div>
    {% endif %} {% if resource.attachments %}
    <h2>Materiales complementarios</h2>
    <ul>
      {% for mid in resource.attachments %}
      <li>
        {% set asset = media_items.get(mid, {}) %}
        {% set variant = 'download' if asset.get('mime') == 'application/pdf' else 'web' %}
        <a href="/media/{{ mid }}/{{ variant }}" download>
          Descargar {{ asset.get('title', 'archivo ' ~ loop.index) }}
        </a>
      </li>
      {% endfor %}
    </ul>
    {% endif %}
    <p class="article-source">{{ resource.sourceNote }}</p>
    <div class="article-next">
      <p class="eyebrow">EL SIGUIENTE PASO</p>
      <h2>Tu método, acompañado por agentes de IA.</h2>
      <p>
        Lleva este caso a una demo. Revisemos cómo preparar, practicar y acompañar
        a tu equipo con el contexto de tu sala.
      </p>
      <a class="button" href="{{ whatsapp_demo_url }}" target="_blank" rel="noopener noreferrer" data-whatsapp-demo>Solicitar demo por WhatsApp ↗</a>
      <p><a class="campaign-link" href="/descubre/diagnostico/" data-recommendation-link>Encontrar primero el foco de mi sala →</a></p>
    </div>
  </div>
</article>
{% endblock %}
````

### 44 · growth/content/seed.json

Bytes: 40244. SHA256: `787af23076a92234965ac44b9cd2baa703f6441586418124f5cfdadbddc22b79`.

````json
{
  "hero": {
    "eyebrow": "AGENTES DE INTELIGENCIA ARTIFICIAL PARA TU SALA",
    "title": "Agentes de IA. Tu método, presente en cada conversación.",
    "description": "Explora una experiencia de IA pensada para preparar el tour, practicar una objeción y ordenar el siguiente paso con el método de tu sala.",
    "primaryLabel": "Solicitar demo por WhatsApp"
  },
  "seo": {
    "title": "Sales Academy · Agentes de IA para tu sala de ventas",
    "description": "Explora cómo los agentes de IA pueden apoyar la preparación, la práctica y el acompañamiento de tu sala. Mira la visión y solicita una demo por WhatsApp."
  },
  "sections": {
    "problemTitle": "Tu método, al alcance de la conversación.",
    "problemBody": "Los agentes de IA conectan la consulta del método con una tarea concreta. Explora el Roadmap y prepara qué necesitas preguntar antes de la próxima conversación.",
    "practiceTitle": "Ensaya antes de improvisar.",
    "practiceBody": "Una duda concreta abre una práctica útil. Prepara el ejercicio para el agente de IA, consulta el recurso y ensaya la conversación con tu equipo.",
    "stagesTitle": "Un método compartido. El contexto de cada sala.",
    "stagesBody": "Una ruta propuesta para incorporar agentes de IA alrededor de tus materiales y responsabilidades: establecer la base, replicar con el contexto de cada sala y revisar la continuidad.",
    "ctaTitle": "Veamos dónde puede ayudar la IA en tu sala.",
    "ctaBody": "Cuéntanos cómo prepara y acompaña tu equipo cada conversación. En una demo revisamos Sales Academy y definimos qué casos vale la pena explorar."
  },
  "faqs": [
    {
      "question": "¿Qué haría un agente de IA en mi sala?",
      "answer": "La propuesta es apoyar tareas concretas de preparación, consulta y práctica alrededor del método de tu equipo. En la demo revisamos los casos que te interesan, los materiales y el alcance disponible."
    },
    {
      "question": "¿Los agentes de IA pueden usar el método de mi equipo?",
      "answer": "La conversación empieza por tu proceso y tus materiales aprobados. La configuración, las fuentes que podrá consultar y los límites se acuerdan para cada implementación."
    },
    {
      "question": "¿Todo lo que aparece en el video ya está disponible?",
      "answer": "El video presenta una visión del producto. Las capturas del recorrido muestran la demo actual; durante la demostración distinguimos las funciones disponibles y lo que requiere desarrollo o configuración."
    },
    {
      "question": "¿Cómo se aplicaría en tres salas?",
      "answer": "La ruta propuesta es establecer la base en una sala, replicar con el contexto de la segunda y revisar la continuidad antes de integrar la tercera. Los accesos, materiales y responsabilidades deben acordarse para cada entorno."
    },
    {
      "question": "¿El agente de IA sustituye al líder de la sala?",
      "answer": "El equipo conserva las decisiones y el acompañamiento. El uso de IA se plantea como apoyo para preparar consultas y prácticas; el líder revisa el método y acuerda el siguiente paso."
    },
    {
      "question": "¿Qué pasa cuando solicito la demo?",
      "answer": "Se abre WhatsApp con un mensaje que puedes revisar y enviar. A partir de esa conversación se acuerdan disponibilidad y alcance; abrir el enlace no confirma una cita."
    }
  ],
  "resources": [
    {
      "id": "before-tour",
      "slug": "antes-del-tour",
      "title": "Prepara el próximo tour con IA",
      "excerpt": "Una hoja para preparar una consulta al agente de IA, elegir una conducta y practicar antes de la conversación.",
      "body": [
        {
          "type": "heading",
          "text": "Una preparación con IA y un objetivo concreto"
        },
        {
          "type": "paragraph",
          "text": "Antes del tour, prepara una consulta para el agente de IA alrededor de una conducta observable: preguntar, escuchar o resumir. Esta hoja te ayuda a ordenar el contexto y a revisar después la propuesta con tu líder."
        },
        {
          "type": "list",
          "items": [
            "Confirma la asignación. Revisa horario, responsable y canal para avisar un cambio. Usa únicamente la información autorizada de la operación. Esta hoja no necesita datos del visitante.",
            "Elige un paso del método. Anota el nombre o identificador del paso y la versión del material aprobado. Si no sabes cuál está vigente, resuélvelo con el líder antes de improvisar.",
            "Define una conducta observable. Completa: “En este tour voy a…”. Usa una acción concreta: preguntar, escuchar, resumir, verificar o explicar con un material aprobado.",
            "Practica una situación. Con un compañero, plantea una objeción ficticia. El representante pregunta primero, verifica qué entendió y responde dentro de los límites del material autorizado.",
            "Acuerda qué revisar después. Escoge una señal observable. No conviertas una sola venta o no venta en la evaluación completa de la práctica."
          ]
        },
        {
          "type": "heading",
          "text": "Hoja para completar"
        },
        {
          "type": "table",
          "headers": [
            "Campo",
            "Mi preparación"
          ],
          "rows": [
            [
              "Paso del método y versión",
              ""
            ],
            [
              "Conducta que voy a practicar",
              ""
            ],
            [
              "Situación ficticia para ensayar",
              ""
            ],
            [
              "Pregunta que usaré para comprender",
              ""
            ],
            [
              "Material autorizado que consultaré",
              ""
            ],
            [
              "Qué observaré al terminar",
              ""
            ],
            [
              "Qué necesito aclarar con mi líder",
              ""
            ]
          ]
        },
        {
          "type": "heading",
          "text": "Ejemplo simulado"
        },
        {
          "type": "paragraph",
          "text": "Paso: exploración de necesidades. Conducta: resumir lo que escuché y pedir confirmación. Situación: una persona ficticia dice “Necesito pensarlo”. Pregunta: “¿Qué parte te gustaría revisar con más calma?”. Señal: pude identificar una duda concreta sin suponer cuál era. No se registran nombres, presupuestos ni detalles de una persona real."
        },
        {
          "type": "paragraph",
          "text": "Pregunta propuesta para el agente de IA: «Quiero practicar escucha. Ayúdame a preparar una pregunta abierta antes de presentar». Es un ejemplo editorial; no una respuesta generada ni un registro de la aplicación."
        },
        {
          "type": "heading",
          "text": "Después del tour"
        },
        {
          "type": "paragraph",
          "text": "Escribe qué hiciste, qué observaste y qué repetirás o cambiarás. Si algo depende de precios, disponibilidad, condiciones o financiamiento, consulta la fuente autorizada. La práctica no autoriza promesas comerciales."
        },
        {
          "type": "paragraph",
          "text": "Siguiente paso: si cuesta mantener esta rutina en la sala, utiliza el diagnóstico abierto para elegir por dónde empezar."
        }
      ],
      "type": "template",
      "role": "rep",
      "topic": "practice",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "duration": "5 min de lectura",
      "status": "published",
      "evidenceLabel": "Guía original · orientación práctica",
      "sourceNote": "Sales Academy · recurso editorial original. No sustituye el método aprobado de cada sala.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "coaching",
      "slug": "coaching-con-una-accion",
      "title": "Coaching y agentes de IA: el siguiente paso",
      "excerpt": "Una guía para preparar una reflexión con apoyo de IA y acordar una acción observable con el líder.",
      "body": [
        {
          "type": "heading",
          "text": "De una observación a un acuerdo"
        },
        {
          "type": "paragraph",
          "text": "Usa esta guía para preparar una reflexión con apoyo de IA y revisarla con el líder. Pregunta propuesta para el agente: «Ayúdame a ordenar qué escuché, qué aclaré y qué necesito practicar». El equipo conserva la decisión sobre el siguiente paso."
        },
        {
          "type": "paragraph",
          "text": "Una conversación de coaching resulta más útil cuando termina con una conducta que ambas personas pueden reconocer. Esta guía ayuda a revisar una práctica sin etiquetar al representante ni inferir su intención."
        },
        {
          "type": "paragraph",
          "text": "1. Acordar el foco. “Vamos a revisar cómo verificaste que entendiste la necesidad”. Elige una habilidad, no todo el tour."
        },
        {
          "type": "paragraph",
          "text": "2. Pedir la versión del representante. “¿Qué intentaste hacer? ¿Qué parte te resultó difícil?”. Escucha antes de dar instrucciones."
        },
        {
          "type": "paragraph",
          "text": "3. Describir lo observado. “En el ejercicio respondiste antes de confirmar la duda”. Evita “No escuchas” o “Eres malo para cerrar”. Si no hubo observación directa o registro autorizado, dilo: se está trabajando con el relato del representante."
        },
        {
          "type": "paragraph",
          "text": "4. Comparar con el material aprobado. Revisen juntos el paso o guion vigente. Aclaren si existe una excepción y quién puede autorizarla."
        },
        {
          "type": "paragraph",
          "text": "5. Repetir una sola situación. El líder interpreta a una persona ficticia. El representante practica una respuesta. Se repite una vez con una corrección concreta; no se presiona para memorizar una frase fuera de contexto."
        },
        {
          "type": "paragraph",
          "text": "6. Cerrar un acuerdo. “En la siguiente práctica, antes de responder, resume la duda y confirma si la entendiste”. Define quién revisa, qué observa y cuándo se vuelve a conversar."
        },
        {
          "type": "heading",
          "text": "Registro de acuerdo"
        },
        {
          "type": "table",
          "headers": [
            "Elemento",
            "Qué registrar"
          ],
          "rows": [
            [
              "Habilidad",
              "Una conducta, no una calificación general"
            ],
            [
              "Evidencia",
              "Observación de una práctica o relato identificado como tal"
            ],
            [
              "Referencia",
              "Material aprobado y versión"
            ],
            [
              "Próxima acción",
              "Qué se intentará hacer"
            ],
            [
              "Revisión",
              "Momento y persona responsable"
            ],
            [
              "Resultado",
              "Qué se observó en la siguiente práctica"
            ]
          ]
        },
        {
          "type": "heading",
          "text": "Ejemplo simulado"
        },
        {
          "type": "paragraph",
          "text": "Observación: en un roleplay, la persona respondió “Es la mejor opción” sin preguntar qué faltaba aclarar. Acuerdo: hacer una pregunta abierta y resumir la respuesta antes de presentar información. En la repetición se observa si lo hizo; no se concluye que esto aumentará automáticamente los cierres."
        },
        {
          "type": "heading",
          "text": "Criterio de cierre"
        },
        {
          "type": "paragraph",
          "text": "La sesión termina cuando el representante puede explicar la acción acordada y el líder sabe cómo revisarla. Si ambos salen con interpretaciones distintas, reformulen el acuerdo. La guía no es un instrumento de sanción ni una certificación automática."
        },
        {
          "type": "paragraph",
          "text": "Siguiente paso: conecta esta conversación con la hoja “Antes del próximo tour”."
        }
      ],
      "type": "guide",
      "role": "leader",
      "topic": "practice",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "duration": "6 min de lectura",
      "status": "published",
      "evidenceLabel": "Guía original · orientación práctica",
      "sourceNote": "Sales Academy · recurso editorial original. No sustituye el método aprobado de cada sala.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "three-rooms",
      "slug": "piloto-en-tres-salas",
      "title": "Agentes de IA: una ruta para tres salas",
      "excerpt": "Una matriz para acordar método, materiales, responsables y límites antes de plantear un piloto de IA en tres salas.",
      "body": [
        {
          "type": "heading",
          "text": "Primero acuerda qué significa que funcione"
        },
        {
          "type": "paragraph",
          "text": "Un piloto de agentes de IA entre salas necesita criterios comparables. Antes de fijar fechas, acuerda qué tareas se quieren apoyar, qué fuentes podrá consultar el agente, quién responde por el método y qué evidencia autoriza avanzar. La ruta aquí descrita es una propuesta por validar."
        },
        {
          "type": "heading",
          "text": "Matriz de preparación"
        },
        {
          "type": "table",
          "headers": [
            "Acuerdo",
            "Sala A",
            "Sala B",
            "Sala C",
            "Evidencia esperada"
          ],
          "rows": [
            [
              "Responsable de operación",
              "Por definir",
              "Por definir",
              "Por definir",
              "Persona y función acordadas internamente"
            ],
            [
              "Versión del método",
              "Por validar",
              "Por validar",
              "Por validar",
              "Material aprobado y accesible"
            ],
            [
              "Fuentes y límites del agente de IA",
              "Por acordar",
              "Por acordar",
              "Por acordar",
              "Material autorizado y responsables de revisión"
            ],
            [
              "Roadmap, registro de metas y práctica",
              "Por validar",
              "Por validar",
              "Por validar",
              "Recorrido completo con datos de ejemplo"
            ],
            [
              "Accesos y límites de consulta",
              "Por validar",
              "Por validar",
              "Por validar",
              "Pruebas positivas y negativas por rol y sala"
            ],
            [
              "Recursos iniciales",
              "Por revisar",
              "Por revisar",
              "Por revisar",
              "Fuente, derechos y aprobación"
            ],
            [
              "Línea base",
              "Por acordar",
              "Por acordar",
              "Por acordar",
              "Definición, periodo y responsable del dato"
            ],
            [
              "Soporte y seguimiento",
              "Por definir",
              "Por definir",
              "Por definir",
              "Canal, horario y responsable"
            ],
            [
              "Criterio de avance",
              "Por aprobar",
              "Por aprobar",
              "Por aprobar",
              "Decisión escrita y evidencia asociada"
            ]
          ]
        },
        {
          "type": "heading",
          "text": "Etapa A · Establecer"
        },
        {
          "type": "paragraph",
          "text": "Recorrido objetivo del piloto de entrenamiento, por validar: el representante accede a la instancia de su sala, consulta su Training Roadmap y un recurso aprobado, utiliza el registro de metas acordado para el piloto y completa una práctica; el líder revisa la evidencia permitida. Los datos de ejemplo sirven para verificar funcionamiento; la operación real requiere identidad y permisos comprobados antes de comenzar. La asignación e integración de tours pertenecen a otro alcance. Documenta dudas y límites."
        },
        {
          "type": "heading",
          "text": "Etapa B · Replicar"
        },
        {
          "type": "paragraph",
          "text": "Repite la prueba en otra sala con su propia configuración. Comprueba que una persona no pueda consultar información fuera de su alcance. Registra qué se pudo reutilizar y qué requirió adaptación. No presupongas que la segunda sala usa el mismo proceso sólo por pertenecer a la misma organización."
        },
        {
          "type": "heading",
          "text": "Etapa C · Consolidar"
        },
        {
          "type": "paragraph",
          "text": "Integra la tercera sala cuando los acuerdos y pruebas se cumplan. Usa un diccionario común de estados y resultados. Comparar cifras sin las mismas definiciones puede confundir diferencias del proceso con desempeño."
        },
        {
          "type": "heading",
          "text": "Revisión de avance"
        },
        {
          "type": "paragraph",
          "text": "El responsable de cada sala responde: ¿el recorrido funciona?, ¿las personas pueden acceder sólo a lo que les corresponde?, ¿los materiales están aprobados?, ¿la evidencia está completa?, ¿quién atiende los incidentes? Si una condición necesaria no se cumple, registra el bloqueo y el siguiente paso; no lo marques terminado por tener una pantalla disponible."
        },
        {
          "type": "heading",
          "text": "Medición sin promesas"
        },
        {
          "type": "paragraph",
          "text": "Elige primero métricas de uso y calidad del dato: accesos sobre personas invitadas, uso del registro de metas acordado, recursos consultados y revisiones completadas, con un denominador y periodo acordados. Para hablar de resultados comerciales se necesitan resultados, montos, moneda, cancelaciones y contexto comparables. Una diferencia entre periodos no prueba por sí sola que la plataforma la causó."
        },
        {
          "type": "paragraph",
          "text": "Siguiente paso: lleva la matriz a una conversación de alcance. No incluyas datos personales de clientes en el material público."
        }
      ],
      "type": "matrix",
      "role": "director",
      "topic": "evidence",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "duration": "8 min de lectura",
      "status": "published",
      "evidenceLabel": "Guía original · orientación práctica",
      "sourceNote": "Sales Academy · recurso editorial original. No sustituye el método aprobado de cada sala.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "film-smart-agent",
      "slug": "smart-agent",
      "title": "Agentes de IA en el día a día de tu sala",
      "excerpt": "Conoce la visión de Sales Academy en 33 segundos: agentes de IA que conectan el método, la preparación y la práctica del equipo.",
      "body": [
        {
          "type": "paragraph",
          "text": "Esta pieza presenta la visión de agentes de IA en Sales Academy mediante escenas conceptuales. Las pantallas del recorrido principal muestran la demo actual; en una demostración se revisan funciones y alcance disponibles."
        },
        {
          "type": "heading",
          "text": "Elegir una práctica para hoy"
        },
        {
          "type": "list",
          "items": [
            "Identifica una tarea de tu jornada que quieras preparar con apoyo de IA.",
            "Consulta el recurso y redacta una pregunta para el agente usando una situación ficticia.",
            "Lleva la propuesta al equipo y acuerda qué revisar en una demo de Sales Academy."
          ]
        },
        {
          "type": "heading",
          "text": "Transcripción del video"
        },
        {
          "type": "paragraph",
          "text": "No te voy a hablar de capacitación, te voy a presentar al nuevo integrante del equipo. Un agente inteligente que vive dentro de Sales Academy, aprende de tu proceso, organiza tu conocimiento y guía tu equipo de ventas en tiempo real. Tu hoja de objetivos SMART te muestra exactamente dónde estás y qué hacer a continuación. Roleplay Live es tan simple como una llamada, pero diseñada para entrenar a tu fuerza de ventas. Con Sales Academy, los líderes tienen la visibilidad que necesitan para guiar a su equipo hacia el éxito. Por eso creamos el agente de Sales Academy, para convertir el conocimiento de tus líderes en entrenamiento disponible en tiempo real. Agenda una demo."
        }
      ],
      "type": "video",
      "role": "rep",
      "topic": "practice",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "videoId": "smart-agent",
      "duration": "33 s de video",
      "status": "published",
      "evidenceLabel": "Visión de producto",
      "sourceNote": "Material audiovisual aportado para Sales Academy. Subtítulos y transcripción automáticos revisados editorialmente.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "film-menos-caos",
      "slug": "menos-caos",
      "title": "IA para ordenar la siguiente acción",
      "excerpt": "Una visión de agentes de IA que ayudan a dar contexto a la jornada y preparar el siguiente paso.",
      "body": [
        {
          "type": "paragraph",
          "text": "Esta pieza presenta la visión de agentes de IA en Sales Academy mediante escenas conceptuales. Las pantallas del recorrido principal muestran la demo actual; en una demostración se revisan funciones y alcance disponibles."
        },
        {
          "type": "heading",
          "text": "Preparar la siguiente conversación"
        },
        {
          "type": "list",
          "items": [
            "Identifica una tarea de tu jornada que quieras preparar con apoyo de IA.",
            "Consulta el recurso y redacta una pregunta para el agente usando una situación ficticia.",
            "Lleva la propuesta al equipo y acuerda qué revisar en una demo de Sales Academy."
          ]
        },
        {
          "type": "heading",
          "text": "Transcripción del video"
        },
        {
          "type": "paragraph",
          "text": "Imagina tener un asistente que no solo responde preguntas, sino que entiende tus objetivos, recuerda lo importante y te ayuda a actuar. Eso es un agente inteligente, una inteligencia artificial capaz de analizar información, utilizar herramientas y ejecutar tareas con cierto nivel de autonomía. En el día a día puede organizar pendientes, resumir mensajes, preparar reuniones, revisar métricas, detectar problemas y recordarte qué necesita atención. También puede aprender tus procesos, adaptarse a tu forma de trabajar y ayudarte a dar el siguiente paso. No se trata de reemplazar tu criterio, sino de reducir el trabajo repetitivo para que te concentres en las decisiones importantes, con menos caos y más control."
        }
      ],
      "type": "video",
      "role": "rep",
      "topic": "coordination",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "videoId": "menos-caos",
      "duration": "41 s de video",
      "status": "published",
      "evidenceLabel": "Visión de producto",
      "sourceNote": "Material audiovisual aportado para Sales Academy. Subtítulos y transcripción automáticos revisados editorialmente.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "film-sistema-conectado",
      "slug": "sistema-conectado",
      "title": "Agentes de IA alrededor de tu proceso",
      "excerpt": "La visión de objetivos, conocimiento y acciones conectados por agentes de IA alrededor de una forma compartida de trabajar.",
      "body": [
        {
          "type": "paragraph",
          "text": "Esta pieza presenta la visión de agentes de IA en Sales Academy mediante escenas conceptuales. Las pantallas del recorrido principal muestran la demo actual; en una demostración se revisan funciones y alcance disponibles."
        },
        {
          "type": "heading",
          "text": "Ordenar un proceso compartido"
        },
        {
          "type": "list",
          "items": [
            "Identifica una tarea de tu jornada que quieras preparar con apoyo de IA.",
            "Consulta el recurso y redacta una pregunta para el agente usando una situación ficticia.",
            "Lleva la propuesta al equipo y acuerda qué revisar en una demo de Sales Academy."
          ]
        },
        {
          "type": "heading",
          "text": "Transcripción del video"
        },
        {
          "type": "paragraph",
          "text": "Imagina tener un asistente que no solo responde preguntas, sino que entiende tus objetivos, recuerda lo importante y te ayuda a actuar. Eso es un agente inteligente, una inteligencia artificial capaz de analizar información, utilizar herramientas y ejecutar tareas con cierto nivel de autonomía. En el día a día puede organizar pendientes, resumir mensajes, preparar reuniones, revisar métricas, detectar problemas y recordarte qué necesita atención. También puede aprender tus procesos, adaptarse a tu forma de trabajar y ayudarte a dar el siguiente paso. No se trata de reemplazar tu criterio, sino de reducir el trabajo repetitivo para que te concentres en las decisiones importantes, con menos caos y más control."
        }
      ],
      "type": "video",
      "role": "director",
      "topic": "coordination",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "videoId": "sistema-conectado",
      "duration": "41 s de video",
      "status": "published",
      "evidenceLabel": "Visión de producto",
      "sourceNote": "Material audiovisual aportado para Sales Academy. Subtítulos y transcripción automáticos revisados editorialmente.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "film-infraestructura-comercial",
      "slug": "infraestructura-comercial",
      "title": "Tu método, acompañado por agentes de IA",
      "excerpt": "Una visión del conocimiento del líder convertido en apoyo de IA para la preparación y la práctica del equipo.",
      "body": [
        {
          "type": "paragraph",
          "text": "Esta pieza presenta la visión de agentes de IA en Sales Academy mediante escenas conceptuales. Las pantallas del recorrido principal muestran la demo actual; en una demostración se revisan funciones y alcance disponibles."
        },
        {
          "type": "heading",
          "text": "Acompañar con una acción concreta"
        },
        {
          "type": "list",
          "items": [
            "Identifica una tarea de tu jornada que quieras preparar con apoyo de IA.",
            "Consulta el recurso y redacta una pregunta para el agente usando una situación ficticia.",
            "Lleva la propuesta al equipo y acuerda qué revisar en una demo de Sales Academy."
          ]
        },
        {
          "type": "heading",
          "text": "Transcripción del video"
        },
        {
          "type": "paragraph",
          "text": "No te voy a hablar de capacitación, te voy a presentar al nuevo integrante del equipo. Un agente inteligente que vive dentro de Sales Academy, aprende de tu proceso, organiza tu conocimiento y guía tu equipo de ventas en tiempo real. Sales Academy no es una plataforma de cursos, es infraestructura comercial. Antes de culpar al talento, hay que revisar si tus sistemas de entrenamiento son los correctos. Si tu equipo depende del tiempo del gerente para mejorar, no tienes un sistema sustentable, tienes una dependencia. Por eso creamos el agente de Sales Academy, para convertir el conocimiento de tus líderes en entrenamiento disponible en tiempo real. Agenda una demo."
        }
      ],
      "type": "video",
      "role": "leader",
      "topic": "practice",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "videoId": "infraestructura-comercial",
      "duration": "29 s de video",
      "status": "published",
      "evidenceLabel": "Visión de producto",
      "sourceNote": "Material audiovisual aportado para Sales Academy. Subtítulos y transcripción automáticos revisados editorialmente.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "film-conocimiento-en-practica",
      "slug": "conocimiento-en-practica",
      "title": "Del conocimiento a la práctica con IA",
      "excerpt": "Una visión de transformación: llevar el conocimiento de los líderes a una rutina de preparación y acompañamiento con agentes de IA.",
      "body": [
        {
          "type": "paragraph",
          "text": "Esta pieza presenta la visión de agentes de IA en Sales Academy mediante escenas conceptuales. Las pantallas del recorrido principal muestran la demo actual; en una demostración se revisan funciones y alcance disponibles."
        },
        {
          "type": "heading",
          "text": "Preparar una implementación en tres salas"
        },
        {
          "type": "list",
          "items": [
            "Identifica una tarea de tu jornada que quieras preparar con apoyo de IA.",
            "Consulta el recurso y redacta una pregunta para el agente usando una situación ficticia.",
            "Lleva la propuesta al equipo y acuerda qué revisar en una demo de Sales Academy."
          ]
        },
        {
          "type": "heading",
          "text": "Transcripción del video"
        },
        {
          "type": "paragraph",
          "text": "Sé que hoy en día el entrenamiento depende de la energía y consistencia de un gerente. Y eso no es consistente, ni escalable. Por eso, hoy no vengo a darte otro entrenamiento. Hoy vengo a presentarte a un nuevo colaborador. El Smart Agent de Sales Academy. Coach de ventas disponible 24/7. Con el roadmap del Top Producer. Videos, guiones y recursos de alto valor. Creados desde el conocimiento de tus Top Producers, la cultura de tu empresa y la dirección de tus líderes. Y aquí es donde todo se conecta. El GoalSheet. Esa actividad alimenta la inteligencia del sistema. Y le da a los líderes métricas claras."
        }
      ],
      "type": "video",
      "role": "director",
      "topic": "evidence",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "videoId": "conocimiento-en-practica",
      "duration": "37 s de video",
      "status": "published",
      "evidenceLabel": "Visión de producto",
      "sourceNote": "Material audiovisual aportado para Sales Academy. Subtítulos y transcripción automáticos revisados editorialmente.",
      "reviewedAt": "2026-11-07"
    },
    {
      "id": "room-day",
      "slug": "un-dia-en-la-sala",
      "title": "Un día en la sala con agentes de IA",
      "excerpt": "Seis situaciones de time share: qué consultar, qué preguntar al agente de IA y qué decisión corresponde al equipo, con pantallas reales de la demo.",
      "body": [
        {
          "type": "paragraph",
          "text": "Acompaña a Ana, representante, y Jorge, líder, en seis momentos ficticios de una jornada con agentes de IA. Cada caso une una consulta real de la demo, una pregunta propuesta para el agente y una decisión humana. Los horarios, diálogos y fotografías son ilustrativos; las capturas conservan sus datos de ejemplo."
        },
        {
          "type": "heading",
          "text": "08:45 · Llegar con una intención"
        },
        {
          "type": "paragraph",
          "text": "Ana prepara una habilidad que quiere practicar durante la jornada."
        },
        {
          "type": "list",
          "items": [
            "En la app: Consultar Hoy y la plantilla Meta del mes.",
            "Pregunta propuesta para el agente de IA: «Quiero practicar escucha. Ayúdame a preparar una pregunta abierta.»",
            "Siguiente decisión: Elegir una pregunta abierta y compartirla con Jorge para revisión."
          ]
        },
        {
          "type": "paragraph",
          "text": "Diálogo simulado: Ana: «Hoy quiero escuchar mejor antes de presentar.» Jorge: «Elige una pregunta que te ayude a entender qué buscan.» Ana: «¿Cómo les gustaría viajar y qué les ha complicado hacerlo?»"
        },
        {
          "type": "heading",
          "text": "09:10 · Preparar antes de presentar"
        },
        {
          "type": "paragraph",
          "text": "Ana revisa su preparación antes de conversar con dos huéspedes ficticios."
        },
        {
          "type": "list",
          "items": [
            "En la app: Consultar Preparar mi tour y el Roadmap.",
            "Pregunta propuesta para el agente de IA: «Quiero preparar preguntas para comprender cómo prefieren viajar.»",
            "Siguiente decisión: Empezar por dos preguntas de exploración y adaptar el orden a las respuestas."
          ]
        },
        {
          "type": "paragraph",
          "text": "Diálogo simulado: Jorge: «¿Qué necesitas descubrir primero?» Ana: «Cómo quieren usar sus vacaciones y qué dudas traen.» Jorge: «Empieza por escucharlos; después podrás explicar lo relevante.»"
        },
        {
          "type": "heading",
          "text": "10:10 · Entender antes de proponer"
        },
        {
          "type": "paragraph",
          "text": "Elena y Diego quieren entender cómo encajaría una membresía con su forma de viajar."
        },
        {
          "type": "list",
          "items": [
            "En la app: Consultar el paso de descubrimiento del Roadmap después de escuchar.",
            "Pregunta propuesta para el agente de IA: «Ayúdame a revisar qué necesito aclarar antes de explicar una opción.»",
            "Siguiente decisión: Revisar información oficial y señalar qué dudas necesitan confirmación."
          ]
        },
        {
          "type": "paragraph",
          "text": "Diálogo simulado: Elena: «No siempre sabemos con tiempo cuándo podremos viajar.» Ana: «¿Qué flexibilidad necesitarían?» Diego: «Queremos entender las condiciones antes de decidir.» Ana: «Lo revisamos juntos y dejamos identificadas las dudas que necesiten confirmación.»"
        },
        {
          "type": "heading",
          "text": "12:20 · Practicar una duda concreta"
        },
        {
          "type": "paragraph",
          "text": "Ana y Jorge ensayan entre conversaciones; Jorge interpreta al huésped."
        },
        {
          "type": "list",
          "items": [
            "En la app: Abrir la vista previa Practicar objeción.",
            "Pregunta propuesta para el agente de IA: «Quiero ensayar cómo aclarar la duda: «queremos pensarlo».»",
            "Siguiente decisión: Ensayar una pregunta de clarificación y explicar solo lo confirmado."
          ]
        },
        {
          "type": "paragraph",
          "text": "Diálogo simulado: Jorge · papel de huésped: «Nos interesa, pero queremos pensarlo.» Ana: «Claro. ¿Qué información les falta para valorar si encaja con ustedes?» Jorge · papel de huésped: «Todavía no entiendo las condiciones.» Ana: «Las revisamos con calma; si una respuesta no está confirmada, la consultamos.»"
        },
        {
          "type": "heading",
          "text": "15:30 · Convertir observación en coaching"
        },
        {
          "type": "paragraph",
          "text": "Jorge y Ana revisan el ejercicio y eligen un ajuste observable."
        },
        {
          "type": "list",
          "items": [
            "En la app: Consultar Después del tour; el tablero de sala puede aportar contexto operativo separado.",
            "Pregunta propuesta para el agente de IA: «Ayúdame a ordenar una reflexión sobre lo que escuché y lo que debo practicar.»",
            "Siguiente decisión: Acordar resumir lo escuchado antes de responder en la siguiente práctica."
          ]
        },
        {
          "type": "paragraph",
          "text": "Diálogo simulado: Jorge: «¿Qué cambió cuando preguntaste qué información faltaba?» Ana: «Dejé de asumir la duda y pude escucharla.» Jorge: «En la siguiente práctica, resume lo que escuchaste antes de responder.»"
        },
        {
          "type": "heading",
          "text": "16:30 · Cerrar con el siguiente paso"
        },
        {
          "type": "paragraph",
          "text": "Ana conserva una reflexión y decide qué practicar mañana."
        },
        {
          "type": "list",
          "items": [
            "En la app: Consultar Después del tour y volver al Roadmap o al progreso demostrativo.",
            "Pregunta propuesta para el agente de IA: «Quiero convertir la reflexión de hoy en una práctica para mañana.»",
            "Siguiente decisión: Preparar una práctica de escucha y confirmación para la siguiente jornada."
          ]
        },
        {
          "type": "paragraph",
          "text": "Diálogo simulado: Ana: «La pregunta abierta me ayudó a entender mejor la duda.» Jorge: «¿Qué practicarás mañana?» Ana: «Confirmar lo que escuché antes de explicar.» Jorge: «Empezamos por ahí.»"
        },
        {
          "type": "heading",
          "text": "Llévalo a tu siguiente práctica"
        },
        {
          "type": "table",
          "headers": [
            "Momento",
            "Lo que vamos a observar"
          ],
          "rows": [
            [
              "08:45 · Llegar con una intención",
              "Elegir una pregunta abierta y compartirla con Jorge para revisión."
            ],
            [
              "09:10 · Preparar antes de presentar",
              "Empezar por dos preguntas de exploración y adaptar el orden a las respuestas."
            ],
            [
              "10:10 · Entender antes de proponer",
              "Revisar información oficial y señalar qué dudas necesitan confirmación."
            ],
            [
              "12:20 · Practicar una duda concreta",
              "Ensayar una pregunta de clarificación y explicar solo lo confirmado."
            ],
            [
              "15:30 · Convertir observación en coaching",
              "Acordar resumir lo escuchado antes de responder en la siguiente práctica."
            ],
            [
              "16:30 · Cerrar con el siguiente paso",
              "Preparar una práctica de escucha y confirmación para la siguiente jornada."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "La app muestra datos de ejemplo. Meta del mes y Practicar objeción son vistas verificadas; SMART/GoalSheet y Roleplay Live pertenecen al concepto del video y no se presentan como funciones probadas. El tablero de sala aporta contexto operativo; no acredita una evaluación de coaching."
        }
      ],
      "type": "guide",
      "role": "rep",
      "topic": "practice",
      "level": "start",
      "coverId": null,
      "attachments": [],
      "externalMediaUrl": "",
      "duration": "8 min",
      "status": "published",
      "evidenceLabel": "Simulación de uso · pantallas de la demo",
      "sourceNote": "Escenarios de uso de IA simulados; las preguntas son propuestas editoriales, no respuestas generadas ni conversaciones ejecutadas. Capturas reales de la demo del 7 de noviembre de 2026, con sus datos de ejemplo intactos. Fotografías ilustrativas generadas con IA; no son clientes ni testimonios.",
      "reviewedAt": "2026-11-07"
    }
  ]
}
````

### 45 · growth/content/video-catalog.json

Bytes: 1958. SHA256: `01ffa655b73eb7bdd0ac14142a0f08f568d986ed67350869eef58f05d485a34f`.

````json
{
  "smart-agent": {
    "id": "smart-agent",
    "title": "El método, acompañado",
    "src": "/growth-assets/films/smart-agent.mp4",
    "poster": "/growth-assets/films/smart-agent.webp",
    "width": 576,
    "height": 1024,
    "durationSeconds": 32.879,
    "captions": "/growth-assets/films/smart-agent.es.vtt",
    "audioKind": "speech"
  },
  "menos-caos": {
    "id": "menos-caos",
    "title": "Menos caos. Más criterio.",
    "src": "/growth-assets/films/menos-caos.mp4",
    "poster": "/growth-assets/films/menos-caos.webp",
    "width": 576,
    "height": 1024,
    "durationSeconds": 41.399,
    "captions": "/growth-assets/films/menos-caos.es.vtt",
    "audioKind": "speech"
  },
  "sistema-conectado": {
    "id": "sistema-conectado",
    "title": "Del proceso a un sistema conectado",
    "src": "/growth-assets/films/sistema-conectado.mp4",
    "poster": "/growth-assets/films/sistema-conectado.webp",
    "width": 720,
    "height": 1280,
    "durationSeconds": 41.375,
    "captions": "/growth-assets/films/sistema-conectado.es.vtt",
    "audioKind": "speech"
  },
  "infraestructura-comercial": {
    "id": "infraestructura-comercial",
    "title": "De depender del gerente a compartir el método",
    "src": "/growth-assets/films/infraestructura-comercial.mp4",
    "poster": "/growth-assets/films/infraestructura-comercial.webp",
    "width": 480,
    "height": 848,
    "durationSeconds": 29.025,
    "captions": "/growth-assets/films/infraestructura-comercial.es.vtt",
    "audioKind": "speech"
  },
  "conocimiento-en-practica": {
    "id": "conocimiento-en-practica",
    "title": "Del conocimiento a la práctica diaria",
    "src": "/growth-assets/films/conocimiento-en-practica.mp4",
    "poster": "/growth-assets/films/conocimiento-en-practica.webp",
    "width": 480,
    "height": 848,
    "durationSeconds": 36.594,
    "captions": "/growth-assets/films/conocimiento-en-practica.es.vtt",
    "audioKind": "speech"
  }
}
````

## Activos binarios originales

Estos archivos permanecen en el ZIP de originales. Se listan sin base64; las URL son referencias públicas registradas en el manifiesto, no un nuevo despliegue.

| Ruta original | Bytes | SHA256 | Referencia pública |
|---|---:|---|---|
| `growth/site/assets/ai-scenes/briefing.webp` | 118284 | `be7a28536372380ecde0b1baf67ffe450f2ccc2772264cf85ad74f17412f97f5` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-scenes/briefing.webp) |
| `growth/site/assets/ai-scenes/coaching.webp` | 98142 | `9205d247bb17c49407f1cbbb35b8695f0295402cd7d4cdbc3ef76443ac7c38d1` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-scenes/coaching.webp) |
| `growth/site/assets/ai-scenes/consultation.webp` | 119264 | `3abd14e25340725db9b253b0b528ba81cfcc44b7e6575c5997dd822d0222cd51` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-scenes/consultation.webp) |
| `growth/site/assets/ai-screens/03-roadmap-mobile.webp` | 32110 | `5ee5b4422359afa25dc1352ac6d72b495b209ed53a6ece1e3093d1ff0f984d63` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-screens/03-roadmap-mobile.webp) |
| `growth/site/assets/ai-screens/06-tour-preparation-mobile.webp` | 16396 | `e19db283dc2d18035d4b9e2173c9061993a39f157b514c3bb405496eef7d36f3` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-screens/06-tour-preparation-mobile.webp) |
| `growth/site/assets/ai-screens/07-objection-practice-mobile.webp` | 18494 | `9d4c621cc91fa83f311dcc7d13f056f6055374435363124cdd6c83efe40c5ddf` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-screens/07-objection-practice-mobile.webp) |
| `growth/site/assets/ai-screens/09-after-tour-mobile.webp` | 17592 | `2ac7dfc7e71e4c354e7c7f1c3366eef4cbe28d10026e4c1dad04858066aa78d3` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-screens/09-after-tour-mobile.webp) |
| `growth/site/assets/ai-screens/12-copilot-mobile.webp` | 16990 | `5cf67190f9f57fce703451f2805323d9fe30489866ce7b4921a43bebd3eb17ae` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/ai-screens/12-copilot-mobile.webp) |
| `growth/site/assets/films/conocimiento-en-practica.mp4` | 3342374 | `f4dac21211c6f3434527b189417b7114071463789fa37d61017dd27e829f0d26` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/conocimiento-en-practica.mp4) |
| `growth/site/assets/films/conocimiento-en-practica.webp` | 15266 | `4efc8c43fc009be7327c04aa265fb4d620be1449d60a5904ddcdc6cd0eafe4c0` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/conocimiento-en-practica.webp) |
| `growth/site/assets/films/infraestructura-comercial.mp4` | 3587135 | `58c1c990b094d8d9f0637cd6dde2c502b13ffc347c4075aa135c94ef6a373f45` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/infraestructura-comercial.mp4) |
| `growth/site/assets/films/infraestructura-comercial.webp` | 37864 | `443eba51b2e84cb825074c82a063878219e163ac22e2fb7b36b0fc0d1829340b` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/infraestructura-comercial.webp) |
| `growth/site/assets/films/menos-caos.mp4` | 3786601 | `54394a0da1fdfba7c81fe981b57f015a6aaa6fb9eb7f65985275abbbbcdb4d1e` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/menos-caos.mp4) |
| `growth/site/assets/films/menos-caos.webp` | 23520 | `314374a9090a354f3342c4c3020ea4687d6344afbbbd476ed19769457925ec29` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/menos-caos.webp) |
| `growth/site/assets/films/sistema-conectado.mp4` | 6367669 | `d8d34f63de90ee3f0440781be40ad52d9daabec92b1b9c7451dd24fc3feaf7db` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/sistema-conectado.mp4) |
| `growth/site/assets/films/sistema-conectado.webp` | 22980 | `bc52da68a621d16a48b480ecc71aecff9602945e870ea2713cef8dc0f64bd13c` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/sistema-conectado.webp) |
| `growth/site/assets/films/smart-agent.mp4` | 5549996 | `862d0958977f03c0d39fdc1e8259d7f58303f71fbdbebc2f1865e24e48459c11` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/smart-agent.mp4) |
| `growth/site/assets/films/smart-agent.webp` | 21764 | `3548a90610861f02557fd70291bfac224cec80ce5d38ec645a8060ea366dc238` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/films/smart-agent.webp) |
| `growth/site/assets/product-agenda.png` | 69815 | `16e57f1db2d9a8dfd04b1ff07b481bcac9e485b08277e3da8e65628b65c00e0f` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/product-agenda.png) |
| `growth/site/assets/product-demo.png` | 78780 | `34124d5a0897961de0ef869eee2063cbbf457ceffb8ce966b4d3445ee0cae749` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/product-demo.png) |
| `growth/site/assets/product-resources.png` | 52612 | `22dea634e8bf5d9096ec647f24ba865538086dd828a1cc1fcf2753a973e7581a` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/product-resources.png) |
| `growth/site/assets/scenarios/compositions/01-daily-intention.png` | 566514 | `6b60cf20f148917af470fdea242b7dc68ed48c84686d9a5c1dbaf11c8e21c9ac` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/01-daily-intention.png) |
| `growth/site/assets/scenarios/compositions/02-meet-greet.png` | 695340 | `fd10196f670e2ef4c07a5e7997f9ddacb28e2ac674da213626bdd874e22dbfff` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/02-meet-greet.png) |
| `growth/site/assets/scenarios/compositions/02-tour-preparation.png` | 572370 | `18cc47b806ac712e0f37029e0a3507df9a5ea3330f0fa9674c869668fb49bfc4` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/02-tour-preparation.png) |
| `growth/site/assets/scenarios/compositions/03-needs-discovery.png` | 615616 | `ebb3cab6d0cc1cfe85a136ff2954fe87a98aaef3df060b058389262185955d6a` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/03-needs-discovery.png) |
| `growth/site/assets/scenarios/compositions/04-objection-practice.png` | 575260 | `2114a395b0c65d8639445c7af0a3a599dcd65fc52330db6b736d562538e87f90` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/04-objection-practice.png) |
| `growth/site/assets/scenarios/compositions/05-leader-coaching.png` | 573803 | `0977bd5934c99bbef1e6141a831854dfd0b0be7a4a582edaccca417a71dcf0ec` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/05-leader-coaching.png) |
| `growth/site/assets/scenarios/compositions/06-learning-close.png` | 598800 | `46dfcb23c55922f8017313325cb0f1da2b0e256c7601d7844e52b6ddeef74e8b` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/compositions/06-learning-close.png) |
| `growth/site/assets/scenarios/scenes/briefing.webp` | 198878 | `cc67db767c70514269bfb3d0be433d804a54e8f6156eb06e17c2c66d6f30dd0a` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/scenes/briefing.webp) |
| `growth/site/assets/scenarios/scenes/coaching.webp` | 160992 | `aa47d7f21972de9bbdcde635096f5b2e6703501dd997f8037bf1e079628eab48` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/scenes/coaching.webp) |
| `growth/site/assets/scenarios/scenes/consultation.webp` | 204766 | `cc78f79422695d524172b793803562608635c28b012f570ecb39d3f9bfb01e37` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/scenes/consultation.webp) |
| `growth/site/assets/scenarios/screens/01-today-mobile.png` | 73733 | `659b52f9f753badd16cebb2250e2983a6826ed3ef35279fad17b19357b61c259` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/01-today-mobile.png) |
| `growth/site/assets/scenarios/screens/02-calendar-mobile.png` | 60604 | `b80c2ec560524059b2d3f10aef18b1aac4fe33056baba9236216f97db3548632` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/02-calendar-mobile.png) |
| `growth/site/assets/scenarios/screens/03-roadmap-mobile.png` | 82171 | `266043ef4733d3d704ee161afe6b5fa94df14f59fe36a9cc19f1d4b83b1de892` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/03-roadmap-mobile.png) |
| `growth/site/assets/scenarios/screens/04-discovery-mobile.png` | 53373 | `7118b9e66312402675fb616d26cfe9c1897457a35a9361fca40cad3de4a0a2d8` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/04-discovery-mobile.png) |
| `growth/site/assets/scenarios/screens/05-negotiation-mobile.png` | 54031 | `388a66bba4dcee044014e79e8b1ea7ede507a8d051e1c174ecd16a13214fc54e` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/05-negotiation-mobile.png) |
| `growth/site/assets/scenarios/screens/06-tour-preparation-mobile.png` | 38396 | `5cea5d3b0e275876eeed90d2d2540f614cade78cad46d212a01019e36569f248` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/06-tour-preparation-mobile.png) |
| `growth/site/assets/scenarios/screens/07-objection-practice-mobile.png` | 43067 | `d46845c43b5e4b69e3bde01f927bb982715c1e177290940cbafff6f2ca50bf5b` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/07-objection-practice-mobile.png) |
| `growth/site/assets/scenarios/screens/08-price-objection-mobile.png` | 55039 | `1e5527bef1ff98c858455fdb70974baf8bd63be3536c28ed76358580dee7d751` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/08-price-objection-mobile.png) |
| `growth/site/assets/scenarios/screens/09-after-tour-mobile.png` | 40586 | `a771bf85e3f4743ec48c670d72a384d72cb399935a41d1488cf7dcc9e0ea23de` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/09-after-tour-mobile.png) |
| `growth/site/assets/scenarios/screens/10-monthly-goal-mobile.png` | 37590 | `43421cd30783394d7b97214ecd070121dc97a99d75de5cea57a06d7c08d896b9` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/10-monthly-goal-mobile.png) |
| `growth/site/assets/scenarios/screens/11-weekly-progress-mobile.png` | 66882 | `3858cf46889c4190797ce43f6244dde951b59849926826fdc6ceb0347d40f595` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/11-weekly-progress-mobile.png) |
| `growth/site/assets/scenarios/screens/12-copilot-mobile.png` | 37308 | `daef7dda95a1fadba6c5dcc8297465b011f62e9a3ba67c2895e17cc85fb30bcc` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/12-copilot-mobile.png) |
| `growth/site/assets/scenarios/screens/13-today-desktop.png` | 92847 | `902f39761880bd52ef83faf9f8613e324a6f09380df29ee7cfe8ce36e1907aec` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/13-today-desktop.png) |
| `growth/site/assets/scenarios/screens/14-roadmap-desktop.png` | 100310 | `23b75ecebde780e118ce709c6edbdf6047fc2de80be60095b7732ccfa888fea5` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/14-roadmap-desktop.png) |
| `growth/site/assets/scenarios/screens/15-room-board-desktop.png` | 93955 | `dee5a1227497c6a964a2d34b1528b94793c63760b109135fffc5a35a85c94072` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/15-room-board-desktop.png) |
| `growth/site/assets/scenarios/screens/16-meet-greet-original.png` | 162319 | `da051d399971773d91b434704ffcf34c8f82eed1cb29a01d318c9ec6fef03b9e` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/16-meet-greet-original.png) |
| `growth/site/assets/scenarios/screens/16-meet-greet-retouched.png` | 1517543 | `3de1c6fcbce141fa6bc3c072e8f2d92d6fc91eace838c05018c9dd93d90be14c` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/16-meet-greet-retouched.png) |
| `growth/site/assets/scenarios/screens/16-meet-greet-retouched.webp` | 49838 | `33202c6afa08462fbbd6c8f232bfaca76d5a21345475f89cb6962c921d0c024f` | [Abrir activo](https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/screens/16-meet-greet-retouched.webp) |

## Integridad y procedencia

Paquete fuente: `salesacademy-original-interface.zip`. SHA256: `661f770684da240aa06cb93e93be5c3414397ca93f68ad57e8e2c61309f97fe9`.

Manifiesto: original-ui-manifest.json. Los archivos no se editaron al compilar este documento. La información se limita a interfaz, activos públicos y contenido editorial inicial de ejemplo; no contiene bases de datos, credenciales, sesiones ni registros reales. La copia compilada se verifica mediante original-source-validation.json.
