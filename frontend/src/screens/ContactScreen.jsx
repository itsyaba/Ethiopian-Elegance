import { useState } from "react";
import { TextInput, Text, Button, Textarea } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <Text className="text-3xl font-bold mb-10">Contact Us</Text>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          classNames={{ input: "bg-gray-100 mb-5" }}
        />

        <TextInput
          label="Email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<IconMail size={14} />}
          classNames={{ input: "bg-gray-100 mb-5" }}
        />

        <Textarea
          label="Message"
          placeholder="Your message"
          resize="vertical"
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          classNames={{ input: "bg-gray-100 mb-5" }}
        />

        <Button type="submit" className="bg-blue-500 text-white p-3 rounded-md">
          Submit
        </Button>
      </form>
    </div>
  );
}
