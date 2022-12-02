from django.contrib import admin
from getsetgo_api.models import User, Question, Answer, Quizz

# Register your models here.
admin.site.register(User)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Quizz)
