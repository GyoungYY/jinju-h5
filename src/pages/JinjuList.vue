<template>
    <div class="list-container">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                     class="load-more">

            <el-card class="box-card" v-for="(item,index) in jinjuList" :key="index">
                <div slot="header" style="display:flex;">
                    <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;" @click="gotoUserPage(item.userId)">
                    <div style="padding-left:10px;">
                        <div style="padding-bottom:3px;">
                            <span class="item-username">{{item.username}}</span>
                        </div>
                        <span style="color:#aaa;">{{item.createTimeShow}}</span>
                    </div>
                </div>
                <div class="item-content" @click="gotoDetail(item.jinjuId)">
                    {{item.content}}
                </div>
                <div style="color:#999;">
                    <el-tag :type="item.itemTagClass" class="item-tag">{{item.typeShow}}</el-tag>
                    <span :class="{'clicked': item.isCollect}" class="glyphicon glyphicon-star-empty"
                          style="float:right;cursor:pointer;" @click="collectClick(item)">
                    <span style="padding:0 10px;">{{item.collectCount}}</span>
                </span>
                    <span class="glyphicon glyphicon-comment" style="float:right;padding-right:10px;cursor:pointer;"
                          @click="gotoDetail(item.jinjuId)">
                    <span style="padding:0 10px;">{{item.commentCount}}</span>
                </span>
                    <span :class="{'clicked': item.upOrDownVote === 2}" class="glyphicon glyphicon-thumbs-down"
                          style="float:right;padding-right:10px;cursor:pointer;" @click="downVoteClick(item)">
                    <span style="padding:0 10px;">{{item.downVoteCount}}</span>
                </span>
                    <span :class="{'clicked': item.upOrDownVote === 1}" class="glyphicon glyphicon-thumbs-up"
                          style="float:right;padding-right:10px;cursor:pointer;" @click="upVoteClick(item)">
                    <span style="padding:0 10px;">{{item.upVoteCount}}</span>
                </span>
                </div>
            </el-card>

        </mt-loadmore>
        <div style="padding:10px;text-align: center;background-color: #fff;color:#409EFF;"
             @click="getJinjuList(searchParams.pageIndex + 1)" v-if="!allLoaded">加载更多...
        </div>
        <div style="text-align: center;color: #999;padding-bottom: 6px;" v-if="allLoaded">已经到底啦～</div>

    </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import scrollFunc from "@/common/js/scrollFunc";
import formatTime from "@/common/js/formatTime";

let timer = null;

export default {
  data() {
    return {
      searchParams: {
        pageIndex: 1,
        pageSize: 15
      },
      jinjuList: [],
      total: 0,
      typeEnum: {
        1: "搞笑",
        2: "情感",
        3: "热点"
      },
      tagClass: {
        1: "",
        2: "success",
        3: "danger"
      },

      allLoaded: false
    };
  },
  mounted() {
    this.getJinjuList(1);
  },
  methods: {
    //获取金句列表
    getJinjuList(page, type) {
      if (page != 1 &&page > Math.ceil(this.total / this.searchParams.pageSize)) {
        return;
      }
      this.searchParams.pageIndex = page;
      if (page === 1) {
        this.jinjuList = [];
      }
      JinjuInterface.getJinjuList(this.searchParams).then(data => {
        data.list.map(item => {
          item.typeShow = this.typeEnum[item.type];
          item.itemTagClass = this.tagClass[item.type];
          item.createTimeShow = formatTime.getFormatTime(item.createTime);
          // item.photoUrl = "../../static/img/photo" + item.userId % 4 + ".jpeg";
          return item;
        });
        data.list.forEach(item => {
          this.jinjuList.push(item);
        });

        this.total = data.total;
        this.allLoaded =
          page === Math.ceil(data.total / this.searchParams.pageSize);
        if (type === "top") {
          this.$refs.loadmore.onTopLoaded();
        } else if (type === "bottom") {
          this.$refs.loadmore.onBottomLoaded();
        }
      });
    },

    //进入金句详情
    gotoDetail(id) {
      this.$router.push({ path: "/index/JinjuDetail/" + id });
    },

    //点击赞按钮
    upVoteClick(item) {
      let type = item.upOrDownVote === 1 ? 2 : 1; //1赞，2取消
      JinjuInterface.upVote(item.jinjuId, type)
        .then(data => {
          this.$message.success(data);
          if (type === 1 && item.upOrDownVote != 2) {
            item.upVoteCount += 1;
            item.upOrDownVote = 1;
          } else if (type === 1 && item.upOrDownVote == 2) {
            item.upVoteCount += 1;
            item.downVoteCount -= 1;
            item.upOrDownVote = 1;
          } else if (type === 2) {
            item.upVoteCount -= 1;
            item.upOrDownVote = "";
          }
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //点击踩按钮
    downVoteClick(item) {
      let type = item.upOrDownVote === 2 ? 2 : 1; //1踩，2取消
      JinjuInterface.downVote(item.jinjuId, type)
        .then(data => {
          this.$message.success(data);
          if (type === 1 && item.upOrDownVote != 1) {
            item.downVoteCount += 1;
            item.upOrDownVote = 2;
          } else if (type === 1 && item.upOrDownVote == 1) {
            item.downVoteCount += 1;
            item.upVoteCount -= 1;
            item.upOrDownVote = 2;
          } else if (type === 2) {
            item.downVoteCount -= 1;
            item.upOrDownVote = "";
          }
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //点击收藏
    collectClick(item) {
      let type = item.isCollect ? 2 : 1; //1收藏，2取消
      JinjuInterface.collect(item.jinjuId, type)
        .then(data => {
          this.$message.success(data);
          if (type === 1) {
            item.collectCount += 1;
            item.isCollect = true;
          } else if (type === 2) {
            item.collectCount -= 1;
            item.isCollect = false;
          }
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //顶部下拉加载
    loadTop() {
      this.getJinjuList(1, "top");
    },

    //上拉加载，暂无用..
    loadBottom() {
      this.getJinjuList(this.searchParams.pageIndex + 1, "bottom");
    },

    //进入用户个人主页
    gotoUserPage(id) {
      this.$router.push({ path: "/index/UserPage/" + id });
    }
  }
};
</script>

<style scoped>
.list-container {
    min-height: 700px;
}

.box-card {
  margin: 10px 0;
}

.item-username {
  font-size: 16px;
  font-weight: bold;
  color: #f90;
}

.item-content {
  margin-bottom: 18px;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}

.item-tag {
  padding: 0 15px;
  line-height: 26px;
  height: 28px;
}

.pagination {
  text-align: center;
  margin: 20px;
  width: 100%;
  display: none;
}

.clicked {
  color: #fa5555;
}

.load-more .mint-loadmore-bottom {
  margin-bottom: 0 !important;
}
</style>


