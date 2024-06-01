from django.db import models
from django.contrib.auth.models import User



class Users(models.Model):
    REGULAR_USER=2
    POWER_USER=1
   

    
    ROLE_CHOICES = (
        (POWER_USER, 'power_user'),
        (REGULAR_USER, 'regular_user')
    )

    

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_name=models.CharField(max_length=100, blank=True)
    password=models.CharField(max_length=100)
    first_name = models.CharField(max_length=100,blank=False, null=False)
    last_name = models.CharField(max_length=100,blank=False, null=False)
    email=models.EmailField(max_length=100,default='example@example.com',blank=False, null=False)
    is_active = models.BooleanField(default=True)
    address1 = models.CharField(max_length=100, blank=True)
    address2 = models.CharField(max_length=100, blank=True)
    address3 = models.CharField(max_length=100, blank=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=2),
    # fav_category=models.ForeignKey(Favorites,)
    

    def __str__(self):
        return self.user_name


class Favorites(models.Model):
    SCHOOL=1
    KINDERGARTEN=2
    UNIVERSITY=3
    PROJECT=4
    FAV_CATEGORY=(
        (
            (SCHOOL,'school'),
            (KINDERGARTEN,'kindergarten'),
            (UNIVERSITY,'university'),
            (PROJECT,'project'),
        )
    )

    fav_id = models.PositiveSmallIntegerField(choices=FAV_CATEGORY, primary_key=True, default=1)
    fav_name=(models.CharField(max_length=100))






    