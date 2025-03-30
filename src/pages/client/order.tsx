import { useState } from "react";
import OrderDetail from "./order/order.detail";
import OrderPayment from "./order/order.payment";
import { Steps } from "antd";

const OrderPage = () => {
    const [current, setCurrent] = useState<number>(0);

    const steps = [
        {
          title: 'Đơn hàng',
        },
        {
          title: 'Đặt hàng',
        },
        {
          title: 'Thanh toán',
        },
      ];
    

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div style={{backgroundColor: "#ccc", padding: "20px 0"}}>
              <Steps 
                style={{
                  maxWidth: 1270,
                  margin: "auto",
                  backgroundColor: "#fff",
                  padding: 8,
                  borderRadius: 5
                }}
                current={current} 
                items={items} />
              <div style={{ marginTop: 24 }}>
                  {current === 0 && (
                    <OrderDetail 
                      setCurrent={setCurrent}
                    />
                  )}
                  {current === 1 && (
                    <OrderPayment 
                      setCurrent={setCurrent}
                    />
                  )}
              </div>
        </div>
    )
}

export default OrderPage;