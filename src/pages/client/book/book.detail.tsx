import { Col, Flex, Rate, Row } from "antd";
import { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import BookModel from "./book.model";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import '../home.scss'

interface IProps {

}

const BookDetail = (props: IProps) => {
    const [openModalViewImage, setOpenModalViewImage] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const refGallery = useRef<ImageGallery>(null)

    const images = [
        {
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
          },
          {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
          },
          {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
          },
      ];

    const handleOnClickImage = () => {
        setOpenModalViewImage(true)
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
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
                        items={images}
                        onClick={() => handleOnClickImage()}
                     />
                </Col>
                <Col span={16}>
                    <div className="container-book">
                        <div className="book-page-author">Tác giả: Jo Hemmings</div>
                        <div className="book-page-description">
                            How Psychology Works
                        </div>
                        <div className="book-page-rate">
                        <Flex gap="middle" vertical>
                            <Rate disabled defaultValue={5} />
                        </Flex>
                            <span className='sold'>Đã bán 25</span>
                        </div>
                        <div className="book-page-price">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(6995589498)}
                        </div>
                        <div className="book-page-deliver">
                            Vận chuyển
                            <span>Miễn phí vận chuyển</span>
                        </div>
                        <div className="book-page-quantity">
                            Số lượng
                            <button><MinusOutlined /></button>
                            <input defaultValue={1}/>
                            <button><PlusOutlined /></button>
                        </div>
                        <div className="book-page-cart">
                            <button>
                                <ShoppingCartOutlined className="icon-cart"/>
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
                items={images}
            />
        </div>
    )
}

export default BookDetail;