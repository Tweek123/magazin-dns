# Generated by Django 2.2.13 on 2020-06-28 18:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Catalog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('catalog_name', models.CharField(default='', max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(default='', max_length=60)),
                ('category_image', models.ImageField(upload_to='images/')),
                ('category_catalog', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='polls.Catalog')),
            ],
        ),
        migrations.CreateModel(
            name='Charact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('charact_title', models.CharField(default='', max_length=60)),
                ('charact_text', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_email', models.EmailField(max_length=254)),
                ('client_name', models.CharField(default='', max_length=60)),
                ('client_lastName', models.CharField(default='', max_length=60)),
                ('client_phone', models.CharField(default='', max_length=60)),
                ('client_address', models.CharField(default='', max_length=60)),
                ('client_payment', models.CharField(default='', max_length=60)),
                ('client_paymentDate', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('delivery_name', models.CharField(default='', max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_title', models.CharField(default='', max_length=200)),
                ('property_text', models.CharField(default='', max_length=200)),
                ('property_charact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Charact')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_title', models.CharField(default='', max_length=60)),
                ('product_descr_short', models.CharField(default='', max_length=200)),
                ('product_descr_full', models.TextField(default='', max_length=2000)),
                ('product_price', models.CharField(default='', max_length=200)),
                ('product_image', models.ImageField(upload_to='images/')),
                ('product_best', models.BooleanField(default=False)),
                ('product_categories', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='polls.Category')),
            ],
        ),
        migrations.AddField(
            model_name='charact',
            name='charact_product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Product'),
        ),
    ]
