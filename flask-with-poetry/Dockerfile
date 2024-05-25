# syntax=docker/dockerfile:1
FROM python:3.12.3-slim-bookworm

WORKDIR /src

RUN pip install poetry
COPY . .
RUN poetry install

EXPOSE 5000
CMD [ "poetry", "run", "flask", "run", "--debug", "-h", "0.0.0.0", "-p", "5000" ]