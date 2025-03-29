import { Skeleton, Row, Col, Rate, Flex, Button } from "antd";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

interface IProps {
    dataBook: IBookModal | null,
    isLoading: boolean
}

const BookLoading = ({ dataBook, isLoading }: IProps) => {
    return (
        <div style={{ backgroundColor: "#ccc", padding: "16px 0" }}>
            <div style={{ maxWidth: 1440, margin: "0px auto", backgroundColor: "#fff", padding: 16 }}>
                <Row gutter={[10, 10]}>
                    <Col span={8}>
                        {isLoading ? (
                            <Skeleton.Image style={{width: "450px", height: "400px" }} />
                        ) : (
                            <img 
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook?.thumbnail}`}
                                alt={dataBook?.mainText}
                                style={{ width: "100%", height: "400px", objectFit: "cover" }}
                            />
                        )}
                    </Col>
                    <Col span={16}>
                        <div className="container-book">
                            <div className="book-page-author">
                                {isLoading ? <Skeleton.Input active /> : `Tác giả: ${dataBook?.author}`}
                            </div>
                            <div className="book-page-description">
                                {isLoading ? <Skeleton.Input active style={{ width: 300 }} /> : dataBook?.mainText}
                            </div>
                            <div className="book-page-rate">
                                {isLoading ? (
                                    <Skeleton.Input active style={{ width: 120 }} />
                                ) : (
                                    <Flex gap="middle" vertical>
                                        <Rate disabled defaultValue={5} />
                                    </Flex>
                                )}
                                {!isLoading && <span className='sold'>Đã bán {dataBook?.sold}</span>}
                            </div>
                            <div className="book-page-price">
                                {isLoading ? (
                                    <Skeleton.Input active style={{ width: 100 }} />
                                ) : (
                                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(dataBook?.price))}
                                    </span>
                                )}
                            </div>
                            <div className="book-page-deliver">
                                {isLoading ? <Skeleton.Input active style={{ width: 200 }} /> : (
                                    <>
                                        Vận chuyển <span style={{ color: "green" }}>Miễn phí vận chuyển</span>
                                    </>
                                )}
                            </div>
                            <div className="book-page-quantity">
                                {isLoading ? (
                                    <Skeleton.Input active style={{ width: 100 }} />
                                ) : (
                                    <>
                                        Số lượng
                                        <Button icon={<MinusOutlined />} />
                                        <input defaultValue={1} />
                                        <Button icon={<PlusOutlined />} />
                                    </>
                                )}
                            </div>
                            <div className="book-page-cart">
                                {isLoading ? (
                                    <Skeleton.Button active style={{ width: 150, height: 40 }} />
                                ) : (
                                    <Button type="primary" style={{ backgroundColor: "yellow", border: "none" }}>
                                        <ShoppingCartOutlined />
                                        <span>Thêm vào giỏ hàng</span>
                                    </Button>
                                )}
                                {isLoading ? (
                                    <Skeleton.Button active style={{ width: 150, height: 40 }} />
                                ) : (
                                    <Button type="primary" danger>
                                        Mua ngay
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default BookLoading;