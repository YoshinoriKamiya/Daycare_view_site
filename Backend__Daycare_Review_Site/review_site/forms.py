from django import forms
from .models import Item
from .widgets import CustomClearableFileInput

class ItemForm(forms.ModelForm):
    image_1 = forms.ImageField(widget=CustomClearableFileInput, required=False)
    image_2 = forms.ImageField(widget=CustomClearableFileInput, required=False)
    image_3 = forms.ImageField(widget=CustomClearableFileInput, required=False)
    image_4 = forms.ImageField(widget=CustomClearableFileInput, required=False)
    image_5 = forms.ImageField(widget=CustomClearableFileInput, required=False)

    class Meta:
        model = Item
        fields = '__all__'
