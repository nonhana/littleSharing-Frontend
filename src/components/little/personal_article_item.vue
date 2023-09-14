<template>
  <div name="PersonalArticle" class="PersonalArticle-wrap">
    <div class="articlepicture" @click="push()">
      <el-image
        class="public-bechosen"
        :src="article_picture"
        alt=""
      ></el-image>
    </div>
    <div class="articleinfo">
      <el-row style="margin: 15px 0 0 15px" type="flex">
        <font class="articletitle">{{ article_title }}</font>
      </el-row>
      <el-row style="margin: 15px 0 0 15px" type="flex">
        <font class="articlemajor">{{ article_type }}</font>
      </el-row>

      <div class="articleintroduce">
        <font>文章简介：{{ article_introduce }}</font>
      </div>
      <el-row type="flex" class="articleDatas">
        <el-row type="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            width="13"
            height="11.000000000000016"
            viewBox="0 0 13 11.000000000000016"
          >
            <g transform="matrix(1,-1.2538989765999175e-15,0,1,0,0)">
              <path
                d="M0.590909,4.346760000000016L2.36364,4.346760000000016L2.36364,11.000000000000016L0.590909,11.000000000000016C0.264559,11.000000000000016,0,10.751800000000015,0,10.445600000000017L0,4.901200000000017C0,4.594990000000017,0.264559,4.346760000000016,0.590909,4.346760000000016ZM3.71859,3.6298700000000164L7.50041,0.08148010000001643C7.60433,-0.01630659999998357,7.76911,-0.02741759999998357,7.88686,0.05542150000001643L8.39091,0.4102610000000164C8.67716,0.6118920000000164,8.80607,0.9552800000000164,8.71768,1.2807300000000164L8.03636,3.7923200000000166L11.8182,3.7923200000000166C12.4709,3.7923200000000166,13,4.288780000000017,13,4.901200000000017L13,6.067730000000017C13.0002,6.212640000000016,12.97,6.3561700000000165,12.9114,6.490210000000017L11.0825,10.656800000000016C10.9913,10.864600000000015,10.7754,11.000100000000016,10.5359,11.000000000000016L4.13636,11.000000000000016C3.81001,11.000000000000016,3.54545,10.751800000000015,3.54545,10.445600000000017L3.54545,4.021860000000016C3.54549,3.8748300000000166,3.60777,3.7338300000000166,3.71859,3.6298700000000164Z"
                fill="#000000"
                fill-opacity="0.18000000715255737"
              />
            </g>
          </svg>
          <font>{{ article_like }}</font>
        </el-row>
        <el-row type="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            width="14"
            height="13.00000000000001"
            viewBox="0 0 14 13.00000000000001"
          >
            <g transform="matrix(1,7.894919345045068e-16,0,1,0,0)">
              <path
                d="M7,10.6357L2.67414,13L3.64015,8.25226L0,4.96573L4.92325,4.39561L7,0L9.07675,4.39561L14,4.96573L10.3599,8.25226L11.3259,13L7,10.6357Z"
                fill="#000000"
                fill-opacity="0.18000000715255737"
              />
            </g>
          </svg>
          <font>{{ article_collection }}</font>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import publicStyleVue from "../../../public/publicStyle.vue";
export default {
  name: "Article",
  data() {
    return {
      nowRouteName: "",
      article_title: "文章标题",
      article_picture: "http://dummyimage.com/400x400",
      article_type: "文章专业类别",
      article_introduce: "文章简介文章简介文章简介",
      article_like: 10,
      article_collection: 10,
    };
  },
  methods: {
    push() {
      const routeUrl = this.$router.resolve({
        path: "/articleHome/",
      });
      window.open(routeUrl.href, "_blank");
    },
  },
  watch: {
    $route: {
      handler: function (newV, _) {
        this.nowRouteName = newV.name;
      },
      deep: true,
      immediate: true,
    },
    articleList: {
      handler: function (newV, _) {
        if (newV) {
          this.article_title = newV.article_title;
          this.article_picture = newV.article_picture;
          this.article_type = newV.article_type;
          this.article_introduce = newV.article_introduce;
          this.article_like = newV.article_like;
          this.article_collection = newV.article_collect;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  components: { publicStyleVue },
};
</script>

<style scoped>
.PersonalArticle-wrap {
  width: 300px;
  height: 420px;
  border-radius: 10px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #feaa7e;
  transition: all 0.5s;
  transform: scale(0.9);
}
.PersonalArticle-wrap:hover {
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.PersonalArticle-wrap:hover svg {
  fill: #ff8200;
}
.articlepicture {
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.articlepicture > * {
  border-radius: 10px 10px 0 0;
  width: 100%;
  /* height: 100%; */
  cursor: pointer;
}
.articleinfo {
  width: 268px;
  height: 85px;
}
.articletitle {
  height: 20px;
  font-family: SourceHanSansCN-Medium;
  font-size: 18px;
  font-weight: 500;
  line-height: 17px;
  color: #1a1a1a;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.articlemajor {
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  color: #1a1a1a;
}
.articleintroduce {
  width: 270px;
  height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  color: #3d3d3d;
  margin: 6px 10px 0 15px;
}
.articleDatas {
  margin-top: 6px;
}
.articleDatas > * svg {
  height: 17px;
  margin-left: 15px;
}
.articleDatas > * font {
  height: 17px;
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.18);
  margin-right: 5px;
}
</style>