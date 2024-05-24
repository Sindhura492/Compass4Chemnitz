from django.db import models

class Crud(models.Model):
    name = models.CharField(unique=True,max_length=100)
    comments = models.CharField(unique=True,max_length=100,blank=True,null=True)



def __str__(self):
    return self.name
    