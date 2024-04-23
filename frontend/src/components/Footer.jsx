import { Text, Container, ActionIcon, Group, rem, Image } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";
import classes from "./css/FooterLinks.module.css";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export default function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image
            src="data:image/jpeg;base64,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"
            className={classes.image}
          />
          <Text size="xs" className={classes.description}>
            Shop Smart & Cozy Up Your Home
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Ethiopian Elegance. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
