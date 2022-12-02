from django.db import models


class User(models.Model):
    walletAddress = models.CharField(max_length=180, unique=True)
    isAdmin = models.BooleanField(default=False, blank=True)
    timestamp = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True)

    def __str__(self):
        return self.walletAddress


class Quizz(models.Model):
    quiz_name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.quiz_name


class Question(models.Model):
    question_text = models.CharField(max_length=150)
    quizz = models.ForeignKey(Quizz, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.question_text)


class Answer(models.Model):
    choice = models.CharField(max_length=150)
    is_correct = models.BooleanField(default=False, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.choice
