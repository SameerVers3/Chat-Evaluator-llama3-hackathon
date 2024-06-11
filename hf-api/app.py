import gradio as gr
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.api import chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat/")
async def chat_endpoint(input_data: dict):
    response = await chat(input_data)
    return {"response": response}

async def gradio_chat(text):
    response = await chat({"text": text})
    return response

iface = gr.Interface(fn=gradio_chat, inputs="text", outputs="text")
iface.launch()
