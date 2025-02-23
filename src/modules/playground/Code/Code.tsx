import Breadcrumbs from "@src/components/Breadcrumbs";
import React, { useCallback, useEffect, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { generateCode } from "./utils/code";
import {
  getInitialCodeHTML,
  getInitialCodeJS,
  setCacheCode,
} from "./utils/storage";

const CodePage: React.FC = () => {
  const [codeHtml, setCodeHtml] = useState<string>(getInitialCodeHTML());
  const [codeJs, setCodeJs] = useState<string>(getInitialCodeJS());

  const [code, setCode] = useState(generateCode(codeHtml, codeJs));

  const handleSave = useCallback(() => {
    const updatedCode = generateCode(codeHtml, codeJs);
    setCacheCode(codeHtml, codeJs);
    setCode(updatedCode);
  }, [codeHtml, codeJs]); // Include dependencies

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // Prevent browser's save dialog
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave]);

  return (
    <>
      <Breadcrumbs currentPage="Code" parent="Playground" />
      <div className="flex justify-between w-full mt-3 space-x-3 ">
        <div className="flex-1 space-y-3 h-full">
          <ReactCodeMirror
            className="flex-1 "
            extensions={[html()]}
            value={codeHtml}
            onChange={setCodeHtml}
            theme={"dark"}
          />
          <ReactCodeMirror
            className="flex-1"
            extensions={[javascript()]}
            value={codeJs}
            onChange={setCodeJs}
            theme={"dark"}
          />
        </div>
        <div className="flex-1">
          <iframe
            srcDoc={code}
            sandbox="allow-scripts allow-same-origin"
            className="border border-black w-full h-96"
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default CodePage;
