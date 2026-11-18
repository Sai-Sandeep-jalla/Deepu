import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, Laugh, HeartHandshake, Compass, Infinity, Calendar, Heart } from 'lucide-react';

const iconMap = {
  Sparkles,
  Coffee,
  Laugh,
  HeartHandshake,
  Compass,
  Infinity
};

export default function MemoryLaneSection({ memories = [] }) {
  return (
    <section id="memories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5E9] text-[#C7839D] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#EBC6B5]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Our Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#49364E] mb-4"
        >
          Every little moment matters.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#C7839D]"
        >
          "Some memories are too special to leave behind."
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Center Connecting Floral Vine Line on Desktop, Left Line on Mobile */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#F6D9E4] via-[#C7839D] to-[#A8B89A] opacity-60" />

        {/* Milestones */}
        <div className="space-y-16">
          {memories.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            const IconComponent = iconMap[milestone.icon] || Sparkles;

            return (
              <div
                key={milestone.id || idx}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node / Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-white border-4 border-[#F6D9E4] shadow-md flex items-center justify-center text-[#C7839D]">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`ml-16 md:ml-0 w-[calc(100%-4.5rem)] md:w-[45%] ${
                    isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
                  }`}
                >
                  <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-[#F6D9E4] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    {/* Top Tag & Date */}
                    <div
                      className={`flex items-center gap-2 mb-3 text-xs font-semibold ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E9DDF5] text-[#49364E]">
                        {milestone.category}
                      </span>
                      <span className="text-[#C7839D] font-serif italic text-sm">
                        {milestone.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-medium text-[#49364E] mb-2 group-hover:text-[#C7839D] transition-colors">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#49364E]/80 leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Optional Image */}
                    {milestone.imageUrl && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-[#FFF5E9] shadow-xs">
                        <img
                          src={milestone.imageUrl}
                          alt={milestone.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Cute corner heart */}
                    <div
                      className={`mt-3 flex items-center text-xs text-[#C7839D] gap-1 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span>Memory #{idx + 1}</span>
                      <Heart className="w-3.5 h-3.5 fill-[#F6D9E4]" />
                    </div>
                  </div>
                </motion.div>

                {/* Empty spacer for alternating side on desktop */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
