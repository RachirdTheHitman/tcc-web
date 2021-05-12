import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import {
    Button,
    Heading,
    Image,
    ListItem,
    Text,
    UnorderedList
} from "@chakra-ui/react";
import React, { useState } from "react";
import Flippy, { BackSide, FrontSide } from "react-flippy";
import { User } from "../generated/graphql";
import { BuyReturnSellButtons } from "./BuyReturnSellButtons";
import { CustomModal } from "./CustomModal";

interface CardContentsProps {
  image: string;
  name: string;
  value: string;
  specialization: string;
  description: string;
  cardId: number;
  users: User[] | undefined | null;
};

const FlippyStyle = {
  width: "200px",
  height: "300px",
  textAlign: "center",
  color: "#FFF",
  fontFamily: "sans-serif",
  fontSize: "30px",
  justifyContent: "center",
};

export const CardContents: React.FC<CardContentsProps> = ({
  image,
  name,
  value,
  specialization,
  description,
  cardId,
  users,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <Flippy
      flipDirection="vertical"
      isFlipped={isFlipped}
      flipOnClick={false}
      style={FlippyStyle}
    >
      <FrontSide
        style={{
          backgroundColor: "#26495c",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image src={image} boxSize="max-content" />
        <Text fontSize="sm">{name}</Text>
        <BuyReturnSellButtons id={cardId} users={users} />
        <span
          style={{
            fontSize: "12px",
            position: "absolute",
            bottom: "10px",
            width: "100%",
          }}
        >
          <Button
            leftIcon={<InfoIcon />}
            colorScheme="teal"
            variant="solid"
            size="sm"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            Info!
          </Button>
          <br />
          (FRONT SIDE)
        </span>
      </FrontSide>
      <BackSide
        style={{
          backgroundColor: "#26495c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Heading size="lg">{name}</Heading>
        <span
          style={{
            fontSize: "12px",
            width: "100%",
            padding: "10px",
          }}
        >
          <UnorderedList>
            <ListItem>value: {value}</ListItem>
            <ListItem>
              <Text isTruncated>specialization: {specialization}</Text>
            </ListItem>
            <ListItem>
              <Text isTruncated>description: {description}</Text>
            </ListItem>
          </UnorderedList>
          <CustomModal
            name={name}
            value={value}
            specialization={specialization}
            description={description}
          />
          <Button
            mt={2}
            size="sm"
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            Return!
          </Button>
          <br />
        </span>
        <Text fontSize="sm" style={{ position: "absolute", bottom: "10px" }}>
          (BACK SIDE)
        </Text>
      </BackSide>
    </Flippy>
  );
};
