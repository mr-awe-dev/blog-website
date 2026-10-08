import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import ArticleCard from "./ArticleCard";

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    title: "Delivery is reschedule for the next available time slot.",
    description:
      "Lorem ipsum dolor sit amet netussed consectetur. Enim viverra odio netus sed id. Consequat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    title: "Delivery is reschedule for the next available time slot.",
    description:
      "Lorem ipsum dolor sit amet netussed consectetur. Enim viverra odio netus sed id. Consequat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    title: "Delivery is reschedule for the next available time slot.",
    description:
      "Lorem ipsum dolor sit amet netussed consectetur. Enim viverra odio netus sed id. Consequat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop",
    title: "Delivery is reschedule for the next available time slot.",
    description:
      "Lorem ipsum dolor sit amet netussed consectetur. Enim viverra odio netus sed id. Consequat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop",
    title: "Delivery is reschedule for the next available time slot.",
    description:
      "Lorem ipsum dolor sit amet netussed consectetur. Enim viverra odio netus sed id. Consequat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
    title: "Delivery is reschedule for the next available time slot.",
    description:
      "Lorem ipsum dolor sit amet netussed consectetur. Enim viverra odio netus sed id. Consequat",
  },
];

const TrendingArticles: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-10 sm:py-16"
    >
      <div className="mb-8 sm:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4"
        >
          Our Trending Article
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl"
        >
          Common trends Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1 + index * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <ArticleCard
              image={article.image}
              title={article.title}
              description={article.description}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingArticles;
