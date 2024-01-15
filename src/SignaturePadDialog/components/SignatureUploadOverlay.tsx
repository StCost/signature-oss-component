import React from "react";
import { clsx } from "../utils.signature";
import { TSignatureTab } from "./SignatureTabs";
import "../styles/signature-upload-overlay.css";
import { SIGNATURE_CANVAS_HEIGHT, SIGNATURE_CANVAS_WIDTH } from "../constants.signature";


interface IProps {
  tab: TSignatureTab;
  isEmpty: boolean;
  refUploadInput: React.MutableRefObject<HTMLInputElement | null | undefined>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignatureUploadOverlay = (props: IProps) => {
  const {
    tab,
    isEmpty,
    refUploadInput,
    handleFileUpload
  } = props;

  if (tab != "image") return null;

  return (
    <>
      {isEmpty && (
        <div className="signature-pad__dialog__canvas-placeholder">
          Upload new signature here
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={ref => refUploadInput.current = ref}
        onChange={handleFileUpload}
      />
      <div
        className={clsx(
          "signature-pad__dialog__image-upload-overlay",
          "signature-pad__dialog__image-upload-new" // :hover:after offering to upload new or replace image
        )}
        style={{ width: SIGNATURE_CANVAS_WIDTH, height: SIGNATURE_CANVAS_HEIGHT }}
        onClick={() => refUploadInput.current?.click()}
      />
    </>
  )
}

export default SignatureUploadOverlay;
