import axios from "axios";
import { headersType, methodType, urlType } from "../constants/BasicTypes";

// export const BACKEND_URL = "http://localhost:5000";
// export const BACKEND_URL = "https://hackerlist-backend.vercel.app";
// export const BACKEND_URL = "https://api.hopers.io";
export const BACKEND_URL = "https://proxy-backend.vercel.app";

const subQueryUrl = "https://api.subquery.network/sq/VenusDev0725/hoperswap";

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

export const getDexStatus = async () => {
	try {
		// const { data } = await axios.get(
		//     `${backendBaseUrl}/api/nfts/get_new_nft`
		// );
		const query = `query {
      tradingVolumeEntities  {
        nodes {
          id
          tradingVolume
          burningVolume
          txNumber
        }
      }
    }`;
		const {
			data: {
				data: {
					tradingVolumeEntities: { nodes },
				},
			},
		} = await axios.post(subQueryUrl, { query });
		return nodes;
	} catch (err) {
		return [];
	}
};
