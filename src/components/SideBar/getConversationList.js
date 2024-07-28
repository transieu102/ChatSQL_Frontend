import Config from "../../config"

const getConversationList = ({userInfo, setConversationList, setCurrentConversationID}) => {
    const get_conversations_list_url = Config.get_conversations_list

    fetch(get_conversations_list_url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(response => {
        // console.log(response)
        if (response.length) {
            setCurrentConversationID(response[0].ConversationID)
        }
        setConversationList(response)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
export default getConversationList