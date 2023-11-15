/* eslint-disable  */
import axios from 'axios'
import FormData from 'form-data';

// const host = 'http://localhost:1234'
const host = 'https://editorhocus.oriens.my.id'

export const uploadMedia = (file, documentId, progressEvent) => {
    const data = new FormData()
    data.append('document', documentId)
    data.append('file', file)
    const uri = `${host}/uploadEditor`

    return axios.post(uri, data, {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent
    })
}

