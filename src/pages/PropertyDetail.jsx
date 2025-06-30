import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Bed,
  Square,
  Building,
  Phone,
  Mail,
  Heart,
  Share2,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import apiService from '../services/api';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await apiService.getProperty(id);
        setProperty(data);
      } catch (error) {
        console.error('Ошибка загрузки объекта:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
            <div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Объект не найден</h1>
        <Link to="/properties">
          <Button>Вернуться к каталогу</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const getPropertyTypeLabel = (type) => {
    const types = {
      apartment: 'Квартира',
      house: 'Дом',
      commercial: 'Коммерческая недвижимость',
      land: 'Земельный участок'
    };
    return types[type] || type;
  };

  const getTypeLabel = (type) => {
    return type === 'sale' ? 'Продажа' : 'Аренда';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6">
        <Link to="/properties" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative">
          <img
            src={
              property.images?.[currentImageIndex]
                ? `http://localhost:5000${property.images[currentImageIndex]}`
                : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
            }
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {property.images && property.images.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image}`}
                alt={`${property.title} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  {property.address?.city}, {property.address?.district}
                  {property.address?.street && `, ${property.address.street}`}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Badge variant={property.type === 'sale' ? 'default' : 'secondary'}>
              {getTypeLabel(property.type)}
            </Badge>
            <Badge variant="outline">{getPropertyTypeLabel(property.propertyType)}</Badge>
          </div>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            {formatPrice(property.price)} ₽
            {property.type === 'rent' && <span className="text-lg text-gray-500">/мес</span>}
          </div>

          {/* Property Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Характеристики</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Square className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{property.area} м²</div>
                  <div className="text-sm text-gray-600">Площадь</div>
                </div>
                <div className="text-center">
                  <Bed className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{property.rooms}</div>
                  <div className="text-sm text-gray-600">Комнат</div>
                </div>
                {property.floor && (
                  <div className="text-center">
                    <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold">
                      {property.floor}/{property.totalFloors || '?'}
                    </div>
                    <div className="text-sm text-gray-600">Этаж</div>
                  </div>
                )}
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">
                    {new Date(property.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="text-sm text-gray-600">Размещено</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Особенности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Card */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent>
              {property.contact && (
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold">{property.contact.name}</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    {property.contact.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-3 text-gray-600" />
                        <a
                          href={`tel:${property.contact.phone}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {property.contact.phone}
                        </a>
                      </div>
                    )}
                    
                    {property.contact.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-3 text-gray-600" />
                        <a
                          href={`mailto:${property.contact.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {property.contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Написать
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;