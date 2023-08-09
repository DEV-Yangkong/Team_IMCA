from django.urls import path
from . import views

# from .views import CountResult

urlpatterns = [
    path("", views.Youtube_Videos.as_view()),
    path("<int:pk>/", views.Youtube_VideoDetail.as_view()),
    # ------------------------------------------ 추가한 코드 👇🏻 - 예은 -
    path("<int:pk>/", views.Youtube_VideoDetail.as_view()),
    # ------------------------------------------ 추가한 코드 ☝🏻 - 예은 -
    # path(
    #     "count/",
    #     CountResult.as_view(),
    #     name="count",
    # ),
]
