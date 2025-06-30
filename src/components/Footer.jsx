import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Н</span>
              </div>
              <span className="text-xl font-bold">НедвижимостьПро</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ваш надежный партнер в мире недвижимости. Помогаем найти идеальный дом уже более 10 лет.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li><Link to="/properties" className="text-gray-400 hover:text-white">Каталог</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Услуги</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">О нас</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Контакты</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white">Новости</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li><Link to="/services/buying" className="text-gray-400 hover:text-white">Покупка</Link></li>
              <li><Link to="/services/selling" className="text-gray-400 hover:text-white">Продажа</Link></li>
              <li><Link to="/services/rental" className="text-gray-400 hover:text-white">Аренда</Link></li>
              <li><Link to="/services/valuation" className="text-gray-400 hover:text-white">Оценка</Link></li>
              <li><Link to="/services/consultation" className="text-gray-400 hover:text-white">Консультации</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">info@nedvizhimostpro.ru</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gray-400 mt-1" />
                <span className="text-gray-400">
                  г. Москва, ул. Тверская, д. 1<br />
                  офис 101
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 НедвижимостьПро. Все права защищены.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;