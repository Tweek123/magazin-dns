import datetime

from django.db import models
from django.utils import timezone
from django.core.files.storage import FileSystemStorage
from django.utils import timezone

class Catalog(models.Model):
    catalog_name = models.CharField(max_length=60, default='')

    def __str__(self):
        return self.catalog_name

class Category(models.Model):
    category_name = models.CharField(max_length=60, default='')
    category_image = models.ImageField(upload_to='images',height_field=None, width_field=None)
    category_catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE, default = None) 
   
    def __str__(self):
        return self.category_name

class Product(models.Model):
    product_title = models.CharField(max_length=60, default='')
    product_descr_short = models.CharField(max_length=200, default='')
    product_descr_full = models.TextField(max_length=2000, default='')
    product_price = models.CharField(max_length=200, default='')
    product_image = models.ImageField(upload_to='images',height_field=None, width_field=None)
    product_categories = models.ForeignKey(Category, on_delete=models.CASCADE, default = None)
    product_best =  models.BooleanField(default=False)
    
    def __str__(self):
        return self.product_title

class Charact(models.Model):
    charact_title = models.CharField(max_length=60, default='')
    charact_text = models.CharField(max_length=100, default='')
    charact_product = models.ForeignKey(Product, on_delete=models.CASCADE)
    def __str__(self):
        return self.charact_title

class Property(models.Model):
    property_title = models.CharField(max_length=200, default='')
    property_text = models.CharField(max_length=200, default='')
    property_charact = models.ForeignKey(Charact, on_delete=models.CASCADE)

    def __str__(self):
        return self.property_title        


class Delivery(models.Model):
    delivery_name = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.delivery_name     

class Client(models.Model):
    client_title       = models.CharField(max_length=400)
    client_email       = models.EmailField(max_length=254)
    client_name        = models.CharField(max_length=60)
    client_lastName    = models.CharField(max_length=60)
    client_phone       = models.CharField(max_length=60)
    client_address     = models.CharField(max_length=60)
    client_payment     = models.CharField(max_length=60)
    client_paymentDate = models.DateTimeField(default=timezone.now)
    client_totalPrice  = models.CharField(max_length=60)

    def __str__(self):
        return self.client_title      


