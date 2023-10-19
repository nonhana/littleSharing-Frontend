<template>
  <div name="FocusMain" class="FocusMain-wrap">
    <el-row class="title" type="flex" justify="space-between">
      <div>
        <span v-if="isMyCenter" @click="push(1)" class="behovered"
          >我的关注</span
        >
        <span v-if="!isMyCenter" @click="push(1)" class="behovered"
          >ta的关注</span
        >
      </div>
      <div>
        <span v-if="isMyCenter" @click="push(2)" class="behovered beclicked"
          >我的粉丝</span
        >
        <span v-if="!isMyCenter" @click="push(2)" class="behovered beclicked"
          >ta的粉丝</span
        >
      </div>
    </el-row>
    <el-divider />
    <div v-loading="loading">
      <el-row type="flex" justify="center">
        <div
          v-for="(item, index) in user_list"
          :key="index"
          style="margin-bottom: 10px"
        >
          <FocusItem :user_id="item" />
          <el-divider />
        </div>
      </el-row>
      <el-row type="flex" justify="center" style="width: 100%">
        <div v-if="emptyList">
          <el-empty
            v-if="isMyCenter"
            description="您还没有粉丝哦......"
          ></el-empty>
          <el-empty v-else description="ta还没有粉丝哦......"></el-empty>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getUserFansList } from "@/api/user";
import FocusItem from "@/components/Little/Item/FocusItem.vue";

const router = useRouter();
const route = useRoute();

const loading = ref<boolean>(false);
const isMyCenter = ref<boolean>(false);
const user_id = ref<number>(0);
const user_list = ref<any[]>([]);

const emptyList = computed(() => {
  if (user_list.value.length == 0) {
    return true;
  } else {
    return false;
  }
});

const push = (num: number) => {
  let route_name;
  if (num == 1) {
    route_name = "MyFocusList";
  }
  if (num == 2) {
    route_name = "MyFansList";
  }
  router.push({
    name: route_name,
  });
};

watch(
  () => route.params.id,
  async (newV, _) => {
    loading.value = true;
    user_id.value = Number(newV);
    if (
      user_id.value ==
      JSON.parse(localStorage.getItem("user_info") as string).user_id
    ) {
      isMyCenter.value = true;
    }
    const res = await getUserFansList({ user_id: user_id.value });
    res.data.result.forEach((item: any) => {
      user_list.value.push(item.first_user_id);
    });
    loading.value = false;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.FocusMain-wrap {
  position: relative;
  width: 100%;
  border-radius: 10px;
  background: #ffffff;
  padding-bottom: 20px;
  .beclicked {
    color: #ff5900 !important;
  }
  .behovered:hover {
    color: #ff5900 !important;
  }
  .title {
    width: 400px;
    padding: 20px 0 20px 100px;
    > * {
      height: 20px;
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      font-weight: normal;
      color: #3d3d3d;
      cursor: pointer;
    }
  }
  ul {
    position: relative;
    top: 50px;
    width: 820px;
    list-style: none;
  }
}
</style>
