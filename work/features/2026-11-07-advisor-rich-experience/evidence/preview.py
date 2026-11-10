"""Ephemeral local QA preview; not a production adapter."""
from pathlib import Path
import sys,tempfile
sys.path.insert(0,str(Path(__file__).resolve().parents[4]))
from growth.server.app import create_app
with tempfile.TemporaryDirectory(prefix='sa-advisor-rich-preview-') as folder:
 app=create_app({'DATA_ROOT':folder,'COOKIE_SECURE':False,'PUBLIC_CONTACT_ENABLED':False,'ADVISOR_ENABLED':True,'ADVISOR_CLIENT':lambda messages:'Sales Academy ayuda a preparar, practicar y acompañar a tu equipo con su propio método. Puedes explorar una guía y un video. ¿Qué te gustaría mejorar primero?','RATE_LIMIT_ENABLED':False})
 app.run(host='127.0.0.1',port=4310,debug=False,use_reloader=False)
