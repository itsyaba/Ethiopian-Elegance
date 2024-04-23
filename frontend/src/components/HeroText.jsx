import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./css/HeroText.module.css";
import {Link} from "react-router-dom"

export default function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title} order={1}>Shop Smart & Cozy Up Your Home</Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Create a warm and inviting space without going over budget. Discover stylish and
            affordable comfort for every room
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link to="/product">
          <Button className={classes.control} size="lg">
            Browse Products
          </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
