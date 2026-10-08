import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionItem from "./AccordionItem";

gsap.registerPlugin(ScrollTrigger);

const FAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqData = [
    {
      title: "Suppliers Mapping",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing. software like Aldus PageMaker including versions of Lorem Ipsum.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
      defaultOpen: true,
    },
    { title: "Risk Assessment?" },
    { title: "Who is companies be impacted by eudr?" },
    { title: "Can small companies there for non-penalties?" },
    { title: "Who is companies be impacted by eudr?" },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".faq-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-heading",
          start: "top 85%",
        },
      });

      gsap.from(".faq-description", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-heading",
          start: "top 85%",
        },
      });

      gsap.from(".accordion-item", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".accordion-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-10 sm:py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mb-8 lg:mb-12 faq-heading">
        <div className="lg:col-span-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            Have a question?
            <br />
            We are here to answer.
          </h2>
        </div>
        <div className="lg:col-span-2 flex items-start faq-description">
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            We share common trends and strategies for improving your rental
            making sure in high demand of service unique.
          </p>
        </div>
      </div>

      <div className="w-full accordion-container space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className="accordion-item"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="glass rounded-2xl overflow-hidden group-hover:glass-strong transition-all duration-300 shadow-sm">
              <AccordionItem {...item} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
