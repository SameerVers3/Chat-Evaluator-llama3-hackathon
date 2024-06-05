"""
https://python.langchain.com/v0.2/docs/integrations/chat/groq/
"""
from CREDS import GROQ_API_KEY

from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq


llm = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")

with open("./prompts/system_prompt.txt", "r") as f:
    system = f.read()
    
human = "{text}"
prompt = ChatPromptTemplate.from_messages([
    ("system", system),
    ("human", human)
])
chain = prompt | llm

with open("./chats/good_chat.txt", "r") as f:
    good_chat = f.read()

with open("./chats/avg_chat.txt", "r") as f:
    bad_chat = f.read()

res = chain.invoke(good_chat)
print("Good Chat:")
print(res.content)

res = chain.invoke(bad_chat)
print("Bad Chat:")
print(res.content)