# Generated by Django 2.2 on 2022-07-18 11:12

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_auto_20220717_1416'),
    ]

    operations = [
        migrations.CreateModel(
            name='SideBar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/sidebar/')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('description', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('btn_name', models.CharField(blank=True, max_length=255, null=True)),
                ('link', models.CharField(blank=True, max_length=255, null=True)),
                ('video_title', models.CharField(blank=True, max_length=255, null=True)),
                ('video_link', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]