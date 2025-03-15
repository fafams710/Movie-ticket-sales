from django.db import models
from users.models import CustomUser

class Concert(models.Model):
    organizer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    venue = models.CharField(max_length=200)
    description = models.TextField()
    ar_model = models.FileField(upload_to='ar_models/')
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return self.title