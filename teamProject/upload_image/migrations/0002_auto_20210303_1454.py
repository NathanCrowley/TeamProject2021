# Generated by Django 3.0.1 on 2021-03-03 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upload_image', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='hotel_retro_img',
            field=models.ImageField(default='SOME_STRING', upload_to='retro/'),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='hotel_medium_img',
            field=models.ImageField(upload_to='hard/'),
        ),
    ]
