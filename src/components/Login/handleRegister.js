import Config from "../../config";

const handleRegister = ({values, setFormType, openMessage}) => {

    const register_url = Config.register_url

    const data = {
        "Username": values.username,
        "Password": values.password
    }

    fetch(register_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === "Register successful") {
            openMessage('success', 'Register Successful, please login now!')
            setFormType('login')
        }
        else {
            openMessage('error', 'Register Failed, please try again!')
        }
        // console.log(data)
    })
    .catch((error) => {
        openMessage('error', 'Register Failed, please try again!')
        console.error('Error:', error);
    })
    
    };
export default handleRegister