How to use the Django setup
1. Install dependencies
From Thesis-Web-Front-End-main:

python -m venv .venv
.\\.venv\\Scripts\\activate
pip install -r requirements.txt

2. Prepare the database
Run Django migrations:

python manage.py migrate

3. Start the development server
Then open:

python manage.py runserver

http://127.0.0.1:8000/ — main app
http://127.0.0.1:8000/api/result/ — sample JSON API
What is already set up
readscore_project — Django project settings and URLs
readscore_app — app containing:
models.py — data structures for assessment results and answers
views.py — page render and API endpoint
urls.py — routes for / and /api/result/
templates/readscore/readscore.html — rendered HTML
Static files are served from:
website thesis/readscore.css
website thesis/readscore.js
How to extend it
Add a new database table
Edit models.py, then run:

python manage.py makemigrations
python manage.py migrate

Add a new API endpoint
Edit views.py and urls.py.

Example:

python manage.py createsuperuser

Add new function in views.py
Add route in urls.py
Use the admin panel
Create a superuser:

Then visit:

http://127.0.0.1:8000/admin/
Practical usage
Use index() to serve the app page
Use api_result() for JSON data from the database
Replace sample responses with real database queries
Save assessment results in AssessmentResult and AnswerEntry
If you want, I can also show you exactly how to save form answers into the Django database and fetch them through the API.
