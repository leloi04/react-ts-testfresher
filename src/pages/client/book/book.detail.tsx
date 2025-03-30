import { Col, Flex, Input, InputNumber, Rate, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import BookModel from "./book.model";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import '../home.scss'
import { useCurrentApp } from "@/components/context/app.context";

interface IProps {
    dataBook: IBookModal | null, 
    setDataBook: (v: IBookModal | null) => void
}

const BookDetail = (props: IProps) => {
    const {setCarts } = useCurrentApp();
    const { dataBook } = props;
    const [imageGallery, setImageGallery] = useState<{
        original: string,
        thumbnail: string,
    }[]>([])
    const [openModalViewImage, setOpenModalViewImage] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [slot, setSlot] = useState<number>(1)

    const refGallery = useRef<ImageGallery>(null)

    useEffect(() => {
        const handleImage = () => {
            const image = [];
            if(dataBook?.thumbnail) {
                image.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`,
                })
            }
            if(dataBook?.slider) {
                dataBook.slider.map((item) => {
                    image.push({
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    })
                })
            }
            setImageGallery(image) 
        }
        handleImage();
    }, [dataBook])

    const handleOnClickImage = () => {
        setOpenModalViewImage(true)
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }

    const handleAddItem = () => {
        const cartStorage = localStorage.getItem('carts');
        if(cartStorage && dataBook) {
            const carts = JSON.parse(cartStorage) as ICart[];

            let isExistIndex = carts.findIndex(c => c._id === dataBook._id)
            if(isExistIndex > -1) {
                carts[isExistIndex].quantity += slot
            } else {
                carts.push({
                    _id: dataBook._id,
                    quantity: slot,
                    detail: dataBook
                })
            }

            localStorage.setItem('carts', JSON.stringify(carts))

            setCarts(carts)
        } else {
            const data = [{
                _id: dataBook?._id,
                quantity: slot,
                detail: dataBook
            }]
            localStorage.setItem('carts', JSON.stringify(data))

            setCarts(data as ICart[])
        }
    }
    return (
        <div style={{backgroundColor: "#ccc", padding: "16px 0"}}>
            <div style={{maxWidth: 1440, margin: "0px auto", backgroundColor: "#fff ", padding: 16}}>
            <Row gutter={[10, 10]}>
                <Col span={8}>
                    <ImageGallery 
                        ref={refGallery}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={false}
                        items={imageGallery}
                        onClick={() => handleOnClickImage()}
                     />
                </Col>
                <Col span={16}>
                    <div className="container-book">
                        <div className="book-page-author">Tác giả: {dataBook?.author}</div>
                        <div className="book-page-description">
                            {dataBook?.mainText}
                        </div>
                        <div className="book-page-rate">
                        <Flex gap="middle" vertical>
                            <Rate disabled defaultValue={5} />
                        </Flex>
                            <span className='sold'>Đã bán {dataBook?.sold}</span>
                        </div>
                        <div className="book-page-price">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(dataBook?.price))}
                        </div>
                        <div className="book-page-deliver">
                            Vận chuyển
                            <span>Miễn phí vận chuyển</span>
                        </div>
                        <div className="book-page-quantity">
                            Số lượng
                            <button onClick={() => (slot >= 2) ? setSlot(slot - 1) : (slot)} ><MinusOutlined /></button>
                            <InputNumber
                                value={(slot === 0) ? 1 : slot}
                                onChange={(v) => {
                                    if(Number(v) > 0 && Number(v) < Number(dataBook?.quantity)) {
                                        setSlot(Number(v))
                                    } 
                                }}
                                controls={false}
                            />
                            <button onClick={() => (slot < Number(dataBook?.quantity)) ? setSlot(slot + 1) : (slot)} ><PlusOutlined /></button>
                        </div>
                        <div className="book-page-cart">
                            <button onClick={() => handleAddItem()}>
                                <ShoppingCartOutlined 
                                className="icon-cart"
                                />
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                            <button className="cart-now">
                                <span>Mua ngay</span>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            </div>

            <BookModel 
                currentIndex={currentIndex}
                openModalViewImage={openModalViewImage}
                setCurrentIndex={setCurrentIndex}
                setOpenModalViewImage={setOpenModalViewImage}
                items={imageGallery}
            />
        </div>
    )
}

export default BookDetail;