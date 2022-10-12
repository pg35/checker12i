import ExpandableText from "../util/ExpandableText";
import { capitalize } from "../../util/general";
import { getSentence } from "../../util/general";
import { getGlobal } from "../../util/general";

export function getFormattedInput(type, input, userId) {
  if ("url" === type)
    return (
      <a href={input} target="_blank" rel="noreferrer">
        {input}
      </a>
    );
  if ("file" === type) {
    return (
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          const url = getGlobal()
            .file_url.replace("{USERID}", userId)
            .replace("{NAME}", input[1]);
          window.open(url, "_blank");
          e.preventDefault();
        }}
      >
        {input[0]}
      </a>
    );
  }
  return <ExpandableText text={getSentence(input)} />;
}
export default function ScanInfo(props) {
  const {
    state: {
      scan: { type },
      app: { sandbox, userId }
    }
  } = props;
  return (
    <div>
      <table className="pxq_pgck_table pxq_pgck_table_info">
        <tbody>
          <tr>
            <th>Type</th>
            <td>{"url" === type ? "URL" : capitalize(type)}</td>
          </tr>
          <tr>
            <th>Input</th>
            <td>
              {getFormattedInput(
                type,
                props.state[`${type}Input`].input,
                userId
              )}
            </td>
          </tr>
          {getGlobal().is_admin_user ? (
            <tr>
              <th>Sandbox mode</th>
              <td className={`pxq_pgck_${sandbox ? "success" : "error"}`}>
                {sandbox ? "On" : "Off"}
              </td>
            </tr>
          ) : (
            null && (
              <tr>
                <td colSpan="2">
                  Sandbox mode is available only for admin users.
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
