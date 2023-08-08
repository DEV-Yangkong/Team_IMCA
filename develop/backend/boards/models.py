from django.db import models
from common.models import CommonModel


class CommunityBoard(CommonModel):
    title = models.CharField(max_length=15)
    content = models.TextField()
    is_block = models.BooleanField(default=False)
    file = models.FileField()
    author = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="boards")