import {Notification } from "@mantine/core"
import { IconX, IconCheck } from '@tabler/icons-react';
import { useState } from "react";

const Message = (variant, children ) => {
  const [icon] = useState(variant === "success" ? <IconCheck /> : <IconX />);

  return (
    <Notification
      icon={icon}
      color={variant === "success" ? "green" : "red"}
      title={variant === "success" ? "All Good" : "Bummer!"}
    >
      {children}
    </Notification>
  );
};

Message.defaultProps = {
  variant: 'success',
  title : "All Good"
};


// BUMMER!
export default Message;
