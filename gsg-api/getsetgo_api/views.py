from getsetgo_api.models import User, Quizz, Question, Answer
from getsetgo_api.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status


@api_view(['GET'])
def api_overview(request):

    api_urls = {
        'add_user': 'add_user/'
    }

    return Response(api_urls)


@api_view(['POST'])
def add_questions(request, pkk):
    obj = {'id': -1}
    User_id = ""
    error = False
    try:
        myData = request.data
        length = myData['questions'].get('length')
        userId = myData['questions'].get('userId')
        quizzName = myData['questions'].get('quizzName')

        admin = User.objects.get(id=int(userId))
        obj = Quizz.objects.get_or_create(quiz_name=quizzName, user=admin)[0]

        for i in range(length):
            index = str(i)
            lst = myData['questions'].get(index)
            t_obj = Question.objects.create(
                qid=lst[0], question_text=lst[1], quizz=obj)
            for j in lst[2]:
                Answer.objects.create(
                    aid=j[0], choice=j[1], is_correct=j[2], question=t_obj)
    except:
        error = True

    return Response({'error': error, 'User_id': userId, 'quizzId': obj.id})


@api_view(['POST'])
def add_user(request):

    myData = request.data

    try:
        user = User.objects.get(walletAddress=myData.get("walletAddress"))
    except User.DoesNotExist:
        user = User()
        user.walletAddress = myData.get("walletAddress")
        user.isAdmin = myData.get("isAdmin")
        user.save()

    serializers = UserSerializer(instance=user, data=request.data)

    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data)

    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_quizz_user_data(request):
    myData = request.data
    print(myData)
    error = False
    try:
        user = User.objects.get(id=myData.get('userId'))
        quizz = Quizz.objects.get(id=myData.get('quizzId'))
    except User.DoesNotExist:
        print('Exception At get_quizz_user_data')
        error = True

    return Response({'walletAddress': str(user.walletAddress), 'quizz': str(quizz.quiz_name), 'error': error})
