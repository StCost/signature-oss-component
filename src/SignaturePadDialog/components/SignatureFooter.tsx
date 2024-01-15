import React from "react";

import "../styles/signature-footer.css";

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
    onSubmit,
  } = props;

  return (
    <div className="signature-pad__dialog__footer">
      {!isEmpty && (
        <div
          className="signature-pad__dialog__button"
          onClick={onClear}
        >
          Clear
        </div>
      )}
      <div
        className="signature-pad__dialog__button"
        onClick={onClose}
      >
        Close
      </div>
      <div
        className="signature-pad__dialog__button"
        onClick={onSubmit}
      >
        Submit
      </div>
    </div>
  )
}

export default SignatureFooter;
