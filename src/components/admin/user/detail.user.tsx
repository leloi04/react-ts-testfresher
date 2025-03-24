import { FORMAT_DATE } from '@/services/helper';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Drawer, List, Row, Descriptions, DescriptionsProps } from 'antd';
import dayjs from 'dayjs';

interface IProps {
    openViewDetail: boolean;
    setOpenViewDetail: (v: boolean) => void;
    viewDataDetail: IUserModal | null;
    setViewDataDetail: (v: IUserModal | null) => void;
}

const ViewDataModal = (props: IProps) => {
    
    const {openViewDetail, setOpenViewDetail, setViewDataDetail, viewDataDetail} = props;
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${viewDataDetail?.avatar}`;
    const items: DescriptionsProps['items'] = [
        {
          label: 'UserName',
          children: viewDataDetail?.fullName,
        },
        {
          label: 'ID',
          span: 'filled',
          children: viewDataDetail?._id,
        },
        {
          label: 'Email',
          children: viewDataDetail?.email,
        },
        {
          label: 'Số điện thoại',
          span: 'filled',  
          children: viewDataDetail?.phone,
        },
        {
            label: "Quyền hạn", 
            children: viewDataDetail?.role,
        },
        {
          label: "Avatar",
          span: 'filled', 
          children: <Avatar size={40} src={<img src={urlAvatar} />}/>,
      },
        {
            label: 'Created At',
            children: dayjs(viewDataDetail?.createdAt).format(FORMAT_DATE),
        },
        {
            label: 'Update At',
            span: 'filled', 
            children: dayjs(viewDataDetail?.updatedAt).format(FORMAT_DATE),
        },
      ];
    const onClose = () => {
        setOpenViewDetail(false);
        setViewDataDetail(null);
    }

    return (
        <>
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openViewDetail}>
            <ArrowLeftOutlined onClick={() => {onClose()}} style={{marginBottom: 8, padding: "8px 12px 8px 0",}} />
            <Descriptions  bordered title="User Info" items={items} />
        </Drawer>
        </>
    )
}

export default ViewDataModal;