# Generated by Django 4.2.13 on 2024-06-01 23:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorites',
            fields=[
                ('fav_id', models.PositiveSmallIntegerField(choices=[(1, 'school'), (2, 'kindergarten'), (3, 'university'), (4, 'project')], default=1, primary_key=True, serialize=False)),
                ('fav_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(blank=True, max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(default='example@example.com', max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('address1', models.CharField(blank=True, max_length=100)),
                ('address2', models.CharField(blank=True, max_length=100)),
                ('address3', models.CharField(blank=True, max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
