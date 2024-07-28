import './App.css';
import { Routes, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import { useState ,createContext, useContext, useEffect} from 'react';
import { message } from 'antd';
import Landing from './components/Landing/Landing';
function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };
  useEffect(() => {
    const user_info_local = JSON.parse(localStorage.getItem('user_info_datachat'));
    if (user_info_local) {
      setUserInfo(user_info_local);
    }
  },[])
  return (

    <div className='mainContainer'>  
      {contextHolder}
     <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} openMessage={openMessage}/>}/>
      <Route path="/app" element={<Chat userInfo={userInfo} setUserInfo={setUserInfo} openMessage={openMessage}/>}/>
    </Routes>
    </div>
  );
}

export default App;
