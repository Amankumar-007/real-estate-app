import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/seller/ListingItem";
import propertiesData from "../components/seller/properties.json"; // Import JSON file

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState([]); // For Sale / For Rent
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [selectedBaths, setSelectedBaths] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSearchTerm(urlParams.get("searchTerm") || "");

    const typeFilter = urlParams.get("type") ? urlParams.get("type").split(",") : [];
    setSelectedType(typeFilter);

    const bedsFilter = urlParams.get("beds") ? urlParams.get("beds").split(",").map(Number) : [];
    setSelectedBeds(bedsFilter);

    const bathsFilter = urlParams.get("baths") ? urlParams.get("baths").split(",").map(Number) : [];
    setSelectedBaths(bathsFilter);

    filterListings(searchTerm, typeFilter, bedsFilter, bathsFilter);
  }, [location.search]);

  const filterListings = (search, typeFilter, bedsFilter, bathsFilter) => {
    let filtered = propertiesData.filter((property) => {
      return (
        (search === "" ||
          property.title.toLowerCase().includes(search.toLowerCase()) ||
          property.location.toLowerCase().includes(search.toLowerCase())) &&
        (typeFilter.length === 0 || typeFilter.includes(property.status.toLowerCase())) &&
        (bedsFilter.length === 0 || bedsFilter.includes(property.beds)) &&
        (bathsFilter.length === 0 || bathsFilter.includes(property.baths))
      );
    });

    setListings(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL();
  };

  const handleFilterChange = (filterType, value) => {
    let updatedFilters;
    if (filterType === "type") {
      updatedFilters = selectedType.includes(value)
        ? selectedType.filter((t) => t !== value)
        : [...selectedType, value];
      setSelectedType(updatedFilters);
    } else if (filterType === "beds") {
      updatedFilters = selectedBeds.includes(value)
        ? selectedBeds.filter((b) => b !== value)
        : [...selectedBeds, value];
      setSelectedBeds(updatedFilters);
    } else if (filterType === "baths") {
      updatedFilters = selectedBaths.includes(value)
        ? selectedBaths.filter((b) => b !== value)
        : [...selectedBaths, value];
      setSelectedBaths(updatedFilters);
    }
    updateURL();
  };

  const updateURL = () => {
    const urlParams = new URLSearchParams();
    if (searchTerm) urlParams.set("searchTerm", searchTerm);
    if (selectedType.length > 0) urlParams.set("type", selectedType.join(","));
    if (selectedBeds.length > 0) urlParams.set("beds", selectedBeds.join(","));
    if (selectedBaths.length > 0) urlParams.set("baths", selectedBaths.join(","));

    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center border rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search by title or location..."
          className="w-full p-3 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-3">Search</button>
      </form>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Property Type Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Property Type</h3>
          <div className="space-y-2">
            {["for sale", "for rent"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedType.includes(type)}
                  onChange={() => handleFilterChange("type", type)}
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Beds Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bedrooms</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((bed) => (
              <label key={bed} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBeds.includes(bed)}
                  onChange={() => handleFilterChange("beds", bed)}
                />
                <span>{bed} Beds</span>
              </label>
            ))}
          </div>
        </div>

        {/* Baths Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bathrooms</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((bath) => (
              <label key={bath} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBaths.includes(bath)}
                  onChange={() => handleFilterChange("baths", bath)}
                />
                <span>{bath} Baths</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Listings Section */}
      <div>
        <h1 className="text-3xl font-semibold mb-4">Listing Results</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.length === 0 ? <p>No properties found.</p> : 
            listings.map((property) => <ListingItem key={property.id} property={property} />)}
        </div>
      </div>
    </div>
  );
}
