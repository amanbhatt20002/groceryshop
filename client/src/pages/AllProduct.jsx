import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContex';
import ProductCard from '../components/ProductCard';

const AllProduct = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
        {filteredProducts.filter((product) => product.inStock).length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.filter((product) => product.inStock)
            .map((product,index) => (
              <ProductCard key={index} product={product} />
            ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
