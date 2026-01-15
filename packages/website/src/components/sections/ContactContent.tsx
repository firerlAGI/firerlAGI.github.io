import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Mail, Github, Twitter, MapPin } from 'lucide-react';

const ContactContent: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="contact-wrapper">
      <div className="contact-info">
        <div className="contact-links">
          <a href="mailto:hello@firerlAGI.com" className="contact-link">
            <div className="icon-wrapper">
              <Mail size={20} />
            </div>
            <span className="contact-value font-mono">hello@firerlAGI.com</span>
          </a>
          
          <a href="https://github.com/firerlAGI" target="_blank" rel="noopener noreferrer" className="contact-link">
            <div className="icon-wrapper">
              <Github size={20} />
            </div>
            <span className="contact-value font-mono">@firerlAGI</span>
          </a>
          
          <a href="https://twitter.com/firerlAGI" target="_blank" rel="noopener noreferrer" className="contact-link">
            <div className="icon-wrapper">
              <Twitter size={20} />
            </div>
            <span className="contact-value font-mono">@firerlAGI</span>
          </a>
          
          <div className="contact-link">
            <div className="icon-wrapper">
              <MapPin size={20} />
            </div>
            <span className="contact-value font-mono">Silicon Valley, Sector 7</span>
          </div>
        </div>
      </div>
      
      <div className="contact-form-wrapper">
        <form 
          className="contact-form" 
          action="https://formspree.io/f/your-form-id" 
          method="POST"
          id="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">{t('contact.form.identity')}</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder={language === 'zh' ? '输入你的身份' : 'Enter your identity'} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">{t('contact.form.email')}</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder={language === 'zh' ? '输入你的频率' : 'Enter your frequency'} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              required 
              placeholder={language === 'zh' ? '输入加密信息' : 'Enter encrypted message'}
            ></textarea>
          </div>
          
          <button type="submit" className="cyber-button">
            <span className="button-text">{t('contact.form.send')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactContent;
