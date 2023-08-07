from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.response import Response
from .models import Youtube_Video
from .serializers import Youtube_VideoSerializer


class Youtube_Videos(APIView):
    def get(self, request):
        youtube_videos = Youtube_Video.objects.all()
        serializer = Youtube_VideoSerializer(youtube_videos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = Youtube_VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class Youtube_VideoDetail(APIView):
    def get_object(self, pk):
        try:
            return Youtube_Video.objects.get(pk=pk)
        except Youtube_Video.DoesNotExist:
            return Response(status=HTTP_204_NO_CONTENT)

    def get(self, request, pk):
        youtube_video = self.get_object(pk)
        serializer = Youtube_VideoSerializer(youtube_video)
        return Response(serializer.data)

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


# class CountResult(APIView):
#     def get(self, request):
#         results = Youtube_Video.objects.all()
#         count = results.count()
#         return Response(
#             {"count": count},
#         )
