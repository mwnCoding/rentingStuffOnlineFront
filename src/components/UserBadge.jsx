import { Avatar, UnstyledButton, Text, Menu, rem, Group } from "@mantine/core";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import { AuthContext } from "../contexts/AuthContext";

function UserBadge({ userProps }) {
  const { user } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  const { logOutUser } = useContext(AuthContext);

  const close = () => {
    setOpened(false);
  };

  const open = () => {
    setOpened(true);
  };

  const toggleDropdown = () => {
    opened ? close() : open();
  };

  return !user ? (
    "test"
  ) : (
    <>
      <Menu visibleFrom="sm" opened={opened} onChange={toggleDropdown}>
        <Menu.Target>
          <UnstyledButton>
            <Group>
              <Avatar src={user.imageUrl} alt="it's me" />
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              <IconChevronDown
                aria-label="Toggle navigation"
                style={{ width: rem(16), height: rem(16) }}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            to="/profile"
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Account Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={logOutUser}
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default UserBadge;
