import myAxios from "./axios";

export const getRepliesMessageListAPI = (paramsList: {
  user_id: string
}) => {
  return myAxios({
    url: "message/list",
    method: "GET",
    params: paramsList
  })
}