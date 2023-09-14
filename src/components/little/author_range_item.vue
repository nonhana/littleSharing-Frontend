<template>
  <div name="authorRangeItem" class="authorRangeItem-wrap">
    <el-row>
      <el-col :span="0.5" style="margin: 0 10px 0 0">
        <div class="author_head">
          <img :src="author_head" alt="" />
        </div>
      </el-col>
      <el-col :span="0.5" style="margin: 0 10px 0 0">
        <el-row>
          <font class="author_name">{{ author_name }}</font>
        </el-row>
        <el-row v-if="author_major">
          <div class="author_major">
            <font>{{ author_major }}</font>
          </div>
        </el-row>
      </el-col>
      <el-col :span="0.5" class="total_data">
        <el-row>
          <font v-if="author_status == 1"
            >本站累计收藏数：{{ total_article }}</font
          >
          <font v-if="author_status == 2">累计发文数：{{ total_article }}</font>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="0.5">
        <font class="range"
          >排名：<span>{{ range }}</span></font
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "authorRangeItem",
  data() {
    return {
      author_head: this.userList.author_head_photo,
      author_name: this.userList.author_name,
      total_article: this.userList.article_num,
      author_status: this.userList.author_status,
    };
  },
  computed: {
    author_major() {
      if (this.userList.author_major)
        return this.userList.author_major.join("-");
    },
  },
  props: ["userList", "range"],
};
</script>

<style scoped>
.authorRangeItem-wrap {
  border: 0.5px solid #00ead8;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 280px;
  background-color: #ffffff;
}
.author_head {
  width: 36px;
  height: 36px;
  background-color: #76fff5;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}
.author_head img {
  width: 36px;
}
.author_name {
  height: 14px;
  font-family: SourceHanSansCN-Regular;
  font-size: 10px;
  font-weight: normal;
  color: #3d3d3d;
}
.total_data > * font {
  height: 12px;
  font-family: SourceHanSansCN-Regular;
  font-size: 8px;
  font-weight: normal;
  color: #3d3d3d;
}
.range {
  height: 14px;
  font-family: SourceHanSansCN-Regular;
  font-size: 10px;
  font-weight: normal;
  color: #3d3d3d;
}
.range span {
  height: 23px;
  font-family: YouSheBiaoTiHei;
  font-size: 18px;
  font-weight: bold;
  color: #3d3d3d;
}
.author_major {
  width: max-content;
  margin: 0 5px;
  padding: 0 10px;
  height: 20px;
  border-radius: 10px;
  background: hsl(71, 100%, 93%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.author_major font {
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  color: #3d3d3d;
}
</style>