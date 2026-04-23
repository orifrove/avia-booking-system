from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from core.views import home
from apps.users.views import LoginPageView, RegisterPageView, LogoutPageView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Главная
    path('', home, name='home'),
    # Auth страницы
    path('login/', LoginPageView.as_view(), name='login'),
    path('register/', RegisterPageView.as_view(), name='register'),
    path('logout/', LogoutPageView.as_view(), name='logout'),
    # API
    path('api/auth/', include('apps.users.urls', namespace='users')),
    path('api/aircraft/', include('apps.aircraft.urls')),
    path('api/flights/', include('apps.flights.urls')),
    path('api/bookings/', include('apps.bookings.urls')),
    path('api/payments/', include('apps.payments.urls')),
    # Templates
    path('flights/', include('apps.flights.urls', namespace='flights')),
    path('bookings/', include('apps.bookings.urls', namespace='bookings')),
    path('aircraft/', include('apps.aircraft.urls', namespace='aircraft')),
    # Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
