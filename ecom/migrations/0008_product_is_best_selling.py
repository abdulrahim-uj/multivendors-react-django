# Generated by Django 3.2.14 on 2022-07-26 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom', '0007_rename_video_link_product_discount_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_best_selling',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
