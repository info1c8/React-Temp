import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PropertyFilters = ({ filters, onFiltersChange, onReset }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="type">Тип сделки</Label>
          <Select value={filters.type || ''} onValueChange={(value) => handleFilterChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все</SelectItem>
              <SelectItem value="sale">Продажа</SelectItem>
              <SelectItem value="rent">Аренда</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="propertyType">Тип недвижимости</Label>
          <Select value={filters.propertyType || ''} onValueChange={(value) => handleFilterChange('propertyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все</SelectItem>
              <SelectItem value="apartment">Квартира</SelectItem>
              <SelectItem value="house">Дом</SelectItem>
              <SelectItem value="commercial">Коммерческая</SelectItem>
              <SelectItem value="land">Участок</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rooms">Количество комнат</Label>
          <Select value={filters.rooms || ''} onValueChange={(value) => handleFilterChange('rooms', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите количество" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Любое</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minPrice">Цена от</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="От"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice">Цена до</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="До"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minArea">Площадь от</Label>
            <Input
              id="minArea"
              type="number"
              placeholder="От м²"
              value={filters.minArea || ''}
              onChange={(e) => handleFilterChange('minArea', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maxArea">Площадь до</Label>
            <Input
              id="maxArea"
              type="number"
              placeholder="До м²"
              value={filters.maxArea || ''}
              onChange={(e) => handleFilterChange('maxArea', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="city">Город</Label>
          <Input
            id="city"
            placeholder="Введите город"
            value={filters.city || ''}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="district">Район</Label>
          <Input
            id="district"
            placeholder="Введите район"
            value={filters.district || ''}
            onChange={(e) => handleFilterChange('district', e.target.value)}
          />
        </div>

        <Button onClick={onReset} variant="outline" className="w-full">
          Сбросить фильтры
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;