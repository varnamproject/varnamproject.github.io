


import React, { useEffect } from 'react';

function HomePage() {
  useEffect(() => {
    const input = document.getElementById("input");
    if (input) {
      if (window.plugVarnam) {
        window.plugVarnam(input, {
          schemeID: "ml",
        });
      } else {
        console.error('Varnam script not loaded');
      }
    } else {
      console.error('Textarea element not found');
    }
  }, []);

  return (
    <div>
      <h2>Varnam Input</h2>
      <textarea
        id="input"
        rows={4}
        cols={50}
        placeholder="Type in Malayalam..."
      />
    </div>
  );
}

export default HomePage;
