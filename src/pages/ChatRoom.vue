<template>
    <div class="chat-container">
        <div class="chat-header">
            <div style="font-size: 16px;">聊天室</div>
            <div style="font-size: 12px;color: #999;">在线人数:{{userList.length}}人</div>
        </div>
        <div class="message-notice" id="messageList">
            <div v-if="showHistoryMessage" style="text-align: center;color: #66b1ff;cursor:pointer;"
                 @click="getHistoryMessage()">
                <span class="glyphicon glyphicon-time" style="padding-right:4px;position: static;"></span>查看更多消息
            </div>
            <div v-for="item in messageList">
                <div v-if="item.type == 2" style="text-align:center;color:#f90;padding:8px;">{{item.message}}</div>
                <div :class="{'self-message' : item.userId == userId}" v-if="item.type == 1">
                    <div :class="{'self-username' : item.userId == userId}">
                        <img :src="item.photoUrl" alt="" class="message-photo" @click="gotoUserPage(item)">
                        <span>{{item.username}}</span>
                    </div>
                    <div style="clear: both;"></div>
                    <span class="message-content" :class="{'self-content': item.userId == userId}">
                                {{item.message}}
                            </span>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>

        <div class="send-div">
            <el-input v-model="sendText" @keyup.enter.native="sendMessage()"></el-input>
        </div>
    </div>
</template>

<script>
    import ChatroomInterface from "@/interface/ChatroomInterface";
    import scrollFunc from "@/common/js/scrollFunc";

    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
                sendText: "",
                userList: [],
                messageList: [],
                websock: null,
                userId: "",
                showHistoryMessage: true,
                searchParams: {
                    pageIndex: 1,
                    pageSize: 20
                }
            };
        },

        mounted() {
            if (!this.userInfo) {
                this.getVisitorId();
            } else {
                this.userId = this.userInfo.userId;
                this.initWebSocket(this.userInfo.userId);
            }
            scrollFunc.gotoTop();
        },

        beforeDestroy() {
            if (this.websocket) {
                this.closeConnection();
            }
        },

        methods: {
            //获取游客id
            getVisitorId() {
                ChatroomInterface.getVisitorId()
                    .then(data => {
                        this.userId = data;
                        this.initWebSocket(data);
                    })
                    .catch(reason => {
                        this.$message.error(reason);
                    });
            },

            //初始化
            initWebSocket(userId) {
                // let kaigeUrl = 'bt18088883.iok.la';
                // const wsUrl = "ws://localhost:8888/chatsocket/" + userId;
                const wsUrl = "ws://101.132.43.21:8888/chatsocket/" + userId;
                this.websocket = new WebSocket(wsUrl);
                //指定收到服务器数据后的回调函数
                this.websocket.onmessage = event => {
                    this.getMessageList(event);
                };

                //用于指定报错时的回调函数
                this.websocket.onerror = () => {
                    this.errorShow();
                };
            },

            //获取消息列表
            getMessageList(event) {
                let result = JSON.parse(event.data);
                console.log(result);
                this.messageList.push(result);
                if (result.type == "2") {
                    this.userList = result.userList;
                }
                setTimeout(function () {
                    $("#messageList").scrollTop($("#messageList")[0].scrollHeight);
                }, 10);
            },

            //发送消息
            sendMessage() {
                if (!this.sendText.trim()) {
                    this.$message.error("请输入要发送的内容");
                    return;
                }
                this.websocket.send(this.sendText);
                this.sendText = "";
            },

            //错误回调函数
            errorShow() {
                this.$message.success("webSocket有点问题，您喝杯茶再来试一下～");
            },

            //关闭连接
            closeConnection() {
                this.websocket.close();
            },

            //进入用户个人主页
            gotoUserPage(item) {
                if (item.isVisitor) {
                    this.$message.warning("该用户为游客身份哦~");
                    return;
                }
                this.$router.push({path: "/index/userPage/" + item.userId});
            },

            //获取历史消息
            getHistoryMessage() {
                ChatroomInterface.getHistoryMessage(this.searchParams)
                    .then(data => {
                        this.dealHistoryMessage(data);
                        this.searchParams.pageIndex++;
                        if (data.length < this.searchParams.pageSize) {
                            this.showHistoryMessage = false;
                        }
                    })
                    .catch(reason => {
                        this.$message.error(reason);
                    });
            },

            //处理历史消息
            dealHistoryMessage(data) {
                for (let i = 0; i < data.length; i++) {
                    this.messageList.unshift(JSON.parse(data[i]));
                }
            },

        }
    };
</script>

<style scoped>
    .chat-container {
        background-color: #fff;
    }

    .chat-header {
        position: fixed;
        top: 0;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding: 6px 0;
        background-color: #fff;
    }

    .message-notice {
        padding: 62px 10px 50px 10px;
        min-height: 700px;
    }

    .message-photo {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-right: 4px;
        cursor: pointer;
    }

    .message-content {
        display: inline-block;
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 10px 10px 15px 10px;
        max-width: 260px;
        word-wrap: break-word;
    }

    .send-div {
        position: fixed;
        bottom: 54px;
        width: 100%;
        padding: 6px;
        background-color: #fff;
    }

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 3px;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(0, 0, 0, 0.2);
    }

    .self-message {
        float: right;
    }

    .self-username {
        float: right;
        padding-right: 10px;
    }

    .self-content {
        background-color: lawngreen;
        float: right;
    }
</style>
