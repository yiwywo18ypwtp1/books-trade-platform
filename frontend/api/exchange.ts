import { AxiosInstance } from "axios"

export const getIncoming = async (api: AxiosInstance) => {
    const { data } = await api.get("/requests/incoming");

    return data;
}

export const getOutgoing = async (api: AxiosInstance) => {
    const { data } = await api.get("/requests/outgoing");

    return data;
}

export const acceptRequest = async (api: AxiosInstance, id: number) => {
    const { data } = await api.post(`/requests/${id}/accept`);

    return data;
}

export const rejectRequest = async (api: AxiosInstance, id: number) => {
    const { data } = await api.post(`/requests/${id}/reject`);

    return data;
}