import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  const { data: user, error, mutate, isLoading } = useSWR("/api/user", () =>
    clienteAxios("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const login = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const registro = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/registro", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();

    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined);

    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware === 'guest' && url && user && !isLoading) {
      navigate(url);
    }
    if (middleware === 'auth' && !user && !isLoading) {
      navigate('/auth/login');
    }
  }, [user, error]);


  return {
    login,
    registro,
    logout,
    isLoading,
    user,
    error
  };
};