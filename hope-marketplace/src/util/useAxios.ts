import axios from "axios";

const fetch = ({
  method,
  url,
  headers,
  data,
}: {
  method: "post" | "get";
  url: string;
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

const getQuery = async (url: string, method?: "post" | "get") => {
  try {
    const result = await fetch({
      url,
      method: method || "get",
      headers: { "content-type": "application/json" },
    });
    return result.data;
  } catch (err) {
    console.error("axios error at", url, method);
    return null;
  }
};

export default getQuery;
