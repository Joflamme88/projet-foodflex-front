import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipeDetails } from '../../store/reducers/recipeDetails';
import '../RecipeCard/RecipeCard.css';
import IngredientsList from './ingredient';
import HeartFavori from '../RecipeCard/HeartFavori/HeartFavori';
import AddScheduleButton from '../RecipeCard/AddScheduleButton/AddScheduleButton';

function Recipe() {
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  // Effect to handle the scroll behavior when the modal is open
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (modalIsOpen) {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    };

    // Add or remove the scroll event listener based on modalIsOpen
    if (modalIsOpen) {
      document.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.removeEventListener('scroll', handleScroll);
    }
    // Clean up the effect
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('scroll', handleScroll);
    };
  }, [modalIsOpen]);

  // Get the 'id' parameter from the URL using useParams
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('No id provided');
  }
  const dispatch = useAppDispatch();

  // Fetch recipe details using the 'id'
  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [dispatch, id]);

  // Get the recipe details from the store
  const recipe = useAppSelector((state) => state.recipeDetails.recipe);

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  // If recipe details are not available, show a loading spinner
  if (!recipe) {
    return (
      <div className="flex justify-center mt-20">
        <div className="loading loading-ring flex justify-center align-middle w-36" />
      </div>
    );
  }

  // Render the recipe details
  return (
    <div className="container mx-auto p-4 ">
      <div
        className={`bg-bgff relative mb-20 ${
          modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
        } `}
      >
        <div className="flex flex-col items-center ">
          <div className="flex items-center justify-between w-full max-w-2xl">
            <h1 className="text-4xl text-titleff font-bold my-4 md:my-8">
              {recipe.name}
            </h1>
            <div className="flex text-white min-w-max">
              <div className="m-1">
                <HeartFavori
                  recipe={{
                    id: Number(id),
                    name: recipe.name,
                    position: 1,
                    image: recipe.imageUrl,
                    idDbMeal: recipe.id,
                  }}
                />
              </div>
              <div className="m-1 ">
                <AddScheduleButton
                  recipe={{
                    id: Number(id),
                    idDbMeal: recipe.id,
                    image: recipe.imageUrl,
                    name: recipe.name,
                    position: 1,
                  }}
                />
              </div>
            </div>
          </div>
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="rounded-lg flex md:max-w-2xl"
          />
        </div>
        <h2 className="text-3xl font-bold text-titleff mt-10 mb-4 md:m-10 text-center">
          Meal Preparation
        </h2>
        <div className="flex flex-col md:flex-row">
          {/* Display the ingredient list in a column on mobile and in a row on larger screens */}
          <div className="md:hidden md:w-1/3 md:pl-8">
            <IngredientsList
              ingredients={recipe.ingredients}
              mesures={recipe.mesures}
            />
          </div>
          <div className="md:w-2/3 md:pr-8 pt-4 md:p-0">
            <h2 className="text-xl font-bold text-titleff mt-10 mb-4 md:my-10 ">
              Instructions:
            </h2>
            {/* Render the recipe instructions */}
            <div className="prose lg:prose-lg">
              {recipe.instruction.split('\n').map((line) => (
                <p className="text-gray-500" key={uuidv4()}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          {/* Display the ingredient list in a column on larger screens */}
          <div className="hidden md:block md:w-1/3  ">
            <IngredientsList
              ingredients={recipe.ingredients}
              mesures={recipe.mesures}
            />
          </div>
        </div>

        {/* Display the step-by-step video guide if available */}
        {recipe.videoUrl && (
          <>
            <h2 className="text-3xl font-bold mt-10 mb-4 md:m-10 text-titleff text-center">
              Step-by-Step Video Guide
            </h2>
            <div className="py-4 flex justify-center">
              <ReactPlayer url={recipe.videoUrl} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recipe;
