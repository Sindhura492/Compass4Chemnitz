# Generated by Django 4.2.13 on 2024-06-02 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chemnitz_api_backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='favorite',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(3, 'school'), (4, 'kindergarten'), (5, 'social_project'), (6, 'youth_career_support')], null=True),
        ),
    ]
