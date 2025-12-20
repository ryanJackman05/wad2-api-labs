import { useContext } from "react"; 
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from './contexts/authContext'

const ProtectedRoutes = () => {

  const context = useContext(AuthContext);
  const location = useLocation();

  return context.isAuthenticated === true ? (
    <Outlet /> // Outlet renders/returns the child elements of this protected route, i.e: the tasks route that will be underneath this component in App.jsx
  ) : (
    <Navigate to='/login' replace state={{ from: location }}/>
  );
};

export default ProtectedRoutes;
