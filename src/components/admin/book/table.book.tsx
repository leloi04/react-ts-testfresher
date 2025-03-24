import { getBookAPI, getUserAPI } from "@/services/api";
import { dateRangeValid } from "@/services/helper";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import DetailBook from "./detail.book";

type TSearch = {
    mainText: string,
    author: string,
} 

const TableBook = () => {
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false)
  const [viewDataDetail, setViewDataDetail] = useState<IBookModal | null>(null)
    const actionRef = useRef<ActionType | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const [dataTable, setDataTable] = useState<IBookModal[]>([])

        
    const columns: ProColumns<IBookModal>[] = [
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: 'ID',
          hideInSearch: true,
          render(dom, entity, index, action, schema) {
              return (
                <a onClick={() => {
                    setOpenViewDetail(true)
                    setViewDataDetail(entity)
                }}>{entity._id}</a>
              )
          },
        },
        {
          title: 'Tên sách',
          dataIndex: 'mainText',
          copyable: true,
        },
        {
          title: 'Thể loại',
          dataIndex: 'category',
          hideInSearch: true,
        },
        {
          title: 'Tác giả',
          dataIndex: 'author',
        },
        {
            title: 'Giá tiền',
            render(dom, entity, index, action, schema) {
                return (
                  <span>{entity.price} đ</span>
                )
            },
            sorter: true,
            valueType: "money",
          hideInSearch: true,
        },
        {
          title: 'Ngày cập nhật',
          dataIndex: 'updatedAt',
          valueType: "date",
          hideInSearch: true,
          sorter: true,
        },
        {
          title: 'Action',
          hideInSearch: true,
         render(dom, entity, index, action, schema) {
              return (
                  <div style={{color: "brown", gap: "10px", display: "flex"}}>
                      <EditOutlined 
                          style={{
                              cursor: "pointer"
                          }} 
                          onClick={() => {
                          }}
                      />
                      <DeleteOutlined 
                          style={{
                              cursor: "pointer"
                          }}
                      />
                  </div>
              )
         },
        },
      ];
  
      const refreshTable = () => {
        actionRef.current?.reload();
      }

    return (
        <>
            <ProTable<IBookModal, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(params, sort, filter)
                    let query = "";
                    if(params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                    } if(params.mainText) {
                        query += `&mainText=/${params.mainText}/i`
                    } if(params.author) {
                        query += `&author=/${params.author}/i`
                    }

                    query += `&sort=-updateAt`

                    if(sort && sort.updatedAt) {
                        query += `&sort=${sort.updatedAt === 'ascend' ? "updatedAt" : "-updatedAt"}`
                    }
                    const res = await getBookAPI(query);
                    if(res.data) {
                        setMeta(res.data.meta)
                        setDataTable(res.data.result)
                    }
                    return ({
                    data: res.data?.result,
                    page: 1,
                    success: true,
                    total: res.data?.meta.total 
                    });
                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => {
                        return (
                            <div >
                                {range[0]} - {range[1]} trên {total} items
                            </div>
                        )
                    }, 
                }}
                headerTitle="Table Book"
                toolBarRender={() => [
                    <Button
                    icon={<PlusOutlined />}
                    type="primary"
                >
                    <CSVLink
                    data={[]}
                    filename='export-user.csv'
                    >
                        Export File
                    </CSVLink>
                </Button>,
                <Button
                icon={<PlusOutlined />}
                onClick={() => {
                }}
                type="primary"
                >
                Import File
                </Button>,
                    <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                    }}
                    type="primary"
                    >
                    Add New
                    </Button>,
                    
                ]}
                />

                <DetailBook 
                    openViewDetail={openViewDetail}
                    setOpenViewDetail={setOpenViewDetail}
                    viewDataDetail={viewDataDetail}
                    setViewDataDetail={setViewDataDetail}
                />
        </>
    )
}

export default TableBook;