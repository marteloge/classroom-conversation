FROM python:3.8

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install --yes gettext && pip install pipenv
COPY Pipfile Pipfile.lock /
RUN pipenv lock --requirements > requirements.txt && pip install -r requirements.txt
COPY ./classroomconversation/ .
