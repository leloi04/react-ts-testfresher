import { Col, Modal, Row, Image } from "antd";

interface IProps {
    openModalViewImage: boolean,
    setOpenModalViewImage: (v: boolean) => void,
    currentIndex: number,
    setCurrentIndex: (v: number) => void,
    items: {
        original: string,
        thumbnail: string
    }[]
}

const BookModel = (props: IProps) => {
    const {currentIndex, items, openModalViewImage, setCurrentIndex, setOpenModalViewImage} = props;

    return (
        <>
            <Modal width={800} title="Preview Images" open={openModalViewImage} footer={<></>} onCancel={() => setOpenModalViewImage(false)}>
                <Row gutter={[10, 10]}> 
                    <Col span={12}>
                        <Image
                            width={"100%"}
                            src={items?.[currentIndex]?.original}
                            preview={false}
                        />
                    </Col>
                    <Col span={12}>
                         <Row gutter={[5, 5]}>
                            {items.map((item, index) => {
                                return (
                                   <Col style={{cursor: "pointer"}} span={12}>
                                         <Image
                                            width={"100%"}
                                            src={item.original}
                                            preview={false}
                                            onClick={() => {
                                                setCurrentIndex(index)
                                            }}
                                        />
                                   </Col>
                                )
                            })}
                         </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default BookModel;