import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Calculator, 
  FileText, 
  Users, 
  Shield, 
  Headphones,
  TrendingUp,
  Key,
  Building
} from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      icon: Home,
      title: "Покупка недвижимости",
      description: "Полное сопровождение процесса покупки от поиска до оформления",
      features: ["Подбор объектов", "Организация просмотров", "Проверка документов", "Сопровождение сделки"],
      link: "/services/buying"
    },
    {
      icon: TrendingUp,
      title: "Продажа недвижимости",
      description: "Эффективная продажа вашей недвижимости по максимальной цене",
      features: ["Оценка стоимости", "Маркетинг объекта", "Поиск покупателей", "Проведение сделки"],
      link: "/services/selling"
    },
    {
      icon: Key,
      title: "Аренда недвижимости",
      description: "Поиск арендаторов и арендодателей, оформление договоров",
      features: ["Поиск объектов", "Проверка арендаторов", "Оформление договоров", "Управление арендой"],
      link: "/services/rental"
    }
  ];

  const additionalServices = [
    {
      icon: Calculator,
      title: "Оценка недвижимости",
      description: "Профессиональная оценка рыночной стоимости объектов",
      price: "от 5,000 ₽"
    },
    {
      icon: FileText,
      title: "Юридические услуги",
      description: "Полное юридическое сопровождение сделок с недвижимостью",
      price: "от 15,000 ₽"
    },
    {
      icon: Users,
      title: "Консультации",
      description: "Персональные консультации по вопросам недвижимости",
      price: "от 2,000 ₽"
    },
    {
      icon: Shield,
      title: "Страхование сделок",
      description: "Защита ваших интересов при совершении сделок",
      price: "от 10,000 ₽"
    },
    {
      icon: Building,
      title: "Коммерческая недвижимость",
      description: "Специализированные услуги для бизнеса",
      price: "по договоренности"
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      description: "Круглосуточная поддержка клиентов",
      price: "бесплатно"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Наши услуги</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Полный спектр услуг в сфере недвижимости для частных лиц и бизнеса
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Основные услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={service.link}>
                    <Button className="w-full">Подробнее</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Дополнительные услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="w-10 h-10 text-blue-600 mb-3" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Badge variant="outline">{service.price}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Как мы работаем</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Консультация</h3>
                <p className="text-gray-600 text-sm">Обсуждаем ваши потребности и цели</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Планирование</h3>
                <p className="text-gray-600 text-sm">Разрабатываем индивидуальную стратегию</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Реализация</h3>
                <p className="text-gray-600 text-sm">Выполняем все необходимые действия</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Результат</h3>
                <p className="text-gray-600 text-sm">Достигаем поставленных целей</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl mb-8">Свяжитесь с нами для получения персональной консультации</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Связаться с нами
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Посмотреть объекты
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;