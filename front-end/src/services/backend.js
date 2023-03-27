import axios from 'axios'

const backend = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.getItem('Token')
    }
})
export default backend

/* 
# COMO SERIA
import axios from 'axios'
axios.get('http://127.0.0.1:8000/api/v1/' + endpoint, {
    headers: {'Content-Type': 'application/json'}
})
axios.get('http://127.0.0.1:8000/api/v1/' + endpoint, {
    headers: {'Content-Type': 'application/json'}
})
axios.get('http://127.0.0.1:8000/api/v1/' + endpoint, {
    headers: {'Content-Type': 'application/json'}
})
axios.get('http://127.0.0.1:8000/api/v1/' + endpoint, {
    headers: {'Content-Type': 'application/json'}
})
axios.get('http://127.0.0.1:8000/api/v1/' + endpoint, {
    headers: {'Content-Type': 'application/json'}
})
axios.get('http://127.0.0.1:8000/api/v1/' + endpoint, {
    headers: {'Content-Type': 'application/json'}
})v

# COMO SERÁ
import backend from 'backend'
backend.get(endpoint)
backend.get(endpoint)
backend.get(endpoint)
backend.get(endpoint)

*/