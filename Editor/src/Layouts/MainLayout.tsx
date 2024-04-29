import { Outlet } from "react-router-dom";
import TopNavBar from "../Components/TopNavBar";

function MainLayout() {
  return (
    <div>
      <TopNavBar></TopNavBar>

      {/* PS: The Outlet is where the children defined in the AppRoute file will be rendered.  */}
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
