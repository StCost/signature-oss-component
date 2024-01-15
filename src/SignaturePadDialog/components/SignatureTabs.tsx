import React from "react";

import "../styles/signature-tabs.css";

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
        className="signature-pad__dialog__tab"
        onClick={() => setTab("draw")}
      >
        Draw
      </div>
      <div
        className="signature-pad__dialog__tab"
        onClick={() => setTab("image")}
      >
        Image
      </div>
      <div
        className="signature-pad__dialog__tab"
        onClick={() => setTab("text")}
      >
        Text
      </div>
    </div>
  )
}

export default SignatureTabs;
