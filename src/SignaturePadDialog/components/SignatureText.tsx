import React from "react";
import { clsx } from "../utils.signature";
import { TSignatureTab } from "./SignatureTabs";
import { FONT_OPTIONS, TSignatureFont } from "../fonts/font.types";
import { SIGNATURE_CANVAS_HEIGHT, SIGNATURE_CANVAS_WIDTH } from "../constants.signature";

import "../styles/signature-text.css";
import '../fonts/fonts.css';

interface IProps {
  tab: TSignatureTab;
  font: TSignatureFont;
  handleTextSignatureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFont: (font: TSignatureFont) => void;
  refTextInput: React.MutableRefObject<HTMLInputElement | null | undefined>;
}

const SignatureText = (props: IProps) => {
  const {
    tab,
    font,
    handleTextSignatureChange,
    setFont,
    refTextInput
  } = props;

  return (
    <div
      className={clsx(tab != "text" && "hidden", "signature-pad__dialog__text-input-overlay")}
      onClick={() => refTextInput.current?.focus()} // focuses input on click anywhere in canvas box
      style={{ width: SIGNATURE_CANVAS_WIDTH, height: SIGNATURE_CANVAS_HEIGHT }}
    >
      <input
        className="signature-pad__dialog__text-input"
        ref={ref => refTextInput.current = ref}
        type="text"
        onChange={handleTextSignatureChange}
        style={{ fontFamily: font }}
        placeholder="Type your signature here"
      />
      <div className="signature-pad__dialog__text-input__fonts-grid">
        {FONT_OPTIONS.map(fontOption => (
          <span
            key={fontOption}
            className={clsx(
              "signature-pad__dialog__text-input__font-option",
              fontOption == font && "signature-pad__dialog__text-input__font-option--active"
            )}
            style={{ fontFamily: fontOption }}
            onClick={() => setFont(fontOption)}
          >
            {fontOption.split(",")[0]}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SignatureText;
