FROM python:3.9.5

WORKDIR /usr/src/app
EXPOSE 443/tcp

COPY requirements.txt .
COPY server ./server
COPY .env .


RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "-m", "server" ]


