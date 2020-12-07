import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

export default function Nav() {
  const router = useRouter();
  const user = parseCookies();
  console.log(user);
  return (
    <nav className="navbar">
      <Link href="/">
        <a>
          <button className="btn btn-outline-primary mr-5">Home</button>
        </a>
      </Link>
      <div>
        {!user.token ? (
          <Link href="/login">
            <a>
              <button className="btn btn-outline-primary">Login</button>
            </a>
          </Link>
        ) : (
          <>
            <Link href="/profile">
              <a>
                <button className="btn btn-outline-primary mr-5">
                  Profile
                </button>
              </a>
            </Link>
            <Link href="/login">
              <a>
                <button
                  className="btn btn-outline-primary ml-5"
                  onClick={() => {
                    cookie.remove("token");
                    cookie.remove("user");
                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
