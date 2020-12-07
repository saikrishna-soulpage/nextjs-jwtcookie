import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Layout from "../components/Layout";
import { parseCookies } from "nookies";

export default function Profile({ user }) {
  const u = JSON.parse(user);
  //   console.log(u);
  return (
    <div>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container-fluid">
          <div class="d-flex justify-content-center">
            <div class="row text-center">
              <div class="col">
                <div className="card">
                  <h1 className="text-center">User</h1>
                  <div className="text-center">
                    <img
                      className="card-thumbnail"
                      src={u.avatar_url}
                      alt="Card image cap"
                      width="280px"
                    ></img>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <div className="text-capitalize">
                        <h1 className="card-title">
                          <a href={u.html_url}>
                            {u.type}:{u.login}
                          </a>
                        </h1>
                      </div>
                    </div>
                    <div className="text-center">
                      <Link
                        href={{
                          pathname: "/repositories",
                          query: { id: u.repos_url },
                        }}
                        key={u.id}
                      >
                        <a>Repositories</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { user, token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return {
    props: { user },
  };
}
