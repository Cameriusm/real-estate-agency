import { useForm } from "react-hook-form";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  IconButton,
  useColorMode,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { baseUrl } from "../utils/fetchApi";
import Router from "next/router";
import AuthContextProvider, { AuthContext } from "../contexts/AuthContext";
const VARIANT_COLOR = "teal";

const App = () => {
  return (
    <>
      <CSSReset />
      <LoginArea />
    </>
  );
};

const LoginArea = () => {
  return (
    <Flex minHeight="90vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Войти</Heading>
      <Text>
        Нету аккаунта?{" "}
        <Link href={"register"} color={`${VARIANT_COLOR}.500`}>
          Регистрация
        </Link>
      </Text>
    </Box>
  );
};

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const [message, setMessage] = useState("");
  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
    const resp = await fetch(`${baseUrl}}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const json = await resp.json();
    console.log("jsonANSWER", json);
    if (json.message === "Falses") {
      setMessage("Аккаунта с указанными данными не существует!");
      return;
    }
    console.log("logged:", json.owner[0].id);
    localStorage.setItem("owner_id", json.owner[0].id);
    localStorage.setItem("name", json.owner[0].name);
    localStorage.setItem("second_name", json.owner[0].second_name);
    localStorage.setItem("verified", json.owner[0].verified);
    localStorage.setItem("email", json.owner[0].email);
    AuthContextProvider;
    Router.replace("/");
  };

  const loginHandler = () => {
    console.log("Logging");
  };
  return (
    <Box my={4} textAlign="left">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display="block">
          <FormLabel display="block">Email</FormLabel>
          <Input
            type="email"
            {...register("email", {
              required: "Поле обязательно",
              // pattern: {
              //   message: "Используйте только латинские символы!",
              //   value: /^[a-zA-Z]*$/,
              // },
            })}
          />
          <Box color="red">{errors?.email && errors?.email?.message}</Box>
        </FormControl>

        <FormControl display="block">
          <FormLabel display="block">Пароль</FormLabel>
          <Input
            type="password"
            {...register("password", {
              required: "Поле обязательно",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 25,
                message: "Максимум 25 символов",
              },
              pattern: {
                message: "Используйте только латинские символы!",
                value: /^[a-zA-Z]*$/,
              },
            })}
          />
          <Box color="red">{errors?.password && errors?.password?.message}</Box>
        </FormControl>

        <br />
        <Button
          onClick={loginHandler}
          variantColor={VARIANT_COLOR}
          width="full"
          type="submit"
          mt={4}
        >
          Войти
        </Button>
      </form>
      {message && (
        <Box textAlign="center" color="red" my="5">
          {message}
        </Box>
      )}
    </Box>
  );
};

export default App;
