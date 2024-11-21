import { Search } from "lucide-react";
import ReceiptCard from "./ReceiptCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "./util/Util";

const url =
  "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=pasta"; // static URl
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "911a92de24msh25739b5004b3217p1974b7jsn5bc4a0966f82",
    "x-rapidapi-host": "tasty.p.rapidapi.com",
  },
};

const HomePage = () => {
  const [recipe, setrecipe] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchRecipies = async (searchQuery) => {
    setloading(true);
    setrecipe([]);
    try {
      const dynamic_URL = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${searchQuery}`;
      const response = await fetch(dynamic_URL, options);
      const result = await response.json();
      setrecipe(result.results);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchRecipies("pizza");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipies(e.target[0].value);
  };
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto ">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2 ">
            <Search size={24} />
            <input
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today...?"
            ></input>
          </label>
        </form>
        <h1 className="font-bold text-3xl  md:text-5xl mt-4 ">
          {" "}
          Recommeded Recipes
        </h1>
        <p className=" text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular Choices
        </p>
        <div className=" grid gap-3  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {!loading &&
            recipe.map((recipe, index) => {
              return (
                <ReceiptCard
                  key={index}
                  recipe={recipe}
                  {...getRandomColor()}
                />
              );
            })}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex w-52 flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
