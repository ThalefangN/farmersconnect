import { Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const sponsoredShops = [
  {
    id: 1,
    name: "BAMB (Botswana Agricultural Marketing Board)",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Your trusted partner in agricultural products and services. Offering quality seeds, fertilizers, and farming equipment.",
    location: "Nationwide"
  },
  {
    id: 2,
    name: "Seedco Botswana",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    description: "Leading supplier of certified seed varieties and agricultural solutions for farmers across Botswana.",
    location: "Gaborone"
  },
  {
    id: 3,
    name: "Farmers World",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    description: "One-stop shop for all your farming needs. Quality agricultural inputs and expert advice.",
    location: "Francistown"
  },
  {
    id: 4,
    name: "Agri Solutions Botswana",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    description: "Providing innovative agricultural solutions and products to enhance farm productivity.",
    location: "Maun"
  }
];

const SponsoredShops = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <Store className="h-6 w-6 text-green-700" />
          <h1 className="text-2xl font-bold text-green-800">Sponsored Agri Shops</h1>
        </div>

        <p className="text-gray-600">
          Explore our trusted agricultural partners offering quality products and services for your farming needs.
        </p>

        <div className="grid gap-6">
          {sponsoredShops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-all">
              <img 
                src={shop.image} 
                alt={shop.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl text-green-800">{shop.name}</CardTitle>
                <CardDescription className="text-green-600">{shop.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => navigate(`/marketplace/shops/${shop.id}/products`)}
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
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

export default SponsoredShops;