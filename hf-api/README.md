# ChatOutput API on Hugging Face Spaces

This API evaluates chat interactions and provides suggestions for improving the conversation. It returns a JSON response with a score, a description, and a list of potential messages to enhance the chat.

## Accessing the API

### 1. Using a Script Tag

You can embed the API in your HTML using the following script:

```html
<script
  type="module"
  src="https://gradio.s3-us-west-2.amazonaws.com/4.36.0/gradio.js"
></script>

<gradio-app src="https://ashad001-llama3hackathon.hf.space"></gradio-app>
```

### 2. Embedding as an Iframe

You can also embed the API in your web page using an iframe:

```html
<iframe
  src="https://ashad001-llama3hackathon.hf.space"
  frameborder="0"
  width="850"
  height="450"
></iframe>
```

### 3. Direct URL

You can directly access the API via the following URL:

```
https://ashad001-llama3hackathon.hf.space
```

## API Endpoint

If you prefer making direct HTTP requests to the API, use the following endpoint:

```
https://ashad001-llama3hackathon.hf.space/predict
```

## Request Format

The API expects a JSON payload in the following format:

```json
{
  "input": "<your-chat-input>"
}
```

## Response Format

The API responds with a JSON object containing the evaluation score, a description of how the score was determined, and a list of suggestions to improve the chat. The response format is as follows:

```json
{
  "score": <int>,
  "description": "<string>",
  "messages": [
    {
      "role": "<string>",
      "content": "<string>"
    }
  ]
}
```

### Example Response

```json
{
  "score": 85,
  "description": "The chat was engaging but could use more details.",
  "messages": [
    {
      "role": "user",
      "content": "Could you explain more about this topic?"
    },
    {
      "role": "assistant",
      "content": "Sure, I can provide more details."
    },
    {
      "role": "user",
      "content": "That would be great, thank you!"
    }
  ]
}
```

## How to Use

1. **Install Required Libraries**: Ensure you have the `requests` library installed to make HTTP requests.

    ```bash
    pip install requests
    ```

2. **Send a POST Request**:

    ```python
    import requests

    url = "https://ashad001-llama3hackathon.hf.space/predict"
    headers = {"Content-Type": "application/json"}
    data = {
        "input": "<your-chat-input>"
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        result = response.json()
        print("Score:", result["score"])
        print("Description:", result["description"])
        print("Messages:", result["messages"])
    else:
        print("Error:", response.status_code)
    ```

## Contact

For any issues or questions, please contact [Your Name] at [your-email@example.com].
