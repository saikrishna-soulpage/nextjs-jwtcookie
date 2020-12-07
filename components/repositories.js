import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Repository({ item }) {
  //   console.log(item);
  return (
    <div className="text-center">
      <li>
        <p>
          <a href={item.html_url}>{item.name}</a>
        </p>
      </li>
    </div>
  );
}
