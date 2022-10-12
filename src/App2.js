import { useState, useEffect, useReducer } from "react";
import Home from "./components/pages/Home";
import Billing from "./components/pages/Billing";
import Plagiarism from "./components/pages/Plagiarism";
import ScanListTable from "./components/tables/ScanListTable";
import TransactionListTable from "./components/tables/TransactionListTable";
import MenuBar from "./components/ui/MenuBar";
import { BuyCreditsPopup } from "./components/ui/Popup";
import reducer, { initialState } from "./reducer/reducer";
import * as T from "./reducer/action";
import { setGlobal, getGlobal } from "./util/general";
import "./styles.css";
/*
import Progress from "./components/ui/Progress";
import Check from "./components/billing/Check";
import Checking from "./components/billing/Checking";
import Checked from "./components/billing/Checked";
import ScanInfo from "./components/util/ScanInfo";
import ExpandableText from "./components/util/ExpandableText";
import Buttons from "./components/plagiarism/Buttons";

*/
const items = [
  {
    key: 0,
    label: (
      <span>
        &larr; <small>Go back</small>
      </span>
    )
  },
  { key: 1, label: "Plagiarism checks" },
  { key: 2, label: "Transactions" }
];
window.pxq_pgck = {
  ajax_url: "http://goodtogo.cc/wp-admin/admin-ajax.php",
  login_url: "http://goodtogo.cc/wp-login.php",
  register_url: "http://goodtogo.cc/wp-login.php?action=register",
  main_url: "http://goodtogo.cc/plagiarism-checker?pxq_pgck_sid={SCANID}",
  report_url: "http://goodtogo.cc/plagiarism-report?pxq_pgck_sid={SCANID}",
  product_url: "http://goodtogo.cc/product/credits?pxq_pgck_sid={SCANID}",

  pdf_url:
    "http://goodtogo.cc/_pxq_pgck_/report/{USERID}/{SCANID}/pdf-report.pdf",
  file_url: "http://goodtogo.cc/_pxq_pgck_/file/{USERID}/{NAME}",

  signup_gift: 50,
  welcome_gift: 100,

  is_wp_user: 0,
  is_admin_user: 0,
  user_id: "imran",
  new_signup: 0,
  balance: 1,
  scan: JSON.stringify({
    id: 1149,
    type: "file",
    input: "sample.txt,sample-2.txt",
    status: "checked",
    cost: 34
  })
};
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    scan: { status, editable },
    app: { balance, welcomePopup, userId }
  } = state;
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    if (!getGlobal()) {
      setGlobal(window.pxq_pgck);
      dispatch(
        T.createAction(T.APP, {
          balance: getGlobal().balance,
          userId: getGlobal().user_id,
          sandbox: 1 === getGlobal().is_admin_user
        })
      );
      if (getGlobal().scan) {
        const item = JSON.parse(getGlobal().scan);
        let actionType = "";
        if ("text" === item.type) actionType = T.TEXT_INPUT;
        else if ("file" === item.type) actionType = T.FILE_INPUT;
        else actionType = T.URL_INPUT;
        dispatch(
          T.createAction(actionType, {
            input: "file" === item.type ? item.input.split(",") : item.input
          })
        );
        dispatch(
          T.createAction(T.SCAN, {
            id: item.id,
            type: item.type,
            status: item.status,
            cost: item.cost,
            editable: false
          })
        );
        console.log("parse scan", item);
      }
    }
    console.log("global", getGlobal());
  }, []);
  let elem = null;
  switch (status) {
    case "":
      if (1 === activeItem)
        elem = <ScanListTable state={state} dispatch={dispatch} />;
      else if (2 === activeItem)
        elem = <TransactionListTable state={state} dispatch={dispatch} />;
      else
        elem = (
          <Home
            state={state}
            dispatch={dispatch}
            onComplete={() =>
              dispatch(
                T.createAction(T.SCAN, {
                  id: 0,
                  status: "check",
                  cost: 0,
                  pdf: "",
                  failed: false
                })
              )
            }
          />
        );
      break;
    case "check":
    case "checking":
    case "checked":
      elem = <Billing state={state} dispatch={dispatch} />;
      break;
    case "scan":
    case "scanning":
    case "scan_failed":
    case "scan_timeout":
    case "scanned":
    case "exporting":
    case "export_failed":
    case "export_timeout":
    case "exported":
      elem = <Plagiarism state={state} dispatch={dispatch} />;
      break;
    default:
      throw new Error("invalid status: " + status);
  }
  if (null === userId) return null;
  return (
    <div id="pxq_pgck">
      {editable &&
      welcomePopup &&
      (getGlobal().new_signup ||
        (!getGlobal().is_wp_user && getGlobal().signup_gift)) ? (
        <BuyCreditsPopup
          heading="Welcome"
          msg={
            getGlobal().new_signup ? (
              <div>
                Thank you for registering with us. Your account is ready. Please{" "}
                <a href={getGlobal().login_url}>Login</a>
                {getGlobal().signup_gift
                  ? ` to use your registration gift of ${
                      getGlobal().signup_gift
                    }
                    credits.`
                  : "."}
              </div>
            ) : (
              <div>
                <a href={getGlobal().register_url}>Register</a> now and get a
                gift of {getGlobal().signup_gift} credits. If you are already
                registered, please <a href={getGlobal().login_url}>Login</a>.
              </div>
            )
          }
          url={getGlobal().product_url.replace("{SCANID}", "")}
          handleClose={() =>
            dispatch(
              T.createAction(T.APP, {
                welcomePopup: false
              })
            )
          }
        />
      ) : null}
      <MenuBar
        right={
          <span>
            <strong>Credits: </strong>
            {balance}
          </span>
        }
        items={
          !status
            ? 0 === activeItem
              ? items.filter((x) => x.key > 0)
              : items
            : []
        }
        onItemClick={(obj) => setActiveItem(obj.key)}
        activeItem={activeItem}
      />

      {elem}
    </div>
  );
}
