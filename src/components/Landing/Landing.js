import styles from './Landing.module.css'
import { Menu, Button } from 'antd'
import { DiscordOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Landing  = () => {
    const navigate = useNavigate();

    const header_items = [
        {
            label: 'About Us',
            key: 'about',
            
        },
        {
            label: 'Documents',
            key: 'documents',
            
    
        },
        {
            label: 'Contact',
            key: 'contact',
        
        },
        {
            label: 'Prices',
            key: 'prices',
        },
        ];
    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <DiscordOutlined style={{fontSize: 50}}/>
                    <span>Chat with Your Data</span>
                </div>
                    
                <div className={styles.menu}>
                <Menu mode="horizontal" items={header_items} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.text_content}>
                    <div className={styles.title}>
                    Welcome to DataChat!
                    </div>
                    <div className={styles.subtitle}>
                        <span style={{fontWeight: 'bold'}}>Unlock the power of your data with DataChat! </span>
                    Our advanced chatbot allows you to interact with your data like never before. Ask questions, run analyses, and gain insights with ease. Whether you're a data scientist, a business analyst, or just curious, DataChat is here to help you make data-driven decisions.
                    </div>
                       
                        <div className={styles.button}>
                        <Button type="primary"
                        onClick={() => navigate('/login')}>Get Started</Button>
                    </div>
                    </div>
                    
            <div className={styles.image}>
                <img src="/imgs/landing.png"></img>
            </div>
            </div>
        </div>
    )
}

export default Landing