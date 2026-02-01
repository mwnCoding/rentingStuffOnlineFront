import { useState, useEffect, useContext } from "react";
import api from "../../../api/client";
import {
  Flex,
  Container,
  Paper,
  Image,
  Text,
  Button,
  Loader,
  Center,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function UserInformationPage() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_API_URL}/api/user/${user._id}`)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center">
          <Loader color="#288BE2" size="20em" />
        </Flex>
      ) : (
        <Container size="sm">
          <Paper bg="#F2F2F2" padding="md">
            <Flex
              gap="md"
              justify="space-between"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Box h={150} w={150}>
                <Image
                  src={userData?.imageUrl || "../src/assets/defaultAvatar.png"}
                  width={150}
                  height={150}
                  radius="50%"
                  alt={`${userData?.firstName || ""} ${
                    userData?.lastName || ""
                  }`}
                />
              </Box>
              <Container id="form-container">
                <Text size="xl">{`${userData?.firstName || ""} ${
                  userData?.lastName || ""
                }`}</Text>
                <Text size="sm" color="gray" style={{ marginBottom: "10px" }}>
                  {userData?.email || ""}
                </Text>
                <Center>
                  <Link to="/edit-profile">
                    <Button variant="filled" style={{ marginTop: "10px" }}>
                      Edit Profile
                    </Button>
                  </Link>
                </Center>
              </Container>
            </Flex>
          </Paper>
        </Container>
      )}{" "}
    </>
  );
}

export default UserInformationPage;
