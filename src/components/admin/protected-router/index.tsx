import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import NotPermitted from "./not-permission";

const RoleBaseRoute = (props: any) => {
  const user = useAppSelector((state) => state.account.user);
  const userRole = user.role;

  if (userRole !== "USER") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props: any) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
