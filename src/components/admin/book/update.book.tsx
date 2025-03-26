import { getCategoryAPI, updateBook, updateFileAPI } from "@/services/api";
import { App, Divider, Form, FormProps, GetProp, Input, Image, Modal, Upload, UploadFile, UploadProps, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { MAX_UPLOAD_IMAGE_SIZE } from "@/services/helper";
import { UploadChangeParam } from "antd/es/upload";
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    openModalUpdate: boolean,
    setOpenModalUpdate: (v: boolean) => void,
    refreshTable: () => void,
    setDataUpdate: (v: IBookModal | null) => void,
    dataUpdate: IBookModal | null
}

type UserUploadType = "thumbnail" | "slider";

type FieldType = {
    thumbnail: any,
    slider: any,
    mainText: string,
    author: string,
    price: number,
    sold: number,
    quantity: number,
    category: string,
    _id: string
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const UpdateBook = (props: IProps) => {
    const {setOpenModalUpdate, refreshTable, openModalUpdate, dataUpdate, setDataUpdate} = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false)
    const [loadingSlider, setLoadingSlider] = useState<boolean>(false)
    const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>([])
    const [fileListSlider, setFileListSlider] = useState<UploadFile[]>([])
    const [listCategory, setListCategory] = useState<{
        label: string,
        value: string
    }[]>([])

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategoryAPI();
            if(res && res.data) {
                const d = (res as any).data.map((item: any) => {
                    return {
                        label: item,
                        value: item
                    }
                })
                setListCategory(d)
            }
        }
        fetchCategory()
    }, [])

    

    useEffect(() => {
        let imgThumbnail: any = {}, imgSlider: UploadFile[] = [];
            if(dataUpdate?.thumbnail) {
                imgThumbnail = {
                    uid: uuidv4(),
                    name: dataUpdate?.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate?.thumbnail}`,
                }
            }
            setFileListThumbnail(imgThumbnail ? [imgThumbnail] : []);
            if(dataUpdate?.slider && dataUpdate?.slider.length > 0){
               dataUpdate?.slider.map((item) => (
                    imgSlider.push(
                        {
                            uid: uuidv4(),
                            name: dataUpdate?.thumbnail,
                            status: 'done',
                            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                       }
                    )
               ))
            }
            setFileListSlider(Array.isArray(imgSlider) ? imgSlider : []);

        form.setFieldsValue({
            thumbnail: imgThumbnail,
            slider: imgSlider,
            mainText: dataUpdate?.mainText,
            author: dataUpdate?.author,
            price: dataUpdate?.price,
            sold: dataUpdate?.sold,
            quantity: dataUpdate?.quantity,
            category: dataUpdate?.category,
            _id: dataUpdate?._id
        })

    }, [dataUpdate])

    useEffect(() => {
            if (!openModalUpdate) {
                form.resetFields();
                setFileListThumbnail([]);
                setFileListSlider([]);
            }
    }, [openModalUpdate]);
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });

        const [previewOpen, setPreviewOpen] = useState(false);
        const [previewImage, setPreviewImage] = useState('');

          const handlePreview = async (file: UploadFile) => {
            if (!file.url && !file.preview) {
              file.preview = await getBase64(file.originFileObj as FileType);
            }
        
            setPreviewImage(file.url || (file.preview as string));
            setPreviewOpen(true);
          };

          const handleRemove = async (file: UploadFile, type: UserUploadType) => {
            if(type == "thumbnail"){
                setFileListThumbnail([])
            }
            if(type == "slider") {
                const newSlider = fileListSlider.filter(x => x.uid !== file.uid)
                setFileListSlider(newSlider)
            }
          }
        
          const handleChange = (info: UploadChangeParam, type: "thumbnail" | "slider") => {
             if(info.file.status == "uploading") {
                type == "slider" ? setLoadingSlider(true) : setLoadingThumbnail(true)
                return
             }

             if(info.file.status == "done") {
                type == "slider" ? setLoadingSlider(false) : setLoadingThumbnail(false)
             }
          }

          const handleUploadFile = async (options: RcCustomRequestOptions, type: UserUploadType) => {
            const { onSuccess } = options;
            const file = options.file as UploadFile;
            const res = await updateFileAPI(file, "book");

            if(res && res.data) {
                const uploadedFile: any = {
                    uid: file.uid,
                    name: (res as any).data.fileUploaded,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${(res as any).data.fileUploaded}`
                }
                if(type == "thumbnail") {
                    setFileListThumbnail([{...uploadedFile}])
                } else {
                    setFileListSlider((prevState) => [
                        ...prevState,
                        { ...uploadedFile}
                    ])
                }

                if(onSuccess) {
                    onSuccess('ok')
                }
            } else {
                message.error((res as any).message)
            }
          }

          const beforeUpload = (file: UploadFile) => {
            const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
            if (!isPNG) {
                message.error(`${file.name} is not a png/jpg file`);
            }
            const isLt2M = file.size! / 1024 / 1024 < MAX_UPLOAD_IMAGE_SIZE;
            if(!isLt2M) {
                message.error(`Image must smaller than ${MAX_UPLOAD_IMAGE_SIZE}MB`);
            }
            return isPNG && isLt2M || Upload.LIST_IGNORE;
          }
    
      const handleCancel = () => {
        form.resetFields();
        setFileListThumbnail([]);
        setFileListSlider([]);
        setDataUpdate(null);
        setOpenModalUpdate(false);
      };

      const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

      const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { author, category, mainText, price, quantity, _id } = values;
        setIsSubmit(true)
        const thumbnail = fileListThumbnail?.[0]?.name ?? ""
        const slider = Array.isArray(fileListSlider) ? fileListSlider.map((item) => item.name) : [];
        const sold = 0;
        const res = await updateBook(
            thumbnail,
            slider,
            mainText,
            author,
            price,
            sold,
            quantity,
            category,
            _id
        );
        if (res.data) {
                message.success("Cập nhật thông tin book thành công!");
                form.resetFields();
                setFileListThumbnail([]);
                setFileListSlider([]);
                setDataUpdate(null);
                setOpenModalUpdate(false);
                refreshTable();
            } else {
              message.error((res as any).message);
            }
        setIsSubmit(false)
      };

    return (
        <>
          <Modal
            open={openModalUpdate}
            onOk={() => {
                form.submit();
            }}
            onCancel={handleCancel}
            confirmLoading={isSubmit}
          >
            <div className="heading">
                      <h2 className="text text-large">Thêm Book</h2>
                      <Divider />
                  </div>
                    <Form
                      form={form}
                      name="register-form"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                    <Form.Item<FieldType>
                    label="ID"
                    name="_id"
                    hidden
                      >
                        <Input disabled/>
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Tên sách"
                        name="mainText"
                        rules={[{ required: true, message: 'Please input name book!' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Please input book author!' },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: 'Please input book"s price!' },]}
                      >
                        <InputNumber 
                            min={1}
                            style={{width: "100%"}}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            addonAfter="đ"
                        />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: 'Please input category!' }]}
                      >
                        <Select
                            showSearch
                            allowClear
                            defaultValue={listCategory[0]}
                            style={{ width: 120 }}
                            options={listCategory}
                        />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input quantity!' }]}
                      >
                        <InputNumber min={1} style={{width: "100%"}}/>
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Ảnh Thumbnail"
                        name="thumbnail"

                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                            multiple={false}
                            maxCount={1}
                            listType="picture-card"
                            onPreview={handlePreview}
                            beforeUpload={beforeUpload}
                            onChange={(info) => {handleChange(info, "thumbnail")}}
                            customRequest={(options) => handleUploadFile(options, "thumbnail")}
                            onRemove={(file) => handleRemove(file, "thumbnail")}
                            fileList={fileListThumbnail}
                        >
                            <div>
                                {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
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
                      </Form.Item>
                      
                      <Form.Item<FieldType>
                        label="Ảnh Slider"
                        name="slider"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                            beforeUpload={beforeUpload}
                            multiple={true}
                            listType="picture-card"
                            onPreview={handlePreview}
                            onChange={(info) => {handleChange(info, "slider")}}
                            customRequest={(options) => handleUploadFile(options, "slider")}
                            onRemove={(file) => handleRemove(file, "slider")}
                            fileList={fileListSlider}
                        >
                            <div>
                                {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
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
                      </Form.Item>
                    </Form>
          </Modal>
        </>
    )
}

export default UpdateBook;