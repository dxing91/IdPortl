const IS_UPLOADING = 'IS_UPLOADING'
const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
const UPLOAD_ERROR = 'UPLOAD_ERROR'
const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR'

export function isUploading() {
  return {
    type: IS_UPLOADING
  }
}

export function uploadSuccess() {
  return {
    type: UPLOAD_SUCCESS
  }
}

export function uploadError() {
  return {
    type: UPLOAD_ERROR
  }
}

export function updateProgressBar(percentComplete) {
  return {
    type: UPDATE_PROGRESS_BAR,
    percentComplete
  }
}

const initialState = {
  isUploading: false,
  uploadSuccess: false,
  uploadError: false,
  progressBar: 0
}

export default function upload(state = initialState, action) {
  switch(action.type) {
    case IS_UPLOADING:
      return {
        ...state,
        isUploading: true
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isUploading: false,
        uploadSuccess: true
      }
    case UPLOAD_ERROR:
      return {
        ...state,
        isUploading: false,
        uploadError: 'There was an error during upload. Please try again.'
      }
    case UPDATE_PROGRESS_BAR:
      return {
        ...state,
        progressBar: action.percentComplete
      }
    default:
      return state
  }
}
