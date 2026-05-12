import { ExchangeRequest } from "@/types/exchange";
import BookCard from "./BookCard";
import { ArrowRightLeft, Ban, Handshake } from "lucide-react";

type Props = {
    request: ExchangeRequest;
    onAccept: (id: number) => void;
    onReject: (id: number) => void;
    isOwner: boolean;
}

const RequestCard = ({ request, onAccept, onReject, isOwner }: Props) => {
    return (
        <div className={`
                flex flex-col items-center gap-4 border w-full rounded-xl p-4
                ${request.status === "ACCEPTED"
                ? "bg-green-100 border-green-300 opacity-60"
                : request.status === "REJECTED"
                    ? "bg-red-100 border-red-300 opacity-60"
                    : "bg-white border-gray-300"
            }`}>

            <h1 className="text-xl">
                {!isOwner ? <><b>{request.sender?.name}</b> wanna exchange!</> : <>You wanna exchange with {request.receiver?.name}!</>}
            </h1>

            {!isOwner ? (
                <div className={`flex justify-between w-full items-center bg-gray-950/5 border border-gray-950/10 p-4 rounded-lg`}>
                    <div className="flex flex-col gap-1">
                        <span className="italic text-gray-600">Offer you:</span>

                        {request.offeredBook && (
                            <BookCard
                                book={request.offeredBook}
                                variant="row"
                                type="link"
                            />
                        )}
                    </div>

                    <ArrowRightLeft className="text-gray-600" />

                    <div className="flex flex-col gap-1">
                        <span className="italic text-gray-600">For your:</span>

                        {request.book && (
                            <BookCard
                                book={request.book}
                                variant="row"
                                type="link"
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className={`flex justify-between w-full items-center bg-gray-950/5 border border-gray-950/10 p-4 rounded-lg`}>
                    <div className="flex flex-col gap-1">
                        <span className="italic text-gray-600">You offer:</span>

                        {request.offeredBook && (
                            <BookCard
                                book={request.offeredBook}
                                variant="row"
                                type="link"
                            />
                        )}
                    </div>

                    <ArrowRightLeft className="text-gray-600" />

                    <div className="flex flex-col gap-1">
                        <span className="italic text-gray-600">For {request.sender?.name}'s:</span>

                        {request.book && (
                            <BookCard
                                book={request.book}
                                variant="row"
                                type="link"
                            />
                        )}
                    </div>
                </div>
            )}

            <div className="border w-full py-1 px-2 border-gray-950/10 bg-gray-950/5 rounded-lg relative">
                <span className="text-3xl text-gray-400 absolute -top-3 italic">“““</span>

                <p className="text-gray-600 italic">{request.message}</p>
            </div>

            {request.status === "ACCEPTED"
                ? <span className="italic text-green-400 uppercase">{request.status}</span>
                : request.status === "REJECTED"
                    ? <span className="italic text-red-400 uppercase">{request.status}</span>
                    : !isOwner ? (
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => onAccept(request.id)}
                                className="flex items-center w-1/2 justify-center px-3 py-1 gap-2 border-2 text-lg text-violet-500 border-violet-500 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg cursor-pointer transition"
                            >
                                Accept <Handshake strokeWidth={1.5} />
                            </button>

                            <button
                                onClick={() => onReject(request.id)}
                                className="flex items-center w-1/2 justify-center px-3 py-1 gap-2 border-2 text-lg text-red-400 border-red-400 bg-red-400/20 hover:bg-red-400/30 rounded-lg cursor-pointer transition"
                            >
                                Reject <Ban strokeWidth={1.5} />
                            </button>
                        </div>
                    ) : <span className="text-gray-400 uppercase">waiting for answer</span>
            }
        </div>

    );
}

export default RequestCard;