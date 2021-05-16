FROM python:3.9.5

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY server ./server
COPY ./.env .

EXPOSE 443/tcp

CMD [ "python", "-m", "server" ]


