import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Grid,
  Image,
  TextInput,
  Button,
  FileInput,
  Card,
  Flex,
  Loader,
  Box,
  Center,
} from "@mantine/core";
import { AuthContext } from "../../contexts/AuthContext";
import uploadImage from "../../services/cloudinaryUpload";

const EditUserInformationPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(user.userId);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    updateUserData(name, value);
  };

  const updateUserData = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveChanges = () => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/user/upload/${userId}`,
        userData,
      )
      .then((response) => {
        console.log("User data updated successfully");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const onChangeFile = (selectedFile) => {
    console.log(selectedFile);
    setFile(selectedFile);
    handleUpdateImage(selectedFile);
  };

  const handleUpdateImage = async (selectedFile) => {
    if (!selectedFile) return;
    setImageLoading(true);
    try {
      const fileURL = await uploadImage(selectedFile);
      updateUserData("imageUrl", fileURL);
      setImageLoading(false);
      console.debug(selectedFile);
    } catch (error) {
      console.error(error);
      setImageLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center">
          <Loader color="#288BE2" size="20em" />
        </Flex>
      ) : (
        <Grid>
          <Grid.Col span={{ base: 12, xs: 12, md: 4, lg: 4 }} justify="center">
            <Card bg="#F2F2F2" top="1.5em">
              <Card.Section>
                <Center>
                  {userData && (
                    <Box w="150" h="150">
                      {imageLoading ? (
                        <Loader color="blue" size="10em" />
                      ) : (
                        <Image
                          src={userData.imageUrl}
                          radius="50%"
                          width={150}
                          height={150}
                        />
                      )}
                    </Box>
                  )}
                </Center>
                <FileInput
                  label="Profile image"
                  placeholder="Click to upload"
                  value={file}
                  onChange={onChangeFile}
                />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 12, md: 8, lg: 8 }}>
            <TextInput
              name="firstName"
              label="First Name"
              mt="1em"
              value={userData?.firstName || ""}
              onChange={handleInputChange}
            />
            <TextInput
              name="lastName"
              label="Last Name"
              mt="1em"
              value={userData?.lastName || ""}
              onChange={handleInputChange}
            />
            <TextInput
              name="email"
              label="Email"
              mt="1em"
              value={userData?.email || ""}
              onChange={handleInputChange}
            />
            <Button
              mt="1em"
              variant="filled"
              onClick={handleSaveChanges}
              disabled={imageLoading}
            >
              Save Changes
            </Button>
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default EditUserInformationPage;
