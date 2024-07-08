import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  const handleClickCategoria = (categoria) => {
    setCategoriaActual(categoria);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  // eslint-disable-next-line no-unused-vars
  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    const productoEnPedido = pedido.find(
      (pedidoState) => pedidoState.id === producto.id
    );
    if (productoEnPedido) {
      productoEnPedido.cantidad = producto.cantidad;
      toast.success("Producto actualizado en el pedido");
      setPedido([...pedido]);
    } else {
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }
  };

  const handleEliminarProducto = (id) => {
    const nuevoPedido = pedido.filter((producto) => producto.id !== id);
    setPedido(nuevoPedido);
    toast.success("Producto eliminado del pedido");
  };

  const obtenerCategorias = async () => {
    try {
      const { data } = await clienteAxios.get("/api/categorias");
      setCategorias(data.data);
      setCategoriaActual(data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitNuevaOrden = async (logout) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(
        "/api/pedidos",
        {
          total,
          productos: pedido.map((p) => {
            return {
              id: p.id,
              cantidad: p.cantidad,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setTimeout(() => {
        setPedido([]);
      }, 1000);

      setTimeout(() => {
        logout();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const total = pedido.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);
    setTotal(total);
  }, [pedido]);

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
        handleEliminarProducto,
        total,
        handleSubmitNuevaOrden,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export default QuioscoContext;
