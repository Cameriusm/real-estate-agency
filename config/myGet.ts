import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import Router from "next/router";

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;
  console.log("im here");
  const resp = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });
  console.log("Router");

  if (resp.status === 401 && !ctx.req) {
    console.log("Router");
    Router.replace("/login");
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    console.log("Router");
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3000/login",
    });
    ctx.res?.end();
    return;
  }

  const json = await resp.json();
  return json;
}
