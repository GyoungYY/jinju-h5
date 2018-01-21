<template>
    <div class="my-container">
        <div class="photo-div">
            <img :src="infoDetail.photoUrl" alt="" class="my-photo">
            <div style="color:#f90;font-size:18px;">{{infoDetail.username}}</div>
            <div style="color: #999;">{{joinTime}}入网</div>
            <div style="color: #999;">在网时长{{diffDay || '0小时'}}</div>
        </div>
        <div class="item-cell">个人信息</div>
        <div class="item-cell">发表金句</div>
        <div class="item-cell" @click="logout()">退出登录</div>
    </div>
</template>

<script>
import UserInterface from "@/interface/UserInterface";
import formatTime from "@/common/js/formatTime";

export default {
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      infoDetail: {}
    };
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    //获取用户信息
    getUserInfo() {
      UserInterface.getUserInfo(this.userInfo.userId)
        .then(data => {
          this.infoDetail = data;
          this.joinTime = formatTime.getLocalTime(this.infoDetail.createTime);
          this.diffDay = formatTime.getDiffDay(this.infoDetail.createTime);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //退出登录
    logout() {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("activeName");
      UserInterface.logout(this.userInfo.userId)
        .then(data => {
          this.$message.success("退出成功");
          this.$router.push({ path: "/index/Login" });
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    }
  }
};
</script>

<style scoped>
.my-container {
  background-color: #fff;
}

.photo-div {
  text-align: center;
  padding: 20px;
}

.my-photo {
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border: 1px solid #ddd;
}

.item-cell {
  padding: 14px;
  border-bottom: 1px solid #ddd;
}
</style>
