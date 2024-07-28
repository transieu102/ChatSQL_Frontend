import Config from "../../config"

const getMessages = ({userInfo, currentConversationID, setMessageList}) => {
    const get_messages_url = Config.get_messages_url
    const data = JSON.stringify({"conversationID": {"ConversationID": currentConversationID}, "user_info": userInfo})

    fetch(get_messages_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            if (!response.detail) {
                setMessageList(response)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

export default getMessages