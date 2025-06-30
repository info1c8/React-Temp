import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Square, Heart } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const getPropertyTypeLabel = (type) => {
    const types = {
      apartment: 'Квартира',
      house: 'Дом',
      commercial: 'Коммерческая',
      land: 'Участок'
    };
    return types[type] || type;
  };

  const getTypeLabel = (type) => {
    return type === 'sale' ? 'Продажа' : 'Аренда';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={property.images?.[0] ? `http://localhost:5000${property.images[0]}` : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={property.type === 'sale' ? 'default' : 'secondary'}>
            {getTypeLabel(property.type)}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
        </div>
        
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {formatPrice(property.price)} ₽
          {property.type === 'rent' && <span className="text-sm text-gray-500">/мес</span>}
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.address?.city}, {property.address?.district}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area} м²
          </div>
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.rooms} комн.
          </div>
        </div>
        
        <div className="mt-2">
          <Badge variant="outline">{getPropertyTypeLabel(property.propertyType)}</Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/property/${property._id}`} className="w-full">
          <Button className="w-full">Подробнее</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;