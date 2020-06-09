#The app
The app consist of a Django app for admins also serving as an api and a react app.

- `/admin`--> The admin panel to handle users and data
- `/upload` --> Upload new conversation (.graphml)
- `/upload/list` --> Look at all uploaded conversations
- `/`--> The landing page of the react app
- `/browse` --> Browse the conversations to start
- `/conversation/<uui>/start` --> Start conversation (the main entry to the app)

#Production

## Requirements (Ubuntu)

- `docker.io` >= 19.03
- `docker-compose` >= 1.26

(Make sure port 443 and 80 is both open for all users and for docker)

## 1. Change environment variables in env files:

###.env.prod
Change the following:

- `CERT_PATH` (where you store your .cert and .key)
- `SECRET_KEY` (Should be something random and long)

###.env.prod.db:
Docker compose sets up a database named `postgres`having the user `postgres`. The only thing yoy need is to upload the following:

- `POSTGRES_PASSWORD`

## 2. Run containers:

(NB: you might have to run your docker commands using sudo)

Start: `docker-compose -f docker-compose.prod.yml up -d --build`

- `docker-compose exec backend python manage.py collectstatic`
- `docker-compose exec backend python manage.py migrate --noinput`
- `docker-compose exec backend python manage.py createsuperuser`

# Development

You can run your local setup using docker compose or setting up each step manually. Version 1 is for you that wants to test the app. Version 2 is for you that wants to continue to develop the app.

## Version 1 - Run local version with docker compose

This setup is for you that just want to run the app locally for testing.

Start: `docker-compose -f docker-compose.yml up -d --build`

- docker-compose exec backend python manage.py collectstatic
- docker-compose exec backend python manage.py migrate --noinput
- docker-compose exec backend python manage.py createsuperuser

End: `docker-compose -f docker-compose.yml down`

--> "http://localhost" in browser

## Version 2 - Run local version manual setup

This is a 3 step setup for you local development environment. First, make sure all requirements are in place. Then do step by step instructions:

####Requirements:

- Docker
- Pipenv
- GNU gettext

###1. Database:

Run your database in docker:
`docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=postgres postgres`

You can also set up a postgres database manually if you prefer that better. Just make sure your database, user and password is set to `postgres`.

###2. Django:

You should run everything in a virtualenv. Make sure you have pipenv installed. Start shell by running:

`pipenv shell`

If this is your first time setting up the app you need to run these (if not skip these):

- `pipenv install`
- `python manage.py collectstatic`
- `python manage.py migrate`
- `python manage.py createsuperuser`

Now ypu can run server (8000):

`python manage.py runserver`

--> http://localhost:8000

###3. Run react app:

Install dependencies and run development server (3000):
`yarn install && yarn run start`

--> http://localhost:3000

# Git Subtrees

This repo consists of two subtrees: frontend and backend. These are two separate repos. If you want to push/pull from them you need to add them as remote. When adding their remote url you can use the subtree commands below. Changes done here do not need to be pushed back upstream.

### Add remotes for subtrees

- Add remote to backend folder: `git remote add backend --no-tags https://github.com/marteloge/classroom-conversation-api.git`
- Add remote to frontend folder: `git remote add frontend --no-tags https://github.com/marteloge/classroom-conversation-web.git`

### Subtree commands

- `git subtree pull backend master --prefix=backend --squash`
- `git subtree pull frontend master --prefix=frontend --squash`
- `git subtree push backend master --prefix=backend`
- `git subtree push frontend master --prefix=frontend`
