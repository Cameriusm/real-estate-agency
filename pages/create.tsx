import fetch from "isomorphic-unfetch";
import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { myGet } from "../config/myGet";
export default function create({ create }: any) {
  // console.log("im here1");
  console.log(create);
  return <div>Hello</div>;
}
// console.log("im here2");
create.getInitialProps = async (ctx: NextPageContext) => {
  // console.log("im here3");
  const json = await myGet("http://localhost:3000/api/create", ctx);
  return { msg: "oof" };
};
