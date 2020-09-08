from django import forms
from django.db import models
from .models import Product, Catalog, Category, Delivery, Property
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

DELIVERY_TYPES = [('home', 'Домой'), ('storage', 'Со склада')]

class CheckoutForm(forms.Form):
    email = forms.EmailField(label="Почта", validators=[RegexValidator(regex='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$', message="Неверно введена почта")])
    firstName = forms.CharField(label="Имя")
    lastName = forms.CharField(label="Фамилия")
    phone = forms.RegexField(label="Телефон", 
                             regex=r'^\+?1?\d{9,15}$',
                             error_messages={'invalid': _("Номер должен иметь формат: '+79*********'.")})

    
    deliveryType = forms.ChoiceField(label="",
                                initial='home',
                                widget=forms.RadioSelect, 
                                choices=DELIVERY_TYPES,
                                required=True,
                                )
    
    address = forms.CharField(label="Адрес", required=False)
    delivery = forms.ModelChoiceField(label="", queryset=Delivery.objects.all(), required=False )