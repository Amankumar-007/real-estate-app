import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ListingItem = ({ property }) => {
    const { user, addToFavorites } = useContext(AuthContext);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (user) {
            setIsFavorited(!isFavorited);
            addToFavorites(property);
        } else {
            alert("Please login to save properties.");
        }
    };

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] relative">
            <Link to={`/property/${property.id}`}>
                <img
                    src={property.image}
                    alt="Property Cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">
                        {property.title}
                    </p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-700" />
                        <p className="text-sm text-gray-600 truncate w-full">
                            {property.location}
                        </p>
                    </div>
                    <p className="text-sm text-gray-600">{property.size}</p>
                    <p className="text-sm text-gray-600">{property.pricePerSqft}</p>
                    <p className="text-slate-500 mt-2 font-semibold">{property.price}</p>
                </div>
            </Link>

            <button
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 text-red-500 text-xl"
            >
                {isFavorited ? <FaHeart /> : <FaRegHeart />}
            </button>

            <Link 
                to={`/payment/${property.id}`} 
                className="block bg-blue-600 text-white text-center py-2 rounded-b-lg hover:bg-blue-700 transition-colors"
            >
                Buy Now
            </Link>
        </div>
    );
};

ListingItem.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        beds: PropTypes.number.isRequired,
        baths: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        pricePerSqft: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
};

export default ListingItem;
