import { useEffect, useRef, useState } from 'react';
import styles from './Conversation.module.css'
import { UpOutlined, DatabaseOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Tag, Avatar, Dropdown } from 'antd'
import UserMessage from '../Message/UserMessage';
import BotMessage from '../Message/BotMessage';
import SendMessage from './SendMessage';
import getMessages from './getMessages';
import getConversation from './getConversation';
import Config from '../../config';
const { TextArea } = Input;
const Conversation = ({userInfo, openMessage, currentConversationID, setCurrentConversationID, setIsModalOpen, setUserInfo}) => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [conversationInfo, setConversationInfo] = useState(null);
    const SendButton = useRef(null);
    useEffect(() => {
      if (currentConversationID)
        getConversation({ userInfo, currentConversationID, setConversationInfo});
    }, [currentConversationID])
    useEffect(() => {
      if (currentConversationID)
        getMessages({ userInfo, currentConversationID, setMessageList});
    }, [currentConversationID])
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            // Perform your action here
            SendButton.current.click();
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Cleanup event listener on component unmount
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    

    // handle scroll down
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current ) {
            // console.log(messageList)
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messageList]);
    
    useEffect(() => {
      if (inputRef.current && !isLoading) {
        inputRef.current.focus({
          cursor: 'start',
        });
      }
    }, [isLoading]);



    const items = [
      {
        key: '1',
        label: "Update API Key",
        onClick: () => setIsModalOpen(true),
      },
      {
        key: '2',
        label: <a>Log Out</a> ,
        danger: true,
        onClick: () => {
          setUserInfo(null);
          localStorage.removeItem('user_info_datachat');
        },
      },
    ];
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
      if (currentConversationID) {
        const socket_url = Config.chat_socket_url +`?con_id=${currentConversationID}&user_id=${userInfo.UserID}`
      // console.log("socket_url: ", socket_url)
      if (socket) {
        socket.close();
      }
      const new_socket = new WebSocket(socket_url);
      new_socket.onopen = () => {
        setSocket(new_socket);
        setIsSocketConnected(true);
      }

      new_socket.onclose = () => {
        setSocket(null);
        setIsSocketConnected(false);
      }
    
      }
      
    }, [currentConversationID]);
    return (
      <>{(conversationInfo && isSocketConnected) ? <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Tag icon={<DatabaseOutlined />} color="success">{conversationInfo.database.DataName}</Tag> 
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />    
       
        </Dropdown>
                
      </div>
      <div className={styles.content}>
          {messageList.map((m, i) => {
              if (m.Role === 'user') {
                  return <UserMessage key={i} socket={socket} id ={i} content={m.Content} messageListState={[messageList, setMessageList]} setIsLoading = {setIsLoading}/>
              }
              return <BotMessage key={i} content={m.Content} code={m.code} show_code={m.show_code}/>
             })}
          <div className={styles.messagesEnd}  ></div>
          <div ref={messagesEndRef}></div>
      </div>
      <div className={styles.input}>
      <TextArea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // placeholder="Controlled autosize"
          autoSize={{
          minRows: 1,
          maxRows: 5,
          }}
          disabled={isLoading}
      />
      <Button ref={SendButton} type='primary' shape='circle' icon={<UpOutlined/>} disabled={value.length === 0} loading={isLoading}
      onClick={() => SendMessage({socket, value, id : messageList.length,messageList, setMessageList, setIsLoading, setValue})}/>
      </div>
      
  </div> : <div className={styles.mainContainer}>
      <div className={styles.header_empty}>
        <div></div>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />    
       
        </Dropdown>
                
      </div>
      <div className={styles.content}>
      </div>
      <div className={styles.input}>
      </div> </div>
  }</>
        
    )
}

export default Conversation