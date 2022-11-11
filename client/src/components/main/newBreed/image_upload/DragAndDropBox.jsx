import React from "react";

const DragAndDropBox = ({ isDragging, onImageUpload, dragProps }) => {
  return (
    <div
      onClick={onImageUpload}
      {...dragProps}
      className={`container-dnd center-flex ${isDragging ? "isDragging" : ""}`}
    >
      <span className="label-dnd">
        Chosee an Image or Drag and Drop an Image 📤
      </span>
    </div>
  );
};

export default DragAndDropBox;
