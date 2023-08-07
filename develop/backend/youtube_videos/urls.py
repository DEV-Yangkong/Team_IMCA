from django.urls import path
from . import views

urlpatterns = [
    path("", views.Youtube_Videos.as_view()),
    path("<int:pk>/", views.Youtube_VideoDetail.as_view()),
]
