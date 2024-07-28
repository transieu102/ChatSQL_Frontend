import Config from "../../config"

const update_api_key = ({userInfo, openMessage, setIsLoading, setIsModalOpen}) =>
{
    const update_api_key_url =  Config.update_api_key
    setIsLoading(true)
    fetch(update_api_key_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)})
        .then(response => response.json())
        .then(response => {
            setIsLoading(false)
            // console.log(response)
            if (response.status === "Update successful") {
                openMessage('success', 'Update Successful')
                setIsModalOpen(false)
            }
            else {
                openMessage('error', 'Update Failed')
            }
        })
        .catch((error) => {
            setIsLoading(false)
            console.error('Error:', error);
            openMessage('error', 'Update Failed')
        })
    
}
export default update_api_key