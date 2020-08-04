from django import forms
from django.db import models
from .models import Product, Catalog, Category, Delivery, Property
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

DELIVERY_TYPES = [('home', 'Домой'), ('storage', 'Со склада')]
PAYMENT_TYPES = [('PayPal','PayPal'),('Card','Card')]

class CheckoutForm(forms.Form):
    email = forms.EmailField(label="Почта", validators=[RegexValidator(regex='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$', message="Неверно введена почта")],initial="test@example.com")
    firstName = forms.CharField(label="Имя", initial="Name" )
    lastName = forms.CharField(label="Фамилия", initial="LastName")
    phone = forms.RegexField(label="Телефон",
                             initial="+79111247242", 
                             regex=r'^\+?1?\d{9,15}$',
                             error_messages={'invalid': _("Номер должен иметь формат: '+79*********'.")})

    
    deliveryType = forms.ChoiceField(label="",
                                initial='home',
                                widget=forms.RadioSelect, 
                                choices=DELIVERY_TYPES,
                                required=True,
                                )
    
    address = forms.CharField(label="Адрес", required=False, initial="Adress")
    delivery = forms.ModelChoiceField(label="", queryset=Delivery.objects.all(), required=False )