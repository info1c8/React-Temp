import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Новые тенденции на рынке недвижимости 2024",
      excerpt: "Анализ основных трендов и прогнозов развития рынка недвижимости в текущем году.",
      date: "2024-01-15",
      image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"
    },
    {
      id: 2,
      title: "Льготная ипотека: новые условия",
      excerpt: "Обзор изменений в программах льготного ипотечного кредитования.",
      date: "2024-01-10",
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    },
    {
      id: 3,
      title: "Инвестиции в коммерческую недвижимость",
      excerpt: "Почему коммерческая недвижимость остается привлекательным активом для инвестиций.",
      date: "2024-01-05",
      image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Новости и статьи</h2>
          <p className="text-gray-600">Актуальная информация о рынке недвижимости</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('ru-RU')}
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <Link to={`/news/${article.id}`}>
                  <Button variant="outline" className="w-full">
                    Читать далее
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/news">
            <Button size="lg">Все новости</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;