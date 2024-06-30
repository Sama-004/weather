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
            {/* <a href="/">Dashboard</a> */}
            <Link href={`/`}>Dashboard</Link>
          </li>
          {/* <li> */}
          {/* <a href="">Crop Yield Predict</a> */}
          {/* <Link href={`/crop-yield`}>Weather API</Link> */}
          {/* </li> */}
          <li>
            {/* <a href="#">Crop Disease Predict</a> */}
            <Link href={`/disease-detector`}>Crop Disease Predict</Link>
          </li>
          <li>
            <Link href={`/weather`}>Weather API</Link>
          </li>
        </ul>
      </nav>

      <div className="login-button">
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
