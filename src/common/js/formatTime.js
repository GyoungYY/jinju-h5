let timeUtils = {

    //根据毫秒获取此时时间
    getLocalTime(millisecond) {
        var now = new Date(millisecond);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var date = now.getDate();
        if (date < 10) {
            date = "0" + date;

        }
        var hour = now.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minute = now.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        var second = now.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        return year + "年" + month + "月" + date + "日" + hour + ":" + minute;
    },

    //根据毫秒获取此时时间
    getFormatTime(millisecond) {
        var now = new Date(millisecond);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var date = now.getDate();
        if (date < 10) {
            date = "0" + date;

        }
        var hour = now.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minute = now.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        var second = now.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        return year + "/" + month + "/" + date + " " + hour + ":" + minute;
    },

    //返回多少天多少小时
    getDiffDay(dateTimeStamp) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let now = new Date().getTime();
        let diffValue = now - dateTimeStamp;

        let diffDay = parseInt(diffValue / day);
        let diffHour = parseInt((diffValue % day) / hour);

        let result = '';
        if (diffDay >= 1) {
            result = result + diffDay + '天';
        }
        if (diffHour >= 1) {
            result = result + diffHour + '小时';
        }
        return result;
    },

}

export default timeUtils;
