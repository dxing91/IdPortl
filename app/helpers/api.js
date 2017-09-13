import axios from 'axios'

export function uploadDocs(data) {
  return axios.post('http://localhost:8080/upload', data)
    .catch((error) => console.warn(error))
}
