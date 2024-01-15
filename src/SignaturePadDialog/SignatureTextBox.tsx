import React from "react";
import { TSignatureTab } from "./SignatureTabs";
import { clsx } from "./utils.signature";
import { HEIGHT, WIDTH } from "./constants.signature";

export type TSignatureFont = "Caveat, cursive" | "Marck Script, cursive" | "Pacifico, cursive" | "Meddon, cursive" | "Kalam, cursive" | "Tillana, cursive";

export const FONT_OPTIONS: TSignatureFont[] = [
  "Caveat, cursive",
  "Marck Script, cursive",
  "Pacifico, cursive",
  "Meddon, cursive",
  "Kalam, cursive",
  "Tillana, cursive"
];

interface IProps {
  tab: TSignatureTab;
  font: TSignatureFont;
  handleTextSignatureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFont: (font: TSignatureFont) => void;
  refTextInput: React.MutableRefObject<HTMLInputElement | null | undefined>;
}

const SignatureTextBox = (props: IProps) => {
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
      style={{ width: WIDTH, height: HEIGHT }}
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

export default SignatureTextBox;
