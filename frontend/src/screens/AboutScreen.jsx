import { Text, Container, Title, Image } from "@mantine/core";

export default function AboutScreen() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <Container className="w-full md:w-4/6 ml-8 text-justify font-Kanit">
        <Title order={1} align="center">
          About Us
        </Title>

        <Text>
          Welcome to our e commerce site focused on products from Ethiopia! We aim to showcase
          unique and high quality items while supporting local artisans and businesses. We are proud
          to directly work with small shops, cooperatives, and makers across Ethiopia to bring you
          authentic products like handwoven textiles, leather goods, jewelry, coffee, spices, and
          more.
        </Text>
        <br />
        <Text>
          Our team has experience living and working in Ethiopia. We are passionate about creating
          economic opportunities and connecting customers worldwide to these special products. We
          hope you enjoy discovering some of the beauty and culture of Ethiopia through the items in
          our shop. Please contact us if you have any questions!
        </Text>
      </Container>
      <Container>
        <Image src="https://i.pinimg.com/564x/4c/cc/00/4ccc00da210d65f2477ac5b9c4bbc057.jpg"  radius="md" />
      </Container>
    </div>
  );
}
