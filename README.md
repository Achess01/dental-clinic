# Dental clinic
Web application for managment of a dental clinic. Using Django and Django REST Framework for Backend and React.js for Frontend.

# Check project
```bash
git clone https://github.com/Achess01/dental-clinic.git
```

```bash
cd dental-clinic
```

## Backend
Build and up project
```bash
  docker-compose build
```
```bash
  docker-compose up
```

Migrate
```bash
  docker-compose run web python manage.py migrate
```
Create super user to start creating more personal

```bash
  docker-compose run web python manage.py createsuperuser
```

## Frontend
```bash
  cd frontend
```
Install dependencies
```bash
  npm install
```
Run project
```bash
  npm run dev
```