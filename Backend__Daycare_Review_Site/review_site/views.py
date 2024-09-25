from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, ItemSerializer, ReviewSerializer 
from .models import CustomUser, Item, Review
import logging
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    """ユーザーのCRUD操作を提供するビューセット"""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        """現在のユーザーの情報のみを取得"""
        if self.action in ['list', 'retrieve']:
            return CustomUser.objects.all()
        else:
            return CustomUser.objects.filter(id=self.request.user.id)
    
class ManageUserView(generics.RetrieveAPIView):
    """現在のユーザーの情報を取得するためのビュー"""
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    # permission_classes = (AllowAny,)

    def get_object(self):
        """現在ログインしているユーザーの情報を取得"""
        return self.request.user
    

class ItemViewSet(viewsets.ModelViewSet):
    """施設情報のCRUD操作を提供するビューセット"""
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = (AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=True, methods=['get', 'put'], renderer_classes=[TemplateHTMLRenderer, JSONRenderer])
    def form(self, request, pk=None):
        """施設のフォームを表示・更新するためのアクション"""
        item = self.get_object()
        if request.method == 'GET':
            return Response({'item': item}, template_name='item_form.html')
        elif request.method == 'PUT':
            serializer = self.get_serializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                if 'clear_image' in request.data:
                    item.image_1 = None
                    item.save()
                else:
                    serializer.save()
                if request.accepted_renderer.format == 'html':
                    return Response({'item': item}, template_name='item_form.html')
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserCreateView(generics.CreateAPIView):
    """新しいユーザーを作成するためのビュー"""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class ReviewViewSet(viewsets.ModelViewSet):
    """レビューのCRUD操作を提供するビューセット"""
    queryset = Review.objects.all().select_related('facility')
    serializer_class = ReviewSerializer
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('facility_id', openapi.IN_QUERY, description="Facility ID to filter reviews (multiple allowed)", type=openapi.TYPE_ARRAY, items=openapi.Items(type=openapi.TYPE_INTEGER)),
            openapi.Parameter('item_id', openapi.IN_QUERY, description="Item ID to filter reviews", type=openapi.TYPE_INTEGER),
            openapi.Parameter('rating', openapi.IN_QUERY, description="Rating to filter reviews", type=openapi.TYPE_INTEGER),
            openapi.Parameter('content', openapi.IN_QUERY, description="Content to filter reviews", type=openapi.TYPE_STRING),
            openapi.Parameter('title', openapi.IN_QUERY, description="Title to filter reviews", type=openapi.TYPE_STRING),
        ]
    )
    def get_queryset(self):
        queryset = super().get_queryset()
        facility_ids = self.request.query_params.getlist('facility_id')
        item_id = self.request.query_params.get('item_id')
        rating = self.request.query_params.get('rating')
        content = self.request.query_params.get('content')
        title = self.request.query_params.get('title')
        
        if facility_ids:
            try:
                facility_ids = [int(facility_id) for facility_id in facility_ids]
                queryset = queryset.filter(facility_id__in=facility_ids)
            except ValueError:
                logger.warning(f"Invalid facility_ids: {facility_ids}")
                queryset = queryset.none()

        if item_id:
            try:
                item_id = int(item_id)
                queryset = queryset.filter(item_id=item_id)
            except ValueError:
                logger.warning(f"Invalid item_id: {item_id}")
                queryset = queryset.none()

        if rating:
            try:
                rating = int(rating)
                queryset = queryset.filter(rating=rating)
            except ValueError:
                logger.warning(f"Invalid rating: {rating}")
                queryset = queryset.none()

        if content:
            queryset = queryset.filter(content__icontains=content)

        if title:
            queryset = queryset.filter(title__icontains=title)

        return queryset

class LoginView(APIView):
    """ログインを処理するためのビュー"""
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
