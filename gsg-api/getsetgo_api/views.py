from getsetgo_api.models import User, Quizz, Question, Answer
from getsetgo_api.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
import json


@api_view(['GET'])
def api_overview(request):

    api_urls = {
        'add_user': 'add_user/'
    }

    return Response(api_urls)


@api_view(['POST'])
def add_questions(request, pkk):

    myData = request.data

    # print(myData['questions'].get('0'))
    # print(myData['questions'].get('length'))
    # print(type(myData['questions'].get('length')))
    # print(type(myData['questions'].get('0')))

    length = myData['questions'].get('length')
    userId = myData['questions'].get('userId')
    quizzName = myData['questions'].get('quizzName')

    admin = User.objects.get(id=int(userId))
    obj = Quizz.objects.get_or_create(quiz_name=quizzName, user=admin)[0]

    # print(myData['questions'])
    for i in range(length):
        index = str(i)
        lst = myData['questions'].get(index)
        # print(index)
        # print(lst)
        # lst[0] = questionId
        # lst[1] = question
        # lst[2] = multiArray of options
        t_obj = Question.objects.create(qid=lst[0], question_text=lst[1], quizz=obj)
        # option_id = lst[i][0]
        # option = lst[i][1]
        # is_correct = lst[][2]
        # print(lst)
        # print('xxxxxxxxxxxxxxxxxxxxx')
        for j in lst[2]:
            Answer.objects.create(aid=j[0],choice =j[1] , is_correct = j[2]  ,question = t_obj )
            # print(lst[0])
            print(j)

        # print(lst)

    # print(myData)
    return Response({'error': 'true'})


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
