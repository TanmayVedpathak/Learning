import { Link } from "react-router-dom";
import pageList from ".";

function Home() {
  return (
    <div>
      <h2>Home Page</h2>

      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        {pageList.map((page) => (
          <li key={page.title}>
            <Link to={page.path}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
