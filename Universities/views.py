from django.shortcuts import render
from .models import Universities
from .serializers import UniversitiesSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class UniversityListView(generics.ListAPIView):
    queryset = Universities.objects.all()
    serializer_class = UniversitiesSerializer
    permission_classes = [AllowAny]

class UniversityCreateView(generics.CreateAPIView):
    queryset = Universities.objects.all()
    serializer_class = UniversitiesSerializer
    permission_classes = [AllowAny]