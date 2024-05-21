import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
    params: {
        api_key: "35af44793fc56d2e35ad6220b1d76442"
        language: "ko-KR"
    }
})

export default instance;