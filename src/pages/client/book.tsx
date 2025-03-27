import { useParams } from "react-router-dom";
import BookDetail from "./book/book.detail";
import { useEffect } from "react";

const BookPage = () => {
  const { id } = useParams();
  useEffect(() => {

  }, [id])
  return (
    <BookDetail />
  )
}

export default BookPage;