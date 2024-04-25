import defaultLogo from "../assets/logo.png";
function TopNavBar() {
  return (
      <div className="w-full shadow-md bg-white p-4 " style={{ position: "absolute", top: "0", left: "0" }}>
          <img src={defaultLogo}></img>
    </div>
  );
}

export default TopNavBar;
