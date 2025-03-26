import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Checkbox, Col, Divider, Flex, Form, FormProps, GetProp, InputNumber, Pagination, Rate, Row, Tabs, TabsProps } from 'antd';

type FieldType = {

}

const HomePage = () => {
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
      
    } 

    const onChangeTab = (key: string) => {
      console.log(key);
    };

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Phổ biến',
        children: 'Content of Tab Pane 1',
      },
      {
        key: '2',
        label: 'Hàng mới',
        children: 'Content of Tab Pane 2',
      },
      {
        key: '3',
        label: 'Giá thấp đến cao',
        children: 'Giá thấp đến cao',
      },
      {
        key: '4',
        label: 'Giá cao đến thấp',
        children: 'Giá cao đến thấp',
      },
    ];
    

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
      console.log('checked = ', checkedValues);
    };

    return (
        <div style={{maxWidth: 1440, margin: "0px auto"}}>
          <Row gutter={[20, 20]}>
            <Col span={6}  style={{border: "1px solid green"}} >
              <div style={{display: 'flex', justifyContent: "space-between"}}>
                  <span> <FilterTwoTone /> Bộ lọc tìm kiếm</span>
                  <ReloadOutlined title='Reset' onClick={() => form.resetFields()}/>
              </div>
              <Form
                  form={form}
                  name="register-form"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                   <Form.Item<FieldType>
                        label="Danh mục sản phẩm"
                        name="category"
                        labelCol={{span: 24}}
                      >
                        <Checkbox.Group  onChange={onChange}>
                        <Row>
                          <Col span={24}>
                            <Checkbox value="A">A</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="B">B</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="C">C</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="D">D</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="E">E</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item> 
                    <Divider />
                    <Form.Item<FieldType>
                        label="Khoảng giá"
                        name="price"
                        labelCol={{span: 24}}
                      >
                      <div style={{display: "flex", justifyContent: "space-between", gap: 10}}>
                      <Form.Item name={["range", "from"]}>
                      <InputNumber name='from'
                          defaultValue={0}
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          addonAfter="đ"
                        />
                      </Form.Item>
                        <span>-</span>
                        <Form.Item name={["range", "to"]}>
                          <InputNumber name='to'
                              defaultValue={0}
                              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              addonAfter="đ"
                            />
                      </Form.Item>
                      </div>
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Đánh giá"
                        name="rate"
                        labelCol={{span: 24}}
                      >
                        <Flex gap="middle" vertical>
                          <Flex gap="middle">
                            <Rate disabled defaultValue={5} />
                          </Flex>
                          <Flex gap="middle">
                            <Rate disabled defaultValue={4} allowClear={false} />
                          </Flex>
                          <Flex gap="middle">
                            <Rate disabled defaultValue={3} allowClear={false}/>
                          </Flex>
                          <Flex gap="middle">
                            <Rate disabled defaultValue={2} allowClear={false} />
                          </Flex>
                          <Flex gap="middle">
                            <Rate disabled defaultValue={1} allowClear={false}/>
                          </Flex>
                        </Flex>
                    </Form.Item> 
              </Form>
            </Col>
            <Col span={18} style={{border: "1px solid brown"}}>
              <Row>
                <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
              </Row>
              <Row gutter={[10, 10]}>
                  <Col span={6}>
                  <div style={{border: "1px solid #ccc", padding: "12px"}}> 
                    <div className="thumbnail">
                      <img style={{width: "100%"}} src="http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg" alt="" />
                    </div>
                    <div className="description">
                     <p>Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</p>
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                    </div>
                    <div className="rate">
                    <Flex gap="middle" vertical>
                        <Rate disabled defaultValue={5} />
                        <span>Đã bán 1k</span>
                      </Flex>
                    </div>
                  </div>
                  </Col>
                  <Col span={6}>
                  <div style={{border: "1px solid #ccc", padding: "12px"}}> 
                    <div className="thumbnail">
                      <img style={{width: "100%"}} src="http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg" alt="" />
                    </div>
                    <div className="description">
                     <p>Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</p>
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                    </div>
                    <div className="rate">
                    <Flex gap="middle" vertical>
                        <Rate disabled defaultValue={5} />
                        <span>Đã bán 1k</span>
                      </Flex>
                    </div>
                  </div>
                  </Col>
                  <Col span={6}>
                  <div style={{border: "1px solid #ccc", padding: "12px"}}> 
                    <div className="thumbnail">
                      <img style={{width: "100%"}} src="http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg" alt="" />
                    </div>
                    <div className="description">
                     <p>Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</p>
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                    </div>
                    <div className="rate">
                    <Flex gap="middle" vertical>
                        <Rate disabled defaultValue={5} />
                        <span>Đã bán 1k</span>
                      </Flex>
                    </div>
                  </div>
                  </Col>
                  <Col span={6}>
                  <div style={{border: "1px solid #ccc", padding: "12px"}}> 
                    <div className="thumbnail">
                      <img style={{width: "100%"}} src="http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg" alt="" />
                    </div>
                    <div className="description">
                     <p>Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</p>
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                    </div>
                    <div className="rate">
                    <Flex gap="middle" vertical>
                        <Rate disabled defaultValue={5} />
                        <span>Đã bán 1k</span>
                      </Flex>
                    </div>
                  </div>
                  </Col>
                  <Col span={6}>
                  <div style={{border: "1px solid #ccc", padding: "12px"}}> 
                    <div className="thumbnail">
                      <img style={{width: "100%"}} src="http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg" alt="" />
                    </div>
                    <div className="description" >
                     <p>Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</p>
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                    </div>
                    <div className="rate">
                    <Flex gap="middle" vertical>
                        <Rate disabled defaultValue={5} />
                        <span>Đã bán 1k</span>
                      </Flex>
                    </div>
                  </div>
                  </Col>
              </Row>
              <Row>
                <Divider />
                <div className="" style={{margin: "0 auto"}}>
                <Pagination defaultCurrent={6} total={500} />
                </div>
              </Row>
            </Col>
          </Row>
        </div>
    )
  }
  
  export default HomePage;