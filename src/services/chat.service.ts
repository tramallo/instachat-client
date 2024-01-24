import { ApiService, EventListener, EventType } from "./api.service";

export type Message = {
    sender: string,
    body: string
}

export type MessageListener = (message: Message) => void

/** Interface for api service that abstracts chat functionalities.
 */
export class ChatService {
    private apiService: ApiService

    /** List of received messages.
     */
    private messages: Message[] = []

    /** Function(s) to call when a message is received.
     */
    private newMessageCallbacks = new Map<string, MessageListener>()

    /** Callback function used to process received messages.
     * - Stores messages
     * - Executes new message callbacks
     */
    private messageEventListener: MessageListener = (message: Message) => {
        console.log(`Message received from: ${message.sender}`)
        this.messages.push(message)

        for(const [callbackName, newMessageCallback] of this.newMessageCallbacks) {
            console.log(`Executing new message callback: ${callbackName}`)
            newMessageCallback(message)
        }
    }

    constructor(apiService: ApiService) {
        this.apiService = apiService

        this.apiService.listenEvent(EventType.Message, this.messageEventListener as EventListener)
    }

    sendMessage(message: Message) {
        this.apiService.sendEvent(EventType.Message, message)
    }

    getMessages() {
        return this.messages
    }

    /** Registers a function to be called when a message arrives.
     * - Multiple functions can be registered
     * - Multiple functions are executed in the same order as they where registered
     */
    onNewMessage(callbackName: string, newMessageCallback: MessageListener) {
        console.log(`Registering new message callback: ${callbackName}.`)

        if(this.newMessageCallbacks.has(callbackName)) {
            console.log(`Message callback already registered.`)
            return
        }

        this.newMessageCallbacks.set(callbackName, newMessageCallback)
    }

    /** Removes a callback function to prevent execution
     */
    offNewMessage(callbackName: string) {
        console.log(`De-registering new message callback: ${callbackName}.`)

        if(!this.newMessageCallbacks.has(callbackName)) {
            console.log(`Callback already not registered.`)
            return
        }

        this.newMessageCallbacks.delete(callbackName)
    }

    getSocketId(): string {
        return this.apiService.getSocketId()
    }
}