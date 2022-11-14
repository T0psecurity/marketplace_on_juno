import axios from "axios";
import { headersType, methodType, urlType } from "../constants/BasicTypes";

const fetch = ({
  method,
  url,
  headers,
  data,
}: {
  method: methodType;
  url: urlType;
  headers?: any;
  data?: any;
}) => {
  return axios({
    method,
    url,
    headers,
    data,
  });
};

const getQuery = async ({
  url,
  method,
  headers,
}: {
  url: urlType;
  method?: methodType;
  headers?: headersType;
}) => {
  try {
    const result = await fetch({
      url,
      method: method || "get",
      headers: { "content-type": "application/json" },
    });
    return result.data;
  } catch (err) {
    console.error("axios error at", url, method, err);
    return null;
  }
};

export default getQuery;
