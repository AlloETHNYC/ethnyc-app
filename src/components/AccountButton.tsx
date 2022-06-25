import React, { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Burger,
  Menu,
  Divider,
} from "@mantine/core";
import { shortenAddress } from "@usedapp/core";
import { useBooleanToggle } from "@mantine/hooks";
import {
  ChevronDown,
  Heart,
  Logout,
  Message,
  PlayerPause,
  Settings,
  Star,
  SwitchHorizontal,
  Trash,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

interface AccountButtonProps extends UnstyledButtonProps<"button"> {
  address: string;
  onDisconnect: () => void;
}

const AccountButton = ({
  address,
  onDisconnect,
  ...others
}: AccountButtonProps) => {
  const { classes, theme, cx } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <>
      <Burger
        opened={opened}
        onClick={() => toggleOpened()}
        className={classes.burger}
        size="sm"
      />
      <Menu
        size={260}
        placement="end"
        transition="pop-top-right"
        className={classes.userMenu}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        control={
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group spacing={7}>
              <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {shortenAddress(address)}
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        <Menu.Item icon={<Heart size={14} color={theme.colors.red[6]} />}>
          Liked posts
        </Menu.Item>
        <Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />}>
          Saved posts
        </Menu.Item>
        <Menu.Item icon={<Message size={14} color={theme.colors.blue[6]} />}>
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
        <Menu.Item icon={<SwitchHorizontal size={14} />}>
          Change account
        </Menu.Item>
        <Menu.Item onClick={onDisconnect} icon={<Logout size={14} />}>
          Disconnect
        </Menu.Item>

        <Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<PlayerPause size={14} />}>
          Pause subscription
        </Menu.Item>
        <Menu.Item color="red" icon={<Trash size={14} />}>
          Delete account
        </Menu.Item>
      </Menu>
    </>
  );
};

export default AccountButton;
