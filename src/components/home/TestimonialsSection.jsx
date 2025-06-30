import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Анна Петрова",
      role: "Покупатель квартиры",
      content: "Отличный сервис! Помогли найти квартиру мечты за короткое время. Все этапы сделки прошли гладко.",
      rating: 5,
      avatar: "АП"
    },
    {
      name: "Михаил Сидоров",
      role: "Продавец дома",
      content: "Профессиональный подход к продаже недвижимости. Дом продали быстро и по хорошей цене.",
      rating: 5,
      avatar: "МС"
    },
    {
      name: "Елена Козлова",
      role: "Арендатор",
      content: "Нашли отличную квартиру для аренды. Менеджеры очень отзывчивые и помогли с оформлением.",
      rating: 5,
      avatar: "ЕК"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Отзывы клиентов</h2>
          <p className="text-gray-600">Что говорят о нас наши клиенты</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;