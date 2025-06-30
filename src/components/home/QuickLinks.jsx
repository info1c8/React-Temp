import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Building, MapPin, TrendingUp } from 'lucide-react';

const QuickLinks = () => {
  const links = [
    {
      to: "/properties?type=sale&propertyType=apartment",
      icon: Home,
      title: "Купить квартиру",
      description: "Большой выбор квартир"
    },
    {
      to: "/properties?type=rent&propertyType=apartment",
      icon: Building,
      title: "Снять квартиру",
      description: "Аренда на любой срок"
    },
    {
      to: "/properties?type=sale&propertyType=house",
      icon: MapPin,
      title: "Купить дом",
      description: "Частные дома и коттеджи"
    },
    {
      to: "/properties?propertyType=commercial",
      icon: TrendingUp,
      title: "Коммерческая",
      description: "Офисы и торговые помещения"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <Link key={index} to={link.to}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <link.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">{link.title}</h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;