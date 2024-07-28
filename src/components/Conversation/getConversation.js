import Config from "../../config"

const getConversation = ({userInfo, currentConversationID, setConversationInfo}) => {
    const get_conversation_url = Config.get_conversation
    const data = JSON.stringify(
    {
        "conversation": {
          "ConversationID": currentConversationID
        },
        "user_info": userInfo
      })
    // console.log(data)
    fetch(get_conversation_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => response.json())
        .then(response => {
            // console.log("ConverINfo", response)
            if (!response.detail) {
                setConversationInfo(response)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

export default getConversation