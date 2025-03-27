import { getBookAPI, getCategoryAPI } from '@/services/api';
import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Flex, Form, FormProps, GetProp, InputNumber, Pagination, Rate, Row, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  range: {
    from: number,
    to: number
  },
  category: string[]
}

const HomePage = () => {
    const nagivation = useNavigate();
    const [category, setCategory] = useState<{
      label: string, value: string
    }[]>([])
    const [listBook, setListBook] = useState<IBookModal[]>([])
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(4)
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>('')
    const [queryCategory, setQueryCategory] = useState<string[]>([])
    const [sortQuery, setSortQuery] = useState<string>('sort=-sort')
    const [form] = Form.useForm();

    useEffect(() => {
      const initCategory = async () => {
        const res = await getCategoryAPI();
        if(res && res.data) {
          const d = (res as any).data.map((item: any) => {
            return { label: item, value: item}
          })
          setCategory(d)
        }
      }

      initCategory()
    }, [])

    useEffect(() => {
      fetchBook();
    }, [current, pageSize, filter, sortQuery])

    const fetchBook = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`
        if(filter) {
          query += `&${filter}`
        }
        if(sortQuery){
          query += `&sort=${sortQuery}`
        }

        const res = await getBookAPI(query)
        if(res && res.data) {
          setListBook(res.data.result)
          setTotal(res.data.meta.total)
        }

        setIsLoading(false)
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
      if(values?.range?.from >= 0 && values?.range?.to >= 0){
        let f = `price>=${values?.range?.from}&price<=${values?.range?.to}`
        if(values.category.length){
          const cate = values.category.join(',')
          f += `category=${cate}`
        }
        setFilter(f)
      }
    } 

    const onChangeTab = (key: string) => {
        setSortQuery(key)
    };

    const items: TabsProps['items'] = [
      {
        key: '-sold',
        label: 'Phổ biến',
        children: <></>,
      },
      {
        key: '-createdAt',
        label: 'Hàng mới',
        children: <></>,
      },
      {
        key: 'price',
        label: 'Giá thấp đến cao',
        children: <></>,
      },
      {
        key: '-price',
        label: 'Giá cao đến thấp',
        children: <></>,
      },
    ];
    

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = async (values: any) => {
      setQueryCategory(values)
    };

    const handleOnChange = (pagination: {current: number, pageSize: number}) => {
        if(pagination && pagination.current !== current){
          setCurrent(pagination.current)
        }
        if(pagination && pagination.pageSize !== pageSize){
          setPageSize(pagination.pageSize)
          setCurrent(1)
        }
    }

    const handleChangeFilter = (changedValues: any, values: any) => {
      if(changedValues.category){
        const cate = values.category;
        if(cate && cate.length > 0){
          const f = cate.join(',')
          setFilter(`category=${f}`)
        } else {
          setFilter('')
        }
      }
    }

    return (
        <div style={{maxWidth: 1440, margin: "0px auto"}}>
          <Row gutter={[20, 20]}>
            <Col span={6}  style={{border: "1px solid green"}} >
              <div style={{display: 'flex', justifyContent: "space-between"}}>
                  <span> <FilterTwoTone /> Bộ lọc tìm kiếm</span>
                  <ReloadOutlined title='Reset' onClick={() => {
                    form.resetFields()
                    setFilter('')
                  }}/>
              </div>
              <Form
                  form={form}
                  name="register-form"
                  onFinish={onFinish}
                  autoComplete="off"
                  onValuesChange={(changedValues, values) => {
                      handleChangeFilter(changedValues, values)
                  }}
                >
                   <Form.Item<FieldType>
                        label="Danh mục sản phẩm"
                        name="category"
                        labelCol={{span: 24}}
                      >
                        <Checkbox.Group  onChange={onChange}>
                        <Row>
                          {category.map((item, index) => {
                            return (
                              <Col span={24} key={`index-${index}`}>
                                <Checkbox value={item.value}>{item.label}</Checkbox>
                              </Col>
                            )
                          })}
                        </Row>
                      </Checkbox.Group>
                    </Form.Item> 
                    <Divider />
                    <Form.Item<FieldType>
                        label="Khoảng giá"
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
                        <div>
                          <Button onClick={() => form.submit()}>Áp dụng</Button>
                        </div>
                      </div>
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Đánh giá"
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
                <Tabs defaultActiveKey="sort=-sort" items={items} onChange={onChangeTab} />
              </Row>
              <Row gutter={[10, 10]}>
                  {listBook.map((item, index) => {
                    return (
                      <Col onClick={() => nagivation(`/book/${item._id}`)} key={`index-${index}`} span={6}>
                      <div className='book-item' style={{border: "1px solid #ccc", padding: "12px", cursor: 'pointer'}}> 
                        <div className="thumbnail">
                          <img style={{width: "100%"}} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="" />
                        </div>
                        <div className="description" >
                         <p>{item.mainText}</p>
                        </div>
                        <div className="price">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </div>
                        <div className="rate">
                        <Flex gap="middle" vertical>
                            <Rate disabled defaultValue={5} />
                        </Flex>
                            <span className='sold'>Đã bán {item.sold}</span>
                        </div>
                      </div>
                      </Col>
                    )
                  })}                
              </Row>
              <Row>
                <Divider />
                <div className="" style={{margin: "0 auto"}}>
                <Pagination
                  current={current}
                  pageSize={pageSize}
                  total={total}
                  onChange={(p, s) => handleOnChange({current: p, pageSize: s})}
                 />
                </div>  
              </Row>
            </Col>
          </Row>
        </div>
    )
  }
  
  export default HomePage;