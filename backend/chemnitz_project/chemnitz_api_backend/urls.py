from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter


router=DefaultRouter()
router.register('crud', CrudViewset,basename='crud')

urlpatterns = router.urls   

# urlpatterns = [
#     path('home',main),
#     path('home',main),
#     path('home',main),
#     path('home',main),



# ]