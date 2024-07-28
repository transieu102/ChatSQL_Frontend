import Config from "../../config";

const handleLogin = ({setUserInfo, values, openMessage, isRemember}) => {
    const login_url = Config.login_url
    const data = {
        "Username": values.username,
        "Password": values.password
    }
    // console.log(JSON.stringify(data))
    fetch(login_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        // console.log(response)
        if (response.status === "Login successful") {
            if (isRemember)
                localStorage.setItem('user_info_datachat', JSON.stringify(response['user_info']));
            setUserInfo(response['user_info'])
        }
        else {
            openMessage('error', 'Login Failed, please try again!')
        }
    })
    .catch((error) => {
        openMessage('error', 'Login Failed, please try again!')
        console.error('Error:', error);
    });
}

export default handleLogin