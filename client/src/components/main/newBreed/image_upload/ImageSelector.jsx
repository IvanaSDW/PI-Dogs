import React from "react";

const ImageSelector = ({
  img,
  loading,
  onUpload,
  onImageRemove,
  onImageUpdate,
}) => {
  return (
    <div>
      <img
        className="image-selected"
        src={img}
        alt="img-selected"
        width={300}
      />
      <div className="container-buttons">
        {loading ? (
          <p className="loading-label">Upload image ⏳...</p>
        ) : (
          <>
            <button disabled={loading} onClick={onUpload}>
              Upload 📤
            </button>
            <button disabled={loading} onClick={() => onImageUpdate(0)}>
              Update ✏️
            </button>
            <button disabled={loading} onClick={() => onImageRemove(0)}>
              Cancel ❌
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSelector;
