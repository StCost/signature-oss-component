import React, {
  useCallback, useEffect,
  useRef,
  useState
} from 'react';
import SignatureCanvas, { ReactSignatureCanvasProps } from 'react-signature-canvas';

import './signature-pad-dialog.css';

// short util to avoid installing dependency
const clsx = (...classNames: (string | undefined | false)[]) => classNames.filter(Boolean).join(" ");

interface IProps extends ReactSignatureCanvasProps {
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
  const refTextCanvas = useRef<HTMLCanvasElement | null>();
  const refUploadInput = useRef<HTMLInputElement | null>();
  const [tab, setTab] = useState<"draw" | "image" | "text">("draw");
  const [showCanvasPlaceholder, setShowCanvasPlaceholder] = useState<boolean>(true);

  const [base64Image, setBase64Image] = useState<string | undefined>();

  const handleSubmit = useCallback(() => {
    if (tab == "draw")
      onSubmit(refDrawCanvas.current?.getTrimmedCanvas().toDataURL());
    if (tab == "image")
      onSubmit(base64Image);
    if (tab == "text")
      onSubmit(refTextCanvas.current?.toDataURL());

    onClose();
  }, [tab, base64Image, onClose, onSubmit]);

  const handleImageUpload = useCallback(() => {
    refUploadInput.current?.click();
  }, [])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // take only first file
    if (!file) return;

    // read file as base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      setBase64Image(base64 as string);
    };
    reader.readAsDataURL(file);
  }, [])

  const handleTextSignatureChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // draw text into hidden canvas
    const ctx = refTextCanvas.current?.getContext("2d");
    if (!ctx) {
      console.error("Could not get context of text canvas");
      return;
    }

    const width = +(canvasProps.canvasProps?.width ?? 0);
    const height = +(canvasProps.canvasProps?.height ?? 0);

    // large font
    ctx.font = "30px Arial";

    ctx.clearRect(0, 0, width, height);
    ctx.fillText(event.target.value, width * .1, height * .9);
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
          canvasProps={{
            onMouseDown: () => setShowCanvasPlaceholder(false),
            ...canvasProps.canvasProps,
            className: clsx(
              canvasProps.canvasProps?.className,
              "signature-pad__dialog__canvas",
              tab != "draw" && "hidden"
            ),
          }}
          ref={ref => refDrawCanvas.current = ref}
        />
        {tab == "draw" && showCanvasPlaceholder && (
          <div className="signature-pad__dialog__canvas-placeholder">
            Draw your signature here
          </div>
        )}
        <div className={clsx(tab != "image" && "hidden")}>
          <button onClick={handleImageUpload}>Upload image</button>
          <img
            className="upload-preview"
            src={base64Image}
            alt="upload preview"
          />
          <input
            type="file"
            ref={ref => refUploadInput.current = ref}
            onChange={handleFileUpload}
          />
        </div>
        <div className={clsx(tab != "text" && "hidden")}>
          <canvas
            className="hidden"
            ref={ref => refTextCanvas.current = ref}
            width={canvasProps.canvasProps?.width}
            height={canvasProps.canvasProps?.height}
          />
          <input
            type="text"
            onChange={handleTextSignatureChange}
          />
        </div>
      </div>
      <div className="signature-pad__dialog__buttons">
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
