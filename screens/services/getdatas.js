import { buydataurl, producturl } from "./endpoints";
import axios from 'axios';

export const getProductData = (productType, token) => {
   
    return new Promise(async (resolve, reject) => {
      try {
        const productEndpointResponse = await axios.post(`${producturl}${productType}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        resolve(productEndpointResponse.data);
      } catch (error) {
        reject(error.response?.data ?? error.message ?? error.code);
      }
    });
  };

 