import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { handleClickCategoria, categoriaActual } = useQuiosco();
  const { icono, id, nombre } = categoria;

  return (
    <div
      className={`flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer ${
        categoriaActual.id === id ? "bg-amber-400" : "bg-white"
      }`}
      onClick={() => handleClickCategoria(categoria)}
    >
      <img
        src={`/img/icono_${icono}.svg`}
        alt="imagen icono"
        className="w-12"
      />
      <p className="text-lg font-bold cursor-pointer truncate">{nombre}</p>
    </div>
  );
};

export default Categoria;
