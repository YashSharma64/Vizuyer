import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products } from '../products';

const ProductList = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#about') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="mx-auto px-6 md:px-12 py-16 bg-gray-200 rounded-2xl">
      <div className="mb-20 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
          
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          Visual Confidence.
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          Don't just guess. Experience our products with interactive visualization 
          and detailed insights before you make a choice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-[4/3] bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden">
              <img 
                src={product.images[0].src} 
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                View 360°
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">{product.category}</p>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-black mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-green-600 font-medium mb-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Visualise from multiple angles
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">4.9</span>
                  <span className="text-sm text-gray-400">(128 reviews)</span>
                </div>
              </div>
              
              <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-6">
                <span className="text-2xl font-semibold text-gray-900">{product.price}</span>
                <span className="flex items-center text-sm font-bold text-gray-900 group-hover:underline decoration-2 underline-offset-4 transition-all">
                  Visualise & Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

   
      <h2 id="about" className="text-3xl font-bold text-gray-900 mt-22 mb-3 text-center border-b border-gray-800 pb-2 w-[150px] mx-auto h-10 border-b-2">About Us</h2>
      <div className="mt-24 max-w-6xl mx-auto text-center space-y-5 bg-gray-100 rounded-2xl p-8">
        
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-center">
          <p>
            Vizuyer is built to solve a simple but critical problem in online shopping — lack of confidence before buying.
          </p>
          <p>
            We believe that users should not have to rely only on static images to make purchase decisions. By enabling interactive product exploration and collecting meaningful feedback, Vizuyer helps users understand products better and helps brands identify where uncertainty exists.
          </p>
          <p>
            Our focus is not on adding complexity, but on building clear, user-centric experiences that mirror real-world decision-making. Vizuyer is designed as a foundation that can evolve with advanced visualization and intelligent insights over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
