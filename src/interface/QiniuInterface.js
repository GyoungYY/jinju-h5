import fetch from '@/interface/fetch';

const API = '/api';

export default {
    
    //获取upload token
    getUploadToken() {
        return fetch.get(API + '/qiniu/uploadToken').then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },
}