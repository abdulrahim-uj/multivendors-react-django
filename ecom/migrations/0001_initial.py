# Generated by Django 3.2.14 on 2022-07-25 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HomeSlider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(blank=True, max_length=255, null=True)),
                ('tilte', models.CharField(blank=True, max_length=255, null=True)),
                ('content', models.CharField(blank=True, max_length=55, null=True)),
                ('discount_price', models.CharField(blank=True, max_length=255, null=True)),
                ('current_price', models.CharField(blank=True, max_length=255, null=True)),
                ('link', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
