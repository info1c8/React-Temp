import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Square, Heart, Phone, Mail, Calendar } from 'lucide-react';

const PropertyListView = ({ property }) => {
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
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-80 h-48 md:h-auto">
            <img
              src={property.images?.[0] ? `http://localhost:5000${property.images[0]}` : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant={property.type === 'sale' ? 'default' : 'secondary'}>
                {getTypeLabel(property.type)}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            >
              <Heart className="w-4 h-4" />
            </Button>
            {property.images && property.images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                +{property.images.length - 1} фото
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {property.address?.city}, {property.address?.district}
                        {property.address?.metro && `, м. ${property.address.metro}`}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price)} ₽
                    </div>
                    {property.type === 'rent' && (
                      <div className="text-sm text-gray-500">/мес</div>
                    )}
                    {property.area && (
                      <div className="text-sm text-gray-500 mt-1">
                        {Math.round(property.price / property.area).toLocaleString()} ₽/м²
                      </div>
                    )}
                  </div>
                </div>

                {/* Characteristics */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.area} м²
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.rooms} комн.
                  </div>
                  {property.floor && (
                    <div>
                      {property.floor}/{property.totalFloors || '?'} этаж
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{getPropertyTypeLabel(property.propertyType)}</Badge>
                  {property.features?.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {property.features?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.features.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                  {property.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(property.createdAt).toLocaleDateString('ru-RU')}
                </div>
                
                <div className="flex items-center space-x-2">
                  {property.contact?.phone && (
                    <Button variant="outline" size="sm">
                      <Phone className="w-3 h-3 mr-1" />
                      Позвонить
                    </Button>
                  )}
                  <Link to={`/property/${property._id}`}>
                    <Button size="sm">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyListView;