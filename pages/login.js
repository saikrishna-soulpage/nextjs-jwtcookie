import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import React, { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
export default function Login() {
  const [userData, setUserData] = useState({ username: "", error: "" });
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData({ error: "" });

    const username = userData.username;
    const url = "/api/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (response.status === 200) {
        const user = await response.json();
        // console.log("user", user);
        cookie.set("token", user.token);
        cookie.set("user", user.user);
        router.push("/profile");
      } else {
        console.log("Login failed.");

        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      const { response } = error;
      setUserData({
        error: response ? response.statusText : error.message,
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container-fluid ">
          <div className="row justify-content-center">
            <div className="input-group mb-3 col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Github username"
                onChange={(event) => {
                  setUserData({ username: event.target.value });
                }}
                value={userData.username}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
