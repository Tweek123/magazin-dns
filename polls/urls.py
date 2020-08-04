from django.urls import path
from . import views
from . import forms
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include

app_name = 'polls'
urlpatterns = [
    # path('', views.HomeView.as_view(), name='index'),
    path('', views.homePage, name='home'),
    path('catalog/<int:pk>',   views.CatalogView.as_view(), name='test'),
    path('category/<int:pk>',   views.CategoryView.as_view(), name='category'),
    # path('<int:product_id>/addOrder/', views.addOrder, name='addOrder'),
    path('product/<int:product_id>', views.productPage, name='product'),
    path('order/', views.orderPage, name='order'),
    path('search/', views.search, name='search'),
    path('checkout/', views.checkoutPage, name='checkout'),
    path('success-payment/', views.successPage, name='success')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)