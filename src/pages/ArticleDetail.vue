<template>
    <div class="detail-container">
        <div class="meiwen-container">
            <h3 class="meiwen-title">{{articleDetail.title}}</h3>
            <div class="meiwen-author">
                <span style="padding: 0 20px;">时间：{{articleDetail.createTimeShow}}</span>
            </div>
            <div class="meiwen-author">
                <span style="padding: 0 20px;">作者：{{articleDetail.username}}</span>
                <span style="padding: 0 20px;">阅读量：{{articleDetail.browseCount + 1}}</span>
            </div>
            <div class="meiwen-summary">
                {{articleDetail.summary}}
            </div>
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                    <div v-html="articleDetail.content" style=""></div>
                </div>
            </div>
        </div>

        <div class="comment-area">
            <div style="margin-bottom:20px;">
                <el-input type="textarea" v-model="myComment" :rows="4" placeholder="期待你的神评~"
                          :maxlength="300"></el-input>
                <div style="padding-top:10px;height:50px;">
                    <span>{{myComment.length}}/300</span>
                    <el-button type="primary" style="float:right;" @click="publishComment">评论</el-button>
                </div>
            </div>

            <div class="comment-card" v-for="(item,index) in commentList" :key="item.index">
                <div style="display:flex;">
                    <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;cursor:pointer;" @click="gotoUserPage(item.userId)">
                    <div style="padding-left:20px;">
                        <div style="padding-bottom:3px;">
                            <span style="padding:0 6px;">#{{total - index }}</span>
                            <span class="item-username">{{item.username}}</span>
                        </div>
                        <span style="color:#aaa;">{{item.createTimeShow}}</span>
                    </div>
                </div>
                <div class="comment-content">
                    {{item.content}}
                </div>
                <div style="height:20px;">
                    <span :class="{'clicked': item.isUpClicked}" class="glyphicon glyphicon-thumbs-up" style="padding-right:10px;float:right;cursor:pointer;" @click="upVoteComment(item)">
                        <span style="padding:0 10px;">0</span>
                    </span>
                </div>
            </div>

            <div style="padding-bottom:10px;text-align: center;background-color: #fff;color:#409EFF;"
             @click="getCommentList(commentParams.pageIndex + 1)" v-if="!allLoaded && total>0">加载更多...
            </div>
            <div style="text-align: center;color: #999;padding-bottom: 10px;" v-if="allLoaded && total>0">已经到底啦～</div>
        </div>
    </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import MeiwenInterface from "@/interface/MeiwenInterface";
import CommentInterface from "@/interface/CommentInterface";
import formatTime from "@/common/js/formatTime";

export default {
  data() {
    return {
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

      articleDetail: {},
      commentList: [],
      total: 0,
      myComment: "",
      commentParams: {
        pageIndex: 1,
        pageSize: 10,
        meiwenId: this.$route.params.id,
        parentId: 0
      },
      meiwenId: this.$route.params.id,
      allLoaded: false
    };
  },
  mounted() {
    this.getMeiwenDetail(this.$route.params.id);
    scrollTo(0, 0);
    this.getCommentList(1);
  },
  beforeDestroy() {
    document.title = "金句猫 - 最专业、最内涵的短句子平台";
  },
  methods: {
    //切换页数
    handleCurrentChange(page) {
      this.getCommentList(page);
    },

    //获取详情
    getMeiwenDetail(id) {
      MeiwenInterface.getMeiwenDetail(id).then(data => {
        this.articleDetail = data;
        this.articleDetail.typeShow = this.typeEnum[data.type];
        this.articleDetail.itemTagClass = this.tagClass[data.type];
        this.articleDetail.createTimeShow = formatTime.getFormatTime(
          data.createTime
        );
        document.title = data.title;
      });
    },

    //发表评论
    publishComment() {
      let params = {
        meiwenId: this.meiwenId,
        content: this.myComment
      };
      MeiwenInterface.createComment(params)
        .then(data => {
          this.$message.success("发表成功");
          this.myComment = "";
          this.getCommentList(1);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //获取评论列表
    getCommentList(page) {
      if (
        page != 1 &&
        page > Math.ceil(this.total / this.commentParams.pageSize)
      ) {
        return;
      }
      if (page === 1) {
        this.commentList = [];
      }
      this.commentParams.pageIndex = page;
      MeiwenInterface.getCommentList(this.commentParams)
        .then(data => {
          data.list.map(item => {
            item.createTimeShow = formatTime.getFormatTime(item.createTime);
            return item;
          });
          data.list.forEach(item => {
            this.commentList.push(item);
          });
          this.total = data.total;
          this.allLoaded =
            page === Math.ceil(data.total / this.commentParams.pageSize);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //评论的点赞、取消
    upVoteComment(item) {
      this.$message.warning("美文评论暂不支持点赞");
      return;
      let type = item.isUpClicked ? 2 : 1;
      CommentInterface.upVoteComment(item.id, type)
        .then(data => {
          if (type === 1) {
            item.upVoteCount += 1;
            item.isUpClicked = true;
          } else {
            item.upVoteCount -= 1;
            item.isUpClicked = false;
          }
          this.$message.success(data);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //进入用户个人主页
    gotoUserPage(id) {
      this.$router.push({ path: "/index/userPage/" + id });
    }
  }
};
</script>

<style scoped>
.detail-container {
  margin: 0 auto 54px;
  position: relative;
}

.meiwen-container {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 0 15px 15px;
}

.meiwen-title {
  text-align: center;
  padding: 40px 0 10px;
  margin-top: 0;
}

.meiwen-author {
  text-align: center;
  font-size: 14px;
  color: #888;
}

.meiwen-summary {
  padding: 12px 15px;
  background-color: #eee;
  margin: 10px 0;
  line-height: 1.8;
  border-radius: 5px;
}

.ql-container.ql-snow {
  border: none;
}

.item-username {
  font-size: 16px;
  font-weight: bold;
  color: #f90;
}

.item-content {
  margin-bottom: 18px;
  font-size: 14px;
  line-height: 24px;
}

.item-tag {
  padding: 0 15px;
  line-height: 26px;
  height: 28px;
}

.clicked {
  color: #fa5555;
}

.comment-area {
  padding: 15px 15px 1px 15px;
  background-color: #fff;
}

.comment-card {
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid #ddd;
}
.comment-content {
  padding: 4px 0;
  font-size: 14px;
  line-height: 24px;
}
</style>


