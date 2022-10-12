import { useEffect, useReducer } from "react";
import ScanListTable from "./components/tables/ScanListTable";
import TransactionListTable from "./components/tables/TransactionListTable";
import Progress from "./components//ui/Progress";
import reducer, { initialState } from "./reducer/reducer";
import * as T from "./reducer/action";
import { setGlobal, getGlobal } from "./util/general";
import "./styles.css";
window.pxq_pgck = {
  ajax_url: "http://goodtogo.cc/wp-admin/admin-ajax.php",
  main_url: "http://goodtogo.cc/plagiarism-checker?pxq_pgck_sid={SCANID}",
  report_url: "http://goodtogo.cc/plagiarism-report?pxq_pgck_sid={SCANID}",

  pdf_url:
    "http://goodtogo.cc/_pxq_pgck_/report/{USERID}/{SCANID}/pdf-report.pdf",
  file_url: "http://goodtogo.cc/_pxq_pgck_/file/{USERID}/{NAME}",
  user_id: "imran",
  balance: 2
};

function initApp(dispatch) {
  if (!getGlobal()) {
    setGlobal(window.pxq_pgck);
    dispatch(
      T.createAction(T.APP, {
        userId: getGlobal().user_id
      })
    );
    console.log("global", getGlobal());
  }
}
function renderLoader() {
  return (
    <Progress
      status={1}
      message="Loading plagiarism checks"
      classes={["stacked", "center", "large"]}
    />
  );
}
export function ScansApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    initApp(dispatch);
  }, []);
  if (!getGlobal()) {
    return renderLoader();
  }
  return (
    <div id="pxq_pgck">
      <ScanListTable state={state} dispatch={dispatch} />
    </div>
  );
}

export function TransApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    initApp(dispatch);
  }, []);
  if (!getGlobal()) {
    return renderLoader();
  }
  return (
    <div id="pxq_pgck">
      <TransactionListTable state={state} dispatch={dispatch} />
    </div>
  );
}
