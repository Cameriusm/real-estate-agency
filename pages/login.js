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
import Router from "next/router";
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
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({});

  const [message, setMessage] = useState("");
  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
    const resp = await fetch("http://localhost:3000/api/login", {
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
    Router.replace("/");
    setMessage(json);
  };

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const loginHandler = () => {
    console.log("Logging");
    // console.log(email, password);
  };
  return (
    <Box my={4} textAlign="left">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display="block">
          <FormLabel display="block">Email</FormLabel>
          <Input
            {...register("email", {
              required: "Поле обязательно",
            })}
          />
          <Box color="red">{errors?.email && errors?.email?.message}</Box>
        </FormControl>

        <FormControl display="block">
          <FormLabel display="block">Пароль</FormLabel>
          <Input
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
            })}
          />
          <Box color="red">{errors?.password && errors?.password?.message}</Box>
        </FormControl>

        <br />
        <Button
          // disabled={!isValid}
          onClick={loginHandler}
          variantColor={VARIANT_COLOR}
          width="full"
          type="submit"
          mt={4}
        >
          Войти
        </Button>
      </form>
      {/* {message && <Box>Вы успешно зарегистрировались!</Box>} */}
    </Box>
  );
};

export default App;
