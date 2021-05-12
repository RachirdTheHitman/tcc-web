import { Button, useToast } from "@chakra-ui/react";
import React from "react";

export type ToastStatus = "info" | "warning" | "success" | "error"

interface CreateToastProps {
    status?: ToastStatus;
  }

export const ToastExample: React.FC<CreateToastProps> = ({status}) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status,
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
};
