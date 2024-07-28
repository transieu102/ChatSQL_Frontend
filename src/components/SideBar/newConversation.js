import Config from "../../config"

const newConversation = ({userInfo, newConversationInfo, setConversationList, setCurrentConversationID}) => {
    // console.log(newConversationInfo)
    const new_conversation_url = Config.new_conversation_url
    const data = JSON.stringify({"conversation" : newConversationInfo,
        "user_info" : userInfo
    })
    // console.log(data)
    // return
    fetch(new_conversation_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })  
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            setCurrentConversationID(response.ConversationID)
            setConversationList(pre => [response, ...pre])
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}
export default newConversation