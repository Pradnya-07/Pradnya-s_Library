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


    return(
        <div>BookPage</div>
    )
}

export default BookPage