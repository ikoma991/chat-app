import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({
  user,
  redirectPath = '/signin',
  children,
}) => {
  if (Object.keys(user).length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;