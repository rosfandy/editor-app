/* eslint-disable  */
import axios from 'axios';

export const fetchOpenGraphData = async (url, editor) => {
    try {
        const response = await axios.get(`https://editorhocus.oriens.my.id/scrape?url=${url}`)
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}
