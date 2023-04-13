import React, { useContext } from "react";
import LoadingCtx from "../Context/loadingCtx";
import { httpReqFunction, parsedRes } from "../Types/HttpRequest";

const useHttpRequest = () => {
  const { isLoading, statusMsg, setLoading, clearError } =
    useContext(LoadingCtx);

  const httpRequest: httpReqFunction = async ({
    url,
    method,
    headers,
    body,
  }) => {
    try {
      clearError();
      setLoading(true, false);
      const res = await fetch(url, {
        method: method ? method : "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!res.ok) {
        throw new Error("הפעולה לא הועברה לשרת, ייתכן ולא נשמרו נתונים");
      }

      const parsedRes = (await res.json()) as parsedRes;

      if (!parsedRes.success) {
        throw new Error("הפעולה נכשלה");
      }

      setLoading(false, false, "הפעולה עברה בהצלחה");
      return { res: parsedRes, success: parsedRes.success };
    } catch (err: any) {
      setLoading(false, true, err.message);
      return { res: null, success: false };
    }
  };

  return { httpRequest };
};

export default useHttpRequest;
