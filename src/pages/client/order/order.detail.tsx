import { useCurrentApp } from "@/components/context/app.context";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";

interface IProps {
    setCurrent: (v: number) => void
}

const OrderDetail = (props: IProps) => {
    const { carts, setCarts} = useCurrentApp()
    const [total, setTotal] = useState<number>(0)
    const { setCurrent } = props

    const onChangeInput = (value: number, id: string) => {
        const cartStorage = localStorage.getItem('carts');
        if(cartStorage && id){
            const carts = JSON.parse(cartStorage) as ICart[];

            let isExistIndex = carts.findIndex(c => c._id === id);
            if(isExistIndex > -1) {
                carts[isExistIndex].quantity = Number(value)
            }

            localStorage.setItem('carts', JSON.stringify(carts))

            setCarts(carts)
        }
    }

    const handleDeleteItem = (id: string) => {
        const cartStorage = localStorage.getItem('carts');
        if(cartStorage && id){
            const carts = JSON.parse(cartStorage) as ICart[];

            const newCarts = carts.filter((item) => item._id !== id)

            localStorage.setItem('carts', JSON.stringify(newCarts))

            setCarts(newCarts)
        }
    }

    useEffect(() => {
        let sum = 0;
        if(carts && carts.length > 0){
            carts.map((item) => {
                sum += item.quantity * item.detail.price;
            })
            setTotal(sum)
        } else {
            setTotal(0)
        }
    }, [carts])

    return (
        <div>
            <div style={{maxWidth: 1440, margin: "0px auto", padding: 16}}>
                <Row gutter={[20, 20]}>
                    <Col style={{
                        backgroundColor: "#ccc ",
                        }} span={16}>
                            {
                                carts.map((item) => {
                                    return (
                                        <Row style={{backgroundColor: "#fff", marginBottom: 20, borderRadius: "5px", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 8px 0"}}>
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`} 
                                            alt="image" style={{borderRadius: 4, width: "10%", margin: 5}}/>
                                            <span style={{margin: "0 16px 0 4px"}}>{item.detail.mainText}</span>
                                            <span style={{ color: "#de3837"}}>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item.detail.price))}
                                                <InputNumber style={{marginLeft: 16}} min={1} max={Number(item.detail.quantity)} defaultValue={item.quantity}  onChange={(value) => onChangeInput(value as number, item._id)}/>
                                            </span>
                                            <span>
                                                Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item.detail.price * item.quantity))}
                                            </span>
                                            <button onClick={() => handleDeleteItem(item._id)} style={{border: "none"}}>
                                                <DeleteOutlined 
                                                style={{
                                                    color: "#de3837",
                                                    cursor: "pointer",
                                                }}/>
                                            </button>
                                        </Row>
                                    )
                                })
                            }
                    </Col>
                    <Col style={{
                        backgroundColor: "#fff ",
                        borderRadius: "5px",
                        padding: 12,
                        height: 300,
                        display: "flex",
                        flexDirection: "column"
                        }} span={8}>
                        <div style={{fontSize: "1.4em", display: "flex", justifyContent: "space-between"}}>
                            <span style={{fontSize: "1em"}}>Tạm tính: </span>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(total))}
                        </div>
                        <Divider />
                        <div style={{fontSize: "1.6em", display: "flex", justifyContent: "space-between", color: "#de3837"}}>
                            <span style={{fontSize: "1em", color: "#000"}}>Tổng tiền: </span>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(total))}
                        </div>
                        <Divider />
                        <button onClick={() => setCurrent(1)} style={{
                            display: "block",
                            width: "100%",
                            margin: "auto",
                            height: "50px",
                            cursor: "pointer",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: 16,
                            backgroundColor: "#de3837",
                            color: "#fff"
                        }}>
                            Mua hàng ( {carts.length} )
                        </button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default OrderDetail;