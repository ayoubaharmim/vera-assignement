import { useCallback, useRef, useState } from "react";
import { extractSegments, StreamSegment } from "../utils/segments";

export function useFetchSSE() {
  const [chunks, setChunks] = useState<string[]>([]);
  const [text, setText] = useState(""); 
  const [segments, setSegments] = useState<StreamSegment[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const lastIndexRef = useRef(0);

  const reset = () => {
    xhrRef.current?.abort();
    xhrRef.current = null;
    setChunks([]);
    setText("");
    setSegments([]);
    setIsStreaming(false);
    setError(null);
    lastIndexRef.current = 0;
  };

  const stop = () => {
    xhrRef.current?.abort();
    setIsStreaming(false);
  };

  const start = useCallback((prompt: string) => {
    reset();
    setIsStreaming(true);

    const url =
      `https://vera-assignment-api.vercel.app/api/stream?prompt=` +
      encodeURIComponent(prompt);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "text/event-stream");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED && xhr.status >= 400) {
        setError(`HTTP ${xhr.status}`);
        setIsStreaming(false);
        xhr.abort();
      }
    };

    xhr.onprogress = () => {
      const response = xhr.responseText;
      const diff = response.slice(lastIndexRef.current);
      lastIndexRef.current = response.length;

      const matches = diff.match(/data:\s*(.*)/g) || [];

      for (const m of matches) {
        const raw = m.replace("data:", "").trim();

        try {
          const json = JSON.parse(raw);
          const content =
            json?.content?.content ?? json?.content ?? json?.text ?? null;

          if (typeof content === "string") {
            setChunks((c) => [...c, content]);
            setText((t) => {
              const newText = t + content;
              setSegments(extractSegments(newText));
              return newText;
            });
          }
        } catch {
          setChunks((c) => [...c, raw]);
          setText((t) => {
            const newText = t + raw;
            setSegments(extractSegments(newText));
            return newText;
          });
        }
      }
    };

    xhr.onerror = () => {
      setError("Network error");
      setIsStreaming(false);
    };

    xhr.onload = () => {
      setIsStreaming(false);
    };

    xhr.send();
  }, []);

  return { chunks, text, segments, isStreaming, error, start, stop, reset };
}
