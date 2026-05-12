"use client"

import { useEffect, useState } from "react"

import { acceptRequest, getIncoming, getOutgoing, rejectRequest } from "@/api/exchange";
import { useApi } from "@/hooks/useApi";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ExchangeRequest } from "@/types/exchange";
import RequestCard from "@/components/RequestCard";
import { useAlert } from "@/providers/AlertProvider";

const TradesPage = () => {
    const [incoming, setIncoming] = useState<ExchangeRequest[]>([]);
    const [outgoing, setOutgoing] = useState<ExchangeRequest[]>([]);

    const { getApi } = useApi();
    const { currentUser, loading } = useCurrentUser();

    const { addAlert } = useAlert();

    const fetchRequests = async () => {
        const api = await getApi();

        setIncoming(await getIncoming(api));
        setOutgoing(await getOutgoing(api));
    }

    const handleAccept = async (id: number) => {
        await acceptRequest(await getApi(), id);

        addAlert("You accepted the trade request!", "success");

        await fetchRequests();
    }

    const handleReject = async (id: number) => {
        await rejectRequest(await getApi(), id);

        addAlert("You rejected the trade request", "success");

        await fetchRequests();
    }

    useEffect(() => {
        fetchRequests();
    }, [currentUser, loading]);

    if (!currentUser) return <div>Loading...</div>

    return (
        <div className="w-full h-full flex-1 flex items-center justify-center flex-col">
            <div className="p-10 w-355 min-w-0 h-240 flex flex-col gap-4 overflow-y-scroll">
                <h1 className="text-2xl text-gray-600 italic">Incoming</h1>

                {incoming.length ? incoming.map((r) => (
                    <RequestCard
                        key={r.id}
                        request={r}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        isOwner={currentUser.id === r.senderId}
                    />
                )) : <span className="w-full text-center text-lg text-gray-500 animate-pulse">There's nothing yet</span>}

                <h1 className="text-2xl text-gray-600 italic">Outgoing</h1>

                {outgoing.length ? outgoing.map((r) => (
                    <RequestCard
                        key={r.id}
                        request={r}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        isOwner={currentUser.id === r.senderId}
                    />
                )) : <span className="w-full text-center text-lg text-gray-500 animate-pulse">There's nothing yet</span>}
            </div>
        </div >
    );
}

export default TradesPage