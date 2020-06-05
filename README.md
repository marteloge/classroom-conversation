# CLASSROOM CONVERSATION

## PRE REQUIREMENTS

1. Python 3
2. Pipenv
3. Docker
4. Postgres

## PROJECT INITIAL SETUP

#### 1 Pipenv

Run the application in a separate environment using pipenv. First time you need to install the environment:

`pipenv install`

When developing work in the shell created:

`pipenv shell`

#### 2 Database setup

To create a database and run your previous database run:

```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres
```

This creates a database named `postgres` with a user `postgres` having the password `postgres`. You need to have the postgres database running in a separate terminal while developing.

If you want it running in the background you can run the command with `-d` flag. Then you have to use `docker kill` to stop the process.

If you want to wipe and create a new instance run (Warning: this will wipe all docker volume!):

```
docker volume prune
```

#### 3 Migrate

To get your database set up run the migrations:

```
python manage.py migrate
```

#### 4 Admin superuser

```
python manage.py createsuperuser
```

Example for local development

```
Username: postgres
Email address: postgres@postgres.com
Password:
Password (again):
Superuser created successfully.
```

#### 5 Admin superuser

Start application to check that everything is running:

```
python manage.py runserver
```

Hit `localhost:8000/upload` to check that everything is running

## RUN PROJECT

After setting up the project you only need to do the following:

#### 1 Run docker with the database in a separate terminal

```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres
```

#### 2 Start pipenv shell and start app

Start shell

```
pipenv shell
```

Start app

```
python manage.py runserver
```

Hit `localhost:8000/upload` and get to work!
