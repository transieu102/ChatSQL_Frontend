import { useState } from 'react';
import styles from './BotMessage.module.css';
import { OpenAIOutlined } from '@ant-design/icons';

const BotMessage = ({content, code = '', show_code = false}) => {
    return ( <div className={styles.mainContainer} >
        <div className={styles.avatar}><OpenAIOutlined /></div>
        {show_code && <div className={styles.code}> {code}</div>}
        <div className={styles.content}>{content}</div>
    </div>)
}

export default BotMessage