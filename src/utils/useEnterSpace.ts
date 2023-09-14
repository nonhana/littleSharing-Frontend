import { useRouter } from "vue-router";
const router = useRouter();

/**
 * 路由跳转，进入他人空间
 * @param {number} id
 */
const useEnterSpace = (id: number): void => {
  router.push({
    path: "/MyArticles/" + id,
  });
};

export default useEnterSpace;
