import { useEffect, useState } from 'react';
import styles from './Login.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import handleLogin from './handleLogin'
import handleRegister from './handleRegister'
import { useNavigate } from 'react-router-dom';
const Login = ({userInfo, setUserInfo, openMessage}) => {
    const [formType, setFormType] = useState('login')
    const [isRemember, setIsRemember] = useState(true)
    const onFinish = (values) => {
        if (formType === 'login') {
            handleLogin({setUserInfo, values, openMessage, isRemember})
        } else {
            handleRegister({values, setFormType, openMessage})
        }
      };
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate('/app');
        }
    },[userInfo])

    return (
        <div className={styles.mainContainer}>
        <div className={styles.form}>
            <div className={styles.title}>{formType === 'login' ? 'Login' : 'Register'}</div>
            {formType === 'login' ? <Form
                className={styles.loginForm + " login-form"}
                name="normal_login"
                // className=
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                {formType === 'login' ? (
                    <Form.Item>
                    <Form.Item name="remember" valuePropName= "checked" noStyle
                            >
                    <Checkbox onChange={() => setIsRemember(!isRemember)}>Remember me</Checkbox>
                    </Form.Item>

                    <a href="" className={"login-form-forgot "+styles.forgotPassword}>
                    Forgot password
                    </a>
                </Form.Item>
                
                ) : <></>}
                
                {
                    formType === 'login' ?  (
                        <Form.Item>
                            <Button className={styles.loginFormButton + " login-form-button"} type="primary" htmlType="submit" >
                    Log in
                    </Button>
                    
                    <br></br>
                    <div style={{margin: '10px'}}></div>
                    Or <a href="" onClick={(e) => { e.preventDefault(); setFormType('register')}}>register now!</a>
                </Form.Item>)
                :  (<Form.Item>
                <Button className={styles.loginFormButton + " login-form-button"} type="primary" htmlType="submit" >
                Register
                </Button>
            </Form.Item>
                    )
                }

                
                </Form>:<><Form
                className={styles.loginForm + " login-form"}
                name="normal_login"
                // className=
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                {formType === 'login' ? (
                    <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a href="" className={"login-form-forgot "+styles.forgotPassword}>
                    Forgot password
                    </a>
                </Form.Item>
                
                ) : <></>}
                
                {
                    formType === 'login' ?  (
                        <Form.Item>
                    <Button className={"login-form-button "+styles.loginFormButton} type="primary" htmlType="submit">
                    Log in
                    </Button>
                    Or <a href="" onClick={(e) => { e.preventDefault(); setFormType('register')}}>register now!</a>
                </Form.Item>)
                :  (<Form.Item>
                <Button className={styles.loginFormButton+" login-form-button"} type="primary" htmlType="submit">
                Register
                </Button> 
                <br></br>
                <div style={{margin: '10px'}}></div>
                Already have an account? <a href="" onClick={(e) => { e.preventDefault(); setFormType('login')}}>Login now!</a>
            </Form.Item>
                    )
                }

                
                </Form> </>}
        </div>
            
        </div>
    )
}

export default Login



