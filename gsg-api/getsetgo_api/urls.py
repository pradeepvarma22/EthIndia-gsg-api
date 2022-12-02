from django.urls import path
from getsetgo_api.views import api_overview, add_user

urlpatterns = [
    path('', api_overview, name='api_overview'),
    path('add_user/', add_user, name='add_user')

]
