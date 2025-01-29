# AI Challenges

AI challenges related to the A.I. Security course.
Each challenge has a frontend and a backend which can be run locally.

## Downloading Ollama

The first 4 challenges run using the Meta LLama AI. These challenges require the local running of the Ollama model.

First, download the Ollama agent by following the instructions here: https://ollama.com/download 

Next, once Ollama is running, download the 3.1 model using `ollama pull llama3.1`.

After that, you're good to go!

## Running the backend

Make sure you are using python, install all the python package by running `pip3 install -r requirements.txt` in the backend folder.. 
Next, simply run `python3 app.py`. 

In the case of the final challenge (LFI+RCE) an OpenAI key has to be appended to the input for running the server. Generate one at OpenAI and run the server with `python3 app.py --openaikey="sk....."`

## Running the frontend

The frontend is build in Nextjs with typescript in React. It requires nodejs/npm to run

go to the frontend folder, then run `npm i` to install all the modules. After that, start the development server by running `npm run dev`

## Solves

The main goal of the challenges is to get the flag. In some cases it's in the prompt, in some cases its a file within the backend folder. In some cases, a 'sample' folder is located in the backend server. That is where the proposed solution is written down (don't look at it if you want a challenge ;)) However, very much feel free to come up with your own solutions!