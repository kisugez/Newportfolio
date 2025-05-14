"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Code,
  ExternalLink,
  Github,
  Mail,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Code2,
  Palette,
  BarChart3,
  Globe,
  Smartphone,
  Server,
  Check,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Head from "next/head";
import { useForm, ValidationError } from "@formspree/react";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxData, setLightboxData] = useState<any>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])
  const scale = useTransform(scrollY, [0, 100], [1, 0.95])
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeProfile, setActiveProfile] = useState(0)

  // Text animation for word transitions
  const words = ["Create", "Design", "Develop", "Deploy"]
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Handle scroll locking when menu is open
  useEffect(() => {
    if (isMenuOpen || lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen, lightboxOpen])

  // Interactive scroll for developer stats
  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 500) {
        y.set(window.scrollY * 0.5)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [y])

  // Carousel navigation
  const nextProfile = () => {
    setActiveProfile((prev) => (prev + 1) % profiles.length)
  }

  const prevProfile = () => {
    setActiveProfile((prev) => (prev - 1 + profiles.length) % profiles.length)
  }

  const openLightbox = (data: any) => {
    setLightboxData(data)
    setLightboxOpen(true)
  }

  return (
    <>
      <Head>
        {/* Favicon Section */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <title>Erick Kisuge Portfolio</title>
        <meta name="description" content="Erick Kisuge's Portfolio - Fullstack Developer" />
      </Head>

      <div className="bg-[#f8f5f2] text-[#2d2d2d] min-h-screen" ref={containerRef}>
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:py-6 md:px-12 backdrop-blur-md bg-[#f8f5f2]/80">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-medium"
            >
              <Link href="/" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#a67c52]" />
                <span className="glow-text">Erick Kisuge Portfolio</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {["Projects", "About", "Skills", "Contact", "Services"].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-[#2d2d2d] hover:text-[#a67c52] transition-colors duration-300 font-medium"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="text-[#2d2d2d] hover:text-[#a67c52]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f8f5f2] z-50 flex flex-col p-6"
          >
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-[#2d2d2d]">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {["Projects", "About", "Skills", "Contact", "Services"].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-2xl font-medium text-[#2d2d2d] hover:text-[#a67c52] transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Data Lightbox */}
        <AnimatePresence>
          {lightboxOpen && lightboxData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto gradient-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{lightboxData.title}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setLightboxOpen(false)} className="text-[#2d2d2d]">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="relative h-[300px] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={lightboxData.image || "/placeholder.svg"}
                    alt={lightboxData.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p>{lightboxData.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {lightboxData.stats &&
                      Object.entries(lightboxData.stats).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-[#f8f5f2] p-4 rounded-lg gradient-bg">
                          <div className="text-sm text-[#6d6d6d]">{key}</div>
                          <div className="text-xl font-bold">{value}</div>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {lightboxData.technologies &&
                      lightboxData.technologies.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-[#e6ddd6] text-[#2d2d2d] text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section with Interactive Data */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden pt-20">
          <div className="absolute inset-0 -z-10 gradient-bg"></div>

          <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#e6ddd6] opacity-50"
              style={{
                transform: "scale(0.9)", // Adjust scale for mobile view
              }}
            ></div>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-6 mb-8">
                {[
                  { icon: <Code2 className="h-6 w-6" />, label: "Code" },
                  { icon: <Palette className="h-6 w-6" />, label: "Design" },
                  { icon: <BarChart3 className="h-6 w-6" />, label: "Analytics" },
                  { icon: <Globe className="h-6 w-6" />, label: "Web" },
                  { icon: <Smartphone className="h-6 w-6" />, label: "Mobile" },
                  { icon: <Server className="h-6 w-6" />, label: "Backend" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-white p-3 rounded-full shadow-sm glow-box">{item.icon}</div>
                    <span className="text-xs mt-2 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glow-text"
            >
              <span>I </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-[#a67c52]"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
              <span> Digital Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#6d6d6d] mb-8 max-w-2xl mx-auto"
            >
              Fullstack developer specializing in building modern, responsive, and performant web applications.
            </motion.p>

          {/* Interactive Developer Stats */}
          <motion.div style={{ y: springY }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { value: "2+", label: "Years Experience" },
              { value: "20+", label: "Projects Completed" },
              { value: "10+", label: "Happy Clients" },
              { value: "10+", label: "Technologies" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer gradient-border"
                onClick={() =>
                  openLightbox({
                    title: stat.label,
                    description: `Details about my ${stat.label.toLowerCase()}.`,
                    image: "/placeholder.svg",
                    stats: {
                      Total: stat.value,
                      "Last Year": index === 0 ? "1+" : index === 1 ? "12+" : index === 2 ? "8+" : "5+",
                    },
                  })
                }
              >
                <div className="text-3xl font-bold text-[#a67c52] glow-text">{stat.value}</div>
                <div className="text-sm text-[#6d6d6d] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button className="bg-[#a67c52] hover:bg-[#8a6642] text-white rounded-full px-8 py-6 glow-box" asChild>
                <Link href="#projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-[#a67c52] text-[#a67c52] hover:bg-[#a67c52] hover:text-white rounded-full px-8 py-6"
                asChild
              >
                <Link href="#contact">Contact Me</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Featured Projects</h2>
              <p className="text-[#6d6d6d] max-w-2xl mx-auto">
                A collection of my recent fullstack development work, showcasing a range of technologies and solutions.
              </p>
            </motion.div>

            <div className="space-y-32">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  onViewDetails={() =>
                    openLightbox({
                      ...project,
                      stats: {
                        "Development Time": project.stats.devTime,
                        "Team Size": project.stats.teamSize,
                        "Client Satisfaction": project.stats.satisfaction,
                        "Completion Year": project.stats.year,
                      },
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 md:px-12 bg-[#e6ddd6] relative overflow-hidden">
          <div className="absolute inset-0 -z-10 gradient-bg"></div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden gradient-border glow-box">
                  <Image
                    src="_BLS8983.jpg?heightplaceholder=500&width=400"
                    alt="Developer portrait"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold glow-text">About Me</h2>
                <p className="text-[#6d6d6d]">
                  I'm a passionate fullstack developer with 2 years of experience building web applications. My
                  journey in tech started with a curiosity about how websites work, which led me to dive deep into both
                  frontend and backend technologies.
                </p>
                <p className="text-[#6d6d6d]">
                  I specialize in creating seamless user experiences with modern JavaScript frameworks such as React JS and Backend Frameworks like Django and Node while building
                  robust and scalable systems. My approach combines technical expertise with a keen eye for design
                  and user experience.
                </p>
                <p className="text-[#6d6d6d]">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects.
                </p>

                <Button
                  className="bg-[#a67c52] hover:bg-[#8a6642] text-white rounded-full px-8 py-6 mt-4 glow-box"
                  asChild
                >
                  <Link href="#contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Skills & Expertise</h2>
              <p className="text-[#6d6d6d] max-w-2xl mx-auto">
                A comprehensive overview of my technical skills and areas of expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <SkillCategory
                  title="Frontend Development"
                  skills={["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"]}
                  delay={0}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <SkillCategory
                  title="Backend Development"
                  skills={["Node.js", "Express", "Python", "Django", "GraphQL", "RESTful APIs"]}
                  delay={0.2}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <SkillCategory
                  title="Database & DevOps"
                  skills={["MongoDB", "PostgreSQL","Docker","CI/CD"]}
                  delay={0.4}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 md:px-12 bg-[#e6ddd6] relative overflow-hidden">
          <div className="absolute inset-0 -z-10 gradient-bg"></div>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Let's Connect</h2>
              <p className="text-[#6d6d6d] max-w-2xl mx-auto">
                Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-lg p-8 shadow-sm gradient-border glow-box"
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>

        {/* Services Carousel Section */}
        <section id="services" className="py-20 px-6 md:px-12 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Services</h2>
              <p className="text-[#6d6d6d] max-w-2xl mx-auto">
                Specialized services tailored to meet your digital needs.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevProfile}
                  className="rounded-full bg-white border-[#a67c52] text-[#a67c52] hover:bg-[#a67c52] hover:text-white glow-box"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextProfile}
                  className="rounded-full bg-white border-[#a67c52] text-[#a67c52] hover:bg-[#a67c52] hover:text-white glow-box"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-hidden" ref={carouselRef}>
                <motion.div
                  className="flex"
                  animate={{ x: `-${activeProfile * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {profiles.map((profile, index) => (
                    <motion.div
                      key={index}
                      className="min-w-full px-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-[#f8f5f2] rounded-xl overflow-hidden gradient-border glow-box">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-[300px] md:h-auto">
                            <Image
                              src={profile.image || "/placeholder.svg"}
                              alt={profile.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                              <div className="text-white text-center p-6">
                                <div className="text-3xl font-bold mb-2 glow-text">{profile.title}</div>
                                <div className="text-lg">{profile.subtitle}</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-8 md:p-12">
                            <h3 className="text-2xl font-bold mb-4">{profile.title}</h3>
                            <p className="text-[#6d6d6d] mb-6">{profile.description}</p>

                            <div className="space-y-4">
                              {profile.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className="bg-[#a67c52] text-white p-1 rounded-full mt-0.5">
                                    <Check className="h-4 w-4" />
                                  </div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>

                            <Button className="mt-8 bg-[#a67c52] hover:bg-[#8a6642] text-white rounded-full glow-box">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                {profiles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProfile(index)}
                    className={`w-3 h-3 rounded-full ${activeProfile === index ? "bg-[#a67c52]" : "bg-[#e6ddd6]"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Word Transition */}
        <section className="py-20 px-6 md:px-12 bg-[#e6ddd6] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex overflow-hidden py-10"
              >
                {Array(3)
                  .fill(["Design", "Develop", "Deploy", "Maintain", "Optimize"])
                  .flat()
                  .map((word, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: "100%" }}
                      animate={{ x: "-100%" }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                        delay: index * 0.1,
                      }}
                      className="flex-shrink-0 mx-8"
                    >
                      <span className="text-6xl md:text-8xl font-bold text-[#a67c52] opacity-20">{word}</span>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Developer Stats */}
<motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center"
        >
          <div className="w-[30px] h-[50px] border-2 border-[#a67c52] rounded-full flex justify-center glow-box">
            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
              }}
              className="w-[8px] h-[8px] bg-[#a67c52] rounded-full mt-2"
            />
          </div>
          <p className="text-sm text-[#6d6d6d] mt-2 font-medium">Scroll to explore</p>
        </motion.div>


        {/* Footer with Criss-Cross Effect */}
        <footer className="py-12 px-6 md:px-12 bg-black text-white overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Criss-Cross Words Effect */}
            <div className="relative h-[300px] md:h-[400px] mb-12">
              {[
                { text: "CREATIVE", x: "10%", y: "10%", rotate: -15, delay: 0 },
                { text: "INNOVATIVE", x: "70%", y: "20%", rotate: 10, delay: 0.1 },
                { text: "RESPONSIVE", x: "30%", y: "30%", rotate: -5, delay: 0.2 },
                { text: "MODERN", x: "60%", y: "40%", rotate: 15, delay: 0.3 },
                { text: "SCALABLE", x: "20%", y: "50%", rotate: -10, delay: 0.4 },
                { text: "PERFORMANT", x: "80%", y: "60%", rotate: 5, delay: 0.5 },
                { text: "ACCESSIBLE", x: "40%", y: "70%", rotate: -20, delay: 0.6 },
                { text: "INTUITIVE", x: "50%", y: "80%", rotate: 10, delay: 0.7 },
              ].map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: word.delay }}
                  viewport={{ once: true }}
                  className="absolute font-bold text-2xl md:text-4xl lg:text-5xl"
                  style={{
                    left: word.x,
                    top: word.y,
                    transform: `rotate(${word.rotate}deg)`,
                    color: index % 2 === 0 ? "#ffffff" : "#a67c52",
                  }}
                >
                  {word.text}
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8 border-t border-gray-800 pt-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <div className="space-y-2">
                  <p>@meokeyo27@gmail.com</p>
                  <p>+974 3302 7926</p>
                  <p>4050 Doha Qatar</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Links</h3>
                <div className="space-y-2">
                  <p>
                    <a href="#" className="hover:text-[#a67c52] transition-colors">
                      Projects
                    </a>
                  </p>
                  <p>
                    <a href="#" className="hover:text-[#a67c52] transition-colors">
                      About
                    </a>
                  </p>
                  <p>
                    <a href="#" className="hover:text-[#a67c52] transition-colors">
                      Services
                    </a>
                  </p>
                  <p>
                    <a href="#" className="hover:text-[#a67c52] transition-colors">
                      Contact
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Follow</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/kisugez" className="text-white hover:text-[#a67c52] transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
              
              
                  <a href="https://www.linkedin.com/in/erick-kisuge-7ba983287/" className="text-white hover:text-[#a67c52] transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Erick Kisuge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Project Card Component
function ProjectCard({
  project,
  index,
  onViewDetails,
}: { project: Project; index: number; onViewDetails: () => void }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden group gradient-border glow-box">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-3 rounded-full hover:bg-[#a67c52] hover:text-white transition-colors duration-300"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-3 rounded-full hover:bg-[#a67c52] hover:text-white transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <button
                onClick={onViewDetails}
                className="bg-white text-black p-3 rounded-full hover:bg-[#a67c52] hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-info"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`space-y-4 ${isEven ? "md:order-2" : "md:order-1"}`}>
        <h3 className="text-2xl font-bold glow-text">{project.title}</h3>
        <p className="text-[#6d6d6d]">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-[#e6ddd6] text-[#2d2d2d] text-sm rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-4 flex gap-4">
          <Button className="bg-[#a67c52] hover:bg-[#8a6642] text-white rounded-full glow-box" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              View Live <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            className="border-[#a67c52] text-[#a67c52] hover:bg-[#a67c52] hover:text-white rounded-full"
            asChild
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              View Code <Code className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// Skill Category Component
function SkillCategory({ title, skills, delay }: { title: string; skills: string[]; delay: number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm gradient-border glow-box">
      <h3 className="text-xl font-bold mb-4 text-[#2d2d2d]">{title}</h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#a67c52]" />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tech Icon Component
function TechIcon({
  name,
  icon,
  position,
  delay,
}: { name: string; icon: React.ReactNode; position: string; delay: number }) {
  const positionClasses = {
    "top-left": "top-[100px] left-6 md:left-12",
    "top-right": "top-[100px] right-6 md:right-12",
    "bottom-left": "bottom-24 left-6 md:left-12",
    "bottom-right": "bottom-24 right-6 md:right-12",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`fixed ${positionClasses[position as keyof typeof positionClasses]} z-10 hidden md:block tech-icon`}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        className="bg-white p-3 rounded-full shadow-lg flex flex-col items-center glow-box"
      >
        <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
        <span className="text-xs mt-1 font-medium">{name}</span>
      </motion.div>
    </motion.div>
  )
}

// Project Data
interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  stats: {
    devTime: string
    teamSize: string
    satisfaction: string
    year: string
  }
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking. Built with a modern tech stack for optimal performance.",
    image: "/screenshot (60).png?height=400&width=600",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL"],
    liveUrl: "https://www.affordableimportske.com/",
    githubUrl: "https://github.com/kisugez/Affordable-Imports-Ecommerce-Store",
    stats: {
      devTime: "2 months",
      teamSize: "2 developers",
      satisfaction: "98%",
      year: "2024",
    },
  },
  {
    title: "Education Portal and Job placement",
    description:
      "A Simple Interactive Web app for Educational Placements for scholarships and Job placement.",
    image: "/screenshot (65).png",
    technologies: ["Next.js", "Tailwind.css", "TypeScript", "PostgreSQL", "Redux"],
    liveUrl: "https://eclipsoninternational.com/",
    githubUrl: "https://github.com/kisugez/Eclipson-Website",
    stats: {
      devTime: "1 months",
      teamSize: "1 developers",
      satisfaction: "95%",
      year: "2024",
    },
  },
  {
    title: "Car Dealership App",
    description:
      "A comprehensive car dealership app, featuring content scheduling, analytics, and audience insights across multiple platforms and seamless purchasing intergration for vehicles.",
    image: "/screenshot (67).png?height=400&width=600",
    technologies: ["React.js:", "Django", "SQLite", "Tailwind CSS", "Docker"],
    liveUrl: "https://autodealer.vercel.app/",
    githubUrl: "https://github.com/kisugez/Car-Dealership-FullStack-Project",
    stats: {
      devTime: "2 months",
      teamSize: "5 developers",
      satisfaction: "97%",
      year: "2025",
    },
  },
  {
    title: "A Social Networking & Event Booking Platform",
    description:
      "A  scalable and user-friendly web platform that allows users to connect with like-minded individuals, discover and book both free and paid events, and create their own meetups or communities. The project focuses on enhancing community engagement through intuitive design and smooth event exploration.",
    image: "/screenshot (69).png?height=400&width=600",
    technologies: ["React", "Node.js", "MongoDB", "JSON Web Token", "Tailwind CSS"],
    liveUrl: "https://kisugezsocial-sphere-app.vercel.app/",
    githubUrl: "https://github.com/kisugez/socialshpere",
    stats: {
      devTime: "1 months",
      teamSize: "1 developers",
      satisfaction: "2025",
      year: "2022",
    },
  },
  {
    title: "Female Health Tracker",
    description:
      "A comprehensive health tracking application with workout planning, nutrition logging, and progress visualization. Features include custom goal setting and social sharing.",
    image: "/screenshot (71).png?height=400&width=600",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "pnpm:", "Vercel"],
    liveUrl: "https://adaora-green.vercel.app/",
    githubUrl: "https://github.com/kisugez/adaora",
    stats: {
      devTime: "1 months",
      teamSize: "1 developers",
      satisfaction: "94%",
      year: "2025",
    },
  },
  {
    title: "Diaspora Fintech",
    description:
      "A diaspora-focused fintech web app that provides savings, loans, and investment solutions for Kenyans living abroad.",
    image: "/screenshot (73).png?height=400&width=600",
    technologies: ["Next.js", "Node.Js", "MySQL", " PostCSS", "Tailwind CSS"],
    liveUrl: "https://keqatsico.com/",
    githubUrl: "https://github.com/kisugez/KEQAT-Website",
    stats: {
      devTime: "1 months",
      teamSize: "6 developers",
      satisfaction: "98%",
      year: "2023",
    },
  },
  
]

// Service Profiles Data
const profiles = [
  {
    title: "Front-End Development",
    subtitle: "Creating beautiful user interfaces",
    description:
      "Specializing in crafting responsive, intuitive, and visually appealing user interfaces that provide exceptional user experiences across all devices.",
    image: "/light-brown-color-solid-background-1920x1080.png?height=400&width=600",
    features: [
      "Responsive web design",
      "Interactive UI/UX",
      "Performance optimization",
      "Cross-browser compatibility",
      "Modern framework implementation",
    ],
  },
  {
    title: "Back-End Development",
    subtitle: "Building robust server solutions",
    description:
      "Developing secure, scalable, and efficient server-side applications that power your digital products with reliable performance and data management.",
    image: "/light-brown-color-solid-background-1920x1080.png?height=400&width=600",
    features: [
      "API development",
      "Database design",
      "Authentication systems",
      "Serverless architecture",
    ],
  },
  {
    title: "Graphic Design",
    subtitle: "Visual storytelling that captivates",
    description:
      "Creating compelling visual assets that communicate your brand message effectively and leave a lasting impression on your audience.",
    image: "/light-brown-color-solid-background-1920x1080.png?height=400&width=600",
    features: [
      "Brand identity design",
      "UI design systems",
      "Illustration and iconography",
      "Marketing materials",
      "Social media graphics",
    ],
  },
  {
    title: "Digital Marketing",
    subtitle: "Strategies that drive growth",
    description:
      "Implementing data-driven marketing strategies to increase your online presence, engage your target audience, and drive conversions.",
    image: "/light-brown-color-solid-background-1920x1080.png",
    features: [
      "SEO optimization",
      "Content marketing",
      "Social media campaigns",
      "Email marketing",
      "Analytics and reporting",
    ],
  },
]

function ContactForm() {
  const [state, handleSubmit] = useForm("xpwdovrj");

  if (state.succeeded) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#a67c52] mb-4">Thank You!</h2>
        <p className="text-[#6d6d6d]">Your message has been sent successfully.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
            placeholder="Your name"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
            placeholder="Your email"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
          placeholder="Subject"
          required
        />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
          placeholder="Your message"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-[#a67c52] hover:bg-[#8a6642] text-white rounded-full py-6 glow-box"
      >
        Send Message
      </button>
    </form>
  );
}
