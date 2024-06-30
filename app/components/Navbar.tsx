import Image from "next/image";

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
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Crop Yield Predict</a>
          </li>
          <li>
            <a href="#">Crop Disease Predict</a>
          </li>
          <li>
            <a href="#">Weather API</a>
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
