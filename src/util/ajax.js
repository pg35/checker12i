import { getDispatch, createAction } from "../reducer";
import { getGlobal } from "./general";
//window.ajaxUrl = "http://t2022.42web.io/wp-admin/admin-ajax.php";
//window.ajaxUrl = "https://mocki.io/v1/ebfa0396-9249-4147-972f-e4e164986e65";
export function ajaxGet(data, onSuccess, onFail, onFinally) {
  const args = { data, type: "GET" };
  return ajax(args, onSuccess, onFail, onFinally);
}
export function aysncUpdateState(method, data, actionType, key) {
  const args = { data, type: method };
  const dispatch = getDispatch();
  return ajax(
    args,
    (data) => {
      if (data.success) {
        dispatch(createAction(actionType, { [key]: data.data.list }));
      }
    },
    () => {
      dispatch(createAction(actionType, { [key]: null }));
    }
  );
}
export function doAjax2(args, onSuccess, onFail, onFinally) {
  setTimeout(() => {
    onSuccess({
      success: true,
      data: {
        list: [
          {
            id: 1,
            created_at: "",
            type: "file",
            input: "a.txt,b.txt",
            status: "scan_timeout",
            credits: 100
          },
          {
            id: 2,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "export_timeout",
            credits: 100
          },
          {
            id: 3,
            created_at: "",
            type: "text",
            input: "gthis is ia long\n terxt hello world",
            status: "checked",
            credits: ""
          },
          {
            id: 4,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "export_failed",
            credits: 100
          },
          {
            id: 5,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "scan_failed",
            credits: 100
          },
          {
            id: 6,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "scanned",
            credits: 100
          },
          {
            id: 7,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "exported",
            credits: 100
          },
          {
            id: 8,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "scanning",
            credits: 100
          },
          {
            id: 8,
            created_at: "",
            type: "url",
            input: "google.com",
            status: "exporting",
            credits: 100
          }
        ],
        balance: 2,
        user_id: "imran"
      }
    });
    return;
    /*onSuccess({
      success: true,
      data: { done: 2, credits: 4, scan_id: 123, balance: 34 }
    });
*/

    onSuccess({
      success: true,
      data: { done: 3, error: "hello", credits: 4, scan_id: 123, balance: 34 }
    });

    //onSuccess({ success: true, data: { scan_id: 123 } });
    //onSuccess({ success: false, data: { message: "server error" } });
    //onFail(getAjaxFailReason({ status: 2300 }, "timeout1"));
    onFinally && onFinally();
  }, 1000);
}
export function doAjax(args, onSuccess, onFail, onFinally) {
  if (args.data instanceof FormData) {
    args.data.set("imran", 1);
  } else args.data = { ...args.data, imran: 1 };

  return window.jQuery
    .ajax(getGlobal().ajax_url, { type: "GET", dataType: "json", ...args })
    .done((data, textStatus, jqXHR) => {
      //console.log("done", data, onSuccess);
      onSuccess && onSuccess(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      onFail && onFail(getAjaxFailReason(jqXHR, textStatus));
    })
    .always(() => {
      onFinally && onFinally();
    });
}

function getAjaxFailReason(x, exception) {
  var message;
  var statusErrorMap = {
    "0": "Not connected.Please verify your network connection.",
    "400": "Server understood the request, but request content was invalid.",
    "401": "Unauthorized access.",
    "403": "Forbidden resource can't be accessed.",
    "500": "Internal server error.",
    "503": "Service unavailable."
  };
  console.log(x, exception);
  if (x && "undefined" !== typeof x.status && exception !== "abort") {
    message = statusErrorMap[x.status];
  }
  if (!message) {
    if (exception === "parsererror") {
      message = "Parsing JSON failed";
    } else if (exception === "timeout") {
      message = "Request Timed out";
    } else if (exception === "abort") {
      message = "Request aborted";
    } else {
      message = "";
    }
  }
  return message;
}
