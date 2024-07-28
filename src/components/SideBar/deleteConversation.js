import Config from "../../config"

const deleteConversation = ({userInfo, conversationInfo, setCurrentConversationID, setConversationList}) => {
    const delete_conversation_url = Config.delete_conversation_url

    const data = JSON.stringify({"conversation" : conversationInfo,
        "user_info" : userInfo
    })

    fetch(delete_conversation_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            setConversationList(response)
            setCurrentConversationID(response[0].ConversationID)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

export default deleteConversation