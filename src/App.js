import Gallery from "./components/Gallery";

function App() {
  return (
    <main className="bg-slate-300">
      <div className="max-w-[1300px] mx-auto ">
        <div className="flex justify-center items-center min-h-screen">
          {/* Call The Main Gallery components for showing full Gallery */}
          <Gallery />
        </div>
      </div>
    </main>
  );
}

export default App;
