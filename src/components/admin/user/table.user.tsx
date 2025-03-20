import { getUserAPI } from '@/services/api';
import { dateRangeValid } from '@/services/helper';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { Color } from 'antd/es/color-picker';
import { useRef, useState } from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd'; 
import ViewDataModal from './detail.user';


const TableUser = () => {
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false)
  const [viewDataDetail, setViewDataDetail] = useState<IUserModal | null>(null)
    
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

        if(sort && sort.createdAt) {
            query += `&sort=${sort.createdAt === 'ascend' ? "createdAt" : "-createdAt"}`
        }
        const res = await getUserAPI(query);
        if(res.data) {
            setMeta(res.data.meta)
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
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          Add New
        </Button>,
        
      ]}
    />

    <ViewDataModal 
      openViewDetail={openViewDetail}
      setOpenViewDetail={setOpenViewDetail}
      viewDataDetail={viewDataDetail}
      setViewDataDetail={setViewDataDetail}
    />
    </>
  );
}

export default TableUser