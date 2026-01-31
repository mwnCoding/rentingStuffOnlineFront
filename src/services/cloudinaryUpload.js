import axios from "axios";

async function uploadImage(file) {
  // Ask backend for a signature
  const sigRes = await axios
    .get(`${import.meta.env.VITE_API_URL}/auth/signUpload`)
    .catch((error) => {
      throw new Error(error);
    });

  const { signature, timestamp, cloudName, apiKey } = sigRes.data;

  // Upload directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", "profilePictureRSO");

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
