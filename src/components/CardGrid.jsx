import { Grid, Flex, Button, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EquipmentCard from "./Card";
import api from "../../api/client";

function CardGrid({ isUpdate, allEquipments }) {
  const [equipments, setEquipments] = useState();

  useEffect(() => {
    setEquipments(allEquipments);
  }, [allEquipments]);

  const handleDelete = (equipment) => {
    api
      .delete(`${import.meta.env.VITE_API_URL}/api/equipments/${equipment._id}`)
      .then((response) => {
        const newEquipments = equipments.filter(function (el) {
          return el != equipment;
        });
        setEquipments(newEquipments);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Grid gutter="lg" spacing="lg" mb={100}>
        {equipments &&
          equipments.map((equipment) => {
            return (
              <Grid.Col
                key={equipment._id}
                span={{ base: 12, xs: 4, md: 4, lg: 4 }}
              >
                <EquipmentCard props={equipment} />
                {isUpdate ? (
                  <>
                    <Flex direction="row" justify="space-evenly" align="center">
                      <Button
                        component={Link}
                        to={`/editEquipment/${equipment._id}`}
                        variant="filled"
                        color="#288BE2"
                        fullWidth
                        mt="md"
                        radius="md"
                        mr={2}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(equipment)}
                        variant="filled"
                        color="#E01A4F"
                        fullWidth
                        mt="md"
                        radius="md"
                        ml={2}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </>
                ) : (
                  ""
                )}
              </Grid.Col>
            );
          })}
      </Grid>
      {!equipments && (
        <Flex justify="center" align="center">
          <Loader color="blue" size="20em" />
        </Flex>
      )}
    </>
  );
}

export default CardGrid;
