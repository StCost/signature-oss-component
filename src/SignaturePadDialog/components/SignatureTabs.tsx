import React from "react";

import "../styles/signature-tabs.css";
import { clsx } from "../utils.signature";

export type TSignatureTab = "draw" | "image" | "text";

interface IProps {
  tab: TSignatureTab;
  setTab: (tab: TSignatureTab) => void;
}

const SignatureTabs = (props: IProps) => {
  const { tab, setTab } = props;

  return (
    <div className="signature-pad__dialog__tabs">
      <div
        className={clsx(
          "signature-pad__dialog__tab",
          tab == "draw" && "signature-pad__dialog__tab--selected"
        )}
        onClick={() => setTab("draw")}
      >
        Draw
      </div>
      <div
        className={clsx(
          "signature-pad__dialog__tab",
          tab == "image" && "signature-pad__dialog__tab--selected"
        )}
        onClick={() => setTab("image")}
      >
        Image
      </div>
      <div
        className={clsx(
          "signature-pad__dialog__tab",
          tab == "text" && "signature-pad__dialog__tab--selected"
        )}
        onClick={() => setTab("text")}
      >
        Text
      </div>
    </div>
  )
}

export default SignatureTabs;
