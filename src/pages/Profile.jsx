import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Heart, 
  Home, 
  Edit, 
  Save,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    // Здесь будет логика сохранения данных
    setIsEditing(false);
  };

  const myProperties = [
    {
      id: 1,
      title: "3-комнатная квартира в центре",
      price: 8500000,
      status: "active",
      views: 245,
      date: "2024-01-10"
    },
    {
      id: 2,
      title: "Загородный дом с участком",
      price: 15000000,
      status: "sold",
      views: 189,
      date: "2024-01-05"
    }
  ];

  const favorites = [
    {
      id: 3,
      title: "2-комнатная квартира у метро",
      price: 6200000,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    },
    {
      id: 4,
      title: "Студия в новостройке",
      price: 4800000,
      image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Активно', variant: 'default' },
      sold: { label: 'Продано', variant: 'secondary' },
      inactive: { label: 'Неактивно', variant: 'outline' }
    };
    const config = statusConfig[status] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Avatar className="h-20 w-20 mr-6">
            <AvatarFallback className="text-2xl">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <Badge className="mt-2">{user?.role === 'agent' ? 'Агент' : 'Пользователь'}</Badge>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Мои объекты
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Избранное
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Личная информация</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Сохранить
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Редактировать
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center mt-2">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{user?.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center mt-2">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{user?.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center mt-2">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{user?.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Дата регистрации</Label>
                    <div className="flex items-center mt-2">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>15 января 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Мои объекты недвижимости</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{property.title}</h3>
                        {getStatusBadge(property.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Цена:</span> {property.price.toLocaleString()} ₽
                        </div>
                        <div>
                          <span className="font-medium">Просмотры:</span> {property.views}
                        </div>
                        <div>
                          <span className="font-medium">Дата:</span> {new Date(property.date).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">Редактировать</Button>
                        <Button size="sm" variant="outline">Статистика</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Избранные объекты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((property) => (
                    <div key={property.id} className="border rounded-lg overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{property.title}</h3>
                        <p className="text-blue-600 font-bold">
                          {property.price.toLocaleString()} ₽
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm">Подробнее</Button>
                          <Button size="sm" variant="outline">Удалить</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email уведомления</h4>
                      <p className="text-sm text-gray-600">Получать уведомления на email</p>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS уведомления</h4>
                      <p className="text-sm text-gray-600">Получать SMS о новых объектах</p>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Изменить пароль
                  </Button>
                  <Button variant="outline" className="w-full">
                    Двухфакторная аутентификация
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Удаление аккаунта</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Удаление аккаунта приведет к потере всех данных. Это действие необратимо.
                  </p>
                  <Button variant="destructive">Удалить аккаунт</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;