const getToken = () => {
    let token = localStorage.getItem("token")
    token = token ? JSON.parse(token) : ''

    return token
}

export default getToken