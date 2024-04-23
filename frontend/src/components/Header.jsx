import {
  IconBrandProducthunt,
  IconLogout,
  IconShoppingCart,
  IconTimeDuration30,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import SearchBox from "./SearchBox";

import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";

import {
  Group,
  Button,
  ThemeIcon,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
  Title,
  Avatar,
  Indicator,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";

import classes from "./css/HeaderMegaMenu.module.css";

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box pb={60}>
      <header className="h-20 bg-NavColor shadow-md md:px-8 ">
        <Group justify="space-between" h="100%">
          <Link to="/" className={classes.link}>
            <ThemeIcon>
              <Image src="data:image/jpeg;base64,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" />
            </ThemeIcon>
            <Title className="font-Courier font-thin text-sm ml-4 md:text-lg sm:text-xl">
              Ethiopian Elegance
            </Title>
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
          </Group>
          <Group visibleFrom="sm">
            <SearchBox />
            {userInfo ? (
              <Group>
                <Link to="/cart">
                  <Indicator
                    label={cartItems.length}
                    disabled={cartItems.length === 0}
                    size="xl"
                    processing
                  >
                    <ThemeIcon variant="light" color="blue" size="lg" radius={"xl"}>
                      <IconShoppingCart size="1.5rem" />
                    </ThemeIcon>
                  </Indicator>
                </Link>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar
                      src={userInfo.image}
                      color="indigo"
                      variant="filled"
                      radius="xl"
                      size="md"
                      className="cursor-pointer hover:opacity-85 active:opacity-40"
                    >
                      <IconUser size="1.5rem" />
                    </Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label className="text-black py-2 text-sm bg-NavColor">
                      {userInfo.name}
                    </Menu.Label>
                    <Link to="/profile">
                      <Menu.Item
                        leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                      >
                        My Profile
                      </Menu.Item>
                    </Link>
                    {userInfo.isAdmin && (
                      <>
                        <Link to="/admin/productlist">
                          <Menu.Item
                            leftSection={
                              <IconBrandProducthunt style={{ width: rem(14), height: rem(14) }} />
                            }
                          >
                            Products
                          </Menu.Item>
                        </Link>
                        <Link to="/admin/userlist">
                          <Menu.Item
                            leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}
                          >
                            Users
                          </Menu.Item>
                        </Link>
                        <Link to="/admin/orderlist">
                          <Menu.Item
                            leftSection={
                              <IconTimeDuration30 style={{ width: rem(14), height: rem(14) }} />
                            }
                          >
                            Orders
                          </Menu.Item>
                        </Link>
                      </>
                    )}

                    <Menu.Item
                      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                      onClick={logoutHandler}
                    >
                      Log Out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            ) : (
              <Group visibleFrom="sm">
                <Link to="/login">
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to="register">
                  <Button>Sign up</Button>
                </Link>
              </Group>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" pr="xl" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000}
        withCloseButton={false}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group className="flex items-start justify-normal flex-col">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About Us
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact Us
            </Link>
          </Group>

          <Divider my="sm" />
          <Group px="md">
            <SearchBox />
          </Group>
          <Divider my="sm" />

          {userInfo ? (
            <Group className="flex justify-center items-center gap-12">
              <Link to="/cart">
                <Indicator
                  label={cartItems.length}
                  disabled={cartItems.length === 0}
                  size="xl"
                  processing
                >
                  <ThemeIcon variant="light" color="blue" size="lg" radius={"xl"}>
                    <IconShoppingCart size="1.5rem" />
                  </ThemeIcon>
                </Indicator>
              </Link>

              <Menu shadow="md" width={200} zIndex={10000}>
                <Menu.Target>
                  <Avatar
                    src={userInfo.image}
                    color="indigo"
                    variant="filled"
                    radius="xl"
                    size="md"
                    className="cursor-pointer hover:opacity-85 active:opacity-40"
                  >
                    <IconUser size="1.5rem" />
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label className="text-black py-2 text-sm bg-NavColor">
                    {userInfo.name}
                  </Menu.Label>
                  <Link to="/profile">
                    <Menu.Item
                      leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                    >
                      My Profile
                    </Menu.Item>
                  </Link>
                  <Menu.Item
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    onClick={logoutHandler}
                  >
                    {" "}
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Group justify="space-between" grow pb="xl" px="md">
              <Link to="/login" className={classes.link}>
                <Button variant="default" fullWidth onClick={closeDrawer}>
                  Log in
                </Button>
              </Link>
              <Link to="register" className={classes.link}>
                <Button fullWidth onClick={closeDrawer}>
                  Sign up
                </Button>
              </Link>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;
