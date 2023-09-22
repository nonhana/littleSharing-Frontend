import { ref, Ref } from "vue";

const useShuffle = <T>(arr: T[]): Array<any> => {
  const shuffledArray: Ref<T[]> = ref([]);

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const shuffleArray = (): void => {
    const _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
      const j = getRandomInt(0, i);
      const t = _arr[i];
      _arr[i] = _arr[j];
      _arr[j] = t;
    }
    shuffledArray.value = _arr;
  };

  shuffleArray(); // 初始化时进行一次数组打乱

  return shuffledArray.value;
};

export default useShuffle;
