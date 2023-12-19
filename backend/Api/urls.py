from django.urls import path
from .views import QuestionList,VoteCreate,QuestionDetail,ChoiceCreateView,ChoiceUpdateDeleteView
urlpatterns = [
    path('questions/', QuestionList.as_view(), name='question-list'),#for question creting and listing 
    path('questions/<int:pk>/', QuestionDetail.as_view(), name='question-detail'), #for updating and deleting 
    path('choices/create/', ChoiceCreateView.as_view(), name='choice-create'),#for creating choices
    path('choices/<int:pk>/', ChoiceUpdateDeleteView.as_view(), name='choice-update-delete'),#for updating and deleting the choice
    path('vote/',VoteCreate.as_view(),name='vote'),

    
]
