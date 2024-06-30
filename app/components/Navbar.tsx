import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="navigation-bar-main">
      <Image
        src={`/agribay-transparent.png`}
        alt="none"
        width={240}
        height={240}
      />

      <nav>
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href={`/crop-yield`}>Crop Yield Predict</a>
          </li>
          <li>
            <a href={`/disease-detector`}>Crop Disease Predict</a>
          </li>
          <li>
            <Link href={`/weather`}>Weather API</Link>
          </li>
        </ul>
      </nav>

      <div className="login-button">
        <button>Login</button>
      </div>
    </div>
  );
}

export default Navbar;
