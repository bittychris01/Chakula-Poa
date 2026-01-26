from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta

User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard_stats(request):
    """Get dashboard statistics for admin panel"""
    today = timezone.now().date()
    thirty_days_ago = today - timedelta(days=30)
    
    stats = {
        'total_users': User.objects.count(),
        'new_users_30_days': User.objects.filter(date_joined__gte=thirty_days_ago).count(),
        'active_users': User.objects.filter(is_active=True).count(),
    }
    return Response(stats)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def user_list(request):
    """List all users for admin"""
    users = User.objects.all().values('id', 'email', 'is_active', 'date_joined')
    return Response(list(users))


@api_view(['POST'])
@permission_classes([IsAdminUser])
def toggle_user_status(request, user_id):
    """Toggle user active status"""
    try:
        user = User.objects.get(id=user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({'status': 'success', 'is_active': user.is_active})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)