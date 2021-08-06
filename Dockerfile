FROM python:3.9.5

WORKDIR /usr/src/app
EXPOSE 443/tcp
ENV PORT=443

COPY requirements.txt .
COPY server ./server
COPY images ./images

COPY .env .


RUN pip install --no-cache-dir -r requirements.txt &&\
    pip install gunicorn

CMD gunicorn -w 4 -b 0.0.0.0:$PORT server:app 

