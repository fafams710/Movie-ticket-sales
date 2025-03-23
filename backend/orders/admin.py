from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('id', 'user', 'ticket_type', 'quantity', 'total_price', 'status', 'created_at')
    
    # Fields that can be searched in the admin interface
    search_fields = ('user__email', 'ticket_type__name', 'status')
    
    # Add filters for easy navigation in the admin
    list_filter = ('status', 'created_at')
    
    # Make the "created_at" field sortable
    ordering = ('-created_at',)

# Register the Order model with the custom admin class
admin.site.register(Order, OrderAdmin)
