import Config from "../../config"

const deleteDatabase = ({userInfo, databaseid, setDatabaseList, openMessage}) => {
    const delete_database_url = Config.delete_database_url
    const data = {
        "database": {
            "DatabaseID": databaseid},
        "user_info": userInfo
      }
    fetch(delete_database_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            if (!response.detail) {
                openMessage('success', 'Delete Successful')
                setDatabaseList(response)
            }
            else openMessage('error', 'Delete Failed')
        })
        .catch((error) => {
            console.error('Error:', error);
            openMessage('error', 'Delete Failed')
        })
}

export default deleteDatabase