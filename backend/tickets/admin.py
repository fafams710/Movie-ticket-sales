from django.contrib import admin
from .models import TicketType

class TicketTypeAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('concert', 'category', 'price', 'total_quantity', 'remaining_quantity')
    
    # Fields that can be searched in the admin interface
    search_fields = ('concert__name', 'category')
    
    # Filters to add in the admin interface
    list_filter = ('category', 'concert')

# Register the TicketType model with the custom admin class
admin.site.register(TicketType, TicketTypeAdmin)
