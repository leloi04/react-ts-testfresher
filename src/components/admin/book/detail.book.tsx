import { FORMAT_DATE } from '@/services/helper';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Divider, Drawer, Descriptions, DescriptionsProps, GetProp, UploadProps, UploadFile, Upload } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    openViewDetail: boolean;
    setOpenViewDetail: (v: boolean) => void;
    viewDataDetail: IBookModal | null;
    setViewDataDetail: (v: IBookModal | null) => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DetailBook = (props: IProps) => {
    
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const {openViewDetail, setOpenViewDetail, setViewDataDetail, viewDataDetail} = props;
    const items: DescriptionsProps['items'] = [
        {
          label: 'Tên sách',
          children: viewDataDetail?.mainText,
        },
        {
          label: 'ID',
          span: 'filled',
          children: viewDataDetail?._id,
        },
        {
          label: 'Tác giả',
          children: viewDataDetail?.author,
        },
        {
          label: 'Giá tiền',
          span: 'filled',  
          children: viewDataDetail?.price,
        },
        {
            label: "Thể loại", 
            span: "filled",
            children: viewDataDetail?.category,
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

    const [fileList, setFileList] = useState<UploadFile[]>([])

    useEffect(() => {
        if(viewDataDetail){
            let imgThumnail: any = {}, imgSlider: UploadFile[] = [];
            if(viewDataDetail.thumbnail) {
                imgThumnail = {
                    uid: uuidv4(),
                    name: viewDataDetail.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${viewDataDetail.thumbnail}`,
                }
            }
            if(viewDataDetail.slider && viewDataDetail.slider.length > 0){
               viewDataDetail.slider.map((item) => (
                    imgSlider.push(
                        {
                            uid: uuidv4(),
                            name: viewDataDetail.thumbnail,
                            status: 'done',
                            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                       }
                    )
               ))
            }

            setFileList([imgThumnail, ...imgSlider])
        }
    },
    [viewDataDetail])

    const onClose = () => {
        setOpenViewDetail(false);
        setViewDataDetail(null);
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <>
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openViewDetail}>
            <ArrowLeftOutlined onClick={() => {onClose()}} style={{marginBottom: 8, padding: "8px 12px 8px 0",}} />
            <Descriptions  bordered title="Thông tin sách" items={items} />
            <Divider />
            <span style={{fontWeight: 500, fontSize: 16}}>Ảnh sách</span>
            <Divider />
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={{
                    showRemoveIcon: false
                }}
            >
            </Upload>
            {previewImage && (
                <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
                />
            )}
        </Drawer>
        </>
    )
}

export default DetailBook;