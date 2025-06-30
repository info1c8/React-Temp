import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Grid, List } from 'lucide-react';

const PropertySort = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultsCount 
}) => {
  const sortOptions = [
    { value: 'createdAt_desc', label: 'Сначала новые' },
    { value: 'createdAt_asc', label: 'Сначала старые' },
    { value: 'price_asc', label: 'Цена: по возрастанию' },
    { value: 'price_desc', label: 'Цена: по убыванию' },
    { value: 'area_asc', label: 'Площадь: по возрастанию' },
    { value: 'area_desc', label: 'Площадь: по убыванию' },
    { value: 'rooms_asc', label: 'Комнат: по возрастанию' },
    { value: 'rooms_desc', label: 'Комнат: по убыванию' },
    { value: 'pricePerMeter_asc', label: 'Цена за м²: по возрастанию' },
    { value: 'pricePerMeter_desc', label: 'Цена за м²: по убыванию' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {resultsCount !== undefined && (
          <span className="text-sm text-gray-600">
            Найдено: {resultsCount} объектов
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:block">Вид:</span>
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-r-none"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertySort;