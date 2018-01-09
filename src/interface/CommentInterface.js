import fetch from '@/interface/fetch';

const API = '/api';

export default {

    //创建评论
    createComment(params = {}) {
        return fetch.post(API + '/jinju/comment/create', params, 'json').then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //获取评论列表
    getCommentList(params = {}) {
        return fetch.get(API + '/jinju/comment/list', params).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    /**
     * 评论点赞取消
     * type 1点赞，2取消
     */
    upVoteComment(commentId, type) {
        return fetch.post(API + '/jinju/comment/upVote/' + commentId, { type: type }).then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    }
}
