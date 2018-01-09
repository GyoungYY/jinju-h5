<template>
    <div class="list-container">
        <el-card class="box-card" v-for="(item,index) in jinjuList" :key="index">
            <div slot="header" style="display:flex;">
                <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;">
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
                <span :class="{'clicked': item.isCollect}" class="glyphicon glyphicon-star-empty" style="float:right;cursor:pointer;" @click="collectClick(item)">
                    <span style="padding:0 10px;">{{item.collectCount}}</span>
                </span>
                <span class="glyphicon glyphicon-comment" style="float:right;padding-right:10px;cursor:pointer;" @click="gotoDetail(item.jinjuId)">
                    <span style="padding:0 10px;">{{item.commentCount}}</span>
                </span>
                <span :class="{'clicked': item.upOrDownVote === 2}" class="glyphicon glyphicon-thumbs-down" style="float:right;padding-right:10px;cursor:pointer;" @click="downVoteClick(item)">
                    <span style="padding:0 10px;">{{item.downVoteCount}}</span>
                </span>
                <span :class="{'clicked': item.upOrDownVote === 1}" class="glyphicon glyphicon-thumbs-up" style="float:right;padding-right:10px;cursor:pointer;" @click="upVoteClick(item)">
                    <span style="padding:0 10px;">{{item.upVoteCount}}</span>
                </span>
            </div>
        </el-card>

        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="searchParams.pageIndex"
            :page-size="searchParams.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total" class="pagination">
        </el-pagination>
        <TabbarNav></TabbarNav>
    </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import scrollFunc from "@/common/js/scrollFunc";
import formatTime from "@/common/js/formatTime";
import TabbarNav from '@/pages/TabbarNav'

let timer = null;

export default {
    components:{
			TabbarNav
		},
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
      }
    };
  },
  mounted() {
    this.getJinjuList(1);
  },
  methods: {
    //获取金句列表
    getJinjuList(page) {
      this.searchParams.pageIndex = page;
      JinjuInterface.getJinjuList(this.searchParams).then(data => {
        this.jinjuList = data.list.map(item => {
          item.typeShow = this.typeEnum[item.type];
          item.itemTagClass = this.tagClass[item.type];
          item.createTimeShow = formatTime.getFormatTime(item.createTime);
          item.photoUrl = "../../static/img/photo" + item.userId % 4 + ".jpeg";
          return item;
        });
        this.total = data.total;
      });
    },

    //切换页数
    handleCurrentChange(page) {
      this.getJinjuList(page);
      scrollFunc.gotoTop();
    },

    //进入金句详情
    gotoDetail(id) {
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
    }
  }
};
</script>

<style scoped>
.list-container {
  min-height: 750px;
  max-width: 1000px;
}

.box-card {
  margin-bottom: 20px;
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
</style>


