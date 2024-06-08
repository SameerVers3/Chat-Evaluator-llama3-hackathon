import os
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
# from api.CREDS import GROQ_API_KEY

class ChatInput(BaseModel):
    text: str

app = FastAPI()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

llm = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")
with open("./api/prompts/system_prompt.txt", "r") as f:
    system = f.read()

human = "{text}"
prompt = ChatPromptTemplate.from_messages([
    ("system", system),
    ("human", human)
])
chain = prompt | llm

@app.post("/chat/")
async def chat(input_data: ChatInput):
    res = chain.invoke(input_data['text'])
    return {"response": res.content}
