import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Home, Ruble } from 'lucide-react';

const PropertySearch = ({ onSearch, initialFilters = {} }) => {
  const [searchData, setSearchData] = useState({
    query: initialFilters.search || '',
    type: initialFilters.type || '',
    propertyType: initialFilters.propertyType || '',
    city: initialFilters.city || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleQuickSearch = (filters) => {
    const newSearchData = { ...searchData, ...filters };
    setSearchData(newSearchData);
    onSearch(newSearchData);
  };

  const quickSearchOptions = [
    { label: 'Купить квартиру', filters: { type: 'sale', propertyType: 'apartment' } },
    { label: 'Снять квартиру', filters: { type: 'rent', propertyType: 'apartment' } },
    { label: 'Купить дом', filters: { type: 'sale', propertyType: 'house' } },
    { label: 'Коммерческая', filters: { propertyType: 'commercial' } },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Поиск по адресу, району, метро..."
            value={searchData.query}
            onChange={(e) => setSearchData({ ...searchData, query: e.target.value })}
            className="pl-10 h-12"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select 
            value={searchData.type} 
            onValueChange={(value) => setSearchData({ ...searchData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Тип сделки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Любой</SelectItem>
              <SelectItem value="sale">Продажа</SelectItem>
              <SelectItem value="rent">Аренда</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={searchData.propertyType} 
            onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Тип недвижимости" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Любой</SelectItem>
              <SelectItem value="apartment">Квартира</SelectItem>
              <SelectItem value="house">Дом</SelectItem>
              <SelectItem value="commercial">Коммерческая</SelectItem>
              <SelectItem value="land">Участок</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Город"
              value={searchData.city}
              onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
              className="pl-10"
            />
          </div>

          <Button type="submit" className="h-10">
            <Search className="w-4 h-4 mr-2" />
            Найти
          </Button>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Ruble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="number"
              placeholder="Цена от"
              value={searchData.minPrice}
              onChange={(e) => setSearchData({ ...searchData, minPrice: e.target.value })}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Ruble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="number"
              placeholder="Цена до"
              value={searchData.maxPrice}
              onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
      </form>

      {/* Quick Search Buttons */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600 mb-3">Быстрый поиск:</p>
        <div className="flex flex-wrap gap-2">
          {quickSearchOptions.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickSearch(option.filters)}
              className="text-xs"
            >
              <Home className="w-3 h-3 mr-1" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;