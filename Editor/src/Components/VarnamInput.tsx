import { FaRegCopy } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function VarnamInput() {
  const textareaRef = useRef(null);

  useEffect(() => {
    const input = document.getElementById("input");
    if (input) {
      if (window.plugVarnam) {
        window.plugVarnam(input, {
          schemeID: "ml",
        });
      } else {
        console.error("Varnam script not loaded");
      }
    } else {
      console.error("Textarea element not found");
    }
  }, []);

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
        document.execCommand("copy");
        toast("✅ Copied to clipboard!")
    }
  };

  return (
    <div className="w-full ">
      <textarea
        ref={textareaRef}
        id="input"
        rows={15}
        cols={50}
        className="w-full border p-2"
        placeholder="Type here..."
      />
      <button onClick={copyToClipboard} className="bg-cyan-500 text-white ">
        <div className="flex ">
          <FaRegCopy className="mt-1 mr-2"></FaRegCopy> Copy
        </div>
          </button>
          <ToastContainer></ToastContainer>
    </div>
  );
}

export default VarnamInput;
