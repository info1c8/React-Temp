import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  subject: z.string().min(5, 'Тема должна содержать минимум 5 символов'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Здесь будет отправка формы на сервер
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация отправки
      toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      reset();
    } catch (error) {
      toast.error('Ошибка отправки сообщения. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      details: ["+7 (495) 123-45-67", "+7 (495) 123-45-68"],
      action: "tel:+74951234567"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@nedvizhimostpro.ru", "support@nedvizhimostpro.ru"],
      action: "mailto:info@nedvizhimostpro.ru"
    },
    {
      icon: MapPin,
      title: "Адрес",
      details: ["г. Москва, ул. Тверская, д. 1", "офис 101, 2 этаж"],
      action: null
    },
    {
      icon: Clock,
      title: "Время работы",
      details: ["Пн-Пт: 9:00 - 20:00", "Сб-Вс: 10:00 - 18:00"],
      action: null
    }
  ];

  const offices = [
    {
      name: "Главный офис",
      address: "г. Москва, ул. Тверская, д. 1",
      phone: "+7 (495) 123-45-67",
      email: "moscow@nedvizhimostpro.ru"
    },
    {
      name: "Филиал в Санкт-Петербурге",
      address: "г. Санкт-Петербург, Невский пр., д. 50",
      phone: "+7 (812) 123-45-67",
      email: "spb@nedvizhimostpro.ru"
    },
    {
      name: "Филиал в Екатеринбурге",
      address: "г. Екатеринбург, ул. Ленина, д. 25",
      phone: "+7 (343) 123-45-67",
      email: "ekb@nedvizhimostpro.ru"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Свяжитесь с нами</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Мы готовы ответить на все ваши вопросы и помочь найти идеальное решение
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-6 h-6 mr-2" />
                  Отправить сообщение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Ваше имя"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="+7 (999) 123-45-67"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема *</Label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="Тема обращения"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Опишите ваш вопрос или пожелание"
                      rows={5}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Отправка...' : 'Отправить сообщение'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <info.icon className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 text-sm">
                              {info.action ? (
                                <a href={info.action} className="hover:text-blue-600">
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Наши офисы</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{office.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {office.address}
                        </p>
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <a href={`tel:${office.phone}`} className="hover:text-blue-600">
                            {office.phone}
                          </a>
                        </p>
                        <p className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <a href={`mailto:${office.email}`} className="hover:text-blue-600">
                            {office.email}
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Как нас найти</h2>
          <Card>
            <CardContent className="p-0">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Здесь будет интерактивная карта</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;