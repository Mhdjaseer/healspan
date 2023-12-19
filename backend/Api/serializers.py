# serializers.py
from rest_framework import serializers
from .models import Choice, Question,Vote

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'
        read_only_fields = ['votes']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'pub_date', 'choices']


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vote
        fields='__all__'