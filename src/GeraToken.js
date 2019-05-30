import axios from 'axios'
const GeraToken = async () => {
    try {
        const res = await axios.get('http://200.150.166.73:5008/GeraToken', {
            auth: {
                username: 'capao',
                password: 'capao'
            }
        })
        console.log(res.data.Token)
        axios.defaults.headers.common['token']
            = `${res.data.Token}`
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export default GeraToken