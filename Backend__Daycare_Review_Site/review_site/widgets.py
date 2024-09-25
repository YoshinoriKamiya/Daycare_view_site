from django.forms import ClearableFileInput

class CustomClearableFileInput(ClearableFileInput):
    template_name = 'custom_clearable_file_input.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.clear_checkbox_label = 'NULL'