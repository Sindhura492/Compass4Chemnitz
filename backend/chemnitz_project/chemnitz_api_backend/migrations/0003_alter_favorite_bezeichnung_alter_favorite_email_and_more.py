# Generated by Django 4.2.13 on 2024-06-04 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chemnitz_api_backend', '0002_jugendberufshilfen_category_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favorite',
            name='BEZEICHNUNG',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='EMAIL',
            field=models.EmailField(blank=True, default='example@example.com', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='KURZBEZEICHNUNG',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='ORT',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='PLZ',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='STRASSE',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='TELEFON',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]