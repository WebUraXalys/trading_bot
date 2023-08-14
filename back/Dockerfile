FROM python:3.11

RUN pip install poetry

WORKDIR /back
COPY poetry.lock pyproject.toml /back/

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

COPY ./back ./back

EXPOSE 8000

#CMD ["export", "PYTHONPATH=$PYTHONPATH:$PWD"]
#WORKDIR /back/back
#CMD ["export", "PYTHONPATH=$PYTHONPATH:$PWD"]
#WORKDIR /back

#CMD ["python", "-m", "http.server"]
CMD ["python", "-m", "back.main"]

EXPOSE 8000
