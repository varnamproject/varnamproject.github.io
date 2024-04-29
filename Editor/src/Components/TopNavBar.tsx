import { FaGithub } from "react-icons/fa";
import defaultLogo from "../assets/logo.png";
function TopNavBar() {
     const redirectToRepo = () => {
    const externalURL = 'https://github.com/varnamproject';
    window.open(externalURL, '_blank');
  };

  return (
      <div className="w-full shadow-md bg-white p-4 flex justify-between" style={{ position: "absolute", top: "0", left: "0" }}>
          <img src={defaultLogo}></img>
          <FaGithub className="text-3xl mr-2 mt-2 cursor-pointer" onClick={redirectToRepo}></FaGithub>
    </div>
  );
}

export default TopNavBar;
