import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <div>Hello Main Layout</div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
