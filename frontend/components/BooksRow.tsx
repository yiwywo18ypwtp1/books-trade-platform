import { Book } from "@/types/book"
import BookCard from "./BookCard"

type Props = {
    title: string;
    books: Book[];
    selected?: number | null;
    setSelected?: (id: number) => void;
    cardType: "link" | "button";
}

const BooksRow = ({ title, books, selected, setSelected, cardType }: Props) => {
    return (
        <div className="flex flex-col gap-1 min-h-80 overflow-hidden">
            <h1 className="text-xl font-semibold">{title}</h1>

            <div className="p-4 h-full bg-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                {books.length > 0 ? (
                    <div className="flex gap-4 min-h-fit h-full overflow-x-auto w-full overflow-y-visible">
                        {books.map(b => (
                            <BookCard
                                key={b.id}
                                book={b}
                                variant="row"
                                selected={selected}
                                setSelected={setSelected}
                                type={cardType}
                            />
                        ))}
                    </div>
                ) : <span className="flex items-center justify-center h-full text-gray-500">This author has no other books</span>}
            </div>
        </div>
    )
}

export default BooksRow;