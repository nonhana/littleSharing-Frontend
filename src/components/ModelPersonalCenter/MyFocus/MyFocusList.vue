<template>
  <div name="FocusMain" class="FocusMain-wrap">
    <el-row class="title" type="flex" justify="space-between">
      <div>
        <span v-if="isMyCenter" @click="push(1)" class="behovered beclicked"
          >我的关注</span
        >
        <span v-if="!isMyCenter" @click="push(1)" class="behovered beclicked"
          >ta的关注</span
        >
      </div>
      <div>
        <span v-if="isMyCenter" @click="push(2)" class="behovered"
          >我的粉丝</span
        >
        <span v-if="!isMyCenter" @click="push(2)" class="behovered"
          >ta的粉丝</span
        >
      </div>
    </el-row>
    <el-divider />
    <el-row type="flex" justify="center">
      <div :span="0.5">
        <div
          v-for="(item, index) in user_list"
          :key="index"
          style="margin-bottom: 10px"
        >
          <FocusItem :user_id="item" />
          <el-divider />
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="center">
      <div v-if="emptyList">
        <el-empty
          v-if="isMyCenter"
          description="您还没有关注任何人哦......"
        ></el-empty>
        <el-empty v-else description="ta还没有关注任何人哦......"></el-empty>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import FocusItem from "@/components/little/FocusItem.vue";
import { getUserFocusList } from "@/api/user";

const router = useRouter();
const route = useRoute();

let isMyCenter = ref<boolean>(false);
let user_id = ref<number>(0);
let user_list = ref<any[]>([]);

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
  route,
  async (newV, _) => {
    user_id.value = Number(newV.params.id);
    if (
      user_id.value ==
      JSON.parse(localStorage.getItem("user_info") as string).user_id
    ) {
      isMyCenter.value = true;
    }
    const res = await getUserFocusList({ user_id: user_id.value });
    res.data.result.forEach((item: any) => {
      user_list.value.push(item.second_user_id);
    });
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
