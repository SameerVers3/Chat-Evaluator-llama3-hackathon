## Prototype v1.1


* Analysis report for Each message
* Render result  directly in the source page
* Detailed Analysis Report for every message

## API Docs v1.1

### Data sent to backend
```
{
  text: [
    {
        messageId: (Random Hash),
        messageSender: (String),
        messageContent: (String),
        time: (String),
        replyTo: (messageId)
    }
  ], // array of objects (every object is a message)
  
  isGroupChat: true/false // if a convo is one to one or group chat
}
```

### Expected Result

```
{
  score: (range 1 to 1000), // for whole collection of the chat
  messageScores: [
    {
        messageId: (Random Hash), // will be sent from frontend
        engagement_score: ( range 1 to 1000),
        analysis_report: {
            sentiment_score: (range 1 to 1000),
            // other matric idk what they are
        }
    }
  ],
  summary: (idk maybe but optional)
}
```

