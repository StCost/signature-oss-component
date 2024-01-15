import React from "react";

import "../styles/signature-footer.css";
import { clsx } from "../utils.signature";

interface IProps {
  isEmpty: boolean;
  onClose: () => void;
  onClear: () => void;
  onSubmit: () => void;
}

const SignatureFooter = (props: IProps) => {
  const {
    isEmpty,
    onClose,
    onClear,
    onSubmit
  } = props;

  return (
    <div className="signature-pad__dialog__footer">
        <div
          className={clsx(
            "signature-pad__dialog__button",
            isEmpty && "signature-pad__dialog__button--disabled"
          )}
          onClick={() => { if (!isEmpty) onClear(); }}
        >
          Clear
        </div>
      <div
        className="signature-pad__dialog__button"
        onClick={onClose}
      >
        Close
      </div>
      <div
        className={clsx(
          "signature-pad__dialog__button",
          isEmpty && "signature-pad__dialog__button--disabled"
        )}
        onClick={() => { if (!isEmpty) onSubmit(); }}
      >
        Submit
      </div>
    </div>
  )
}

export default SignatureFooter;
