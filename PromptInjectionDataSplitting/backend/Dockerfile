FROM ubuntu

WORKDIR /app

COPY requirements.txt requirements.txt
COPY app.py app.py
RUN pip3 install -r requirements.txt
RUN curl -fsSL https://ollama.com/install.sh | sh
RUN ollama run llama3.1

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]