import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title?: string;
  name?: string;
  type?: string;
  price?: number;
  location?: string;
}

interface SearchResultsProps {
  products: SearchResult[];
  equipment: SearchResult[];
  seeds: SearchResult[];
  land: SearchResult[];
  onResultClick: () => void;
}

const SearchResults = ({ products, equipment, seeds, land, onResultClick }: SearchResultsProps) => {
  const navigate = useNavigate();

  const handleResultClick = (type: string, id: string) => {
    onResultClick();
    switch (type) {
      case 'product':
        navigate(`/marketplace/products/${id}`);
        break;
      case 'equipment':
        navigate(`/marketplace/equipment/${id}`);
        break;
      case 'seed':
        navigate(`/resources/seeds/${id}`);
        break;
      case 'land':
        navigate(`/resources/land/${id}`);
        break;
    }
  };

  return (
    <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto">
      <div className="p-2 space-y-2">
        {products.length > 0 && (
          <div>
            <h3 className="font-semibold px-2 py-1">Products</h3>
            {products.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => handleResultClick('product', item.id)}
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">
                  {item.location} • BWP {item.price}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {equipment.length > 0 && (
          <div>
            <h3 className="font-semibold px-2 py-1">Equipment</h3>
            {equipment.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => handleResultClick('equipment', item.id)}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">
                  {item.location} • BWP {item.price}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {seeds.length > 0 && (
          <div>
            <h3 className="font-semibold px-2 py-1">Seeds</h3>
            {seeds.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => handleResultClick('seed', item.id)}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">
                  {item.location} • BWP {item.price}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {seeds.length > 0 && (
          <div>
            <h3 className="font-semibold px-2 py-1">Land</h3>
            {land.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => handleResultClick('land', item.id)}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">{item.location}</div>
              </div>
            ))}
          </div>
        )}
        
        {[products, equipment, seeds, land].every(arr => arr.length === 0) && (
          <div className="p-4 text-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;