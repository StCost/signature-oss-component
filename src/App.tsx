import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <SignatureCanvas
        penColor='green'
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
    </div>
  );
}

export default App;
