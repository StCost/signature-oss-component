import React from 'react';
import SignaturePadDialog from "./SignaturePadDialog";
import './App.css';

function App() {
  const [open, setOpen] = React.useState(true);
  const [base64Image, setBase64Image] = React.useState<string | undefined>();

  return (
    <div className="App">
      <SignaturePadDialog
        visible={open}
        onSubmit={setBase64Image}
        onClose={() => setOpen(false)}
        canvasProps={{
          width: 500,
          height: 200,
          className: 'sigCanvas'
        }}
      />
      {base64Image && (
        <div>
          <div>result Base64 image:</div>
          <img
            src={base64Image}
            alt=""
          />
          <br />
          <button
            onClick={() => {
              setBase64Image(undefined);
              setOpen(true);
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
