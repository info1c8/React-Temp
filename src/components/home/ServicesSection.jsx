import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Calculator, FileText, Users, Shield, Headphones } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: "Подбор недвижимости",
      description: "Поможем найти идеальный объект под ваши требования и бюджет"
    },
    {
      icon: Calculator,
      title: "Оценка стоимости",
      description: "Профессиональная оценка рыночной стоимости недвижимости"
    },
    {
      icon: FileText,
      title: "Юридическое сопровождение",
      description: "Полное юридическое сопровождение сделок купли-продажи"
    },
    {
      icon: Users,
      title: "Консультации экспертов",
      description: "Персональные консультации от опытных риелторов"
    },
    {
      icon: Shield,
      title: "Безопасные сделки",
      description: "Гарантируем безопасность и прозрачность всех операций"
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      description: "Круглосуточная поддержка клиентов на всех этапах"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
          <p className="text-gray-600">Полный спектр услуг в сфере недвижимости</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;