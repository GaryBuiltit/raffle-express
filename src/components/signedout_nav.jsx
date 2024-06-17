import { Link } from "react-router-dom";

export default function SignedOutNav() {
  const logo =
    "https://firebasestorage.googleapis.com/v0/b/raffle-express.appspot.com/o/Raffle%20Express%20landing%20nav%20strip.png?alt=media&token=fa7db83a-b69f-42cb-9129-14ea8024f4b7";

  const hamMenuBtn = document.getElementById("menu-btn");
  const hamMenu = document.getElementById("menu");

  const menuHandler = () => {
    hamMenuBtn.classList.toggle("open");
    hamMenu.classList.toggle("hidden");
    hamMenu.classList.toggle("flex");
  };

  return (
    <nav className="relative container mx-2 md:mx-auto">
      <div id="nav" className="px-2 flex items-center justify-between">
        <button className="pt-2">
          <Link to={"/"}>
            <img src={logo} alt="Raffle Express Logo" className="h-16" />
          </Link>
        </button>

        <div className="hidden md:flex text-white space-x-4 items-center text-2xl">
          {/* <a
           href=""
           className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
         >
           <h2 className="font-libreFranklin">How It Works</h2>
         </a> */}
          {/* <a
           href=""
           className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
         >
           <h2 className="font-libreFranklin">Pricing</h2>
         </a> */}
          <Link
            to={"/sign-in"}
            className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
          >
            <h2 className="font-libreFranklin">Login</h2>
          </Link>
          {/* <a
           href=""
           className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
         >
           <h2 className="font-libreFranklin">Login</h2>
         </a> */}

          <button
            id="signup-btn"
            type="button"
            className="rounded-full border-4 px-4 py-1 font-bold bg-gradient-to-r from-btn-gold to-btn-orange hover:scale-110 transition duration-300"
          >
            <Link to={"/sign-up"}>Sign Up</Link>
          </button>
        </div>

        <button
          id="menu-btn"
          className="block hambuger mr-2 md:hidden focus:outline-none"
          onClick={menuHandler}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <div className="md:hidden">
        <div
          id="menu"
          className="absolute rounded-md flex-col hidden items-center self-end py-8 mt-6 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
        >
          <a href="#">Pricing</a>
          <a href="#">Product</a>
        </div>
      </div>
    </nav>
  );
}
