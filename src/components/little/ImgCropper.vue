<template>
  <el-dialog title="图片切割" v-model="visible">
    <!-- v-if强制使其重新加载 -->
    <div v-if="visible">
      <vue-picture-cropper
        :box-style="{
          width: '100%',
          maxHeight: '400px',
          backgroundColor: '#f8f8f8',
          margin: 'auto',
        }"
        :img="sourceFileURL"
        :options="{
          viewMode: 1,
          dragMode: 'crop',
          aspectRatio: aspectRatio,
        }"
      />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" block @click="confirmCropper"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { uploadImageAPI } from "@/api/other";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const props = defineProps<{
  type: number; // 0-head, 1-background
  dialogVisible: boolean;
  sourceFile: File | null | undefined;
  croppedFileType: string;
}>();

const emits = defineEmits<{
  (event: "uploadImage", value: { type: number; imgURL: string }): void;
  (event: "closeDialog", type: number): void;
}>();

const visible = ref<boolean>(false);
const aspectRatio = ref<number>(1 / 1);

let sourceFileURL: string = "";
let croppedFile: File | null | undefined = null;

//获取裁剪图片的file对象
const confirmCropper = async () => {
  croppedFile = await cropper?.getFile();

  // 把Blob转换成file，type为croppedFileType
  let Blob = (await cropper?.getBlob()) as Blob;
  const uploadFile = new File([Blob], croppedFile?.name ?? "", {
    type: props.croppedFileType,
    lastModified: croppedFile?.lastModified,
  });

  if (croppedFile) {
    const res = await uploadImageAPI({
      image: uploadFile,
    });

    if (res.data.result_code === 0) {
      emits("uploadImage", {
        type: props.type,
        imgURL: res.data.result.imgURL,
      });
      visible.value = false;
    }
  }
};

watch(
  props,
  (newV, _) => {
    if (props.sourceFile) {
      sourceFileURL = URL.createObjectURL(props.sourceFile);
    }
    aspectRatio.value = newV.type === 0 ? 1 / 1 : 4.7368 / 1;
    visible.value = newV.dialogVisible;
  },
  { immediate: true, deep: true }
);

watch(visible, (newV, _) => {
  if (!newV) {
    emits("closeDialog", props.type);
  }
});
</script>

<style scoped lang="less">
:deep(.el-dialog) {
  position: relative;
  margin: 100px auto 50px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  width: 900px;
}
</style>
