import React, { useState } from "react";

const TextSelector = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const currentSelection = selection.toString().trim();

    if (currentSelection !== "") {
      const range = selection.getRangeAt(0);
      const clientRect = range.getBoundingClientRect();

      setSelectedText(currentSelection);
      setTooltipPosition({
        left: `${clientRect.left + clientRect.width / 2}px`,
        top: `${clientRect.top - 40}px`
      });

      setShowTooltip(true);
    }
  };

  const handleSelect = () => {
    // Handle the selected text as needed
    // For example, you can store it in state or perform some action
    // ...

    // Close the tooltip
    setShowTooltip(false);
  };

  return (
    <div>
      <div onMouseUp={handleMouseUp}>
        <p>
          This is some sample text. Try highlighting a portion of it and see the
          tooltip.
        </p>
      </div>
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
          }}
        >
          <p>Selected Text:</p>
          <pre>{selectedText}</pre>
          <button onClick={handleSelect}>Select</button>
        </div>
      )}
    </div>
  );
};

export default TextSelector;
