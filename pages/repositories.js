import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import "bootstrap/dist/css/bootstrap.min.css";
import Repository from "../components/repositories";

export default function Contributors() {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: result, error } = useSWR(router.query.id, fetcher);
  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;

  return (
    <main>
      <Head>
        <title>Repositories</title>
      </Head>

      <h1 className="text-center">Repositories</h1>
      <br />
      <div>
        <ul type="none">
          {result.map((item) => (
            <Repository key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </main>
  );
}
