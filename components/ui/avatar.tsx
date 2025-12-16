'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

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

  const avatarVariants: Variants = {
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
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <motion.div 
        className="flex items-center gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {avatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            variants={avatarVariants}
            whileHover="hover"
            className={`relative group ${
              index > 0 ? '-ml-2 md:-ml-3' : ''
            } transition-all duration-300`}
            style={{ zIndex: avatars.length - index }}
          >
            <div className={`${sizeClasses[size]} rounded-full border-2 border-white/40 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/60 relative`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-300 z-10 pointer-events-none"></div>
              <img
                src={avatar.image}
                alt={avatar.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        ))}
        
        {additionalCount > 0 && (
          <motion.div
            variants={avatarVariants}
            whileHover="hover"
            className={`${sizeClasses[size]} rounded-full border-2 border-white/40 flex items-center justify-center text-xs md:text-sm font-bold -ml-2 md:-ml-3 transition-all duration-300 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md text-[#FEFBF1] shadow-lg hover:shadow-xl hover:border-white/60 hover:from-white/20 hover:to-white/10 relative group`}
            style={{ zIndex: 1 }}
          >
            <span className="relative z-10">+{additionalCount}</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-300 rounded-full"></div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Texto abaixo dos avatares */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="flex flex-col items-center gap-1"
      >
        <motion.p
          className="text-xs md:text-sm text-[#FEFBF1]/90 font-medium tracking-wide"
          whileHover={{ opacity: 1 }}
        >
          Siga a MEIFI no Instagram
        </motion.p>
        <motion.div
          className="h-px w-12 bg-gradient-to-r from-transparent via-[#FEFBF1]/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default AvatarGroup;
