import { useEffect, useState } from 'react';
import Conversation from '../Conversation/Conversation';
import SideBar from '../SideBar/SideBar';
import style from './Chat.module.css'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal } from 'antd';
import update_api_key from './updateKey';
const Chat = ({userInfo, setUserInfo, openMessage}) => {
    // Nativation Control 
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        if(!userInfo && !localStorage.getItem('user_info_datachat')){
            openMessage('warning', 'Please login first!');
            navigateToLogin()}
    },[userInfo])

    // API Key Modal - Handle Input API Key
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleOk = () => {
        if (!userInfo['API_Key']) {
            openMessage('warning', 'Please input your API Key first!');

        } else {
            update_api_key({userInfo, openMessage, setIsLoading, setIsModalOpen});
        };
    };
    const handleCancel = () => {
        if (!userInfo['API_Key']) {
            openMessage('warning', 'Please input your API Key first!');

        } else setIsModalOpen(false);
    };
    useEffect(() => {
        if(userInfo && !userInfo['API_Key']){
            showModal()
            }
    },[userInfo])

    // Control Choosed conversation from SideBar
    const [currentConversationID, setCurrentConversationID] = useState(null)
    return (<>
    {userInfo ?
        <div className={style.mainContainer}>
            {userInfo && <Modal confirmLoading={isLoading} title="API Key" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input onChange={(e) => setUserInfo({...userInfo, 'API_Key': e.target.value})} placeholder='Input your API Key' value={userInfo['API_Key'] ? userInfo['API_Key'] : ''} />
            </Modal>}
            <SideBar className={style.sideBar} userInfo={userInfo} openMessage={openMessage} currentConversationID={currentConversationID} setCurrentConversationID={setCurrentConversationID} />
            <Conversation className={style.conversation} userInfo={userInfo} openMessage={openMessage} currentConversationID={currentConversationID} setCurrentConversationID={setCurrentConversationID} setIsModalOpen ={setIsModalOpen} setUserInfo={setUserInfo}/>
        </div>:<></> 
        }
    </>
        
    );
};
export default Chat