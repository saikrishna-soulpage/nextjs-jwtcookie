import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>JWT Cookie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container-fluid"></div>
      </main>
    </div>
  );
}
