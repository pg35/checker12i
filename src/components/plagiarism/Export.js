import Request from "../util/Request";
import * as T from "../../reducer/action";

export default function Export(props) {
  const { state, dispatch } = props;
  const { scan } = state;
  return (
    <Request
      {...props}
      useAjaxArgs={{
        ajax: {
          method: "POST",
          data: {
            action: "pxq_pgck_export",
            scan_id: scan.id
          }
        }
      }}
      onComplete={(data) => {
        dispatch(
          T.createAction(T.SCAN, {
            status: "exporting"
          })
        );
        dispatch(
          T.createAction(T.APP, {
            balance: state.app.balance
          })
        );
      }}
      messages={[
        "Requesting reports generation",
        "Rreports generation request submitted",
        "Rreports generation request failed"
      ]}
    />
  );
}
