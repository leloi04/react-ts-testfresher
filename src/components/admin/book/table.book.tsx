import { deleteBook, getBookAPI, getUserAPI } from "@/services/api";
import { dateRangeValid } from "@/services/helper";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { App, Button, Popconfirm, PopconfirmProps } from "antd";
import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import DetailBook from "./detail.book";
import CreateBook from "./create.book";
import UpdateBook from "./update.book";

type TSearch = {
    mainText: string,
    author: string,
} 

const TableBook = () => {
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false)
    const [viewDataDetail, setViewDataDetail] = useState<IBookModal | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false)
    const [idBook, setIdBook] = useState<string>("")
    const actionRef = useRef<ActionType | null>(null);
    const { message } = App.useApp()
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const [dataTable, setDataTable] = useState<IBookModal[]>([])
    const [dataUpdate, setDataUpdate] = useState<IBookModal | null>(null)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const confirm: PopconfirmProps['onConfirm'] = async () => {
        await deleteBook(idBook)
        message.success("Xóa thành công book!")
        refreshTable()
      };
        
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
                            setOpenModalUpdate(true)
                            setDataUpdate(entity)
                          }}
                      />
                    <Popconfirm
                      placement="leftTop"
                      title="Xóa book!"
                      description="Bạn có chắc là muốn xóa cuốn sách này không ?"
                      onConfirm={confirm}
                      onCancel={() => setOpenModalDelete(false)}
                      okText="Xóa"
                      cancelText="Hủy"
                  >
                    <DeleteOutlined 
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={async () => {
                          setOpenModalDelete(true)
                          setIdBook(entity._id)
                        }}
                    />
                  </Popconfirm>
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

                    query += `&sort=-updatedAt`

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
                        setOpenModal(true)
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

                <CreateBook 
                    openModal={openModal}
                    refreshTable={refreshTable}
                    setOpenModal={setOpenModal}
                />

                <UpdateBook
                    openModalUpdate={openModalUpdate}
                    refreshTable={refreshTable}
                    setOpenModalUpdate={setOpenModalUpdate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />
        </>
    )
}

export default TableBook;