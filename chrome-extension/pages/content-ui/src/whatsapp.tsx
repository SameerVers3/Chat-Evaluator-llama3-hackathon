import { useEffect, useState} from 'react';

interface MessageBoxProps {
  message: string;
  index: number;
}

const MessageBox = ({ message, index }: MessageBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        paddingInline: "3px",
        paddingBlock: "5px",
        backgroundColor: isHovered ? "#145c43" : "#16691634",
        borderRadius: "5px",
        border: "1px dotted #04AA6D",
        cursor: "pointer", // Optional: Add a pointer cursor to indicate it's interactable
        transition: "background-color 0.3s", // Optional: Smooth transition for background color change
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {message}
    </div>
  );
};

export default function WhatsappInput() {

  const message = [
    "Hello there 👋",
    "How are you doing?",
    "I'm here to help you with anything you need",
    "Just type your message below and press enter",
    "I'll take care of the rest",
    "You can also send me a voice message if you prefer"
  ]

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div style={
      {
        border: '1px solid #d1d9d72a',
        borderRadius: "15px",
        zIndex: 1000,
        maxHeight: "100px",
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
        gap: "5px",
        overflow: "scroll",
      }
    }>
      {
        message.map((msg, index) => {
          return (
            <MessageBox message={msg} index={index} />
          )
        })
      }
    </div>
  );
}