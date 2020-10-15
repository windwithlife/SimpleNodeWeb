 
import { MILISECONDS_TO_SECONDS,getRefetchInterval } from "../config/constants"
import {
  ENV_NAME_DEVELOPMENT,
  ENV_NAME_UAT,
  ENV_NAME_PRODUCTION,
  UAT_HOST,
  PRODUCTION_HOST,
} from '../config/config';

export function getTime(timeStamp = '') {
  const date = timeStamp ? new Date(timeStamp) : new Date();
  const year = date.getFullYear();
  const month = toDoubleNum(date.getMonth() + 1);
  const day = toDoubleNum(date.getDate());
  const hours = toDoubleNum(date.getHours());
  const minutes = toDoubleNum(date.getMinutes());
  const seconds = toDoubleNum(date.getSeconds());
  return {
      startOfDay: `${year}${month}${day} 000000`,
      endOfDay: `${year}${month}${day} 235959`,
      nowOfDay: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      year, month, day, hours, minutes, seconds
  };
}
function toDoubleNum(num) {
  const strNum = String(num);
  return strNum.length === 1 ? `0${strNum}` : strNum;
}


export function emptyPromise(val = null) {
  /* creates an empty promise for cases when data doesn't need to be fetched */
  return new Promise((resolve) => { resolve(val); });
}

export function timestampExpired(timestamp, endpoint = 'DEFAULT') {
  /*
    input: timestamp and a (str) endpoint name
    output: true if the timestamp has elapsed longer than the endpoint allows
  */
  const timeDiff = (Date.now() - timestamp) / MILISECONDS_TO_SECONDS;
  return timeDiff > getRefetchInterval(endpoint);
}

export function firstUpperCase(str) {
  //return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
  if(!str){return ''}
  var strResult = str.substring(0,1).toUpperCase()+str.substring(1);
  return strResult;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function checkCode(data) {
  if (data.code === 'SUCCESS') {
    return data;
  }

  const error = new Error(data.message);
  error.data = data;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}
