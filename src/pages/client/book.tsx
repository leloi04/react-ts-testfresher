import { useParams } from "react-router-dom";
import BookDetail from "./book/book.detail";
import { useEffect, useState } from "react";
import { getDataBookAPI } from "@/services/api";
import { App } from "antd";
import BookLoading from "./book/book.loading";

const BookPage = () => {
  const [dataBook, setDataBook] = useState<IBookModal | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const { message } = App.useApp();

  useEffect(() => {
    if (id) {
      const handleGetData = async () => {
        try {
          const res = await getDataBookAPI(id);
          if (res && res.data) {
            setDataBook(res.data as any);
          } else {
            message.error("Lỗi về dữ liệu");
          }
        } catch (error) {
          message.error("Có lỗi xảy ra khi lấy dữ liệu");
        }
      };

      handleGetData();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer)
  }, [id]);

  return (
      <>
      {isLoading ? (
        <BookLoading 
          dataBook={dataBook}
          isLoading={isLoading}
        />
      ) : (
        <BookDetail 
          dataBook={dataBook}
          setDataBook={setDataBook} 
        />
      )}
    </>
  )
}

export default BookPage;