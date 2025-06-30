import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, X, Filter } from 'lucide-react';

const PropertyFilters = ({ filters, onFiltersChange, onReset, isOpen, onToggle }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handlePriceRangeChange = (values) => {
    onFiltersChange({
      ...filters,
      minPrice: values[0] * 1000,
      maxPrice: values[1] * 1000
    });
  };

  const handleAreaRangeChange = (values) => {
    onFiltersChange({
      ...filters,
      minArea: values[0],
      maxArea: values[1]
    });
  };

  const handleFeatureToggle = (feature, checked) => {
    const currentFeatures = filters.features || [];
    const newFeatures = checked
      ? [...currentFeatures, feature]
      : currentFeatures.filter(f => f !== feature);
    
    onFiltersChange({ ...filters, features: newFeatures });
  };

  const clearFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const activeFiltersCount = Object.keys(filters).filter(key => 
    filters[key] && filters[key] !== '' && key !== 'page' && key !== 'sort'
  ).length;

  const features = [
    'Балкон',
    'Лоджия', 
    'Лифт',
    'Парковка',
    'Охрана',
    'Консьерж',
    'Детская площадка',
    'Спортзал',
    'Бассейн',
    'Сауна'
  ];

  const metros = [
    'Сокольники',
    'Красносельская',
    'Комсомольская',
    'Красные ворота',
    'Чистые пруды',
    'Лубянка',
    'Охотный ряд',
    'Библиотека им. Ленина',
    'Кропоткинская',
    'Парк культуры'
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <Card className="sticky top-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Фильтры
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                  <X className="w-4 h-4 mr-1" />
                  Сбросить
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Активные фильтры:</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value || value === '' || key === 'page' || key === 'sort') return null;
                    
                    let displayValue = value;
                    if (key === 'type') displayValue = value === 'sale' ? 'Продажа' : 'Аренда';
                    if (key === 'propertyType') {
                      const types = { apartment: 'Квартира', house: 'Дом', commercial: 'Коммерческая', land: 'Участок' };
                      displayValue = types[value] || value;
                    }
                    
                    return (
                      <Button
                        key={key}
                        variant="secondary"
                        size="sm"
                        onClick={() => clearFilter(key)}
                        className="h-6 text-xs"
                      >
                        {displayValue}
                        <X className="w-3 h-3 ml-1" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Deal Type */}
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

            {/* Property Type */}
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

            {/* Price Range */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <Label>Цена (тыс. ₽)</Label>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                <div className="px-3">
                  <Slider
                    value={[
                      (filters.minPrice || 0) / 1000,
                      (filters.maxPrice || 50000) / 1000
                    ]}
                    onValueChange={handlePriceRangeChange}
                    max={50000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{((filters.minPrice || 0) / 1000).toLocaleString()} тыс.</span>
                    <span>{((filters.maxPrice || 50000) / 1000).toLocaleString()} тыс.</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minPrice" className="text-xs">От</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="0"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPrice" className="text-xs">До</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="∞"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Area Range */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <Label>Площадь (м²)</Label>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                <div className="px-3">
                  <Slider
                    value={[
                      filters.minArea || 0,
                      filters.maxArea || 500
                    ]}
                    onValueChange={handleAreaRangeChange}
                    max={500}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{filters.minArea || 0} м²</span>
                    <span>{filters.maxArea || 500} м²</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minArea" className="text-xs">От</Label>
                    <Input
                      id="minArea"
                      type="number"
                      placeholder="0"
                      value={filters.minArea || ''}
                      onChange={(e) => handleFilterChange('minArea', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxArea" className="text-xs">До</Label>
                    <Input
                      id="maxArea"
                      type="number"
                      placeholder="∞"
                      value={filters.maxArea || ''}
                      onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Rooms */}
            <div>
              <Label htmlFor="rooms">Количество комнат</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {['1', '2', '3', '4', '5+'].map((room) => (
                  <Button
                    key={room}
                    variant={filters.rooms === room ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('rooms', filters.rooms === room ? '' : room)}
                    className="h-8"
                  >
                    {room}
                  </Button>
                ))}
              </div>
            </div>

            {/* Floor */}
            {filters.propertyType === 'apartment' && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <Label>Этаж</Label>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notFirstFloor"
                        checked={filters.notFirstFloor || false}
                        onCheckedChange={(checked) => handleFilterChange('notFirstFloor', checked)}
                      />
                      <Label htmlFor="notFirstFloor" className="text-sm">Не первый этаж</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notLastFloor"
                        checked={filters.notLastFloor || false}
                        onCheckedChange={(checked) => handleFilterChange('notLastFloor', checked)}
                      />
                      <Label htmlFor="notLastFloor" className="text-sm">Не последний этаж</Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="minFloor" className="text-xs">Этаж от</Label>
                      <Input
                        id="minFloor"
                        type="number"
                        placeholder="1"
                        value={filters.minFloor || ''}
                        onChange={(e) => handleFilterChange('minFloor', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxFloor" className="text-xs">Этаж до</Label>
                      <Input
                        id="maxFloor"
                        type="number"
                        placeholder="∞"
                        value={filters.maxFloor || ''}
                        onChange={(e) => handleFilterChange('maxFloor', e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Location */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <Label>Местоположение</Label>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                <div>
                  <Label htmlFor="city" className="text-xs">Город</Label>
                  <Input
                    id="city"
                    placeholder="Введите город"
                    value={filters.city || ''}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label htmlFor="district" className="text-xs">Район</Label>
                  <Input
                    id="district"
                    placeholder="Введите район"
                    value={filters.district || ''}
                    onChange={(e) => handleFilterChange('district', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label htmlFor="metro" className="text-xs">Метро</Label>
                  <Select value={filters.metro || ''} onValueChange={(value) => handleFilterChange('metro', value)}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Выберите станцию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Любая</SelectItem>
                      {metros.map((metro) => (
                        <SelectItem key={metro} value={metro}>{metro}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Features */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <Label>Особенности</Label>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={(filters.features || []).includes(feature)}
                      onCheckedChange={(checked) => handleFeatureToggle(feature, checked)}
                    />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Year Built */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <Label>Год постройки</Label>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="yearFrom" className="text-xs">От</Label>
                    <Input
                      id="yearFrom"
                      type="number"
                      placeholder="1990"
                      value={filters.yearFrom || ''}
                      onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearTo" className="text-xs">До</Label>
                    <Input
                      id="yearTo"
                      type="number"
                      placeholder="2024"
                      value={filters.yearTo || ''}
                      onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Reset Button */}
            <Button onClick={onReset} variant="outline" className="w-full">
              Сбросить все фильтры
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PropertyFilters;