import fetch from '@/interface/fetch';

const API = '/api';

export default {

    //创建美文
    createMeiwen(params) {
        return fetch.post(API + '/meiwen/create', params, 'json').then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //获取美文列表
    getMeiwenList(params = {}) {
        return fetch.get(API + '/meiwen/list', params).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //获取美文详情
    getMeiwenDetail(id) {
        return fetch.get(API + '/meiwen/get/' + id).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },
}
