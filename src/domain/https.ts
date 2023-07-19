import axios from "axios";
import BASE_URL from "../base";

const CallApi = async (
  urlEndpoint: string,
  page: number
) => {
  var data: Array<{}> = [{}];
  const url = BASE_URL + urlEndpoint + `?page=${page}&limit=10`;
  await axios
    .get(url, {
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = err;
    });

  return data;
};

export default CallApi;