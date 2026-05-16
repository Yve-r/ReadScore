from django.contrib import admin
from .models import AssessmentResult, AnswerEntry

@admin.register(AssessmentResult)
class AssessmentResultAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'score', 'level', 'created_at')
    list_filter = ('level', 'created_at')
    search_fields = ('student_name',)

@admin.register(AnswerEntry)
class AnswerEntryAdmin(admin.ModelAdmin):
    list_display = ('assessment', 'question_number', 'short_answer')
    list_filter = ('assessment',)

    def short_answer(self, obj):
        return obj.answer_text[:50]
    short_answer.short_description = 'Answer'
