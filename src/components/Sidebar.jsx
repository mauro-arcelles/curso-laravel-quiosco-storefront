import useQuiosco from "../hooks/useQuiosco";
import Categoria from "../components/Categoria";

const Sidebar = () => {
  const { categorias } = useQuiosco();

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="img/logo.svg" alt="imagen logo" className="w-40" />
      </div>

      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
