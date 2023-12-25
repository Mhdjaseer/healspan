# views.py
from rest_framework import generics
from .models import Question, Vote, Choice
from .serializers import QuestionSerializer, VoteSerializer, ChoiceSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from .tasks import send_email_task

# for creating questions
class QuestionList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

#for retrive deleta and update
class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


#for choice creating 
class ChoiceCreateView(generics.CreateAPIView):
    serializer_class = ChoiceSerializer

    def perform_create(self, serializer):
        serializer.save()

#for choice updating and deleting 
class ChoiceUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

  
    



# for voting and mailing 
class VoteCreate(generics.CreateAPIView):
    serializer_class = VoteSerializer

    def perform_create(self, serializer):
        # Get choice_id from the request data
        choice_id = self.request.data.get('choice')

        # Check if the choice_id is provided
        if choice_id is None:
            return JsonResponse({'detail': 'choice_id is required.'}, status=400)

        choice = get_object_or_404(Choice, id=choice_id)

        # Check if the voter with the provided email has already voted for this choice
        voter_email = serializer.validated_data['voter_email']
        existing_vote = Vote.objects.filter(choice=choice, voter_email=voter_email).exists()

        if existing_vote:
            return JsonResponse({'detail': 'You have already voted for this choice.'}, status=400)

        # Increment the vote count for the choice and save the vote
        choice.votes += 1
        choice.save()
        serializer.save(choice=choice)

        # Send a simple email after submitting the vote using Celery
        subject = 'Vote Confirmation'
        message = f'Thank you for submitting your vote for "{choice.choice_text}"!'

        send_email_task.delay(subject, message, [voter_email])

        return JsonResponse({'detail': 'Vote submitted successfully.'}, status=201)



    