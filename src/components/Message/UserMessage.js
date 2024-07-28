import styles from './UserMessage.module.css'
import SendMessage from '../Conversation/SendMessage';
import { useState } from "react";
import {EditOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
const { TextArea } = Input;
const UserMessage = ({socket, id, content, messageListState, setIsLoading}) => {
    const [messageList, setMessageList] = messageListState
    const [isEdit, setIsEdit] = useState(false);
    const [editValue, setEditValue] = useState(content);
    const edit = () => {
        setIsEdit(false)
        setTimeout(() => {
            // console.log(`id: ${id}`, `editValue: ${editValue}`)
            SendMessage({socket: socket, value: editValue, id, messageList, setMessageList, setIsLoading, setValue: null });
        }, 0);
    }
    // 
    return (<div className={styles.mainContainer}>
    { isEdit ? <div className={styles.userContainerEdit}>
        <TextArea value={editValue} onChange={(e) => setEditValue(e.target.value)}
            autoSize={{
                minRows: 3,
                maxRows: 7,
                }}
        />
        <div className={styles.editButton}>
            <Button  onClick={() => {setEditValue(content);setIsEdit(false)}}>Cancel</Button>
            <Button type="primary" onClick={edit}>Send</Button>
        </div>
        
    </div> : 
    <div className={styles.userContainer}> 
        <div className={styles.editIcon} onClick={() => setIsEdit(true)}><EditOutlined/></div> {content}</div>}
        
    
    </div>)
}

export default UserMessage