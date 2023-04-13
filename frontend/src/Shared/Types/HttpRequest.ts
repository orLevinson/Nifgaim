import { userCtx } from "./Users";

export type httpReqType = {
  url: string;
  method?: string;
  headers: {
    [key: string]: string;
  };
  body?: any;
  customErrorMsg?: string;
};

export type parsedRes = {
  success: boolean;
  [key: string]: any;
};

export type httpReqFunction = (
  req: httpReqType
) => Promise<{ res: any; success: boolean }>;
