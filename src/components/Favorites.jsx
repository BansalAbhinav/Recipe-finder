import ReceiptCard from "./ReceiptCard";
import { getRandomColor } from "./util/Util";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return (
    <div className=" bg-[#faf9fb] flex-1  p-10  min-h-screen ">
      <div className=" max-w-screen-lg mx-auto ">
        <p className="font-bold test-3xl md:text-5xl my-4 ">My Favorites</p>

        {favorites.length === 0 && (
          <div className="h-[80vh] flex flex-col  items-center  gap-4 ">
            <img src="/404.svg" alt="440image" className="h-3/4" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe) => {
            return (
              <ReceiptCard
                key={recipe.name}
                recipe={recipe}
                {...getRandomColor()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
