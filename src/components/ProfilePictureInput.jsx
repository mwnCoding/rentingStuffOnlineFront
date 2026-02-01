import {
  Badge,
  Box,
  Button,
  FileInput,
  Flex,
  Image,
  Loader,
} from "@mantine/core";
import { useRef } from "react";

import PropTypes from "prop-types";
import { useState } from "react";
import uploadImage from "../services/cloudinaryUpload";

function ProfilePictureInput({ value, loading, onChange, onLoadingChange }) {
  ProfilePictureInput.propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onLoadingChange: PropTypes.func.isRequired,
  };

  const defaultPorfileUrl =
    "https://res.cloudinary.com/dc0iias2b/image/upload/v1769976600/33572692-1a52-4c32-a1aa-11087c824194.png";

  const folderName = "profilePictureRSO";

  const [file, setFile] = useState(null);
  const fileInputRef = useRef("");

  const onClickProfileImage = (e) => {
    if (loading) return;
    fileInputRef.current?.click(e);
  };

  const onChangeFile = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    handleUpdateImage(selectedFile);
  };

  const handleUpdateImage = async (selectedFile) => {
    if (!selectedFile) return;
    onLoadingChange(true);
    try {
      const fileURL = await uploadImage(selectedFile, folderName);
      onLoadingChange(false);
      onChange(fileURL);
    } catch (error) {
      console.error(error);
      onLoadingChange(false);
    }
  };

  const removeImage = () => {
    setFile(null);
    onChange(defaultPorfileUrl);
  };

  return (
    <>
      <Flex direction="column" justify="center" align="center">
        {loading ? (
          <Loader color="blue" size="150" />
        ) : (
          <Box w="150" h="150">
            <Image
              src={value ? value : defaultPorfileUrl}
              radius="50%"
              width={150}
              height={150}
              onClick={onClickProfileImage}
              style={{ cursor: "pointer" }}
            />
          </Box>
        )}

        <Badge style={{ cursor: "pointer" }} onClick={onClickProfileImage}>
          Click to Upload
        </Badge>
        <FileInput
          ref={fileInputRef}
          label="Profile image"
          placeholder="Click to upload"
          value={file}
          style={{ display: "none" }}
          onChange={onChangeFile}
        />
        {value != defaultPorfileUrl && (
          <Button mt="xs" onClick={removeImage}>
            Remove
          </Button>
        )}
      </Flex>
    </>
  );
}

export default ProfilePictureInput;
