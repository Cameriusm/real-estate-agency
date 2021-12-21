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
import { useForm } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";
const VARIANT_COLOR = "teal";
const App = () => {
  return (
    <>
      <CSSReset />
      <RegisterArea />
    </>
  );
};

const RegisterArea = () => {
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
          <RegisterHeader />
          <RegisterForm />
        </Box>
      </Box>
    </Flex>
  );
};

const RegisterHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Регистрация</Heading>
      <Text>
        Уже есть аккаунт?{" "}
        <Link href={"login"} color={`${VARIANT_COLOR}.500`}>
          Войти
        </Link>
      </Text>
    </Box>
  );
};

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const [message, setMessage] = useState("");
  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
    const resp = await fetch("http://localhost:3000/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        second_name: data.second_name,
        phone_number: data.phone_number,
        verified: "0",
        email: data.email,
        password: data.password,
      }),
    });
    const json = await resp.json();
    Router.replace("/login");
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
        <Flex>
          <FormControl w="45" mr="15">
            <FormLabel>Имя</FormLabel>
            <Input
              {...register("name", {
                required: "Поле обязательно",
              })}
            />
            <Box color="red">{errors?.name && errors?.name?.message}</Box>
          </FormControl>
          <FormControl w="45">
            <FormLabel>Фамилия</FormLabel>
            <Input
              {...register("second_name", {
                required: "Поле обязательно",
              })}
            />
            <Box color="red">
              {errors?.second_name && errors?.second_name?.message}
            </Box>
          </FormControl>
        </Flex>

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
          <FormLabel display="block">Номер телефона</FormLabel>
          <Input
            {...register("phone_number", {
              required: "Поле обязательно",
              minLength: {
                value: 11,
                message: "Минимум 11 символов",
              },
              maxLength: {
                value: 11,
                message: "Максимум 11 символов",
              },
            })}
          />
          <Box color="red">
            {errors?.phone_number && errors?.phone_number?.message}
          </Box>
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
          Зарегистрироваться
        </Button>
      </form>
      {/* {message && <Box>Вы успешно зарегистрировались!</Box>} */}
    </Box>
  );
};

export default App;
