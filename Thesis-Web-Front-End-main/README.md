# ReadScore Django Conversion

This workspace now includes a minimal Django project to serve the existing front-end and support database/API extensions.

## Setup

1. Create and activate a Python virtual environment:

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run migrations:

```bash
python manage.py migrate
```

4. Start the development server:

```bash
python manage.py runserver
```

## App Structure

- `readscore_project/`: Django project config
- `readscore_app/`: application containing views, models, and template
- `website thesis/`: existing static assets are now served through Django

## Usage

- Open `http://127.0.0.1:8000/` to view the app
- Open `http://127.0.0.1:8000/api/result/` to fetch sample JSON result data

## Next steps

- Extend `readscore_app.models` with new database tables
- Add API endpoints in `readscore_app.views`
- Use Django admin at `/admin/` after creating a superuser
