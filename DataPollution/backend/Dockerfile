FROM ubuntu

WORKDIR /app

RUN curl -fsSL https://ollama.com/install.sh | sh
RUN ollama pull llama3.1

COPY requirements.txt requirements.txt
COPY app.py app.py
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]