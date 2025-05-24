export interface FilterState {
    categories: string[];
    brands: string[];
    priceRange: {
      min: number;
      max: number;
    };
    rating: number;
    searchQuery: string;
  }
  
  export interface SortOption {
    value: string;
    label: string;
  }