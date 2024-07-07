import { createContext, useEffect, useState } from "react";
import { categorias as categoriasDB } from "../data/categorias";
import { toast } from "react-toastify";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categoriasDB[0]);
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
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export default QuioscoContext;
