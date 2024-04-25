import { Outlet } from "react-router-dom";
import TopNavBar from "../Components/TopNavBar";

function MainLayout() {
  return (
      <div>
          <TopNavBar></TopNavBar>
      <div>Hello Main Layout</div>
      {/* PS: The Outlet is where the children defined in the AppRoute file will be rendered.  */}
      <Outlet />
    </div>
  );
}

export default MainLayout;
