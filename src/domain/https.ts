import axios from "axios";
import BASE_URL from "../base";

const CallApi = async (
  urlEndpoint: string,
  paramKey: string,
  paramValue: string
) => {
  var data: Array<{}> = [{}];

  const url = BASE_URL + urlEndpoint;
  await axios
    .get(url, {
      // params: {
      //   [paramKey]: paramValue,
      // },
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