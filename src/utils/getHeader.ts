import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

export const getHeaders: RawAxiosRequestHeaders | AxiosHeaders = {
  "user-agent": "Mozilla/5.0",
  "accept": "text/html",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  "pragma": "no-cache",
  "sec-fetch-dest": "document",
};