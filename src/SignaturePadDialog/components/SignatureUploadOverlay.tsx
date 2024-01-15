import React from "react";
import { clsx } from "../utils.signature";
import { TSignatureTab } from "./SignatureTabs";
import "../styles/signature-upload-overlay.css";
import { SIGNATURE_CANVAS_HEIGHT, SIGNATURE_CANVAS_WIDTH } from "../constants.signature";


interface IProps {
  tab: TSignatureTab;
  isEmpty: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refUploadInput: React.MutableRefObject<HTMLInputElement | null | undefined>;
}

const SignatureUploadOverlay = (props: IProps) => {
  const {
    tab,
    isEmpty,
    onFileUpload,
    refUploadInput,
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
        accept="image/*"
        ref={ref => refUploadInput.current = ref}
        onChange={onFileUpload}
      />
      <div
        className={clsx(
          "signature-pad__dialog__image-upload-overlay",
          "signature-pad__dialog__image-upload-new" // contains :hover:after offering to upload new or replace image
        )}
        style={{ width: SIGNATURE_CANVAS_WIDTH, height: SIGNATURE_CANVAS_HEIGHT }}
        onClick={() => refUploadInput.current?.click()}
      />
    </>
  )
}

export default SignatureUploadOverlay;
