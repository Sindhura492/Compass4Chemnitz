from django.urls import path
from user_api.users import *
from category_api.categories import *
from address_api.address import *
from favorites_api.favorites import *



urlpatterns = [
       path('user-info/<int:user_id>/', UserProfileUserIdView.as_view(), name='user-profile-user-id'),
       path('soft-delete-user/<int:user_id>/', DeleteUserView.as_view(), name='soft-delete-user'),
       path('inactive-users/', InactiveUserListView.as_view(), name='inactive-users'),
       path('user-favorite-category/<int:user_id>/', UserProfileUserIdView.as_view(), name='user-favorite-category'),
       path('kindergartens/',KindergartenView.as_view(), name='kindergarten-list'),
       path('schulen/',SchulennView.as_view(), name='schulen-list'),
       path('jugendberufshilfens/',JugendberufshilfenView.as_view(), name='jugendberufshilfens-list'),
       path('schulsozialarbeits/',SchulsozialarbeitView.as_view(), name='schulsozialarbeits-list'),
       path('add-address/', AddressCreateView.as_view(), name='add-address'),
       path('user-addresses/<int:user_id>/', AddressCreateView.as_view(), name='user-addresses'),
       path('favorites/', FavoriteView.as_view(), name='favorite-create'),
       path('favorites/<int:user_id>/', FavoriteView.as_view(), name='favorite-list'),
       path('favorites/delete/<int:user_id>/', FavoriteView.as_view(), name='favorite-delete'),
]