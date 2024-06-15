const CreationBar = () => {
  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="flex w-full max-w-screen-xl sm:w-3/5 rounded-lg overflow-hidden">
        <input
          type="text"
          className="flex-grow px-4 py-2 focus:outline-none text-black"
          placeholder="Create a MTG Card..."
        />
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 focus:outline-none">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreationBar;
