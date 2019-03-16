import axios from 'axios';
import { ErrorHandle } from './ErrorHandle';

const config = {
  listUrl: process.env.REACT_APP_URL_API_LIST,
  sendUrl: process.env.REACT_APP_URL_API_SEND,
  headers: JSON.parse(process.env.REACT_APP_URL_API_HEADERS || '{}'),
}

Object.assign(axios.defaults.headers.common, config.headers);

let nextPage = true;

const catchError = (call) => {
  return async (...args) => {
    try {
      return await call(...args);
    } catch (e) {
      nextPage = false;
      const { name, message } = e.response.data;
      throw ErrorHandle(name, message);
    }
  }
}

export const Api = {
  getMsgs: catchError(async () => {
    if (!nextPage) return [];
      const { data } = await axios.get(config.listUrl.replace('{{NEXT_PAGE}}', nextPage));
      nextPage = data.nextPage
      return data.items;
  }),

  putMsg: catchError(async (msg) => {
    const { data } = await axios.post(config.sendUrl, { message: msg} );
    return data.item;
  })
}