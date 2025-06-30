import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apiService from '../services/api';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    rooms: searchParams.get('rooms') || '',
    city: searchParams.get('city') || '',
    district: searchParams.get('district') || '',
    page: searchParams.get('page') || 1,
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await apiService.getProperties(filters);
      setProperties(response.properties);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Ошибка загрузки объектов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    const updatedFilters = { ...newFilters, page: 1 };
    setFilters(updatedFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
  };

  const resetFilters = () => {
    const resetFilters = { page: 1 };
    setFilters(resetFilters);
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <PropertyFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={resetFilters}
          />
        </div>

        {/* Properties Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Каталог недвижимости</h1>
            {pagination.total && (
              <p className="text-gray-600">
                Найдено {pagination.total} объектов
              </p>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {[...Array(pagination.pages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={pagination.current === i + 1 ? 'default' : 'outline'}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === pagination.pages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Объекты не найдены</p>
              <Button onClick={resetFilters} className="mt-4">
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;