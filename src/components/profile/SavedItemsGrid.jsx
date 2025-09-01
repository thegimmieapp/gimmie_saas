import React from 'react';
import ProductCard from '../public/ProductCard';

export default function SavedItemsGrid({ items }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl soft-shadow">
        <h2 className="text-xl font-semibold text-slate-700">No Saved Items Yet</h2>
        <p className="text-slate-500 mt-2">
          Start exploring and save your favorite gift ideas here!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-light text-[--gimmie-dark] mb-6">Saved Items</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}