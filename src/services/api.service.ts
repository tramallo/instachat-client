import socketClient, { Socket } from 'socket.io-client'

export enum EventType {
    Message = 'message'
}

export type EventListener = (...args: unknown[]) => void

export type SocketClientOptions = Parameters<typeof socketClient>

export class ApiService {

    private socket: Socket;

    constructor(...socketClientOptions: SocketClientOptions) {
        this.socket = socketClient(...socketClientOptions)
    }

    sendEvent(eventType: EventType, data: unknown) {
        this.socket.emit(eventType, data)
    }

    listenEvent(eventType: EventType, listener: EventListener) {
        this.socket.on(eventType, listener)
    }

    removeListener(eventType: EventType, listener: EventListener) {
        this.socket.removeListener(eventType, listener)
    }

    getSocketId(): string {
        return this.socket.id
    }
}