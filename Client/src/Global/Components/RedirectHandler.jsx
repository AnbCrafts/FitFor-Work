import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const role = searchParams.get("userAuth");

    if (role === "seeker") {
      navigate(`/seeker/${userId}`);
    } else if (role === "authority") {
      navigate(`/authority/${userId}`);
    }
  }, []);

  return null;
};

export default RedirectHandler