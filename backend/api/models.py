from django.db import models

class UploadHistory(models.Model):
    file_name = models.CharField(max_length=255)
    upload_time = models.DateTimeField(auto_now_add=True)
    summary_json = models.JSONField()

    def __str__(self):
        return self.file_name