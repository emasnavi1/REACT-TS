import apiClient from "./api-client";

interface Entity{
    id: number | string;
}

export class HttpService{
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {
        signal: controller.signal,
      })
        return{request, cancel: () => controller.abort()}
    }


    delete<T extends Entity>(entity:T) {
        return apiClient.delete(this.endpoint + "/" + entity.id);
    }
}

const createHttpService = (endpoint: string) => new HttpService(endpoint);

export default createHttpService;