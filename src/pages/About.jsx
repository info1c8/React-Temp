import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Clock, Shield } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Users,
      title: "5000+",
      description: "Довольных клиентов"
    },
    {
      icon: Award,
      title: "10 лет",
      description: "На рынке недвижимости"
    },
    {
      icon: Clock,
      title: "24/7",
      description: "Поддержка клиентов"
    },
    {
      icon: Shield,
      title: "100%",
      description: "Безопасных сделок"
    }
  ];

  const team = [
    {
      name: "Анна Иванова",
      position: "Генеральный директор",
      experience: "15 лет в недвижимости",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Михаил Петров",
      position: "Руководитель отдела продаж",
      experience: "12 лет в продажах",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      name: "Елена Сидорова",
      position: "Ведущий риелтор",
      experience: "8 лет в риелторской деятельности",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">О компании НедвижимостьПро</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Мы — команда профессионалов, которая помогает людям найти дом мечты 
            и совершить выгодные сделки с недвижимостью уже более 10 лет.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Наша миссия</h2>
            <p className="text-lg text-gray-700 mb-8">
              Сделать процесс покупки, продажи и аренды недвижимости максимально простым, 
              прозрачным и безопасным для каждого клиента. Мы стремимся предоставить 
              высококачественные услуги и персональный подход к каждой сделке.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Наши ценности</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li>• Честность и прозрачность</li>
                    <li>• Профессионализм</li>
                    <li>• Индивидуальный подход</li>
                    <li>• Качество услуг</li>
                    <li>• Долгосрочные отношения</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Наши принципы</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li>• Клиент всегда на первом месте</li>
                    <li>• Полное юридическое сопровождение</li>
                    <li>• Конфиденциальность информации</li>
                    <li>• Справедливое ценообразование</li>
                    <li>• Постоянное развитие</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши достижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <achievement.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {achievement.title}
                  </div>
                  <div className="text-gray-600">{achievement.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-2">{member.position}</Badge>
                  <p className="text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">История компании</h2>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge className="mr-4">2014</Badge>
                    Основание компании
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Компания НедвижимостьПро была основана группой опытных риелторов 
                    с целью предоставления качественных услуг на рынке недвижимости.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge className="mr-4">2017</Badge>
                    Расширение услуг
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Добавили услуги по оценке недвижимости и юридическому сопровождению сделок. 
                    Открыли второй офис в центре города.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge className="mr-4">2020</Badge>
                    Цифровая трансформация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Запустили онлайн-платформу для поиска недвижимости и внедрили 
                    современные технологии для улучшения качества обслуживания.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge className="mr-4">2024</Badge>
                    Лидер рынка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Сегодня мы являемся одной из ведущих компаний на рынке недвижимости 
                    с более чем 5000 довольных клиентов и командой из 50+ специалистов.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;