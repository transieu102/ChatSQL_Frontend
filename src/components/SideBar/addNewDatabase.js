import Config from "../../config";

const addNewDatabase = ({userInfo, newDatabaseInfo, setDatabaseList, initNewDatabaseInfo, setNewDatabaseInfo, setIsLoading, openMessage}) => {
    setIsLoading(true)
    
    const add_database_url = Config.add_database_url
    const formData = new FormData();
    const data = {...newDatabaseInfo}
    const files = data.files
    delete data.files
    // console.log("Check Check:", data, files)
    if (!newDatabaseInfo.url.length && (!files || files.length === 0)) {
        openMessage('error', "Please select a database file or URL!")
        setIsLoading(false)
        return}
    if (files.length > 0) {
        delete data.url
    }
    formData.append('database', JSON.stringify(data));
        // console.log(files)

        // formData.append('files', files)
        files.forEach(file => {
            formData.append('files', file.originFileObj);
            });
        
        
      

        // Chuyển đổi đối tượng `userInfo` thành JSON và thêm vào FormData
        formData.append('user_info', JSON.stringify(userInfo));

        fetch(add_database_url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            if (response.detail) {
                openMessage('error', "Add database failed: " + response.detail)
                setIsLoading(false)
            } else {
                openMessage('success', "Add database successful")
                setDatabaseList(response)
                // setNewDatabaseInfo(initNewDatabaseInfo)
                setIsLoading(false)
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
            setIsLoading(false)
        })
}

export default addNewDatabase