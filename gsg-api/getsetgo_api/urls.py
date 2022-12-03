from django.urls import path
from getsetgo_api.views import api_overview, add_user,add_questions,get_quizz_user_data

urlpatterns = [
    path('', api_overview, name='api_overview'),
    path('add_user/', add_user, name='add_user'),
    path('add_questions/<int:pkk>/', add_questions, name='add_questions'),
    path('get_quizz_user_data/',get_quizz_user_data, name='get_quizz_user_data')

]