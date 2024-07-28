import styles from './SideBar.module.css'
import { Menu, Button, Modal, Dropdown, Input, Select } from 'antd'
import {MailOutlined, AppstoreAddOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import getConversationList from './getConversationList';
import getDatabaseList from './getDatabaseList';
import newConversation from './newConversation';
import deleteConversation from './deleteConversation';
import DatabaseControl from './DatabaseControl';
const SideBar = ({userInfo, openMessage, currentConversationID ,setCurrentConversationID}) => {

    const [conversationList, setConversationList] = useState([ ])
    const [databaseList, setDatabaseList] = useState([])
    useEffect(() => {
        getConversationList({userInfo, setConversationList, setCurrentConversationID})
    }, [databaseList])


    useEffect(() => {
        getDatabaseList({userInfo, setDatabaseList})
    },[])

    const [isOpenNewConversationModal, setIsOpenNewConversationModal] = useState(false)
    const init_new_conversation_info = {
        "DatabaseID": null,
        "UserID": userInfo ? userInfo.UserID : null,
        "ConversationName": "New Conversation"
      }
      const handleCancelNewConversation = () => {
          setIsOpenNewConversationModal(false)
        }
    const [newConversationInfo, setNewConversationInfo] = useState(init_new_conversation_info)
    const makeNewConversation = () => {
        // console.log(newConversationInfo)
        for (const [key, value] of Object.entries(newConversationInfo)) {
            if (!value) {
                openMessage('warning', 'Please input all fields!')
                return
            }
        }
        newConversation({userInfo, newConversationInfo, setConversationList, setCurrentConversationID})
        setNewConversationInfo(init_new_conversation_info)
        setIsOpenNewConversationModal(false)
    }
    
    const [isPopUp, setIsPopUp] = useState(false)

    const context_items = [
        {
          label: 'Delete',
          key: '1',
        },
      ];
    const handleContextMenuConversationClick = (e, item) => {
        if (e.key === '1') {
          deleteConversation({userInfo, conversationInfo: item, setCurrentConversationID, setConversationList})
        }
    }
    useEffect(() => {
        // console.log(currentConversationID)
    },[currentConversationID])


    const items = conversationList.map((item) => ({
        key: item.ConversationID.toString(),
        icon: <MailOutlined />,
        label: (
          <>
            {item.ConversationName}
            <div>
              <Dropdown
                menu={{ items: context_items, onClick: (e) => handleContextMenuConversationClick(e, item) }}
                trigger={['contextMenu']}
              >
                <div className={styles.contextMenu}></div>
              </Dropdown>
            </div>
          </>
        ),
        onClick: () => setCurrentConversationID(item.ConversationID),
      }));
    return (
        <div className={styles.mainContainer}>
            
            <Modal title="New Conversation" open={isOpenNewConversationModal} 
            onOk={makeNewConversation} 
            onCancel={handleCancelNewConversation}>
                <Input defaultValue="New Conversation" 
                onChange={(e) => setNewConversationInfo({...newConversationInfo, ConversationName: e.target.value})}
                />
                <Select
                    className={styles.newConversationSelect}
                    value={newConversationInfo.DatabaseID}
                    onChange={(value) => setNewConversationInfo({...newConversationInfo, DatabaseID: value})}
                    options={
                        databaseList.map((item) => ({ label: item.DataName, value: item.DatabaseID }))
                    }
                    />
            </Modal>



            <Button className={styles.newConversation} onClick={() =>setIsOpenNewConversationModal(true)} block> 
                <AppstoreAddOutlined />New Conversation</Button>
            {  <Menu
                    className={styles.conversationList}
                    mode="vertical"
                    selectedKeys={(currentConversationID) ? [currentConversationID.toString()] : []}
                    items={items}
                />}
           
            <Button type="primary" className={styles.popUpButton} onClick={() => setIsPopUp(true)} block> 
            <DatabaseOutlined /> Databases</Button>
            <Modal title="Databases" 
                open={isPopUp} 
                onOk={() => setIsPopUp(false)} 
                onCancel={() => setIsPopUp(false)}
                width = {"60vw"}
                style={{maxHeight: "100vh",
                    overflow: "hidden",
                }}
                >
                
                <DatabaseControl userInfo={userInfo} databaseList={databaseList} setDatabaseList={setDatabaseList} openMessage={openMessage}/>
            </Modal>
        </div>

    )
}

export default SideBar