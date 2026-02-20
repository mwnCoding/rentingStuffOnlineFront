import api from "../../../api/client.js";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Flex, Title, Group, Text, Button } from "@mantine/core";
import CardGrid from "../../components/CardGrid.jsx";
import { getEquipmentsByID } from "../../services/equipment.service.js";

function UserListings() {
  const [equipments, setEquipments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getEquipmentsByID(user._id)
      .then((equipments) => {
        console.log(equipments);
        setEquipments(equipments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return (
    <>
      <Group grow mt="5vh">
        <Flex direction="column" align="start" justify="center" mih="10vh">
          <Title order={1} fw={900} c="#288BE2" size="48">
            My Equiments
          </Title>
          <Text mt="1rem">Manage all your equipments from here</Text>
        </Flex>
      </Group>
      {!equipments ? (
        <Text mt="5vh">You didn&apos;t add equipment yet…</Text>
      ) : (
        <Group grow mt="5vh" className="gridCtn">
          <CardGrid allEquipments={equipments} isUpdate={true} />
        </Group>
      )}

      <Group mt="5vh">
        <Button
          component={Link}
          to={`/createEquipment`}
          variant="filled"
          color="#F9C22E"
          mt="md"
          radius="md"
          mr={2}
        >
          Add a new Equipment
        </Button>
      </Group>
    </>
  );
}

export default UserListings;
