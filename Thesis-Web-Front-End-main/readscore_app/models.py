from django.db import models

class AssessmentResult(models.Model):
    student_name = models.CharField(max_length=128)
    score = models.PositiveSmallIntegerField()
    level = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} — {self.score}% ({self.level})"

class AnswerEntry(models.Model):
    assessment = models.ForeignKey(AssessmentResult, related_name='answers', on_delete=models.CASCADE)
    question_number = models.PositiveSmallIntegerField()
    answer_text = models.TextField()

    class Meta:
        ordering = ['question_number']

    def __str__(self):
        return f"Q{self.question_number}: {self.answer_text[:48]}"
