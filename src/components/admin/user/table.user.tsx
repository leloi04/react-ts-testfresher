import { deleteUserAPI, getUserAPI } from '@/services/api';
import { dateRangeValid } from '@/services/helper';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { App, Button, Dropdown, message, Popconfirm, PopconfirmProps, Space, Tag } from 'antd';
import { Color } from 'antd/es/color-picker';
import { useRef, useState } from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd'; 
import ViewDataModal from './detail.user';
import CreateUser from './create.user';
import ImportUserFile from './import.user.file';
import { data } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import UpdateUser from './update.user';


const TableUser = () => {
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false)
  const [viewDataDetail, setViewDataDetail] = useState<IUserModal | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalImportFile, setOpenModalImportFile] = useState<boolean>(false)
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const { message } = App.useApp();

    
  type TSearch = {
      fullName: string,
      email: string,
      createdAt: string,
      createdAtRange: string 
  } 

    const actionRef = useRef<ActionType | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const [dataTable, setDataTable] = useState<IUserModal[]>([])
    const [dataUser, setDataUser] = useState<IUserModal | null>(null)
    const [idUser, setIdUser] = useState<string | null>(null)
    const confirm: PopconfirmProps['onConfirm'] = async () => {
      await deleteUserAPI(idUser!)
      message.success("Xóa thành công user!")
      refreshTable()
    };

    const columns: ProColumns<IUserModal>[] = [
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
        title: 'Full Name',
        dataIndex: 'fullName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        copyable: true,
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        valueType: "date",
        sorter: true,
        
        hideInSearch: true,
      },
      {
        title: 'Created At',
        dataIndex: 'createdAtRange',
        valueType: "dateRange",
        hideInTable: true,
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
                          setOpenModalUpdate(true);
                          setDataUser(entity);
                        }}
                    />
                    <Popconfirm
                      placement="leftTop"
                      title="Xóa user!"
                      description="Bạn có chắc là muốn xóa người này không ?"
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
                          setIdUser(entity._id)
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
    <ProTable<IUserModal, TSearch>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter)
        let query = "";
        if(params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`
        } if(params.email) {
            query += `&email=/${params.email}/i`
        } if(params.fullName) {
            query += `&fullName=/${params.fullName}/i`
        }

        const createDateRange = dateRangeValid(params.createdAtRange);
        if(createDateRange) {
            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`
        }

        query += `&sort=-createdAt`

        if(sort && sort.createdAt) {
            query += `&sort=${sort.createdAt === 'ascend' ? "createdAt" : "-createdAt"}`
        }
        const res = await getUserAPI(query);
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
      headerTitle="Table User"
      toolBarRender={() => [
        <Button
        icon={<PlusOutlined />}
        type="primary"
      >
        <CSVLink
          data={dataTable}
          filename='export-user.csv'
        >
            Export File
        </CSVLink>
      </Button>,
      <Button
      icon={<PlusOutlined />}
      onClick={() => {
        setOpenModalImportFile(true);
      }}
      type="primary"
    >
      Import File
    </Button>,
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpenModal(true);
          }}
          type="primary"
        >
          Add New
        </Button>,
        
      ]}
    />

    <CreateUser 
      openModal={openModal}
      setOpenModal={setOpenModal}
      refreshTable={refreshTable}
    />

    <ViewDataModal 
      openViewDetail={openViewDetail}
      setOpenViewDetail={setOpenViewDetail}
      viewDataDetail={viewDataDetail}
      setViewDataDetail={setViewDataDetail}
    />

    <ImportUserFile 
      openModalImportFile={openModalImportFile}
      setOpenModalImportFile={setOpenModalImportFile}
      refreshTable={refreshTable}
    />

    <UpdateUser
      openModalUpdate={openModalUpdate}
      setOpenModalUpdate={setOpenModalUpdate}
      refreshTable={refreshTable}
      dataUser={dataUser}
      setDataUser={setDataUser}
    />
    </>
  );
}

export default TableUser