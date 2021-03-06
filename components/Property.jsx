import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import DefaultImage from "../assets/images/house.jpg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    isVerified,
    id,
  },
}) => (
  <Link href={`/property/${id}`} passHref>
    <Flex
      flexWrap="wrap"
      w="420px"
      p="5"
      paddingTop="0"
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box>
        <Image
          // src={coverPhoto ? coverPhoto : DefaultImage}
          src={coverPhoto || DefaultImage}
          // src={coverPhoto}
          width={400}
          height={260}
          alt="coverPhoto"
        />
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column" textAlign="left">
            <Text fontWeight="bold" fontSize="lg">
              <Flex alignItems="center">
                <Box paddingRigt="3" color="green.400">
                  {" "}
                  {isVerified && <GoVerified /> && " "} {/* <GoVerified /> */}
                </Box>{" "}
                {+price}₽ {rentFrequency && `/${rentFrequency}`}
              </Flex>
            </Text>
            <Text fontSize="lg" display="block">
              {title.length > 30 ? `${title.substring(0, 30)}...` : title}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={coverPhoto && DefaultImage} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} кв/м²{" "}
          <BsGridFill />
        </Flex>
        {/* <Text fontSize="lg">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </Text> */}
      </Box>
    </Flex>
  </Link>
);

export default Property;
