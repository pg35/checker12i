import * as T from "../../reducer/action";
import { getGlobal } from "../../util/general";

export default function Buttons(props) {
  const {
    state: {
      scan: { id, status, cost, failed, editable },
      app: { balance, sandbox }
    },
    dispatch
  } = props;
  return (
    <div className="pxq_pgck_page__actions">
      <button
        onClick={() => {
          let goBack = true;
          if (!failed && "checked" !== status) {
            goBack = window.confirm(
              `Currently, cost calculation is in progress.\nAre you sure you want to ${
                editable ? "go back" : "start a new plagiarism check"
              }?`
            );
          }
          if (goBack) {
            editable
              ? dispatch(T.createAction(T.SCAN, { status: "" }))
              : dispatch(T.createAction(T.SCAN_NEW, null));
          }
        }}
      >
        {editable ? "Back" : "New plagiarism check"}
      </button>
      {("checked" !== status || cost <= balance) && (
        <button
          onClick={() => {
            if (
              window.confirm(
                `Plagiarism check will cost you ${
                  sandbox ? "0 credits b/c sandbox is on" : cost + " credit(s)"
                }.\nAre you sure you want to continue?`
              )
            )
              dispatch(T.createAction(T.SCAN, { status: "scan" }));
          }}
          disabled={"checked" === status ? false : true}
        >
          Check plagiarism
        </button>
      )}
      {"checked" === status && cost > balance && (
        <button
          onClick={() => {
            const url = getGlobal().product_url.replace("{SCANID}", id);
            window.open(url);
          }}
        >
          Buy credits
        </button>
      )}
    </div>
  );
}
