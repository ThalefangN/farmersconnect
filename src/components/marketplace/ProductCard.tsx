import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import OrderForm from "./OrderForm";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  quantity: number;
  unit_type: string;
  location: string;
  image_url: string | null;
  user_id: string;
  seller?: {
    full_name: string | null;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + change, product.quantity)));
  };

  return (
    <>
      <Card className="overflow-hidden">
        {product.image_url && (
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        )}
        <CardHeader>
          <CardTitle className="text-xl text-green-800">{product.title}</CardTitle>
          <CardDescription className="text-green-600">{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">
              <strong>Price:</strong> BWP {product.price} per {product.unit_type}
            </p>
            <p className="text-gray-600">
              <strong>Available:</strong> {product.quantity} {product.unit_type}
            </p>
            <p className="text-gray-600">
              <strong>Seller:</strong> {product.seller?.full_name || "Anonymous"}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {product.location}
            </p>
            
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-gray-600"><strong>Quantity:</strong></span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-gray-600 font-semibold mt-2">
              <strong>Total:</strong> BWP {(product.price * quantity).toFixed(2)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => setIsOrderFormOpen(true)}
            >
              Purchase
            </Button>
            <Button variant="outline" className="flex-1">
              Contact Seller
            </Button>
          </div>
        </CardContent>
      </Card>

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        product={product}
        selectedQuantity={quantity}
      />
    </>
  );
};

export default ProductCard;