import { FaRegCopy } from "react-icons/fa";
import React, { useEffect } from "react";


function VarnamInput() {
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

  return (
    <div className="w-full ">
      <textarea
        id="input"
        rows={15}
        cols={50}
        className="w-full border p-2"
        placeholder="Type here..."
          />
          <button className="bg-cyan-500 text-white "><div className="flex "><FaRegCopy className="mt-1 mr-52"></FaRegCopy> Copy</div></button>
    </div>
  );
}

export default VarnamInput;
