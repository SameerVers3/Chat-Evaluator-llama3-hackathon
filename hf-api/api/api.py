import os
import re
import json
from fastapi import FastAPI

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser

from langchain_groq import ChatGroq
# from api.CREDS import GROQ_API_KEY

class ChatOutput(BaseModel):
    score: int = Field(description="score of chats out of 100")
    description: str = Field(description="short description on how the score was given")

app = FastAPI()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

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

    if isinstance(res, dict):
        return res

    if isinstance(res, str):
        # get dict object between ``` and ``` in the string
        res = re.search(r'```(.*?)```', res, re.DOTALL)

    return res
    
    # return {"response": res}

# with open('./api/chats/good_chat.txt', 'r') as f:
#     chat = f.read()
    
# result = chain.invoke({"user_query": chat})

# print(result)