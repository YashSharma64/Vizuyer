import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProductById } from '../products';
import FeedbackModal from '../components/FeedbackModal';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
    }
  }, [id]);

  if (!product || !activeImage) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 md:p-12 lg:flex lg:gap-16">
        
        <div className="lg:w-3/5 flex flex-col items-center">
          
          <div 
            className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden relative cursor-zoom-in mb-6 group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={activeImage.src} 
              alt={activeImage.alt}
              className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-200 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`}
            />
          </div>

          <p className="text-sm text-gray-500 mb-4">Explore the product from different angles</p>

          <div className="flex gap-4">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-lg border-2 p-1 transition-all ${
                  activeImage.id === img.id 
                    ? 'border-black bg-gray-50' 
                    : 'border-transparent hover:border-gray-200 bg-gray-50'
                }`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/5 flex flex-col justify-center mt-8 lg:mt-0">
          <p className="text-sm font-medium text-gray-500 mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
          
          <div className="text-3xl font-semibold mb-8">{product.price}</div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-8">
            <p className="text-sm text-gray-500 flex items-start gap-2">
              <span className="text-lg">💡</span> 
              {product.trustMessage}
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all"
          >
            Give Feedback
          </button>
        </div>

      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productName={product.name}
      />
    </div>
  );
};

export default ProductPage;
