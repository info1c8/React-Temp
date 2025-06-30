import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const propertySchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  price: z.number().min(1, 'Цена должна быть больше 0'),
  type: z.enum(['sale', 'rent'], { required_error: 'Выберите тип сделки' }),
  propertyType: z.enum(['apartment', 'house', 'commercial', 'land'], {
    required_error: 'Выберите тип недвижимости',
  }),
  area: z.number().min(1, 'Площадь должна быть больше 0'),
  rooms: z.number().min(0, 'Количество комнат не может быть отрицательным'),
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  city: z.string().min(1, 'Город обязателен'),
  district: z.string().optional(),
  street: z.string().optional(),
  metro: z.string().optional(),
  contactName: z.string().min(1, 'Имя контакта обязательно'),
  contactPhone: z.string().min(1, 'Телефон обязателен'),
  contactEmail: z.string().email('Неверный формат email').optional(),
});

const AddProperty = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
  });

  const watchType = watch('type');
  const watchPropertyType = watch('propertyType');

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Необходима авторизация</h1>
        <p className="mb-4">Для добавления объекта недвижимости необходимо войти в систему</p>
        <Button onClick={() => navigate('/login')}>Войти</Button>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const propertyData = {
        ...data,
        address: {
          city: data.city,
          district: data.district,
          street: data.street,
          metro: data.metro,
        },
        contact: {
          name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
        },
        features: features.split(',').map(f => f.trim()).filter(f => f),
      };

      // Remove individual address and contact fields
      delete propertyData.city;
      delete propertyData.district;
      delete propertyData.street;
      delete propertyData.metro;
      delete propertyData.contactName;
      delete propertyData.contactPhone;
      delete propertyData.contactEmail;

      await apiService.createProperty(propertyData, images);
      toast.success('Объект недвижимости успешно добавлен!');
      navigate('/properties');
    } catch (error) {
      toast.error(error.message || 'Ошибка при добавлении объекта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Добавить объект недвижимости</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок объявления *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Например: 3-комнатная квартира в центре"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Подробное описание объекта недвижимости"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Тип сделки *</Label>
                  <Select onValueChange={(value) => setValue('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип сделки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Продажа</SelectItem>
                      <SelectItem value="rent">Аренда</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="propertyType">Тип недвижимости *</Label>
                  <Select onValueChange={(value) => setValue('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип недвижимости" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Квартира</SelectItem>
                      <SelectItem value="house">Дом</SelectItem>
                      <SelectItem value="commercial">Коммерческая</SelectItem>
                      <SelectItem value="land">Участок</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && (
                    <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="price">
                  Цена * ({watchType === 'rent' ? 'руб/мес' : 'руб'})
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="Введите цену"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Характеристики</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">Площадь (м²) *</Label>
                  <Input
                    id="area"
                    type="number"
                    {...register('area', { valueAsNumber: true })}
                    placeholder="Площадь в квадратных метрах"
                  />
                  {errors.area && (
                    <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="rooms">Количество комнат *</Label>
                  <Input
                    id="rooms"
                    type="number"
                    {...register('rooms', { valueAsNumber: true })}
                    placeholder="Количество комнат"
                  />
                  {errors.rooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.rooms.message}</p>
                  )}
                </div>
              </div>

              {watchPropertyType === 'apartment' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="floor">Этаж</Label>
                    <Input
                      id="floor"
                      type="number"
                      {...register('floor', { valueAsNumber: true })}
                      placeholder="Этаж"
                    />
                  </div>

                  <div>
                    <Label htmlFor="totalFloors">Этажность дома</Label>
                    <Input
                      id="totalFloors"
                      type="number"
                      {...register('totalFloors', { valueAsNumber: true })}
                      placeholder="Общее количество этажей"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="features">Особенности (через запятую)</Label>
                <Input
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Например: балкон, лифт, парковка"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Местоположение</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="Город"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="district">Район</Label>
                  <Input
                    id="district"
                    {...register('district')}
                    placeholder="Район"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street">Улица</Label>
                  <Input
                    id="street"
                    {...register('street')}
                    placeholder="Улица и номер дома"
                  />
                </div>

                <div>
                  <Label htmlFor="metro">Ближайшее метро</Label>
                  <Input
                    id="metro"
                    {...register('metro')}
                    placeholder="Станция метро"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Фотографии</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="images">Загрузить фотографии</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Можно загрузить до 10 фотографий
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactName">Имя контакта *</Label>
                <Input
                  id="contactName"
                  {...register('contactName')}
                  placeholder="Ваше имя"
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Телефон *</Label>
                  <Input
                    id="contactPhone"
                    {...register('contactPhone')}
                    placeholder="+7 (999) 123-45-67"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...register('contactEmail')}
                    placeholder="email@example.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/properties')}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Добавление...' : 'Добавить объект'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;