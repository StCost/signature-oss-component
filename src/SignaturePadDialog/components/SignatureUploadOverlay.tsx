import { SIGNATURE_CANVAS_HEIGHT, SIGNATURE_CANVAS_WIDTH } from "../constants.signature";
import React from "react";
import { TSignatureTab } from "./SignatureTabs";

interface ISignatureUploadOverlayProps {
  tab: TSignatureTab;
  isEmpty: boolean;
  refUploadInput: React.MutableRefObject<HTMLInputElement | null | undefined>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignatureUploadOverlay = (props: ISignatureUploadOverlayProps) => {
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
        className="signature-pad__dialog__image-upload-overlay"
        style={{ width: SIGNATURE_CANVAS_WIDTH, height: SIGNATURE_CANVAS_HEIGHT }}
        onClick={() => refUploadInput.current?.click()}
      />
    </>
  )
}

export default SignatureUploadOverlay;
