import ImageUploading from "react-images-uploading";
import DragAndDropBox from "./DragAndDropBox";
import ImageSelector from "./ImageSelector";
import UploadMessage from "./UploadMessage";
import { useUploadImage } from "./useUploadImageHook";

const DragAndDrop = () => {
  const { urlImage, handleChange, images, ...rest } = useUploadImage;

  return (
    <>
      <UploadMessage urlImage={urlImage} />
      <ImageUploading
        multiple={false}
        maxNumber={1}
        value={images}
        onChange={handleChange}
      >
        {({
          imageList,
          onImageUpload,
          dragProps,
          isDragging,
          onImageRemove,
          onImageUpdate,
        }) => (
          <>
            {imageList[0] ? (
              <ImageSelector
                img={imageList[0].dataURL}
                {...{ onImageRemove, onImageUpdate, ...rest }}
              />
            ) : (
              <DragAndDropBox {...{ onImageUpload, dragProps, isDragging }} />
            )}
          </>
        )}
      </ImageUploading>
    </>
  );
};

export default DragAndDrop;
