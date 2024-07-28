import styles from './DatabaseControl.module.css'
import { Table, Tabs, Button, Input, Upload, Radio,  message, Popconfirm} from 'antd'
import { PlusOutlined, MinusOutlined, UploadOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import addNewDatabase from './addNewDatabase';
import deleteDatabase from './deleteDatabase';
const { TextArea } = Input;

const DatabaseControl = ({userInfo, databaseList, setDatabaseList, openMessage}) => {
    const columns = [
        {
            title: 'Database ID',
            dataIndex: 'databaseid',
            key: 'databaseid',
          },
          {
        title: 'Database Name',
        dataIndex: 'databasename',
        key: 'databasename',
      }, 
      {
        title: 'Created Date',
        dataIndex: 'createddate',
        key: 'createddate',
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            title="All conversations with this database will be deleted. Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.databaseid)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        )
      
      }]
    
    const initNewDatabaseInfo = {
      "DataName": "New Database",
      "UserDescription": "",
      "UserID": userInfo.UserID,
      "url": '',
      "files": []
    }
    const [newDatabaseInfo, setNewDatabaseInfo] = useState(initNewDatabaseInfo)
    const [isAddingDatabase, setIsAddingDatabase] = useState(false)
    const [datatype, setDatatype] = useState('file')
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };
    const props = {
        name: 'file',
        accept: '.csv',
        multiple: true,
        customRequest: dummyRequest,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            setNewDatabaseInfo({ ...newDatabaseInfo, files: info.fileList })
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      const [isLoading, setIsLoading] = useState(false)
    
    const handleDelete = (databaseid) => {
        deleteDatabase({userInfo, databaseid, setDatabaseList, openMessage})
    }
    return <div className={styles.mainContainer}>
        <div className={styles.listDatabase}>
            <Table columns={columns} 
            pagination={{ pageSize: 2 }}
            dataSource={
                databaseList.map((item, index) => 
                    ({
                        key: index.toString(),
                        databaseid: item.DatabaseID,
                        databasename: item.DataName,
                        createddate: item.CreatedDate.split('T')[0],
                        MachineDescription: item.MachineDescription,
                        UserDescription: item.UserDescription
                    }))
                }
                expandable={{
                    expandedRowRender: (record) => (
                        <Tabs defaultActiveKey="1" items={
                            [
                                {
                                    label: 'User Description',
                                    key: '1',
                                    children: <p>{record.UserDescription}</p>,
                                },
                                {
                                    label: 'Machine Description',
                                    key: '2',
                                    children: <p>{record.MachineDescription}</p>,
                                }
                                
                            ]
                        } />
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }} 
                />
        </div>
        <div className={styles.addDatabase}>
        {isAddingDatabase ? <>
            <Button type='primary' 
                icon={<MinusOutlined/>}
                iconPosition='left'
                onClick={() => setIsAddingDatabase(false)}
                >Add Database</Button></> : 
        <><Button type='default' 
            icon={<PlusOutlined/>}
            iconPosition='left'
            onClick={() => setIsAddingDatabase(true)}
            >Add Database</Button></>
        }
        {isAddingDatabase && <div className={styles.addDatabaseForm}>

                <Input placeholder="Database Name" 
                    defaultValue={newDatabaseInfo.DataName}
                    onChange={(e) => setNewDatabaseInfo({...newDatabaseInfo, "DataName": e.target.value})}/>
                <Button type='primary'
                loading={isLoading}
                onClick={() => {
                  addNewDatabase({userInfo, newDatabaseInfo, setDatabaseList, initNewDatabaseInfo, setNewDatabaseInfo, setIsLoading, openMessage})
                }}>Submit</Button>
                <TextArea rows={2} defaultValue={newDatabaseInfo.UserDescription} 
                    onChange={(e) => setNewDatabaseInfo({...newDatabaseInfo, "UserDescription": e.target.value})}/>
                <div className={styles.addDatabaseFormUpload}>
                <Radio.Group
                    defaultValue={'file'}
                    onChange={(e) => 
                        {
                          if (e.target.value === 'url') {
                            setNewDatabaseInfo(pre => {
                              const newPre = {...pre}
                              newPre.files = [] 
                              setNewDatabaseInfo(pre => {return {...pre, "files": []}})
                              // delete newPre.files
                              return newPre
                            })
                          }
                          else {
                            setNewDatabaseInfo(pre => {
                              const newPre = {...pre}
                              newPre.url = ''
                              setNewDatabaseInfo(pre => {return {...pre, "url": ''}})
                              // delete newPre.url
                              return newPre
                            })
                          }
                          setDatatype(e.target.value)
                          }}>
                    <Radio value="file"> Files </Radio>
                    <Radio value="url"> URL </Radio>
                </Radio.Group>
                {datatype === 'url' ? <Input placeholder="URL" onChange={(e) => setNewDatabaseInfo({...newDatabaseInfo, "url": e.target.value})}/> :
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload Files</Button>
                </Upload>}
                </div>
                

            </div>}
        </div>
    </div>
}

export default DatabaseControl