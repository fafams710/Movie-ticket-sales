from django.db import models


class TicketType(models.Model):
    CATEGORIES = [
        ('VIP', 'VIP (200 pax)'),
        ('LB', 'Lower Box (500 pax)'),
        ('UB', 'Upper Box (800 pax)'), 
        ('GA', 'General Admission (1500 pax)')
    ]
    
    concert = models.ForeignKey('concerts.Concert', on_delete=models.CASCADE)
    category = models.CharField(max_length=3, choices=CATEGORIES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    total_quantity = models.PositiveIntegerField()
    remaining_quantity = models.PositiveIntegerField()