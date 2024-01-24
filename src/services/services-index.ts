import { ApiService } from "./api.service";
import { ChatService } from "./chat.service";
/** This file stores service instances
 * serves as a space where all instances are created, so can be 'injected' in case of dependency
*/

const apiUrl = import.meta.env.VITE_API_URL

const socketIoConfig = { transports: ['websocket'] }
export const apiService = new ApiService(apiUrl, socketIoConfig);

export const chatService = new ChatService(apiService)