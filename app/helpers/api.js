import axios from 'axios'
import { store } from '../index.js'
import { updateProgressBar } from 'store/upload'

export function uploadDocs(filesData, userDetails) {
  let data = new FormData()
  data.append('details', JSON.stringify(userDetails))
  for (let file in filesData) {
    data.append(file, filesData[file])
  }

  const config = {
    onUploadProgress: (progressEvent) => {
      let percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      store.dispatch(updateProgressBar(percentComplete))
    }
  }

  return axios.post('http://localhost:8080/upload', data, config)
    .then((res) => {
      if (res.data !== 'Successfully uploaded.') throw new Error()
      return res
    })
    .catch((error) => {
      console.warn(error)
    })
}
