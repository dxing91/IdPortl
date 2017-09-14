import axios from 'axios'

export function uploadDocs(data) {
  return axios.post('http://localhost:8080/upload', data)
    .then((res) => res)
    .catch((error) => console.warn(error))
}
