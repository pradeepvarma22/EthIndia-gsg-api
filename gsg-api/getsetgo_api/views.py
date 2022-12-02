from getsetgo_api.models import User
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
