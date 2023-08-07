from django.contrib.auth.backends import BaseBackend
from users.models import User


class CustomBackend(BaseBackend):
    def authenticate(self, request, login_id=None, password=None):
        try:
            user = User.objects.get(login_id=login_id, password=password)
        except User.DoesNotExist:
            return None
        print(user)
        return user

    def get_user(self, user_pk):
        try:
            return User.objects.get(pk=user_pk)
        except User.DoesNotExist:
            return None
