from django.contrib import admin
from .models import Concert

class ConcertAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('title', 'organizer', 'date', 'venue', 'created_at')
    
    # Fields that can be searched in the admin interface
    search_fields = ('title', 'venue', 'organizer__email')
    
    # Filters to add in the admin interface
    list_filter = ('date', 'venue')
    
    # Make "created_at" field sortable
    ordering = ('-created_at',)

# Register the Concert model with the custom admin class
admin.site.register(Concert, ConcertAdmin)
