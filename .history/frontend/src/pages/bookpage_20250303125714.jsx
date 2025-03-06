import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useBookStore } from "../store/bookStore";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const BookPage = () => {

    const { fetchBook, book, isLoading, deleteBook } = useBookStore();
    const navigate = useNavigate("/");
    const params = useParams();
    // const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchBook(params.id);
    }, [fetchBook, params]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    console.log("Book: ", book);


    return (
        //<div>BookPage</div>
        <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-10">
            <p className="cursor-pointer py-3" onClick={() => navigate("/")}>
                &larr; Back
            </p>

            <div className="flex flex-col md:flex-row">
                <div className="md:basis-[30%] md:mr-6 mx-auto w-full">
                    <img
                        src={book?.image}
                        alt="book_img"
                        className="max-h-[50vh] mx-auto"
                    />
                    <Link to={book?.link} target="_blank">
                        <div className="w-full flex justify-center items-center">
                            <button className="bg-[#403D39] text-[#CCC5B9] px-3 py-2 w-full md:max-w-52 mt-3">
                                Read
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BookPage