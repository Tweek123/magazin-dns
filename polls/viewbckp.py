from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from .models import Product, Catalog, Category, Charact, Property
from django.utils import timezone
from .forms import CheckoutForm
from django.shortcuts import render
from paypal.standard.forms import PayPalPaymentsForm
from django.core.paginator import Paginator

import json


def homePage(request):
    return render(request, 'polls/home.html', {
        'products': Product.objects.all(),
        'catalogs': Catalog.objects.all(),
        'BestProducts': Product.objects.filter(product_best__exact=True),
    })


class CatalogView(generic.DetailView):
    model = Catalog
    template_name = 'polls/catalog.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['catalogs'] = Catalog.objects.all()
        return context


class CategoryView(generic.DetailView):
    model = Category
    template_name = 'polls/category.html'

    def get_context_data(self, **kwargs):
        page = self.request.GET.get('page')
        context = super().get_context_data(**kwargs)
        print(type(context['category'].product_set.all()))
        paginator = Paginator(context['category'].product_set.all(), 2)
        products = paginator.get_page(page)

        context['catalogs'] = Catalog.objects.all()
        context['products'] = products
        return context

# def addOrder(request,product_id):
    
#     orders=request.session.get('orders', [])
#     orders.append(product_id)
#     request.session['orders'] = orders
#     product = get_object_or_404(Product, pk=product_id)
#     urlReferer = request.META.get('HTTP_REFERER') 
      

#     if 'category' not in urlReferer: 
#         HttpResp = HttpResponseRedirect(reverse('polls:home'))
#     else:
#         HttpResp = HttpResponseRedirect(reverse('polls:category', args=(product.product_categories_id
#         ,)))

    
#     return HttpResp

def orderPage(request):    
        orders = []

        print(type(request.COOKIES.get('orders')))
        total = 0
        for order in  json.loads(request.COOKIES.get('orders')):
            order['product'] = get_object_or_404(Product, pk=order['id'])
            order['price'] =  int(order['product'].product_price)*int(order['count'])
            total = total + order['price']
            orders.append(order)
        return render(request, 'polls/order.html', {
        'orders': orders,
        'catalogs': Catalog.objects.all(),
        'total': total
    })

def productPage(request, product_id):    
        product = get_object_or_404(Product, pk=product_id)
        characts = Charact.objects.filter(charact_product__exact=product_id)

        for charact in characts:
            charact.properties = Property.objects.filter(property_charact__exact = charact)


        return render(request, 'polls/product.html', {
        'product': product,
        'catalogs': Catalog.objects.all(),
        'characts': characts 
    })

def search(request):
    search_value =  request.GET.get("search", "")
    
    print(search_value)
    findedProducts = []
    findedProducts = [*findedProducts,*Product.objects.filter(product_title__icontains=search_value)]
    findedProducts = [*findedProducts,*Product.objects.filter(product_descr_short__icontains=search_value)]
    findedProducts = [*findedProducts,*Product.objects.filter(product_descr_full__icontains=search_value)]
    findedProducts = list(set(findedProducts))
    page = request.GET.get('page')
    paginator = Paginator(findedProducts, 1)
    findedProductsPagin = paginator.get_page(page)

    return render(request, 'polls/finded-products.html', {
        'findendProducts': findedProductsPagin,
        'catalogs': Catalog.objects.all(),
        'searchVal': search_value
    })  

def checkoutPage(request, ):
    checkoutForm = CheckoutForm()
    orders = []
    total = 0
    for order in  json.loads(request.COOKIES.get('orders')):
        order['product'] = get_object_or_404(Product, pk=order['id'])
        order['price'] =  int(order['product'].product_price)*int(order['count'])
        total = total + order['price']
        orders.append(order)

    if request.method == "POST":
        paypal_dict = {
            "business": "tweek1996@gmail.com",
            "amount": "10000000.00",
            "item_name": "name of the item",
            "invoice": "unique-invoice-id",
            "notify_url": request.build_absolute_uri(reverse('paypal-ipn')),
        }

        # Create the instance.
        form = PayPalPaymentsForm(initial=paypal_dict)
        context = {"form": form}
        return render(request, "polls/payment.html", context)
    else:
        return render(request, "polls/checkout.html", 
        {'form': checkoutForm,
        'total': total,
        'catalogs': Catalog.objects.all(),
        'orders': orders
        })
