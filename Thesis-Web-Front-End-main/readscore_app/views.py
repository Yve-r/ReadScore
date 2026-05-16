from django.http import JsonResponse
from django.shortcuts import render
from .models import AssessmentResult

SAMPLE_ANSWER_PREVIEWS = [
    "About three percent of Earth's water is fresh water, because most of it is frozen in glaciers and ice caps.",
    "Clean water is essential because living things need it to survive and stay healthy.",
    "Turn off the faucet while brushing teeth, fix leaky pipes, and collect rainwater for plants.",
    "Pollution makes water unsafe and harms both people and the environment.",
    "Repair leaks and gather rainwater when the community faces water shortages."
]


def index(request):
    return render(request, 'readscore/readscore.html')


def api_result(request):
    latest = AssessmentResult.objects.order_by('-created_at').first()
    if latest:
        answers = list(latest.answers.values('question_number', 'answer_text'))
        result = {
            'student_name': latest.student_name,
            'score': latest.score,
            'level': latest.level,
            'answers': answers,
        }
    else:
        result = {
            'student_name': 'Sample Student',
            'score': 78,
            'level': 'Instructional',
            'answers': [
                {'question_number': i + 1, 'answer_text': text}
                for i, text in enumerate(SAMPLE_ANSWER_PREVIEWS)
            ],
        }
    return JsonResponse(result)
