from django.contrib import admin
from .models import Item,Review,CustomUser
from django.contrib.auth.admin import UserAdmin
# from django import forms

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    verbose_name = "施設"
    verbose_name_plural = "施設一覧"
    list_display = (
        'name',
        'address',
        'lat',
        'lng',
        'nearest_station',
        'feature_main_1',
        'feature_content_1',
        'feature_main_2',
        'feature_content_2',
        'feature_main_3',
        'feature_content_3',
        'phone_number',
        'closed_days',
        'childcare_hours',
        'extended_childcare',
        'facility_type',  
        'age_group',  
        'capacity',  
        'amenities',  
        'contact_email',  
        'website_url'  
    )
    search_fields = ('name',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    verbose_name = "レビュー"
    verbose_name_plural = "レビュー一覧"
    list_display = (
        'user',
        'facility',
        'rating',
        'title',
        'created_at',
        'updated_at'
    )
    search_fields = ('title', 'user__username', 'facility__name')

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number', 'postal_code', 'prefecture', 'city', 'town', 'child_birth_date', 'gender')}),
    )
    list_display = ('username', 'email', 'phone_number', 'prefecture', 'city', 'gender')
    search_fields = ('username', 'email', 'phone_number')