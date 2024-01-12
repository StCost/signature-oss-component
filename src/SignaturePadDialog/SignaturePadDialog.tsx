import React, {
  useCallback, useEffect,
  useRef,
  useState
} from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './signature-pad-dialog.css';
import '../fonts/fonts.css';

// short util to avoid installing dependency
const clsx = (...classNames: (string | undefined | false)[]) => classNames.filter(Boolean).join(" ");

const HEIGHT = 150;
const WIDTH = 300;

interface IProps {
  visible: boolean;
  onSubmit: (base64Image: string | undefined) => void; // might be empty if nothing was drawn
  onClose: () => void; // submit also closes dialog
}

const FONT_OPTIONS = [
  "Caveat, cursive",
  "Marck Script, cursive",
  "Pacifico, cursive",
  "Meddon, cursive",
  "Kalam, cursive",
  "Tillana, cursive"
];

const SignaturePadDialog: React.FC<IProps> = (props) => {
  const {
    visible,
    onClose,
    onSubmit,
    ...canvasProps
  } = props;

  const refDrawCanvas = useRef<SignatureCanvas | null>();
  const refUploadInput = useRef<HTMLInputElement | null>();
  const refTextInput = useRef<HTMLInputElement | null>();
  const [tab, setTab] = useState<"draw" | "image" | "text">("draw");
  const [showCanvasPlaceholder, setShowCanvasPlaceholder] = useState<boolean>(true);
  const [font, setFont] = useState<string>(FONT_OPTIONS[1]);

  const handleSubmit = useCallback(() => {
    onSubmit(refDrawCanvas.current?.getTrimmedCanvas().toDataURL());
    onClose();
  }, [tab, onClose, onSubmit]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // take only first file
    if (!file) return;

    // uploaded file might have different dimensions, so we need to resize it
    const img = new Image();
    img.src = URL.createObjectURL(file); // blob url to file
    img.onload = () => {
      const ctx = refDrawCanvas.current?.getCanvas()?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(img, 0, 0, WIDTH, HEIGHT); // will resize image to fit canvas
    }
  }, [])

  const handleTextSignatureChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const ctx = refDrawCanvas.current?.getCanvas()?.getContext("2d");
    if (!ctx) return;

    ctx.font = `30px ${font}`;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillText(event.target.value, 8, 34);
  }, [font]);

  const handleClear = useCallback(() => {
    refDrawCanvas.current?.clear();
    setShowCanvasPlaceholder(true);
  }, []);

  // refresh font if font changed and text tab
  useEffect(() => {
    if (tab != "text") return;
    handleTextSignatureChange({ target: { value: refTextInput.current?.value } } as any);
  }, [font, handleTextSignatureChange]);

  if (!visible) return null;

  return (
    <div className="signature-pad__dialog">
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
      <div className="signature-pad__dialog__content">
        <SignatureCanvas
          {...canvasProps}
          onBegin={() => setShowCanvasPlaceholder(false)}
          canvasProps={{
            width: WIDTH,
            height: HEIGHT,
            className: clsx(
              "signature-pad__dialog__canvas",
              tab != "draw" && "not-interactive"
            ),
          }}
          ref={ref => refDrawCanvas.current = ref}
        />
        {tab == "draw" && showCanvasPlaceholder && (
          <div className="signature-pad__dialog__canvas-placeholder">
            Draw your signature here
          </div>
        )}
        {tab == "image" && (
          <>
            <div className="signature-pad__dialog__canvas-placeholder">
              Upload your signature here
            </div>
            <input
              type="file"
              className="hidden"
              ref={ref => refUploadInput.current = ref}
              onChange={handleFileUpload}
            />
            <div
              className="signature-pad__dialog__image-upload-overlay"
              style={{ width: WIDTH, height: HEIGHT }}
              onClick={() => refUploadInput.current?.click()}
            />
          </>
        )}
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
      </div>
      <div className="signature-pad__dialog__buttons">
        <div
          className="signature-pad__dialog__button"
          onClick={handleClear}
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
          className="signature-pad__dialog__button"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
}

export default SignaturePadDialog;
