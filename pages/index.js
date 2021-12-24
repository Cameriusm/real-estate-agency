import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import Property from "../components/Property";
import { AuthContext } from "../contexts/AuthContext";
import { Component, useContext, useEffect } from "react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import getAllProperties from "../controllers/getProperties";
import axios from "axios";
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
  authed,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      {/* {!authed && "not authed"} */}
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1}
          <br />
          {title2}
        </Text>
        <Text
          fontSize="lg"
          paddingTop="3"
          padddingBottom="3"
          fontWeight="medium"
          color="gray.700"
        >
          {desc1}
          <br />
          <br />
          {desc2}
        </Text>
        <Button fontSize="xl">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home({ propertiesForSale, propertiesForRent, isAuth }) {
  // console.log(propertiesForSale, propertiesForRent);
  const { authcontent, toggleAuth } = useContext(AuthContext);
  // console.log(authcontent);
  // if (!isAuth){ useEffect(
  //   toggleAuth
  //   )
  // }
  return (
    <Box>
      <Banner
        purpose={"АРЕНДОВАТЬ НЕДВИЖИМОСТЬ"}
        title2="Ищете Аренду!?"
        desc1="Исследуйте Квартиры, Комнаты, Общежития.."
        desc2=""
        buttonText="Показать предложения"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose={"КУПИТЬ НЕДВИЖИМОСТЬ"}
        title2="Покупаете жильё!?"
        desc1="Исследуйте Квартиры, Дома, Апартаменты.."
        desc2=""
        buttonText="Показать предложения"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await getAllProperties("6", "for-sale");
  const propertyForRent = await getAllProperties("6", "for-rent");
  console.log(propertyForSale);
  const propertiesSale = JSON.stringify(propertyForSale);
  // const propertyForSale = await staticFetch(
  //   `${baseUrl}/api/getProperties?purpose=for-sale&hitsPerPage=6`
  // );

  // const propertyForRent = await staticFetch(
  //   `${baseUrl}/api/getProperties?purpose=for-rent&hitsPerPage=6`
  //   // http://localhost:3000/
  // );
  console.log(propertyForRent);

  // const isAuth = await staticFetch(`${baseUrl}/api/checkAuth`);
  // console.log("fetch result:", isAuth);
  return {
    props: {
      propertiesForSell: propertiesSale?.hits,
      propertiesForRent: propertyForRent?.hits,
      // isAuth: isAuth,
    },
  };
}

export const staticFetch = async (url) => {
  const { data } = await axios.get(url, {});
  return data;
};
