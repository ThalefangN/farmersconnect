import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const shopProducts = {
  1: {
    name: "BAMB",
    products: [
      {
        id: 1,
        name: "Premium Fertilizer",
        description: "High-quality fertilizer for optimal crop growth",
        price: "BWP 250.00",
        image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
      },
      {
        id: 2,
        name: "Maize Seeds",
        description: "Certified hybrid maize seeds for better yields",
        price: "BWP 180.00",
        image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"
      },
      {
        id: 3,
        name: "Pesticide Spray",
        description: "Effective pest control solution",
        price: "BWP 320.00",
        image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"
      }
    ]
  },
  2: {
    name: "Seedco",
    products: [
      {
        id: 1,
        name: "Sorghum Seeds",
        description: "Drought-resistant sorghum variety",
        price: "BWP 200.00",
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
      },
      {
        id: 2,
        name: "Organic Manure",
        description: "Natural soil enrichment solution",
        price: "BWP 150.00",
        image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
      }
    ]
  }
} as const;

type ShopId = keyof typeof shopProducts;

const ShopProducts = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const shop = shopId && (parseInt(shopId) as ShopId) in shopProducts 
    ? shopProducts[parseInt(shopId) as ShopId] 
    : null;

  if (!shop) {
    return <div className="p-4">Shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">{shop.name} Products</h1>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center"
            onClick={() => navigate('/marketplace/shops')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid gap-6">
          {shop.products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl text-green-800">{product.name}</CardTitle>
                <CardDescription className="text-green-600">{product.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Contact Shop
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ShopProducts;