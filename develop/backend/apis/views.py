from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import requests, json, xmltodict

API_KEY = settings.API_KEY


class GetPublicAPI(APIView):
    def get(self, request):
        url = "http://kopis.or.kr/openApi/restful/pblprfr"
        params = {
            "service": API_KEY,
            "cpage": request.GET["cpage"],
            "rows": request.GET["rows"],
            "shcate": request.GET["shcate"],
            "prfstate": request.GET["prfstate"],
            "kidstate": "N",
            "signgucode": "11",
        }
        response = requests.get(url, params=params)
        return Response(response.text)


class BoxOfficeAPI(APIView):
    def get_time(self):
        return timezone.localtime(timezone.now()) - timedelta(weeks=1)

    def get(self, request):
        url = "http://kopis.or.kr/openApi/restful/boxoffice"
        params = {
            "service": API_KEY,
            "area": "11",
            "ststype": "week",
            "catecode": request.GET["catecode"],
            "date": str(self.get_time().date().year)
            + str(self.get_time().date().month).zfill(2)
            + str(self.get_time().date().day),
        }
        print(params)
        response = requests.get(url, params=params)
        return Response(response.text)
