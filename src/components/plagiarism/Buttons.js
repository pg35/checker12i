import * as T from "../../reducer/action";
import { getGlobal } from "../../util/general";

export default function Buttons(props) {
  const {
    state: {
      scan: { id, status, failed },
      app: { userId }
    },
    dispatch
  } = props;
  return (
    <div className="pxq_pgck_page__actions">
      <button
        onClick={() => {
          let goBack = true;
          if (!failed && "exported" !== status) {
            goBack = window.confirm(
              'Currently, plagiarism check is in progress.\nAre you sure you want to start a new plagiarism check?\nCurrent plagiarism check will keep running in the background.\nYou can view your plagiarism checks from "Plagiarism checks" page.'
            );
          }
          if (goBack) dispatch(T.createAction(T.SCAN_NEW, null));
        }}
      >
        New plagiarism check
      </button>
      {failed ? (
        <button
          onClick={() => {
            const url = getGlobal().product_url.replace("{SCANID}", id);
            window.open(url);
          }}
        >
          Buy credits
        </button>
      ) : (
        <span>
          <button
            onClick={() => {
              const url = getGlobal().report_url.replace("{SCANID}", id);
              window.open(url, "_blank");
            }}
            disabled={"exported" === status ? false : true}
          >
            View report
          </button>
          <button
            onClick={() => {
              const url = getGlobal()
                .pdf_url.replace("{USERID}", userId)
                .replace("{SCANID}", id);
              window.open(url, "_blank");
            }}
            disabled={"exported" === status ? false : true}
          >
            Download PDF
          </button>
        </span>
      )}
    </div>
  );
}
