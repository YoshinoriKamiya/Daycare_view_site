from rest_framework import serializers
from django.conf import settings
from .models import Item,CustomUser,Review
from .forms import ItemForm

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = '__all__'

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            postal_code=validated_data.get('postal_code', ''),
            prefecture=validated_data.get('prefecture', ''),
            city=validated_data.get('city', ''),
            town=validated_data.get('town', ''),
            child_birth_date=validated_data.get('child_birth_date', None),
            gender=validated_data.get('gender', 'unspecified')
        )
        return user

class ItemSerializer(serializers.ModelSerializer):
    image_1_url = serializers.SerializerMethodField()
    image_2_url = serializers.SerializerMethodField()
    image_3_url = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'

    def get_image_1_url(self, obj):
        return self.get_image_url(obj.image_1)

    def get_image_2_url(self, obj):
        return self.get_image_url(obj.image_2)

    def get_image_3_url(self, obj):
        return self.get_image_url(obj.image_3)

    def get_image_url(self, image):
        if not image:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(image.url)
        return f"{settings.MEDIA_URL}{image.name}"

class ReviewSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), source='user', write_only=True)
    user = UserSerializer(read_only=True)
    facility_id = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), source='facility', write_only=True)
    facility = ItemSerializer(read_only=True) 

    class Meta:
        model = Review
        fields = ['id', 'rating', 'title', 'content', 'created_at', 'updated_at', 'user','user_id', 'facility', 'facility_id']