# Generated by Django 5.1.7 on 2025-03-28 15:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('concerts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TicketType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(blank=True, choices=[('VIP', 'VIP (200 pax)'), ('LB', 'Lower Box (500 pax)'), ('UB', 'Upper Box (800 pax)'), ('GA', 'General Admission (1500 pax)')], max_length=3, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_quantity', models.PositiveIntegerField(default=0)),
                ('remaining_quantity', models.PositiveIntegerField(default=0)),
                ('concert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket_types', to='concerts.concert')),
            ],
        ),
    ]
