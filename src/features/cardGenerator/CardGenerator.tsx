import { Card } from "./card/Card";
import CreationBar from "./creationBar/CreationBar";
import { FaDownload, FaSave } from "react-icons/fa";

const CardGenerator = () => (
  <>
    <CreationBar />
    <Card isLoading={false} />
    <div className="flex justify-center mt-4 space-x-4">
      <button className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg focus:outline-none w-40">
        <FaDownload className="mr-2" /> Descargar
      </button>
      <button className="flex items-center justify-center bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none w-40">
        <FaSave className="mr-2" /> Guardar
      </button>
    </div>
  </>
);
export { CardGenerator };
