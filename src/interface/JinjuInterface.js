import fetch from '@/interface/fetch';

const API = '/api';

export default {

    //获取金句列表
    getJinjuList(params = {}) {
        return fetch.get(API + '/jinju/list', params).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //获取金句详情
    getJinjuDetail(id) {
        return fetch.get(API + '/jinju/get/' + id).then(response => {
            return response;
            // if (response.code === 0) {
            //     return response.data;
            // } else {
            //     return Promise.reject(response.message);
            // }
        })
    },

    //创建金句
    createJinju(params) {
        return fetch.post(API + '/jinju/create', params, 'json').then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    /**
     * 点击赞按钮
     * @param {*} jijuId 
     * @param {*} type 1赞，2取消赞
     */
    upVote(jijuId, type) {
        return fetch.post(API + '/jinju/upVote/' + jijuId, { type: type }).then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    /**
     * 点击踩按钮
     * @param {*} jijuId 
     * @param {*} type 1踩，2取消踩
     */
    downVote(jijuId, type) {
        return fetch.post(API + '/jinju/downVote/' + jijuId, { type: type }).then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    /**
     * 点击收藏按钮
     * @param {*} jijuId 
     * @param {*} type 1收藏，2取消收藏
     */
    collect(jijuId, type) {
        return fetch.post(API + '/jinju/collect/' + jijuId, { type: type }).then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },
}
