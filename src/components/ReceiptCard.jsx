import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState } from "react";
const ReceiptCard = ({ recipe, bg, badge }) => {
  console.log(recipe);
  const [isFavourite, setisFavourite] = useState(
    localStorage.getItem("favorites")?.includes(recipe?.name)
  );
  const addrecipetofavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isrecipeinfav = favorites.some((fav) => fav.name === recipe.name);

    if (isrecipeinfav) {
      favorites = favorites.filter((fav) => fav.name !== recipe.name);
      setisFavourite(false);
    } else {
      favorites.push(recipe);
      setisFavourite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  const cuisineTag = recipe.tags.find((tag) => tag.root_tag_type === "cuisine");
  const firstHealthyTagName = recipe.tags.find(
    (tag) => tag.parent_tag_name === "healthy"
  )?.name;

  const firstDietaryTagName = recipe.tags.find(
    (tag) => tag.parent_tag_name === "dietary"
  )?.name;

  const firstavoidTagName = recipe.tags.find(
    (tag) => tag.parent_tag_name === "ingredients_to_avoid"
  )?.name;

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.name} recipe`}
        target="_blank"
        className=" relative h-32 "
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.thumbnail_url}
          alt="recipeImage"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        ></img>
        <div
          className="absolute bottom-2 left-2 bg-white rounded-full cursor-pointer p-1 flex items-center
          gap-1 text-sm "
        >
          <Soup size={16} /> {recipe.yields.replace(/:/g, " ")}
        </div>
        <div
          className="absolute top-1 right-2 bg-white rounded-full cursor-pointer p-1  gap-1 text-sm"
          onClick={(e) => {
            e.preventDefault();
            addrecipetofavorite();
          }}
        >
          {!isFavourite && (
            <Heart
              size={16}
              className="hover:fill-red-500 hover:text-red-500"
            />
          )}
          {isFavourite && (
            <Heart size={16} className="fill-red-500 text-red-500" />
          )}
        </div>
      </a>
      <div className=" flex  mt-1 ">
        <p className=" font-bold tracking-wide">{recipe.name}</p>
      </div>
      <p className="my-2">
        {cuisineTag
          ? cuisineTag.name
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
          : "No Cuisine tag found"}
      </p>
      <div className="flex gap-2  mt-auto ">
        <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
          <HeartPulse size={16} />
          <span className=" text-sm tracking-tighter font-semibold ">
            {recipe.tags.find(
              (tag) =>
                tag.parent_tag_name === "healthy" ||
                tag.parent_tag_name === "dietary" ||
                tag.parent_tag_name === "ingredients_to_avoid"
            )?.name || "No healthy tag found"}
          </span>
        </div>
        <div className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
          <HeartPulse size={16} />
          <span className=" text-sm tracking-tighter font-semibold ">
            {recipe.tags.find(
              (tag) =>
                (tag.parent_tag_name === "healthy" &&
                  tag.name !== firstHealthyTagName) ||
                (tag.parent_tag_name === "dietary" &&
                  tag.name !== firstDietaryTagName) ||
                (tag.parent_tag_name === "ingredients_to_avoid" &&
                  tag.name !== firstavoidTagName)
            )?.name || "No healthy tag found"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ReceiptCard;
