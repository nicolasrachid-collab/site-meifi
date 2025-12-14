'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Avatar {
  id: number;
  name: string;
  image: string;
  alt: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  additionalCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
  avatars, 
  additionalCount = 0,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'size-10',
    md: 'size-12 md:size-16',
    lg: 'size-16 md:size-20'
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <motion.div 
        className="flex items-center gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {avatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            variants={avatarVariants}
            whileHover="hover"
            className={`relative ${
              index > 0 ? '-ml-3' : ''
            } transition-all duration-200`}
            style={{ zIndex: avatars.length - index }}
          >
            <div className={`${sizeClasses[size]} rounded-full border-2 border-white/30 overflow-hidden transition-all duration-200`}>
              <img
                src={avatar.image}
                alt={avatar.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>
        ))}
        
        {additionalCount > 0 && (
          <motion.div
            variants={avatarVariants}
            whileHover="hover"
            className={`${sizeClasses[size]} rounded-full border-2 border-white/30 flex items-center justify-center text-xs md:text-sm font-semibold -ml-3 transition-all duration-200 bg-white/10 backdrop-blur-sm text-[#FEFBF1]`}
            style={{ zIndex: 1 }}
          >
            +{additionalCount}
          </motion.div>
        )}
      </motion.div>
      
      {/* Texto abaixo dos avatares */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xs md:text-sm text-[#FEFBF1]/80 font-medium"
      >
        Siga a MEIFI no Instagram
      </motion.p>
    </div>
  );
};

export default AvatarGroup;
