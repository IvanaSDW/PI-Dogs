
import { useState, useEffect } from "react";
import { fileUpload } from "../../../../utils/fileUpload";

export const useUploadImage = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [urlImage, setUrlImage] = useState('')

    const handleChange = (imageList) => setImages(imageList);

    const onUpload = async () => {
      setLoading(true);
      const url = await fileUpload(images[0].file);
      setLoading(false);

      if (url) setUrlImage(url);
      else alert('Error, please try again later. ❌')

      setImages([]);
    }

    useEffect(() => {
      let timeout;
      if(urlImage){
        timeout = setTimeout(()=> {
          setUrlImage('')
        }, 5000)
      }

      return () => {
       clearTimeout(timeout);
      }
    }, [urlImage])

    return {
        loading,
        onUpload,
        handleChange,
        urlImage,
        images
    }
}