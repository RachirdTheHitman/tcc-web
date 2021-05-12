import { Box, Flex, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GiSellCard } from "react-icons/gi";
import { MdAssignmentReturn, MdShop } from "react-icons/md";
import {
  useBuyCardMutation,
  useMeQuery,
  User,
  useReturnCardMutation,
  useSellCardMutation,
} from "../generated/graphql";

interface BuyReturnSellButtonsProps {
  id: number;
  users: User[] | null | undefined;
}

export const BuyReturnSellButtons: React.FC<BuyReturnSellButtonsProps> = ({
  id,
  users,
}) => {
  const [buyCard] = useBuyCardMutation();
  const [sellCard] = useSellCardMutation();
  const [returnCard] = useReturnCardMutation();
  const { data: meData, loading } = useMeQuery();
  const toast = useToast();
  const isUser = users?.map((user) => user.id).includes(meData?.me?.id ?? "");
  const router = useRouter();


  return (
    <Box w="100%">
      <Flex justify="space-around">
        <Tooltip hasArrow label="buy" bg="gray.300">
          <IconButton
            icon={<MdShop />}
            aria-label="Buy Card"
            colorScheme="teal"
            size="sm"
            onClick={async () => {
              if (!loading && !meData?.me) {
                router.replace("/login?next=" + router.pathname);
                return;
              }

              const { data } = await buyCard({
                variables: { id },
                update: (cache) => {
                  cache.evict({ fieldName: "cards" });
                  cache.evict({ fieldName: "me" });
                },
              });

              if (data?.buyCard) {
                toast({
                  title: "Card bought Successfully.",
                  description: "We've charged coins from your account.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Buy card not successful.",
                  description: "You cannot second buy a card or something went wrong.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          />
        </Tooltip>

        {isUser ? (
          <>
            <Tooltip hasArrow label="return" bg="gray.300">
              <IconButton
                icon={<MdAssignmentReturn />}
                aria-label="Return Card"
                colorScheme="teal"
                size="sm"
                onClick={async () => {
                  const { data } = await returnCard({
                    variables: { id },
                    update: (cache) => {
                      cache.evict({ fieldName: "cards" });
                      cache.evict({ fieldName: "me" });
                    },
                  });

                  if (data?.returnCard) {
                    toast({
                      title: "Card Returned Successfully.",
                      description: "We've added coins to your account for you.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: "Return card not successful.",
                      description: "Something went wrong.",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                }}
              />
            </Tooltip>

            <Tooltip hasArrow label="sell" bg="gray.300">
              <IconButton
                icon={<GiSellCard />}
                aria-label="Sell Card"
                colorScheme="teal"
                size="sm"
                onClick={async () => {
                  const { data } = await sellCard({
                    variables: { id },
                    update: (cache) => {
                      cache.evict({ fieldName: "cards" });
                      cache.evict({ fieldName: "me" });
                    },
                  });

                  if (data?.sellCard) {
                    toast({
                      title: "Card Sold Successfully.",
                      description: "We've added coins to your account for you.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: "Sell card not successful.",
                      description: "Something went wrong.",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                }}
              />
            </Tooltip>
          </>
        ) : null}
      </Flex>
    </Box>
  );
};
