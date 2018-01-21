<template>
    <div class="user-container">
            <div class="photo-row">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div style="margin-left:110px;">
                    <div class="user-name">{{infoDetail.username}}</div>
                    <h4 style="color: #999;">{{joinTime}}入网</h4>
                    <h4 style="color: #999;">在网时长{{diffDay || '0小时'}}</h4>
                </div>
            </div>
    </div>
</template>

<script>
import UserInterface from "@/interface/UserInterface";
import formatTime from "@/common/js/formatTime";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      infoDetail: {},
      joinTime: "",
      diffDay: "",

    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {

    //获取用户信息
    getUserInfo() {
      UserInterface.getUserInfo(this.userId)
        .then(data => {
          this.infoDetail = data;
          this.selectedProvId = data.provinceCode;
          this.selectedCityId = data.cityCode;
          this.selectedAreaId = data.countyCode;
          this.joinTime = formatTime.getLocalTime(this.infoDetail.createTime);
          this.diffDay = formatTime.getDiffDay(this.infoDetail.createTime);
          this.imageUrl = this.infoDetail.photoUrl;
          if (this.selectedAreaId) {
            this.getCityList(this.selectedProvId);
            this.getAreaList(this.selectedCityId);
          }
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

  }
};
</script>

<style scoped>
.user-container {
  padding: 20px 0;
  background-color: #fff;
}

.photo-row {
  position: relative;
  min-height: 100px;
}

.avatar {
  width: 90px;
  height: 90px;
  border: 1px solid #ddd;
  border-radius: 45px;
  position: absolute;
  left: 10px;
}

.user-name {
  font-size: 20px;
  color: #f90;
}
</style>
