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
import ConsoleViewer from "./ConsoleViewer";

const CodePage: React.FC = () => {
  const [codeHtml, setCodeHtml] = useState<string>(getInitialCodeHTML());
  const [codeJs, setCodeJs] = useState<string>(getInitialCodeJS());
  const [code, setCode] = useState(generateCode(codeHtml, codeJs));
  const [logs, setLogs] = useState<string[]>([]);

  const handleSave = useCallback(() => {
    const updatedCode = generateCode(codeHtml, codeJs);
    setCacheCode(codeHtml, codeJs);
    setCode(updatedCode);
  }, [codeHtml, codeJs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave]);

  useEffect(() => {
    const iframe = document.getElementById(
      "sandbox-frame"
    ) as HTMLIFrameElement;
    if (!iframe) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "console-log") {
        setLogs((prevLogs) => [...prevLogs, event.data.message]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Breadcrumbs currentPage="Code" parent="Playground" />
      <div className="flex justify-between w-full mt-3 space-x-3">
        <div className="w-[50%] space-y-3 h-full">
          <ReactCodeMirror
            className="flex-1"
            extensions={[html()]}
            value={codeHtml}
            onChange={setCodeHtml}
            theme={"dark"}
            maxHeight="85vh"
          />
          <ReactCodeMirror
            className="flex-1 custom-scrollbar"
            extensions={[javascript()]}
            value={codeJs}
            onChange={setCodeJs}
            theme={"dark"}
            width="100%"
            maxHeight="70vh"
            maxWidth="100%"
          />
        </div>
        <div className="w-[50%] space-y-3">
          <iframe
            id="sandbox-frame"
            srcDoc={`<script>
              (function() {
                const log = console.log;
                console.log = function(...args) {
                  log.apply(console, args);
                  window.parent.postMessage({ type: "console-log", message: args.join(" ") }, "*");
                };
              })();
            <\/script> ${code}`}
            sandbox="allow-scripts allow-same-origin"
            className="border border-black w-full h-96"
          ></iframe>
          <ConsoleViewer logs={logs} onClear={() => setLogs([])} />
        </div>
      </div>
    </>
  );
};

export default CodePage;
