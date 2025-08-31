import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to="#" className="group block text-center">
      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-slate-800 group-hover:text-[--gimmie-carolina] transition-colors">
          {product.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500">{product.vendor}</p>
        <p className="mt-2 text-base font-semibold text-[--gimmie-dark]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}