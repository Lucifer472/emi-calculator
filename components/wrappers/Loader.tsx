import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0">
      <div className="fixed top-0 left-0 w-full h-screen z-10 bg-black opacity-60"></div>
      <div className="z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 fixed w-[350px] h-[250px] bg-white rounded-md">
        <div className="w-full h-[250px] flex items-center justify-center flex-col gap-y-8">
          <h2 className="text-xl font-medium">Loading...</h2>
          <ClipLoader
            cssOverride={{
              borderWidth: "6px",
            }}
            size={60}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
