import sys, site, os
from os.path import join

PROJECT_ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', '..')

def rel(*x):
    return os.path.join(PROJECT_ROOT, *x)

prev_sys_path = list(sys.path)

site.addsitedir(rel('env/lib/python2.6/site-packages'))

sys.path.append(PROJECT_ROOT)
sys.path.append(rel('mirosubs'))
sys.path.append(rel('mirosubs', 'apps'))

sys.stdout = sys.stderr

new_sys_path = [p for p in sys.path if p not in prev_sys_path]
for item in new_sys_path:
    sys.path.remove(item)
sys.path[:0] = new_sys_path

import django.core.handlers.wsgi
os.environ['DJANGO_SETTINGS_MODULE'] = 'mirosubs.unisubs-settings'
application = django.core.handlers.wsgi.WSGIHandler()

handler = django.core.handlers.wsgi.WSGIHandler()
off_tpl_path = rel('mirosubs', 'templates', 'off_template.html')
disabled_file_path = rel('mirosubs', 'disabled')

def application(environ, start_response):
    if os.path.exists(disabled_file_path):
        start_response('200 OK', [('Content-type', 'text/html')])
        return open(off_tpl_path).read()        
    else:    
        return handler(environ, start_response)