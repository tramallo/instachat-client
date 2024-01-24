import { useEffect, useState } from "react";
import { chatService } from "../services/services-index";
import { Message } from "../services/chat.service";

export default function HomeSlide() {
    const [chatContent, setChatContent] = useState('')
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage == '')
            return

        chatService.sendMessage({ sender: chatService.getSocketId(), body: newMessage })
        setNewMessage('')
    }

    const receiveMessage = (message: Message) => {
        const messageString = `${message.sender}: ${message.body}`

        setChatContent((prevContent) => prevContent ? `${prevContent}\n${messageString}` : `${messageString}`)
    }

    useEffect(() => {
        setChatContent(() => 
            chatService.getMessages().map(message => `${message.sender}: ${message.body}`).join('\n')
        )

        const receiveMessageCallbackName = 'receive-message'
        chatService.onNewMessage(receiveMessageCallbackName, receiveMessage)
        return () => {
            chatService.offNewMessage(receiveMessageCallbackName)
        }
    }, [])

    return <>
        <div className='slide'>
            <div className='banner'>
                <div className='logo' >logo</div>
                <div className='title'><h1>{chatService.getSocketId()}</h1></div>
            </div>
            <div className='content'>
                <div className='chat'>{chatContent}</div>
                <div className='message-input'>
                    <input 
                        className='input-field'
                        name='new-message'
                        type='text'
                        value={newMessage}
                        placeholder='type a message'
                        onChange={event => setNewMessage(event.target.value)}
                    />
                    <button className='send-button' onClick={sendMessage}>Send</button>
                </div>
            </div>
            <div className='navbar'>
                navbar content
            </div>
        </div>
    </>
}