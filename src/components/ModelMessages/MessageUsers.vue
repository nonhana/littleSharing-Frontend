<template>
  <div class="messageusers-wrap">
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

<style scoped lang="less">
.messageusers-wrap {
  position: relative;
  width: 960px;

  .head {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 950px;
    height: 60px;
    font-size: 14px;
    font-family: 'Microsoft YaHei', sans-serif;
    color: #3d3d3d;
    background: #fff;
    border-radius: 10px;

    img {
      margin-left: 30px;
    }
  }
}
</style>
