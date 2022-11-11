import React from "react";

const UploadMessage = ({ urlImage }) => {
  return (
    <>
      {urlImage && (
        <span className="url-cloudinary-sumbit">
          Your Image uploaded successfully! ✅
          <a target="_blank" href={urlImage} rel="noreferrer">
            {" "}
            View Image
          </a>
        </span>
      )}
    </>
  );
};

export default UploadMessage;
