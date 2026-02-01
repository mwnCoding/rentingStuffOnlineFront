import api from "../../api/client";
import axios from "axios";

async function uploadImage(file, folderName) {
  // Ask backend for a signature

  const sigRes = await api
    .post(`${import.meta.env.VITE_API_URL}/api/cloudinary/signUpload`, {
      folderName,
    })
    .catch((error) => {
      throw new Error(error);
    });

  const {
    signature,
    timestamp,
    cloudName,
    api_key,
    public_id,
    overwrite,
    invalidate,
    folder,
  } = sigRes.data;

  // Upload directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("public_id", public_id);
  formData.append("overwrite", overwrite);
  formData.append("invalidate", invalidate);
  formData.append("folder", folder);
  formData.append("cloudName", cloudName);

  try {
    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
    );
    return uploadRes.data.secure_url;
  } catch (error) {
    throw new Error(error);
  }
}

export default uploadImage;
