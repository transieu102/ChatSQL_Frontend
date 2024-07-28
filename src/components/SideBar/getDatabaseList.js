import Config from "../../config";

const getDatabaseList =  ({userInfo, setDatabaseList}) => {
    const get_database_list = Config.get_database_list
    fetch(get_database_list, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
        .then(response => response.json())
        .then(response => {
            setDatabaseList(response)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

export default getDatabaseList