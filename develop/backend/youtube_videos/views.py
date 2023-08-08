from rest_framework.views import APIView
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.response import Response
from .models import Youtube_Video
from .serializers import Youtube_VideoSerializer
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_500_INTERNAL_SERVER_ERROR,
)


class Youtube_Videos(APIView):
    def get(self, request):
        youtube_videos = Youtube_Video.objects.all()
        serializer = Youtube_VideoSerializer(youtube_videos, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            serializer = Youtube_VideoSerializer(data=request.data)
            if serializer.is_valid():
                content = serializer.save()
                return Response(Youtube_VideoSerializer(content).data, status=HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)


class Youtube_VideoDetail(APIView):
    def get_object(self, pk):
        try:
            return Youtube_Video.objects.get(pk=pk)
        except Youtube_Video.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        youtube_video = self.get_object(pk)
        youtube_video.views_count += 1  # Increase the views_count by 1
        youtube_video.save()  # Save the changes to the database
        serializer = Youtube_VideoSerializer(youtube_video)
        return Response(serializer.data)
        # 이 방법은 간단하고 직관적이지만 동시성 문제를 일으킬 수 있다. 즉, 동시에 여러 요청이 동일한 비디오에 대해 조회수를 증가시키려고 할 때, 일부 조회수가 누락될 수 있다. 이 문제를 해결하기 위해선, 데이터베이스에서 조회수를 증가시키는 것이 좋다. 이 방법은 동시성 문제를 일으키지 않는다.
        # 이 방법은 다음과 같다: Youtube_Video.objects.filter(pk=pk).update(views_count=F("views_count") + 1)
        """
        from django.db.models import F

        class Youtube_VideoDetail(APIView):
            def get_object(self, pk):
            
        """

    def put(self, request, pk):
        youtube_video = self.get_object(pk)
        serializer = Youtube_VideoSerializer(youtube_video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        youtube_video = self.get_object(pk)
        youtube_video.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class CountResult(APIView):
    def get(self, request):
        results = Youtube_Video.objects.all()
        count = results.count()
        return Response(
            {"count": count},
        )
