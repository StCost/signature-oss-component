import React, {
  useCallback, useEffect,
  useRef,
  useState
} from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './signature-pad-dialog.css';

// short util to avoid installing dependency
const clsx = (...classNames: (string | undefined | false)[]) => classNames.filter(Boolean).join(" ");

const HEIGHT = 150;
const WIDTH = 300;

interface IProps {
  visible: boolean;
  onSubmit: (base64Image: string | undefined) => void; // might be empty if nothing was drawn
  onClose: () => void; // submit also closes dialog
}

const SignaturePadDialog: React.FC<IProps> = (props) => {
  const {
    visible,
    onClose,
    onSubmit,
    ...canvasProps
  } = props;

  const refDrawCanvas = useRef<SignatureCanvas | null>();
  const refUploadInput = useRef<HTMLInputElement | null>();
  const [tab, setTab] = useState<"draw" | "image" | "text">("draw");
  const [showCanvasPlaceholder, setShowCanvasPlaceholder] = useState<boolean>(true);

  const handleSubmit = useCallback(() => {
    onSubmit(refDrawCanvas.current?.getTrimmedCanvas().toDataURL());
    onClose();
  }, [tab, onClose, onSubmit]);

  const handleImageUpload = useCallback(() => {
    refUploadInput.current?.click();
  }, [])

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

    // large font, TODO make it configurable
    ctx.font = "30px Arial";

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillText(event.target.value, WIDTH * .1, HEIGHT * .9);
  }, []);

  const handleClear = useCallback(() => {
    refDrawCanvas.current?.clear();
    setShowCanvasPlaceholder(true);
  }, []);

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
            {/* image upload overlay */}
            <div
              className="signature-pad__dialog__image-upload-overlay"
              style={{ width: WIDTH, height: HEIGHT }}
              onClick={handleImageUpload}
            />
          </>
        )}
        <div className={clsx(tab != "text" && "hidden")}>
          <input
            type="text"
            onChange={handleTextSignatureChange}
          />
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
