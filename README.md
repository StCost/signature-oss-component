# signature-oss-component

Perfect ReactJS component, if you need to collect user signature in your app and use it as image

ReactJS + TypeScript + [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas)
open source signature pad component.

## [Live Demo on Vercel](https://signature-oss-component.vercel.app/)

---

# Features
When opened, dialog appears in center of screen and offers 3 ways to submit signature:
1. Draw signature with mouse or finger
2. Type text manually and choose fancy font
3. Upload image of any format (jpg, png, svg, webp, etc.) 
   1. Image is put onto canvas, scaled to fit its size
   2. User can draw on top of uploaded image in draw mode
   3. Signature is transparent, if original uploaded image had transparency

- Each of options are put onto canvas, so signature is always svg. 
- After submitting, dialog closes and calls callback with base64 string of signature image. This string can be saved in database or sent to server.

---

# Installation
1. Copy [`src/SignaturePadDialog`](src/SignaturePadDialog) folder to your ReactTS project (or use it as a reference to create your own component)
2. Install dependencies using `npm` or `yarn`
- `npm install react-signature-canvas --save-dev @types/react-signature-canvas`
- `yarn add react-signature-canvas --dev @types/react-signature-canvas`
3. Import [`SignaturePadDialog`](src/SignaturePadDialog/index.ts) component to any place in your project

---

# Usage
- Opened state and result are managed outside by parent component. So only 3 props are sufficient to use this component
```javascript
interface IProps {
    visible: boolean; // pass this to show/hide dialog
    onSubmit: (base64Image: string | undefined) => void; // callback when user submits signature. svg converted into base64 string
    onClose: () => void; // callback when user submits and/or closes dialog
}
```

---

- Short code example. Import, state, callbacks and render
```javascript
import SignaturePadDialog from './SignaturePadDialog';
...
const [open, setOpen] = React.useState(true);
const [base64Image, setBase64Image] = React.useState<string | undefined>();
...
<SignaturePadDialog
    visible={open}
    onSubmit={setBase64Image}
    onClose={() => setOpen(false)}
/>
```
- Or see [`src/Example.tsx`](src/Example.tsx)
- Or start example app with `npm start` or `yarn start`
- Or visit [Live Demo on Vercel](https://signature-oss-component.vercel.app/)

# What is <b><i>base64</i></b>?
- [Base64](https://en.wikipedia.org/wiki/Base64) is a group of binary-to-text encoding schemes that represent binary data (more specifically a sequence of 8-bit bytes) in an ASCII string format by translating it into a radix-64 representation. The term Base64 originates from a specific MIME content transfer encoding.
- In practical terms, image is converted into text format. This text can be saved in database or sent to server. Server can convert it back to image and save it as file.



