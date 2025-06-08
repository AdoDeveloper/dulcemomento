'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, Clock, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { 
  FaHeart, FaStar, FaAward, FaTruck, FaUsers, FaCoffee, FaGift, 
  FaWhatsapp, FaInstagram, FaFacebook, FaLeaf, FaHandHoldingHeart,
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaShoppingCart 
} from 'react-icons/fa';
import { 
  MdLocalOffer, MdVerified, MdRestaurant, MdKitchen, 
  MdDeliveryDining, MdRateReview, MdSchedule
} from 'react-icons/md';
import { 
  IoIosTimer, IoMdCheckmarkCircle, IoMdStar 
} from 'react-icons/io';

import {
  Topping,
  Jelly,
  Flavor,
  PackageOption,
  SelectedPancakes,
  CustomerData,
  DeliveryOption,
  PageType,
} from '../types/interfaces'

// Business Logic Functions
const getDeliveryOptions = (packageCategory: string): DeliveryOption[] => {
  const baseOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Entrega Estándar',
      timeRange: packageCategory === 'small' || packageCategory === 'medium' ? '1-2 horas' : '2-4 horas',
      price: 0,
      icon: MdSchedule,
      description: 'Preparación normal'
    },
    {
      id: 'express',
      name: 'Entrega Express',
      timeRange: packageCategory === 'small' || packageCategory === 'medium' ? '30-60 min' : '60-90 min',
      price: packageCategory === 'large' || packageCategory === 'catering' ? 2.00 : 1.00,
      icon: IoIosTimer,
      description: 'Prioridad máxima'
    }
  ];

  return baseOptions;
};

// Data Constants
const businessInfo = {
  mission: "Ofrecer a nuestros clientes minipancakes artesanales de la más alta calidad, elaborados con ingredientes frescos y recetas caseras, a través de una experiencia de compra 100% online que garantice rapidez, facilidad y seguridad.",
  vision: "Posicionar 'Dulce Momento' como la marca de minipancakes artesanales de referencia en la región, reconocida por ofrecer productos de alta calidad, frescura y sabor auténtico.",
  values: [
    "Calidad artesanal en cada minipancake",
    "Ingredientes frescos y locales",
    "Servicio personalizado y cercano",
    "Innovación constante en sabores"
  ],
  schedule: "Lunes a Sábado: 8:00 AM - 6:00 PM",
  coverage: "Sonsonate y municipios cercanos",
  responseTime: "10-15 minutos máximo"
};

const menuData = {
  packages: [
    { id: 'pkg-3', quantity: 3, price: 2.25, description: 'Ideal para probar sabores', category: 'small' as const },
    { id: 'pkg-5', quantity: 5, price: 3.50, description: 'Porción personal perfecta', category: 'small' as const },
    { id: 'pkg-8', quantity: 8, price: 5.50, description: 'Favorito de estudiantes', category: 'medium' as const },
    { id: 'pkg-10', quantity: 10, price: 6.75, description: 'Mezcla hasta 4 sabores', category: 'medium' as const },
    { id: 'pkg-15', quantity: 15, price: 3.00, description: 'Oferta especial limitada', popular: true, category: 'medium' as const },
    { id: 'pkg-20', quantity: 20, price: 12.00, description: 'Perfecto para compartir', category: 'large' as const },
    { id: 'pkg-30', quantity: 30, price: 17.00, description: 'Ideal para celebraciones', special: true, category: 'catering' as const },
    { id: 'pkg-50', quantity: 50, price: 25.00, description: 'Catering para eventos', special: true, category: 'catering' as const }
  ],
  flavors: [
    { id: 'clasico', name: 'Clásico', description: 'Minipancakes suaves con mantequilla artesanal y miel pura local', emoji: '🥞' },
    { id: 'chocolate', name: 'Chocolate Intenso', description: 'Masa enriquecida con cacao puro y chispas de chocolate semiamargo', emoji: '🍫' },
    { id: 'frutos-rojos', name: 'Frutos Rojos', description: 'Base infusionada con puré de fresas y zarzamoras', emoji: '🍓' },
    { id: 'dulce-leche', name: 'Dulce de Leche y Nueces', description: 'Rellenos con dulce de leche artesanal y nueces tostadas', emoji: '🍮' },
    { id: 'salado', name: 'Queso Crema y Hierbas', description: 'Masa salada con queso crema batido y hierbas frescas', emoji: '🧀' }
  ],
  toppings: {
    free: [
      { id: 'banano', name: 'Banano', emoji: '🍌', color: '#FFE135' },
      { id: 'fresa', name: 'Fresa', emoji: '🍓', color: '#FF6B9D' },
      { id: 'chocolate-chips', name: 'Chispas de chocolate', emoji: '🍫', color: '#8B4513' }
    ],
    premium: [
      { id: 'oreo', name: 'Galleta de Oreo', price: 0.50, emoji: '🍪', color: '#2C2C2C' },
      { id: 'marshmallow', name: 'Marshmallow', price: 0.50, emoji: '🤍', color: '#FFFFFF' },
      { id: 'crispy', name: 'Crispy', price: 0.50, emoji: '✨', color: '#F4A460' }
    ]
  },
  jellies: [
    { id: 'nutella', name: 'Nutella', emoji: '🍫', color: '#8B4513' },
    { id: 'chocolate', name: 'Chocolate', emoji: '🍫', color: '#654321' },
    { id: 'caramelo', name: 'Caramelo', emoji: '🍯', color: '#DAA520' },
    { id: 'leche-condensada', name: 'Leche condensada', emoji: '🥛', color: '#FFF8DC' },
    { id: 'miel-antesala', name: 'Miel de antesala', emoji: '🍯', color: '#FFD700' },
    { id: 'miel-maple', name: 'Miel de maple', emoji: '🍁', color: '#CD853F' },
    { id: 'dulce-leche', name: 'Dulce de leche', emoji: '🍮', color: '#DEB887' }
  ]
};

const bannerImages = [
  'https://res.cloudinary.com/dldgicsdi/image/upload/v1749350798/pancake1_tphdee.jpg',
  'https://res.cloudinary.com/dldgicsdi/image/upload/v1749350798/pancake2_unrzdp.jpg',
  'https://res.cloudinary.com/dldgicsdi/image/upload/v1749350799/pancake3_oywfyp.jpg',
  'https://res.cloudinary.com/dldgicsdi/image/upload/v1749350800/pancake4_ijdgkv.jpg'
];

const logoUrl = 'https://res.cloudinary.com/dldgicsdi/image/upload/v1749350296/dulce_momento.png';

// Components
const PancakeVisualizer: React.FC<{ selectedPancakes: SelectedPancakes }> = ({ selectedPancakes }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <span className="text-7xl transition-transform duration-300 hover:scale-110">🥞</span>
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white">
          {selectedPancakes.quantity}
        </div>
      </div>
    </div>
  );
};

const CustomerForm: React.FC<{ 
  customerData: CustomerData; 
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
  deliveryOptions: DeliveryOption[];
}> = ({ customerData, setCustomerData, deliveryOptions }) => {
  const handleInputChange = (field: keyof CustomerData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleDeliveryTypeChange = (deliveryType: 'express' | 'standard') => {
    setCustomerData(prev => ({
      ...prev,
      deliveryType
    }));
  };

  return (
    <div className="space-y-6">
      {/* Delivery Type Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 transition-all hover:shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <MdDeliveryDining className="text-blue-600 text-2xl" />
          <span className="font-serif">Tipo de entrega</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveryOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleDeliveryTypeChange(option.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg flex flex-col ${
                  customerData.deliveryType === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="text-blue-600 text-xl" />
                  <span className="font-bold text-gray-900">{option.name}</span>
                </div>
                <p className="text-gray-700 text-sm font-medium">{option.timeRange}</p>
                <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                <p className="text-blue-600 font-bold mt-3">
                  {option.price === 0 ? 'Gratis' : `+$${option.price.toFixed(2)}`}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Information Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 transition-all hover:shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <FaUsers className="text-purple-600 text-2xl" />
          <span className="font-serif">Datos de entrega</span>
        </h3>
        <p className="text-gray-700 mb-6 bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <MdDeliveryDining className="inline mr-2 text-blue-600" />
          Entregamos en <strong>{businessInfo.coverage}</strong>
        </p>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={customerData.name}
              onChange={handleInputChange('name')}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de teléfono *
            </label>
            <input
              type="tel"
              placeholder="Ej: 7123-4567"
              value={customerData.phone}
              onChange={handleInputChange('phone')}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dirección de entrega completa *
            </label>
            <textarea
              placeholder="Calle, número de casa, colonia, referencias..."
              value={customerData.address}
              onChange={handleInputChange('address')}
              rows={3}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas adicionales (opcional)
            </label>
            <textarea
              placeholder="Instrucciones especiales, preferencias de entrega..."
              value={customerData.notes}
              onChange={handleInputChange('notes')}
              rows={2}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC<{ setCurrentPage: (page: PageType) => void }> = ({ setCurrentPage }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };

  const promotions = [
    { title: "2x1 en Lanzamiento", description: "Lleva dos paquetes por el precio de uno", type: "launch", icon: MdLocalOffer },
    { title: "Programa de Puntos", description: "Cada 5to pedido GRATIS", type: "loyalty", icon: FaAward },
    { title: "Descuento por Referidos", description: "10% para ti y tu amigo", type: "referral", icon: FaUsers },
    { title: "Envío Express", description: "30-60min en pedidos pequeños", type: "shipping", icon: FaTruck }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section con Banner Carrusel */}
      <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20 px-4 overflow-hidden">
        {/* Banner de fondo */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentBannerIndex ? 'opacity-40' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Pancakes ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Controles del carrusel */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-10 backdrop-blur-sm border-2 border-white border-opacity-30 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-10 backdrop-blur-sm border-2 border-white border-opacity-30 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all border-2 border-white ${
                  index === currentBannerIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenido del hero */}
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-36 h-36 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center shadow-2xl border-4 border-white border-opacity-50 transition-transform hover:scale-105">
              <img 
                src={logoUrl} 
                alt="Dulce Momento Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg font-serif">Dulce Momento</h1>
            <p className="text-2xl opacity-95 font-medium italic font-serif">Minipancakes Artesanales</p>
          </div>
          <p className="text-lg mb-8 max-w-2xl mx-auto bg-white bg-opacity-15 p-6 rounded-xl backdrop-blur-md border-2 border-white border-opacity-20 shadow-xl">
            {businessInfo.mission}
          </p>
          <button 
            onClick={() => setCurrentPage('menu')}
            className="bg-white text-amber-700 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-white shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            <FaShoppingCart className="text-xl" />
            ¡Haz tu pedido!
          </button>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="py-12 px-4 bg-amber-50 border-t-4 border-amber-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-amber-200">
              <IoIosTimer className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{businessInfo.responseTime}</p>
              <p className="text-gray-700 font-medium">Tiempo de respuesta</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-amber-200">
              <MdDeliveryDining className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">30min-4h</p>
              <p className="text-gray-700 font-medium">Entrega según pedido</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-amber-200">
              <MdVerified className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-gray-700 font-medium">Artesanales</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-amber-200">
              <FaLeaf className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">Frescos</p>
              <p className="text-gray-700 font-medium">Ingredientes locales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sabores Destacados */}
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 font-serif">Nuestros Sabores Artesanales</h2>
          <p className="text-center text-gray-600 mb-12 text-lg italic font-serif">Elaborados diariamente con ingredientes frescos y locales</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuData.flavors.slice(0, 3).map((flavor) => (
              <div key={flavor.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-pink-300 group">
                <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform">{flavor.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">{flavor.name}</h3>
                <p className="text-gray-700 text-center leading-relaxed">{flavor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promociones */}
      <div className="py-16 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 font-serif">Promociones Especiales</h2>
          <p className="text-center text-gray-600 mb-12 text-lg italic font-serif">Aprovecha nuestras ofertas exclusivas</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotions.map((promo, index) => {
              const IconComponent = promo.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-all border-2 border-transparent hover:border-pink-300 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-pink-600 group-hover:to-pink-700 transition-all">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900">{promo.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{promo.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Características del negocio */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 font-serif">¿Por qué elegir Dulce Momento?</h2>
          <p className="text-center text-gray-600 mb-12 text-lg italic font-serif">La diferencia está en los detalles</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg border-2 border-pink-200 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaHandHoldingHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">100% Artesanales</h3>
              <p className="text-gray-700 leading-relaxed">Elaborados a mano con recetas tradicionales e ingredientes frescos de la región de Sonsonate.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg border-2 border-orange-200 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaStar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Totalmente Personalizables</h3>
              <p className="text-gray-700 leading-relaxed">Elige tus toppings y jaleas favoritas para crear tu combinación perfecta y única.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaTruck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Entrega Inteligente</h3>
              <p className="text-gray-700 leading-relaxed">Tiempo de entrega optimizado según tu pedido. Desde 30 minutos para órdenes pequeñas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl border-2 border-gray-700 hover:border-pink-500 transition-all">
              <FaPhoneAlt className="w-10 h-10 mb-4 text-pink-400" />
              <p className="font-bold text-lg mb-2">WhatsApp</p>
              <p className="text-gray-300">+503 7660-6320</p>
              <p className="text-sm text-pink-400 mt-2">Respuesta en {businessInfo.responseTime}</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl border-2 border-gray-700 hover:border-pink-500 transition-all">
              <FaMapMarkerAlt className="w-10 h-10 mb-4 text-pink-400" />
              <p className="font-bold text-lg mb-2">Cobertura</p>
              <p className="text-gray-300">{businessInfo.coverage}</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl border-2 border-gray-700 hover:border-pink-500 transition-all">
              <FaClock className="w-10 h-10 mb-4 text-pink-400" />
              <p className="font-bold text-lg mb-2">Horario</p>
              <p className="text-gray-300">{businessInfo.schedule}</p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Síguenos en nuestras redes</h2>
            <p className="text-lg mb-8 opacity-90 italic font-serif">
              Mantente al día con nuestras últimas creaciones, promociones especiales y momentos dulces
            </p>
            
            <div className="flex justify-center gap-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19QjSCYtJ9/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-md rounded-full p-6 transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-white border-opacity-30 hover:border-opacity-50"
              >
                <FaFacebook className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/dulcesmomentos781?igsh=cmVucjN5OG9tcXRn"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-md rounded-full p-6 transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-white border-opacity-30 hover:border-opacity-50"
              >
                <FaInstagram className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>

            <div className="mt-8 bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-6 border-2 border-white border-opacity-20">
              <p className="text-lg font-medium mb-2">¡Comparte tus momentos dulces!</p>
              <p className="text-sm opacity-90">
                Etiquétanos en tus fotos y usa <span className="font-bold">#DulceMomento</span> para aparecer en nuestras historias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuPage: React.FC<{ setCurrentPage: (page: PageType) => void }> = ({ setCurrentPage }) => {
  // Cargar estado desde localStorage al inicio
  const [selectedPancakes, setSelectedPancakes] = useState<SelectedPancakes>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('dulce-momento-menu-state');
      if (savedState) {
        return JSON.parse(savedState).selectedPancakes;
      }
    }
    return {
      packageId: 'pkg-15',
      quantity: 15,
      price: 3.00,
      includedToppings: [],
      includedJellies: [],
      extraToppings: [],
      extraJellies: []
    };
  });
  
  const [customerData, setCustomerData] = useState<CustomerData>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('dulce-momento-menu-state');
      if (savedState) {
        return JSON.parse(savedState).customerData;
      }
    }
    return {
      name: '',
      phone: '',
      address: '',
      notes: '',
      deliveryType: 'standard'
    };
  });

  // Guardar estado en localStorage cuando cambia
  useEffect(() => {
    const stateToSave = {
      selectedPancakes,
      customerData
    };
    localStorage.setItem('dulce-momento-menu-state', JSON.stringify(stateToSave));
  }, [selectedPancakes, customerData]);

  const selectedPackage = menuData.packages.find(pkg => pkg.id === selectedPancakes.packageId);
  const deliveryOptions = selectedPackage ? getDeliveryOptions(selectedPackage.category) : [];

  const calculateTotal = (): string => {
    let total = selectedPackage?.price || 0;
    
    // Los toppings premium cuestan $0.50 cada uno
    selectedPancakes.includedToppings.forEach(toppingId => {
      const premiumTopping = menuData.toppings.premium.find(p => p.id === toppingId);
      if (premiumTopping && premiumTopping.price) {
        total += premiumTopping.price;
      }
    });
    
    // Los toppings adicionales después del 2do cuestan $0.25 cada uno
    const extraToppingsCount = Math.max(0, selectedPancakes.includedToppings.length - 2);
    total += extraToppingsCount * 0.25;
    
    // La primera jalea es gratis, después se cobra $0.25 por cada una adicional
    const extraJelliesCount = Math.max(0, selectedPancakes.includedJellies.length - 1);
    total += extraJelliesCount * 0.25;
    
    // Delivery cost
    const selectedDeliveryOption = deliveryOptions.find(option => option.id === customerData.deliveryType);
    if (selectedDeliveryOption) {
      total += selectedDeliveryOption.price;
    }
    
    return total.toFixed(2);
  };

  const selectPackage = (packageId: string): void => {
    const selectedPackage = menuData.packages.find(pkg => pkg.id === packageId);
    if (selectedPackage) {
      setSelectedPancakes(prev => ({
        ...prev,
        packageId,
        quantity: selectedPackage.quantity,
        price: selectedPackage.price
      }));
    }
  };

  const toggleTopping = (toppingId: string): void => {
    setSelectedPancakes(prev => {
      const newToppings = prev.includedToppings.includes(toppingId)
        ? prev.includedToppings.filter(id => id !== toppingId)
        : [...prev.includedToppings, toppingId];
      
      return { ...prev, includedToppings: newToppings };
    });
  };

  const toggleJelly = (jellyId: string): void => {
    setSelectedPancakes(prev => {
      const isSelected = prev.includedJellies.includes(jellyId);
      const newJellies = isSelected
        ? prev.includedJellies.filter(id => id !== jellyId)
        : [...prev.includedJellies, jellyId];
      
      return { 
        ...prev, 
        includedJellies: newJellies
      };
    });
  };

  const generateWhatsAppMessage = (): void => {
    // Generar número de ticket aleatorio de 6 dígitos
    const ticketNumber = Math.floor(100000 + Math.random() * 900000);

    const selectedToppingNames = selectedPancakes.includedToppings.map(id => {
      const freeToppings = menuData.toppings.free.find(t => t.id === id);
      const premiumToppings = menuData.toppings.premium.find(t => t.id === id);
      return {
        name: freeToppings?.name || premiumToppings?.name,
        price: premiumToppings?.price || 0,
        isPremium: !!premiumToppings
      };
    }).filter(t => t.name);

    const selectedJellyNames = selectedPancakes.includedJellies.map((id, idx) => {
      const jelly = menuData.jellies.find(j => j.id === id);
      // La primera jalea es gratis, las demás cuestan $0.25
      return {
        name: jelly?.name,
        price: idx === 0 ? 0 : 0.25
      };
    }).filter(j => j.name);

    const selectedDeliveryOption = deliveryOptions.find(option => option.id === customerData.deliveryType);

    // Subtotales
    const packageSubtotal = selectedPackage?.price || 0;
    const premiumToppingsSubtotal = selectedToppingNames.reduce((sum, t) => sum + (t.isPremium ? (t.price || 0) : 0), 0);
    const extraToppingsCount = Math.max(0, selectedPancakes.includedToppings.length - 2);
    const extraToppingsSubtotal = extraToppingsCount * 0.25;
    const jelliesSubtotal = selectedJellyNames.reduce((sum, j) => sum + (j.price || 0), 0);
    const deliverySubtotal = selectedDeliveryOption?.price || 0;
    const total = (
      packageSubtotal +
      premiumToppingsSubtotal +
      extraToppingsSubtotal +
      jelliesSubtotal +
      deliverySubtotal
    ).toFixed(2);

    // Crear líneas de toppings sin emojis y con precios
    const toppingsList = selectedToppingNames.length > 0
      ? `*Toppings seleccionados:*\n${selectedToppingNames.map((t, idx) => {
          let extra = '';
          if (t.isPremium) {
            extra = `+$${(t.price || 0).toFixed(2)}`;
          } else if (idx >= 2) {
            extra = '+$0.25';
          } else {
            extra = 'Gratis';
          }
          return `   ✓ ${t.name} (${extra})`;
        }).join('\n')}${extraToppingsCount > 0 ? `\n   (${extraToppingsCount} toppings extra x $0.25)` : ''}`
      : '*Toppings:* Ninguno seleccionado';

    // Crear líneas de jaleas sin emojis y con precios
    const jelliesList = selectedJellyNames.length > 0
      ? `*Jaleas artesanales:*\n${selectedJellyNames.map((j, idx) => {
          const extra = idx === 0 ? 'Gratis' : '+$0.25';
          return `   ✓ ${j.name} (${extra})`;
        }).join('\n')}${selectedJellyNames.length > 1 ? `\n   (${selectedJellyNames.length - 1} jaleas extra x $0.25)` : ''}`
      : '*Jaleas:* Ninguna seleccionada';

    // Lista de subtotales
    const subtotalsList = [
      `• ${selectedPackage?.quantity} Mini Pancakes: $${packageSubtotal.toFixed(2)}`,
      premiumToppingsSubtotal > 0 ? `• Toppings premium: $${premiumToppingsSubtotal.toFixed(2)}` : null,
      extraToppingsSubtotal > 0 ? `• Toppings extra: $${extraToppingsSubtotal.toFixed(2)}` : null,
      jelliesSubtotal > 0 ? `• Jaleas extra: $${jelliesSubtotal.toFixed(2)}` : null,
      deliverySubtotal > 0 ? `• Entrega (${selectedDeliveryOption?.name}): $${deliverySubtotal.toFixed(2)}` : null
    ].filter(Boolean).join('\n');

    const message = `*¡NUEVO PEDIDO DULCE MOMENTO!*

━━━━━━━━━━━━━━━━━━━━━━━━━━

*Ticket #${ticketNumber}*

*MI PEDIDO PERSONALIZADO:*

Cantidad: *${selectedPackage?.quantity} Mini Pancakes*
Paquete: ${selectedPackage?.description}

${toppingsList}

${jelliesList}

*Tipo de entrega:* ${selectedDeliveryOption?.name}
*Tiempo estimado:* ${selectedDeliveryOption?.timeRange}

━━━━━━━━━━━━━━━━━━━━━━━━━━

*DETALLE DE PRECIOS:*
${subtotalsList}

*TOTAL A PAGAR: $${total}*

━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *DATOS DE ENTREGA:*

*Nombre:* ${customerData.name}
*Teléfono:* ${customerData.phone}
*Dirección completa:*
${customerData.address}${customerData.notes ? `

*Notas especiales:*
${customerData.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━

*¡Listo para disfrutar tus minipancakes artesanales!*

_Confirma tu pedido y te responderemos en un máximo de 15 minutos_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '50376606320';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-amber-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-amber-700 font-semibold flex items-center gap-2 hover:text-amber-800 transition-colors hover:bg-amber-100 px-3 py-2 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
            Inicio
          </button>
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="w-10 h-10 cursor-pointer transition-transform hover:scale-110" 
              onClick={() => setCurrentPage('home')} 
            />
            <h1 className="text-xl font-bold text-gray-900 font-serif">Crear pedido</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-700 font-medium">Total</p>
            <p className="text-2xl font-bold text-amber-700">${calculateTotal()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Pancake Visualizer */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-200 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 font-serif">Tu orden de minipancakes</h2>
          <div className="flex justify-center mb-8">
            <PancakeVisualizer selectedPancakes={selectedPancakes} />
          </div>
          
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {selectedPancakes.includedToppings.map(toppingId => {
                const topping = [...menuData.toppings.free, ...menuData.toppings.premium].find(t => t.id === toppingId);
                return topping ? (
                  <span key={toppingId} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border-2 border-orange-300 flex items-center gap-1">
                    {topping.emoji} {topping.name}
                  </span>
                ) : null;
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {selectedPancakes.includedJellies.map(jellyId => {
                const jelly = menuData.jellies.find(j => j.id === jellyId);
                return jelly ? (
                  <span key={jellyId} className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border-2 border-amber-300 flex items-center gap-1">
                    {jelly.emoji} {jelly.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Package Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-200 transition-all hover:shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <MdLocalOffer className="text-amber-600 text-2xl" />
            <span className="font-serif">Elige tu paquete</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuData.packages.map(pkg => (
              <button
                key={pkg.id}
                onClick={() => selectPackage(pkg.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left relative hover:shadow-lg flex flex-col ${
                  selectedPancakes.packageId === pkg.id
                    ? 'border-amber-600 bg-amber-50 shadow-lg ring-2 ring-amber-200'
                    : 'border-gray-300 hover:border-amber-400'
                } ${pkg.special ? 'bg-gradient-to-br from-orange-50 to-amber-50' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-bold border-2 border-white">
                    Popular
                  </div>
                )}
                {pkg.special && (
                  <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold border-2 border-white">
                    Especial
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900 mb-1">{pkg.quantity} unidades</div>
                <div className="text-lg font-bold text-amber-700 mb-2">${pkg.price.toFixed(2)}</div>
                <div className="text-sm text-gray-700">{pkg.description}</div>
                <div className="text-xs text-blue-600 font-medium mt-2">
                  {pkg.category === 'small' && 'Entrega: 30-60min express'}
                  {pkg.category === 'medium' && 'Entrega: 1-2h estándar'}
                  {pkg.category === 'large' && 'Entrega: 2-4h estándar'}
                  {pkg.category === 'catering' && 'Entrega: 2-4h (programar)'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Free Toppings */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-200 transition-all hover:shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <FaGift className="text-green-600 text-2xl" />
            <span className="font-serif">Toppings Incluidos</span>
          </h3>
          <p className="text-gray-700 mb-6 bg-green-50 p-3 rounded-lg border-2 border-green-300">
            <IoMdCheckmarkCircle className="inline mr-2 text-green-600" />
            2 espacios gratis para toppings (premium aún cuesta $0.50 c/u)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuData.toppings.free.map(topping => (
              <button
                key={topping.id}
                onClick={() => toggleTopping(topping.id)}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg flex flex-col items-center ${
                  selectedPancakes.includedToppings.includes(topping.id)
                    ? 'border-amber-600 bg-amber-50 transform scale-105 shadow-lg ring-2 ring-amber-200'
                    : 'border-gray-300 hover:border-amber-400'
                }`}
              >
                <div className="text-4xl mb-3">{topping.emoji}</div>
                <p className="font-semibold text-gray-900">{topping.name}</p>
                <p className="text-sm text-green-600 font-medium">Gratis</p>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Toppings */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-200 transition-all hover:shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <IoMdStar className="text-orange-500 text-2xl" />
            <span className="font-serif">Toppings Premium</span>
          </h3>
          <p className="text-gray-700 mb-6 bg-orange-50 p-3 rounded-lg border-2 border-orange-300">
            <IoMdCheckmarkCircle className="inline mr-2 text-orange-600" />
            Toppings especiales con costo adicional de $0.50 c/u
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuData.toppings.premium.map(topping => (
              <button
                key={topping.id}
                onClick={() => toggleTopping(topping.id)}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg flex flex-col items-center ${
                  selectedPancakes.includedToppings.includes(topping.id)
                    ? 'border-orange-600 bg-orange-50 transform scale-105 shadow-lg ring-2 ring-orange-200'
                    : 'border-gray-300 hover:border-orange-400'
                }`}
              >
                <div className="text-4xl mb-3">{topping.emoji}</div>
                <p className="font-semibold text-gray-900">{topping.name}</p>
                <p className="text-sm text-orange-600 font-bold">+${topping.price?.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Jellies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-200 transition-all hover:shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <FaCoffee className="text-amber-600 text-2xl" />
            <span className="font-serif">Jaleas y Salsas Artesanales</span>
          </h3>
          <p className="text-gray-700 mb-6 bg-amber-50 p-3 rounded-lg border-2 border-amber-300">
            <IoMdCheckmarkCircle className="inline mr-2 text-amber-600" />
            1 incluida, adicionales $0.25 c/u
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menuData.jellies.map(jelly => (
              <button
                key={jelly.id}
                onClick={() => toggleJelly(jelly.id)}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg flex flex-col items-center ${
                  selectedPancakes.includedJellies.includes(jelly.id)
                    ? 'border-amber-700 bg-amber-50 transform scale-105 shadow-lg ring-2 ring-amber-200'
                    : 'border-gray-300 hover:border-amber-400'
                }`}
              >
                <div className="text-3xl mb-2">{jelly.emoji}</div>
                <p className="text-sm font-medium text-gray-900">{jelly.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Customer Form and Delivery Options */}
        <CustomerForm 
          customerData={customerData}
          setCustomerData={setCustomerData}
          deliveryOptions={deliveryOptions}
        />

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-200 transition-all hover:shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <MdRateReview className="text-indigo-600 text-2xl" />
            <span className="font-serif">Resumen del pedido</span>
          </h3>
          <div className="space-y-3 text-base">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="font-medium text-gray-900">{selectedPancakes.quantity} Mini Pancakes Artesanales</span>
              <span className="font-bold text-gray-900">${selectedPackage?.price.toFixed(2)}</span>
            </div>
            {selectedPancakes.includedToppings.map(toppingId => {
              const topping = menuData.toppings.premium.find(t => t.id === toppingId);
              return topping ? (
                <div key={toppingId} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-gray-800">{topping.name} (Premium)</span>
                  <span className="font-semibold text-orange-600">+${topping.price?.toFixed(2)}</span>
                </div>
              ) : null;
            })}
            {selectedPancakes.includedToppings.length > 2 && (
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-gray-800">Toppings extra ({selectedPancakes.includedToppings.length - 2})</span>
                <span className="font-semibold text-blue-600">+${((selectedPancakes.includedToppings.length - 2) * 0.25).toFixed(2)}</span>
              </div>
            )}
            {selectedPancakes.includedJellies.length > 1 && (
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-gray-800">Jaleas extra ({selectedPancakes.includedJellies.length - 1})</span>
                <span className="font-semibold text-purple-600">+${((selectedPancakes.includedJellies.length - 1) * 0.25).toFixed(2)}</span>
              </div>
            )}
            {deliveryOptions.find(option => option.id === customerData.deliveryType)?.price! > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-gray-800">{deliveryOptions.find(option => option.id === customerData.deliveryType)?.name}</span>
                <span className="font-semibold text-green-600">+${deliveryOptions.find(option => option.id === customerData.deliveryType)?.price.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-400">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-amber-700">${calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <button
          onClick={generateWhatsAppMessage}
          disabled={!customerData.name || !customerData.phone || !customerData.address}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 rounded-2xl font-bold text-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl border-2 border-green-400 disabled:border-gray-400"
        >
          <FaWhatsapp className="w-6 h-6" />
          Enviar pedido por WhatsApp
        </button>
        
        <div className="mt-6 text-center p-4 bg-green-50 rounded-xl border-2 border-green-300">
          <p className="text-green-800 font-medium flex items-center justify-center gap-2">
            <IoIosTimer className="text-xl" />
            Te responderemos en máximo {businessInfo.responseTime} durante nuestro horario: {businessInfo.schedule}
          </p>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
          <p className="text-amber-800 font-medium text-sm flex items-center justify-center gap-2">
            <FaMapMarkerAlt />
            Entregamos en {businessInfo.coverage} • {businessInfo.schedule}
          </p>
        </div>
      </div>
    </div>
  );
};

const DulceMomentoApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('dulce-momento-page') as PageType;
      if (savedPage && (savedPage === 'home' || savedPage === 'menu')) {
        return savedPage;
      }
    }
    return 'home';
  });
  
  const [isLoaded, setIsLoaded] = useState(false);

  // Guardar la página actual en localStorage cuando cambie
  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    localStorage.setItem('dulce-momento-page', page);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full p-3 flex items-center justify-center shadow-lg">
            <img 
              src={logoUrl} 
              alt="Dulce Momento Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-amber-700 font-semibold">Cargando tu experiencia dulce...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {currentPage === 'home' && <HomePage setCurrentPage={handlePageChange} />}
      {currentPage === 'menu' && <MenuPage setCurrentPage={handlePageChange} />}
    </div>
  );
};

export default DulceMomentoApp;