import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyListView from '../components/PropertyListView';
import PropertyFilters from '../components/PropertyFilters';
import PropertySort from '../components/PropertySort';
import PropertySearch from '../components/PropertySearch';
import PropertyPagination from '../components/PropertyPagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, X, MapPin, TrendingUp } from 'lucide-react';
import apiService from '../services/api';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    rooms: searchParams.get('rooms') || '',
    city: searchParams.get('city') || '',
    district: searchParams.get('district') || '',
    metro: searchParams.get('metro') || '',
    features: searchParams.get('features')?.split(',').filter(Boolean) || [],
    minFloor: searchParams.get('minFloor') || '',
    maxFloor: searchParams.get('maxFloor') || '',
    notFirstFloor: searchParams.get('notFirstFloor') === 'true',
    notLastFloor: searchParams.get('notLastFloor') === 'true',
    yearFrom: searchParams.get('yearFrom') || '',
    yearTo: searchParams.get('yearTo') || '',
    page: parseInt(searchParams.get('page')) || 1,
    limit: parseInt(searchParams.get('limit')) || 12,
    sort: searchParams.get('sort') || 'createdAt_desc',
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  useEffect(() => {
    // Load saved searches from localStorage
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryFilters = { ...filters };
      
      // Convert features array to string for API
      if (queryFilters.features?.length > 0) {
        queryFilters.features = queryFilters.features.join(',');
      } else {
        delete queryFilters.features;
      }

      const response = await apiService.getProperties(queryFilters);
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
    updateURL(updatedFilters);
  };

  const handleSearch = (searchData) => {
    const updatedFilters = { ...filters, ...searchData, page: 1 };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  const handleSortChange = (sortValue) => {
    const updatedFilters = { ...filters, sort: sortValue, page: 1 };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (limit) => {
    const updatedFilters = { ...filters, limit, page: 1 };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '' && value !== false) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, value.toString());
        }
      }
    });
    setSearchParams(params);
  };

  const resetFilters = () => {
    const resetFilters = { page: 1, limit: 12, sort: 'createdAt_desc' };
    setFilters(resetFilters);
    setSearchParams({});
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Название для сохраненного поиска:');
    if (searchName) {
      const newSearch = {
        id: Date.now(),
        name: searchName,
        filters: { ...filters },
        createdAt: new Date().toISOString()
      };
      const updated = [...savedSearches, newSearch];
      setSavedSearches(updated);
      localStorage.setItem('savedSearches', JSON.stringify(updated));
    }
  };

  const loadSavedSearch = (savedSearch) => {
    setFilters(savedSearch.filters);
    updateURL(savedSearch.filters);
  };

  const deleteSavedSearch = (searchId) => {
    const updated = savedSearches.filter(s => s.id !== searchId);
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter(key => 
      filters[key] && 
      filters[key] !== '' && 
      filters[key] !== false &&
      !['page', 'limit', 'sort'].includes(key) &&
      !(Array.isArray(filters[key]) && filters[key].length === 0)
    ).length;
  };

  const renderSkeletons = () => {
    const skeletonCount = viewMode === 'grid' ? 12 : 6;
    return Array.from({ length: skeletonCount }, (_, i) => (
      <Card key={i} className="animate-pulse">
        {viewMode === 'grid' ? (
          <>
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </>
        ) : (
          <div className="flex">
            <Skeleton className="h-48 w-80" />
            <div className="flex-1 p-6 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        )}
      </Card>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <PropertySearch onSearch={handleSearch} initialFilters={filters} />
        </div>

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Сохраненные поиски</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((search) => (
                <div key={search.id} className="flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadSavedSearch(search)}
                    className="rounded-r-none"
                  >
                    {search.name}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSavedSearch(search.id)}
                    className="rounded-l-none border-l-0 px-2"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <PropertyFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={resetFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header with Sort and View Controls */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Каталог недвижимости</h1>
                  {getActiveFiltersCount() > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">Активные фильтры:</span>
                      <Badge variant="secondary">
                        {getActiveFiltersCount()}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="text-xs"
                      >
                        Сбросить все
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveCurrentSearch}
                    disabled={getActiveFiltersCount() === 0}
                  >
                    Сохранить поиск
                  </Button>
                </div>
              </div>

              <PropertySort
                sortBy={filters.sort}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={pagination.total}
              />
            </div>

            {/* Results */}
            {loading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {renderSkeletons()}
              </div>
            ) : properties.length > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-6"
                }>
                  {properties.map((property) => (
                    viewMode === 'grid' ? (
                      <PropertyCard key={property._id} property={property} />
                    ) : (
                      <PropertyListView key={property._id} property={property} />
                    )
                  ))}
                </div>

                {/* Pagination */}
                <PropertyPagination
                  currentPage={pagination.current || 1}
                  totalPages={pagination.pages || 1}
                  totalItems={pagination.total || 0}
                  itemsPerPage={filters.limit}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Объекты не найдены</h3>
                  <p className="text-gray-500 mb-4">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                  <div className="space-y-2">
                    <Button onClick={resetFilters} className="w-full">
                      Сбросить все фильтры
                    </Button>
                    <Button variant="outline" onClick={() => handleSearch({ query: '', type: 'sale', propertyType: 'apartment' })} className="w-full">
                      Показать все квартиры на продажу
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            {!loading && properties.length > 0 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">
                    {Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length).toLocaleString()}₽
                  </div>
                  <div className="text-sm text-gray-600">Средняя цена</div>
                </Card>
                <Card className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">
                    {new Set(properties.map(p => p.address?.district).filter(Boolean)).size}
                  </div>
                  <div className="text-sm text-gray-600">Районов</div>
                </Card>
                <Card className="p-6 text-center">
                  <Filter className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{pagination.total}</div>
                  <div className="text-sm text-gray-600">Всего объектов</div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;