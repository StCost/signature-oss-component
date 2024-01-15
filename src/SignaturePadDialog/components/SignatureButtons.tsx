import React from "react";

interface IProps {
  isEmpty: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onClear: () => void;
}

const SignatureButtons = (props: IProps) => {
  const {
    isEmpty,
    onClose,
    onSubmit,
    onClear
  } = props;

  return (
    <div className="signature-pad__dialog__buttons">
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

export default SignatureButtons;
