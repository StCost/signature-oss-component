import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './styles/colors.css';
import './styles/signature-pad-dialog.css';

import { clsx } from "./utils.signature";
import SignatureText from "./components/SignatureText";
import SignatureFooter from "./components/SignatureFooter";
import { FONT_OPTIONS, TSignatureFont } from "./fonts/font.types";
import SignatureUploadOverlay from "./components/SignatureUploadOverlay";
import SignatureTabs, { TSignatureTab } from "./components/SignatureTabs";
import { SIGNATURE_CANVAS_HEIGHT, SIGNATURE_CANVAS_WIDTH, SIGNATURE_FONT_SIZE } from "./constants.signature";

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
  } = props;

  const refDrawCanvas = useRef<SignatureCanvas | null>();
  const refUploadInput = useRef<HTMLInputElement | null>();
  const refTextInput = useRef<HTMLInputElement | null>();
  const [tab, setTab] = useState<TSignatureTab>("draw");
  const [font, setFont] = useState<TSignatureFont>(FONT_OPTIONS[0]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const handleSubmit = () => {
    onSubmit(refDrawCanvas.current?.getTrimmedCanvas().toDataURL());
    onClose();

    // reset everything
    setTab("draw");
    setFont(FONT_OPTIONS[0]);
    setIsEmpty(true);
    refDrawCanvas.current?.clear();
    if (refTextInput.current) refTextInput.current.value = "";
  };

  const onFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // take only first file
    if (!file) return;

    // uploaded file might have different dimensions, so we need to resize it
    const img = new Image();
    img.src = URL.createObjectURL(file); // blob url to file
    img.onload = () => {
      const ctx = refDrawCanvas.current?.getCanvas()?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, SIGNATURE_CANVAS_WIDTH, SIGNATURE_CANVAS_HEIGHT);
      ctx.drawImage(img, 0, 0, SIGNATURE_CANVAS_WIDTH, SIGNATURE_CANVAS_HEIGHT); // will resize image to fit canvas

      setIsEmpty(false);
    }
  }, [])

  const onTextSignatureChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const ctx = refDrawCanvas.current?.getCanvas()?.getContext("2d");
    if (!ctx) return;

    ctx.font = `${SIGNATURE_FONT_SIZE} ${font}`;
    ctx.clearRect(0, 0, SIGNATURE_CANVAS_WIDTH, SIGNATURE_CANVAS_HEIGHT);
    ctx.fillText(event.target.value, 8, 34); // magic offset to put text in the same place where input is

    setIsEmpty(!event.target.value);
  }, [font]);

  const onClear = () => {
    refDrawCanvas.current?.clear();
    if (refTextInput.current) refTextInput.current.value = "";
    setIsEmpty(true);
  };

  // refresh font if font changed and text tab
  useEffect(() => {
    if (tab == "text" && refTextInput.current?.value)
      onTextSignatureChange({ target: { value: refTextInput.current?.value } } as any);
  }, [font, onTextSignatureChange]);

  if (!visible) return null;

  return (
    <div className="signature-pad__dialog">
      <SignatureTabs
        tab={tab}
        setTab={setTab}
      />
      <div className="signature-pad__dialog__content">
        <SignatureCanvas
          ref={ref => refDrawCanvas.current = ref}
          onBegin={() => setIsEmpty(false)} // any click will draw smth, so mark as not empty
          canvasProps={{
            width: SIGNATURE_CANVAS_WIDTH,
            height: SIGNATURE_CANVAS_HEIGHT,
            className: clsx(
              "signature-pad__dialog__canvas",
              tab != "draw" && "not-interactive"
            ),
          }}
        />
        {tab == "draw" && isEmpty && (
          <div className="signature-pad__dialog__canvas-placeholder">
            Draw your signature here
          </div>
        )}
        <SignatureUploadOverlay
          tab={tab}
          isEmpty={isEmpty}
          refUploadInput={refUploadInput}
          onFileUpload={onFileUpload}
        />
        <SignatureText
          tab={tab}
          font={font}
          setFont={setFont}
          refTextInput={refTextInput}
          onTextSignatureChange={onTextSignatureChange}
        />
      </div>
      <SignatureFooter
        isEmpty={isEmpty}
        onClose={onClose}
        onClear={onClear}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SignaturePadDialog;
