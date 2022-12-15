import loading from'../assets/loading.gif';
const Loader = () => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loading} alt="Loading.." className="w-32 h-32 object-contain" />
  </div>
);
export default Loader;
