from django.urls import path
from .views import RegisterView, LoginView, ProfileView, LoginPageView, RegisterPageView, LogoutPageView

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='api-register'),
    path('login/', LoginView.as_view(), name='api-login'),
    path('profile/', ProfileView.as_view(), name='api-profile'),
    path('', LoginPageView.as_view(), name='login'),
    path('logout/', LogoutPageView.as_view(), name='logout'),
    path('signup/', RegisterPageView.as_view(), name='register'),
]
