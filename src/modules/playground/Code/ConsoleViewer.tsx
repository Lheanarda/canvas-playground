import React from "react";
import Card from "@src/components/Card";
import { XCircleIcon } from "@heroicons/react/outline";

interface LogEntry {
  message: string;
  timestamp: string;
  level?: "info" | "warn" | "error";
}

interface ConsoleViewerProps {
  logs: string[];
  onClear: () => void;
}

const ConsoleViewer: React.FC<ConsoleViewerProps> = ({ logs, onClear }) => {
  const processedLogs: LogEntry[] = logs.map((log) => ({
    message: log,
    timestamp: new Date().toLocaleTimeString(),
    level: "info",
  }));

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      default:
        return "text-green-400";
    }
  };

  return (
    <Card className="bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <span className="text-sm font-medium">Console Output</span>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center text-slate-400 hover:text-slate-200 transition-colors"
          >
            <XCircleIcon className="w-4 h-4 mr-1" />
            <span className="text-xs">Clear</span>
          </button>
        )}
      </div>
      <div className="h-64 rounded-b-lg overflow-auto">
        <div className="p-4 space-y-2">
          {processedLogs.map((log, index) => (
            <div
              key={index}
              className="font-mono text-sm flex items-start gap-2 hover:bg-slate-900 rounded px-2 py-1"
            >
              <span className="text-slate-500 flex-shrink-0">
                {log.timestamp}
              </span>
              <span className={`${getLevelColor(log.level)} flex-grow`}>
                {log.message}
              </span>
            </div>
          ))}
          {processedLogs.length === 0 && (
            <div className="text-slate-500 text-sm italic text-center py-4">
              No console output
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ConsoleViewer;
