<template>
  <div class="MessageUsers-wrap">
    <div class="head">
      <img src="@/assets/svgs/MessageUsersHead.svg" />
      <span>用户私信</span>
    </div>
    <div class="chat-window">
      <div class="side-bar">
        <div class="title">
          <span>最近联系</span>
        </div>
        <div class="user-list"></div>
      </div>
      <div class="chat-window-main">
        <div class="title"></div>
        <div class="main"></div>
        <div class="input-area"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.MessageUsers-wrap {
  position: relative;
  width: 960px;
  .head {
    width: 950px;
    height: 60px;
    border-radius: 10px;
    background: #ffffff;
    display: flex;
    align-items: center;

    img {
      margin-left: 30px;
    }

    span {
      margin-left: 10px;
      font-family: Microsoft YaHei;
      font-size: 14px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
}
</style>
