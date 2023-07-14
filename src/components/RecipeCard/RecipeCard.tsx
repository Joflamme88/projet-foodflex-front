import { Plus, Heart } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface CardProps {
  name: string;
  imageUrl: string;
}

function RecipeCard({ name, imageUrl }: CardProps) {
  const stateHome = useAppSelector((state) => state.home.stateHome);
  return (
    <Link
      to="/recipe"
      className="shadow-md rounded-lg relative hover:shadow-lg transition-all"
    >
      <img src={imageUrl} alt={name} className="rounded-t-md cover" />
      <div className="text-bgff absolute top-2 right-1 ">
        <div
          className={`card-actions justify-end bg-t ${
            stateHome ? 'hidden' : ''
          }`}
        >
          <button
            type="button"
            className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
          >
            <Heart size={20} />
          </button>
          <button
            type="button"
            className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="rounded-b-lg">
        <h2 className="text-fourthff font-bold p-2 text-center truncate">
          {name}
        </h2>
      </div>
    </Link>
  );
}

export default RecipeCard;