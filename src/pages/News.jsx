import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, ArrowRight, Search, Clock } from 'lucide-react';

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Все новости' },
    { id: 'market', name: 'Рынок недвижимости' },
    { id: 'legal', name: 'Законодательство' },
    { id: 'tips', name: 'Советы' },
    { id: 'company', name: 'Новости компании' }
  ];

  const news = [
    {
      id: 1,
      title: "Новые тенденции на рынке недвижимости 2024",
      excerpt: "Анализ основных трендов и прогнозов развития рынка недвижимости в текущем году. Эксперты прогнозируют стабилизацию цен и рост спроса на загородную недвижимость.",
      content: "Полный анализ рынка недвижимости показывает...",
      date: "2024-01-15",
      category: "market",
      image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
      readTime: "5 мин"
    },
    {
      id: 2,
      title: "Льготная ипотека: новые условия",
      excerpt: "Обзор изменений в программах льготного ипотечного кредитования. Рассматриваем новые возможности для молодых семей и участников специальных программ.",
      content: "Правительство объявило о новых условиях...",
      date: "2024-01-10",
      category: "legal",
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      readTime: "7 мин"
    },
    {
      id: 3,
      title: "Инвестиции в коммерческую недвижимость",
      excerpt: "Почему коммерческая недвижимость остается привлекательным активом для инвестиций. Анализ доходности и рисков различных типов коммерческих объектов.",
      content: "Коммерческая недвижимость продолжает привлекать инвесторов...",
      date: "2024-01-05",
      category: "market",
      image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
      readTime: "6 мин"
    },
    {
      id: 4,
      title: "Как правильно оценить квартиру перед покупкой",
      excerpt: "Практические советы по оценке недвижимости. На что обратить внимание при осмотре квартиры и как не переплатить за объект.",
      content: "При покупке квартиры важно учитывать множество факторов...",
      date: "2024-01-03",
      category: "tips",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      readTime: "4 мин"
    },
    {
      id: 5,
      title: "НедвижимостьПро открывает новый офис",
      excerpt: "Мы рады сообщить об открытии нашего нового офиса в центре города. Теперь наши клиенты могут получить консультации в еще более удобном месте.",
      content: "Компания НедвижимостьПро продолжает расширяться...",
      date: "2024-01-01",
      category: "company",
      image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
      readTime: "3 мин"
    },
    {
      id: 6,
      title: "Изменения в налогообложении недвижимости",
      excerpt: "Обзор новых изменений в налоговом законодательстве, касающихся недвижимости. Что нужно знать собственникам и покупателям.",
      content: "С нового года вступают в силу изменения...",
      date: "2023-12-28",
      category: "legal",
      image: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
      readTime: "8 мин"
    }
  ];

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      market: 'bg-blue-100 text-blue-800',
      legal: 'bg-green-100 text-green-800',
      tips: 'bg-yellow-100 text-yellow-800',
      company: 'bg-purple-100 text-purple-800'
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Новости и статьи</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Актуальная информация о рынке недвижимости, законодательстве и полезные советы
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Поиск по новостям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredNews.length > 0 && (
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={filteredNews[0].image}
                  alt={filteredNews[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <Badge className={`mb-3 ${getCategoryColor(filteredNews[0].category)}`}>
                  {getCategoryName(filteredNews[0].category)}
                </Badge>
                <h2 className="text-2xl font-bold mb-3">{filteredNews[0].title}</h2>
                <p className="text-gray-600 mb-4">{filteredNews[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(filteredNews[0].date).toLocaleDateString('ru-RU')}
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    {filteredNews[0].readTime}
                  </div>
                  <Link to={`/news/${filteredNews[0].id}`}>
                    <Button>
                      Читать далее
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.slice(1).map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(article.category)}`}>
                  {getCategoryName(article.category)}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('ru-RU')}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  {article.readTime}
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

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Новости не найдены</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }} 
              className="mt-4"
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;