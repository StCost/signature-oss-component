import React from 'react';
import SignaturePadDialog from "./SignaturePadDialog";
import './Example.css';

function Example() {
  const [open, setOpen] = React.useState(true);
  const [base64Image, setBase64Image] = React.useState<string | undefined>();

  return (
    <div className="App">
      {/* only 3 props are required to use signature pad dialog. */}
      <SignaturePadDialog
        visible={open}
        onSubmit={setBase64Image}
        onClose={() => setOpen(false)}
      />

      {/* preview of result */}
      {base64Image && (
        <div>
          <div>result Base64 image:</div>
          <img
            src={base64Image}
            alt=""
          />
          <br />
        </div>
      )}

      {/*button to open dialog again*/}
      {!open && (
        <button
          onClick={() => {
            setBase64Image(undefined);
            setOpen(true);
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default Example;
