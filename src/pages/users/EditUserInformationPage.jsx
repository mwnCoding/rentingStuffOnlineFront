import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/client";

import { Grid, TextInput, Button, Flex, Loader } from "@mantine/core";
import { AuthContext } from "../../contexts/AuthContext";
import ProfilePictureInput from "../../components/ProfilePictureInput";

const EditUserInformationPage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_API_URL}/api/user/${user._id}`)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      });
  }, [user]);

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
    api
      .put(
        `${import.meta.env.VITE_API_URL}/api/user/upload/${user._id}`,
        userData,
      )
      .then((response) => {
        console.log(response);
        response.data["_id"] = "697f9b03e85520bd893ed167";
        updateUser(response.data);
        console.log("User data updated successfully");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center">
          <Loader color="#288BE2" size="20em" />
        </Flex>
      ) : (
        <Grid align="center" justify="center">
          <Grid.Col span={{ base: 12, xs: 12, md: 4, lg: 4 }}>
            {userData && (
              <ProfilePictureInput
                value={userData?.imageUrl}
                loading={imageLoading}
                onChange={(newValue) => updateUserData("imageUrl", newValue)}
                onLoadingChange={setImageLoading}
              />
            )}
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
