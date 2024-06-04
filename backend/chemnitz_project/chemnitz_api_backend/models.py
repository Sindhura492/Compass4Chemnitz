from django.db import models
from django.contrib.auth.models import User


class Users(models.Model):
    POWER_USER=1
    REGULAR_USER=2
  
    SCHOOL=3
    KINDERGARTEN=4
    YOUTH_CAREER_SUPPORT=5
    SOCIAL_PROJECT=6
   
   

    
    ROLE_CHOICES = (
        (POWER_USER, 'power_user'),
        (REGULAR_USER, 'regular_user')
    )

    FAV_CATEGORY=(
        
            (SCHOOL,'school'),
            (KINDERGARTEN,'kindergarten'),
            (SOCIAL_PROJECT,'social_project'),
            (YOUTH_CAREER_SUPPORT,'youth_career_support'),
        
    )


    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_name=models.CharField(max_length=100, blank=True)
    password=models.CharField(max_length=100)
    first_name = models.CharField(max_length=100,blank=False, null=False)
    last_name = models.CharField(max_length=100,blank=False, null=False)
    email=models.EmailField(max_length=100,default='example@example.com',blank=False, null=False)
    is_active = models.BooleanField(default=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=2)
    favorite = models.PositiveSmallIntegerField(choices=FAV_CATEGORY,blank=True, null=True)
    

    def __str__(self):
        return self.user_name
    


class UserAddress(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='addresses')
    house_no = models.CharField(max_length=50)
    street_name = models.CharField(max_length=255,null=True, blank=True)
    postalcode = models.CharField(max_length=20,null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, default='Saxony')
    country = models.CharField(max_length=100,default='Germany')
    latitude = models.FloatField(blank=True)
    longitude = models.FloatField(blank=True)


class Kindergarten(models.Model):
    X=models.FloatField()
    Y=models.FloatField()
    OBJECTID=models.CharField(max_length=100,unique=True)
    ID=models.AutoField(primary_key=True)
    TRAEGER=models.CharField(max_length=200)
    BEZEICHNUNG=models.CharField(max_length=200)
    KURZBEZEICHNUNG=models.CharField(max_length=200)
    STRASSE=models.CharField(max_length=200)
    STRSCHL=models.CharField(max_length=200)
    HAUSBEZ=models.CharField(max_length=200)
    PLZ=models.CharField(max_length=200)
    ORT=models.CharField(max_length=200)
    HORT=models.CharField(max_length=200)
    KITA=models.CharField(max_length=200)
    URL=models.CharField(max_length=200)
    TELEFON=models.CharField(max_length=200)
    FAX=models.CharField(max_length=200)
    EMAIL=models.EmailField(max_length=200,default='example@example.com')
    BARRIEREFREI=models.BooleanField(default=True)
    INTEGRATIV=models.BooleanField(default=True)


class Schulen(models.Model):
    X = models.FloatField(blank=True, null=True)
    Y = models.FloatField(blank=True, null=True)
    OBJECTID = models.IntegerField(blank=True, null=True)
    ID = models.AutoField(primary_key=True)
    TYP = models.IntegerField(blank=True, null=True)
    ART = models.CharField(max_length=50,blank=True, null=True)
    STANDORTTYP = models.FloatField(blank=True, null=True)
    BEZEICHNUNG = models.CharField(max_length=300,blank=True, null=True)
    BEZEICHNUNGZUSATZ = models.CharField(max_length=300, blank=True, null=True)
    KURZBEZEICHNUNG = models.CharField(max_length=300,blank=True, null=True)
    STRASSE = models.CharField(max_length=300,blank=True, null=True)
    PLZ = models.IntegerField(blank=True, null=True)
    ORT = models.CharField(max_length=200,blank=True, null=True)
    TELEFON = models.CharField(max_length=200,blank=True, null=True)
    FAX = models.CharField(max_length=200,blank=True, null=True)
    EMAIL = models.EmailField(max_length=300,blank=True, null=True)
    PROFILE = models.CharField(max_length=300,blank=True, null=True)
    SPRACHEN = models.CharField(max_length=300, blank=True, null=True)
    WWW = models.URLField(max_length=300, blank=True, null=True)
    TRAEGER = models.CharField(max_length=300, blank=True, null=True)
    TRAEGERTYP = models.IntegerField(blank=True, null=True)
    BEZUGNR = models.IntegerField(blank=True, null=True)
    GEBIETSARTNUMMER = models.IntegerField(blank=True, null=True)
    SNUMMER = models.IntegerField(blank=True, null=True)
    NUMMER = models.IntegerField(blank=True, null=True)
    GlobalID = models.CharField(max_length=300,blank=True, null=True)
    CreationDate = models.CharField(max_length=300,blank=True, null=True)
    Creator = models.CharField(max_length=100,blank=True, null=True)
    EditDate = models.CharField(max_length=300,blank=True, null=True)
    Editor = models.CharField(max_length=100,blank=True, null=True)


class Jugendberufshilfen(models.Model):
    X=models.FloatField()
    Y=models.FloatField()
    OBJECTID=models.CharField(max_length=100,unique=True)
    ID=models.AutoField(primary_key=True)
    TRAEGER=models.CharField(max_length=200)
    LEISTUNGEN=models.CharField(max_length=200)
    BEZEICHNUNG=models.CharField(max_length=200)
    KURZBEZEICHNUNG=models.CharField(max_length=200)
    STRASSE=models.CharField(max_length=200)
    PLZ=models.CharField(max_length=200)
    ORT=models.CharField(max_length=200)
    TELEFON=models.CharField(max_length=200)
    EMAIL=models.EmailField(max_length=200,default='example@example.com')
    FAX=models.CharField(max_length=200)


class Schulsozialarbeit(models.Model):
    X=models.FloatField()
    Y=models.FloatField()
    OBJECTID=models.CharField(max_length=100,unique=True)
    ID=models.AutoField(primary_key=True)
    TRAEGER=models.CharField(max_length=200)
    LEISTUNGEN=models.CharField(max_length=200)
    BEZEICHNUNG=models.CharField(max_length=200)
    KURZBEZEICHNUNG=models.CharField(max_length=200)
    STRASSE=models.CharField(max_length=200)
    PLZ=models.CharField(max_length=200)
    ORT=models.CharField(max_length=200)
    TELEFON=models.CharField(max_length=200)
    EMAIL=models.EmailField(max_length=200,default='example@example.com')
    FAX=models.CharField(max_length=200)










    