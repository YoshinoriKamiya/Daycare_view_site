from django.db import models
from .functions.calc_lat_lng import get_lat_lng
from django.core.exceptions import ValidationError
from django.conf import settings
from django.contrib.auth.models import AbstractUser
import hashlib
from datetime import timedelta
from django.utils import timezone

# 施設情報
class Item(models.Model):
    name = models.CharField(max_length=100)  # 施設名
    address = models.CharField(max_length=255, null=True, blank=True)  # 住所
    lat = models.FloatField(null=True, blank=True)  # 緯度
    lng = models.FloatField(null=True, blank=True)  # 経度
    nearest_station = models.CharField(max_length=255, null=True, blank=True)  # 最寄り駅
    image_1 = models.ImageField(upload_to='images/', null=True, blank=True)  # 画像1
    image_2 = models.ImageField(upload_to='images/', null=True, blank=True)  # 画像2
    image_3 = models.ImageField(upload_to='images/', null=True, blank=True)  # 画像3
    image_4 = models.ImageField(upload_to='images/', null=True, blank=True)  # 画像4
    image_5 = models.ImageField(upload_to='images/', null=True, blank=True)  # 画像5
    feature_main_1 = models.CharField(max_length=255, null=True, blank=True)  # 特徴1のタイトル
    feature_content_1 = models.CharField(max_length=255, null=True, blank=True)  # 特徴1の内容
    feature_main_2 = models.CharField(max_length=255, null=True, blank=True)  # 特徴2のタイトル
    feature_content_2 = models.CharField(max_length=255, null=True, blank=True)  # 特徴2の内容
    feature_main_3 = models.CharField(max_length=255, null=True, blank=True)  # 特徴3のタイトル
    feature_content_3 = models.CharField(max_length=255, null=True, blank=True)  # 特徴3の内容
    phone_number = models.CharField(max_length=15, null=True, blank=True)  # 電話番号
    closed_days = models.CharField(max_length=255, null=True, blank=True)  # 休園日
    childcare_hours = models.CharField(max_length=255, null=True, blank=True)  # 保育時間
    extended_childcare = models.CharField(max_length=255, null=True, blank=True)  # 延長保育の有無
    facility_type = models.CharField(max_length=50, null=True, blank=True)  # 施設の種類（例：幼稚園、保育園など）
    age_group = models.CharField(max_length=50, null=True, blank=True)  # 対象年齢層
    capacity = models.IntegerField(null=True, blank=True)  # 定員
    amenities = models.TextField(null=True, blank=True)  # 施設の設備・アメニティ
    contact_email = models.EmailField(null=True, blank=True)  # 連絡用メールアドレス
    philosophy = models.TextField(null=True, blank=True)  # 保育理念/保育方針
    message = models.TextField(null=True, blank=True)  # メッセージ
    establishment_date = models.DateField(null=True, blank=True)  # 開設年月日
    website_url = models.URLField(null=True, blank=True)  # ウェブサイトのURL
    created_at = models.DateTimeField(auto_now_add=True)  # 作成日時
    updated_at = models.DateTimeField(auto_now=True)  # 更新日時

    class Meta:
        db_table = 'facility'

    def __str__(self):
        return self.name 
    
    def save(self, *args, **kwargs):
        if self.address:
            try:
                self.lat, self.lng = get_lat_lng(self.address)
            except Exception as e:
                print(f"Error retrieving lat/lng: {e}")
        super().save(*args, **kwargs)

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    postal_code = models.CharField(max_length=10, blank=True, null=True)
    prefecture = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    town = models.CharField(max_length=100, blank=True, null=True)
    child_birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=11, choices=[
        ('female', '女性'),
        ('male', '男性'),
        ('unspecified', '指定なし')
    ], default='unspecified')

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    facility = models.ForeignKey(Item, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
