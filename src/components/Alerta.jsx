const Alerta = ({ children }) => {
  return (
    <div className="text-center my-2 bg-red-600 font-bold p-3 uppercase text-white text-sm">
      {children}
    </div>
  );
};

export default Alerta;
