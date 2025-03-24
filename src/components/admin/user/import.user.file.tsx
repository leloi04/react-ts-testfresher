import { InboxOutlined } from "@ant-design/icons";
import { App, Button, Divider, Modal, Table, TableColumnsType, Upload, UploadProps } from "antd";
import Exceljs from "exceljs";
import { useState } from "react";
import { Buffer } from "buffer";
import { bulkCreateUserAPI } from "services/api";
import fileTemplate from "templates/user.xlsx?url";


interface IProps {
    openModalImportFile: boolean,
    setOpenModalImportFile: (v: boolean) => void,
    refreshTable: () => void
}

type DataType = {
    fullName: string,
    email: string,
    phone: string,
}

const ImportUserFile = (props: IProps) => {
    const {openModalImportFile, setOpenModalImportFile, refreshTable} = props;
    const { Dragger } = Upload;
    const { message, notification } = App.useApp();
    const [dataImport, setDataImport] = useState<DataType[]>([])
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const items: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        customRequest({file, onSuccess}) {
            setTimeout(() => {
                if(onSuccess) {
                    onSuccess("ok")
                }
            }, 1000)
        },
        async onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            if(info.fileList && info.fileList.length > 0) {
                const file = info.fileList[0].originFileObj!;
                
                const workbook = new Exceljs.Workbook();
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                await workbook.xlsx.load(buffer);
                let jsonData: DataType[] = [];

                workbook.worksheets.forEach(function(sheet) {
                    let firstRow = sheet.getRow(1);
                    if (!firstRow.cellCount) return;
                    let keys = firstRow.values as any;
                    sheet.eachRow((row, rowNumber) =>{
                        if (rowNumber == 1) return;
                        let values = row.values as any;
                        let obj = {} as any;
                        for (let i = 1; i < keys.length; i ++) {
                            obj[keys[i]] = values[i];
                        }
                        jsonData.push(obj)
                    })
                })
                setDataImport(jsonData);
            }
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
        },
      };

      const columns: TableColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
      ];

      const handleImport = async () => {
        setIsSubmit(true);
        const dataSubmit = dataImport.map((item) => ({
            ...item,
            password: import.meta.env.VITE_USER_CREATE_DEFAULT_PASSWORD
        }))
        const res = await bulkCreateUserAPI(dataSubmit);
        if(res.data) {
            notification.success({
                message: "Bulk Create User",
                description: `Success = ${(res as any).data.countSuccess} ; Error = ${(res as any).data.countError}`
            })
        }
        setIsSubmit(false);
        setOpenModalImportFile(false);
        setDataImport([]);
        refreshTable();
      }

    return (
        <>
        <Modal
            width={800}
            title={<p>Modal import data</p>}
            footer={[
            <Button onClick={() => {
                setOpenModalImportFile(false)
                setDataImport([])
            }} type="primary">
                Cancel
            </Button>,
            <Button onClick={() => handleImport()} type="primary">
                Import data
            </Button>
            ]}
            open={openModalImportFile}
        >
        <Dragger {...items}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. 
            <a onClick={(e) => {e.stopPropagation()}} href={fileTemplate} download>
                Download example file!
            </a>
            </p>
        </Dragger>
        <Divider />
        <p>Dữ liệu upload: </p>
        <Table<DataType>
            pagination={false}
            columns={columns}
            dataSource={dataImport}
        />
      </Modal>
        </>
    )
}

export default ImportUserFile;