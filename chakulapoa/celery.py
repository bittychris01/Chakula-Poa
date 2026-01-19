import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chakulapoa.settings")

app = Celery("chakula_poa")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


