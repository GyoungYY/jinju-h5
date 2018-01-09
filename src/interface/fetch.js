export default {
    queryDataToString(data) {
        let body = [];
        for (let [key, value] of Object.entries(data)) {
            body.push(key + '=' + value);
        }
        return body.join('&');
    },

    get(url, data = {}) {
        let params = this.queryDataToString(data);
        if (params !== '') {
            let ch = url.indexOf('?') === -1 ? '?' : '&';
            url = url + ch + params;
        }
        return fetch(url, {
            credentials: 'include',
        }).then(response => response.json());
    },

    post(url,data={},type='form'){
        if(type === 'form'){
            return fetch(url,{
                method: 'POST',
                body: this.queryDataToString(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => response.json());
        }else if(type === 'json'){
            return fetch(url,{
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json());
        }
    }
}
