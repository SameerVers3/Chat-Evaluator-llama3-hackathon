import os
import re
import json
from typing import List, Dict
from fastapi import FastAPI
from dotenv import load_dotenv

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser

from langchain_groq import ChatGroq
# from api.CREDS import GROQ_API_KEY

load_dotenv()

class ChatOutput(BaseModel):
    score: int = Field(description="score of chats out of 100")
    description: str = Field(description="Short description on why the score was given, and also suggest tips for user on how could he/she make it interactive and better.")
    messages: List[str] = Field(description="Create a list of 5 potential messages for the person (self) to make the chat better and more interesting. Feel free to suggest jokes or share some fun facts to make the conversation more interactive and healthy. (just strings in a list and NOTHING else)")

app = FastAPI()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("--> ", GROQ_API_KEY)

llm = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")
with open("./api/prompts/system_prompt.txt", "r") as f:
    system = f.read()

human = "{text}"

parser = JsonOutputParser(pydantic_object=ChatOutput)

prompt = PromptTemplate(
    template=system,
    input_variables=['user_query'],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)
chain = prompt | llm | parser

@app.post("/chat/")
async def chat(input_data: ChatOutput):
    res = chain.invoke({"user_query": input_data['text']})
    if res is None:
        return {"score": 0, "description": "No response found."}

    if isinstance(res, str):
        res = re.search(r'```(.*?)```', res, re.DOTALL)
        if not res:
            res = re.search(r'---(.*?)---', res, re.DOTALL)        
            
        if res:
            res_str = res.group(1).replace("'", '"')  
        try:
            res = json.loads(res_str)  
        except json.JSONDecodeError:
            return {"score": 0, "description": "Invalid JSON format."}
    
    print(f"Response type: {type(res)} --> {res}")
    return res
