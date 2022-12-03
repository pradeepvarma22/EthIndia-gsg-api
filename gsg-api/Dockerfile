FROM python:3.10

ENV PYTHONUNBUFFERED 1

ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt


COPY . .



RUN mkdir /test2

COPY . /test2/

EXPOSE 8000

CMD ["python", "test_api.py"]


