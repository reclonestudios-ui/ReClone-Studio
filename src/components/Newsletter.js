import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const TeamMembers = () => {
  const teamMembers = [
    {
      name: 'Abhishek',
      role: 'Game Developer',
      image: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with actual image
      description: 'Lead developer with expertise in game mechanics and system architecture.'
    },
    {
      name: 'Shaan',
      role: 'Creative Director',
      image: 'https://randomuser.me/api/portraits/men/2.jpg', // Replace with actual image
      description: 'Visionary behind the game\'s artistic direction and creative concepts.'
    },
    {
      name: 'Gourav',
      role: '3D Artist',
      image: 'https://randomuser.me/api/portraits/men/3.jpg', // Replace with actual image
      description: 'Brings characters and environments to life with stunning 3D models.'
    },
    {
      name: 'Arnav',
      role: 'Sound Designer',
      image: 'https://randomuser.me/api/portraits/men/4.jpg', // Replace with actual image
      description: 'Creates immersive audio experiences that enhance gameplay.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Section className="py-16 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Meet The Team
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The talented individuals behind our creative vision and technical excellence.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              className="group text-center"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-4 transition-opacity duration-300">
                  <div className="text-white text-sm">
                    <span className="block font-semibold">{member.role}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-gray-400 text-sm px-2">{member.description}</p>
              <div className="mt-4 flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default TeamMembers;
