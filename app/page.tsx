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
              <span className="glow-text">erickkisuge.dev</span>
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
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#e6ddd6] opacity-50"></div>
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
              { value: "7+", label: "Years Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
              { value: "15+", label: "Technologies" },
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-[#6d6d6d] mb-2 font-medium">Scroll to explore</p>
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
          </div>
        </motion.div>
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
                  src="/placeholder.svg?height=500&width=400"
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
                I'm a passionate fullstack developer with over 5 years of experience building web applications. My
                journey in tech started with a curiosity about how websites work, which led me to dive deep into both
                frontend and backend technologies.
              </p>
              <p className="text-[#6d6d6d]">
                I specialize in creating seamless user experiences with modern JavaScript frameworks while building
                robust and scalable backend systems. My approach combines technical expertise with a keen eye for design
                and user experience.
              </p>
              <p className="text-[#6d6d6d]">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through technical writing and mentoring.
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
                skills={["MongoDB", "PostgreSQL", "Firebase", "Docker", "AWS", "CI/CD"]}
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
                  placeholder="Subject"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
                  placeholder="Your message"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#a67c52] hover:bg-[#8a6642] text-white rounded-full py-6 glow-box"
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-2 text-[#2d2d2d] hover:text-[#a67c52] transition-colors duration-300"
            >
              <Mail className="h-5 w-5" />
              <span>hello@example.com</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#2d2d2d] hover:text-[#a67c52] transition-colors duration-300"
            >
              <Github className="h-5 w-5" />
              <span>github.com/developer</span>
            </a>
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

      {/* Floating Tech Icons */}
      <TechIcon
        name="React"
        icon={
          <svg viewBox="0 0 24 24" className="w-full h-full text-[#61dafb]" fill="none">
            <path
              d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
              fill="currentColor"
            />
            <path
              d="M12 22.5C11.3905 22.5 10.7889 22.3947 10.2168 22.1866C9.6447 21.9785 9.10876 21.6712 8.62957 21.2769C8.15038 20.8826 7.73252 20.4064 7.38904 19.8661C7.04556 19.3259 6.77998 18.7284 6.60178 18.0979C6.42358 17.4674 6.33478 16.8116 6.33789 16.1531C6.34099 15.4945 6.43597 14.8398 6.62016 14.2115C5.2126 13.6511 3.97961 12.8047 3.0284 11.7435C2.0772 10.6823 1.43271 9.43645 1.15066 8.10697C0.868606 6.77749 0.960516 5.40563 1.41601 4.12546C1.87151 2.84529 2.67883 1.69774 3.76158 0.789036C4.84433 -0.119663 6.16659 -0.760548 7.58533 -1.07304C9.00407 -1.38554 10.4713 -1.35867 11.8761 -0.994474C13.281 -0.630274 14.5784 0.0618568 15.6294 1.02957C16.6803 1.99729 17.4486 3.20824 17.8582 4.54297C18.2677 5.87771 18.3052 7.29272 17.9671 8.64547C17.629 9.99822 16.9271 11.2427 15.9281 12.2517C14.9291 13.2607 13.6653 14.0022 12.2802 14.4115C12.0934 15.0361 11.9992 15.6839 12.0001 16.3354C12.0011 16.9869 12.0973 17.6344 12.286 18.2584C12.4747 18.8824 12.7531 19.4711 13.1101 20.0011C13.467 20.5311 13.8976 20.9954 14.3883 21.3766C14.879 21.7578 15.4246 22.0507 16.0042 22.2437C16.5837 22.4367 17.1902 22.5268 17.8 22.5103C18.4098 22.4938 19.0108 22.3709 19.5797 22.1469C20.1486 21.9229 20.6782 21.6013 21.1482 21.1951C21.6182 20.7889 22.0221 20.3037 22.3484 19.7578C22.6747 19.2119 22.9188 18.6129 23.0701 17.9839C23.2214 17.3549 23.2777 16.7053 23.2366 16.0584C23.1954 15.4115 23.0574 14.7767 22.8281 14.1777C22.5988 13.5787 22.2816 13.0241 21.8899 12.5353C21.4983 12.0465 21.0376 11.6307 20.5251 11.3047L21.2751 10.1953C21.9239 10.6047 22.5052 11.1152 22.9945 11.7075C23.4838 12.2998 23.8738 12.9661 24.1482 13.6795C24.4225 14.3929 24.5772 15.1436 24.6064 15.9046C24.6356 16.6656 24.5389 17.4259 24.3197 18.1558C24.1005 18.8856 23.7622 19.5755 23.3193 20.1975C22.8764 20.8195 22.3353 21.3648 21.7183 21.8109C21.1013 22.257 20.4175 22.5977 19.6939 22.8195C18.9703 23.0413 18.2175 23.1411 17.4644 23.1152C16.7113 23.0893 15.9682 22.9381 15.2626 22.6672C14.557 22.3963 13.8989 22.0093 13.3159 21.5223C12.7329 21.0353 12.2329 20.4551 11.8359 19.8047C11.4389 19.1543 11.1509 18.4428 10.9834 17.6992C10.8159 16.9556 10.7712 16.1905 10.8512 15.4354C10.9312 14.6803 11.1347 13.9459 11.4531 13.2656C10.0681 12.8563 8.80429 12.1148 7.80529 11.1058C6.80629 10.0968 6.10439 8.85232 5.76629 7.49957C5.42819 6.14682 5.46569 4.73181 5.87519 3.39707C6.28469 2.06234 7.05299 0.851389 8.10399 -0.116331C9.15499 -1.08405 10.4524 -1.77618 11.8572 -2.14038C13.2621 -2.50458 14.7293 -2.53145 16.148 -2.21895C17.5668 -1.90645 18.889 -1.26557 19.9718 -0.356866C21.0545 0.551834 21.8618 1.69938 22.3173 2.97955C22.7728 4.25972 22.8647 5.63158 22.5827 6.96106C22.3006 8.29054 21.6561 9.53639 20.7049 10.5976C19.7537 11.6588 18.5207 12.5052 17.1132 13.0656C17.2973 13.6939 17.3923 14.3486 17.3954 15.0072C17.3985 15.6657 17.3097 16.3215 17.1315 16.952C16.9533 17.5825 16.6877 18.18 16.3443 18.7202C16.0008 19.2605 15.5829 19.7367 15.1037 20.131C14.6245 20.5253 14.0886 20.8326 13.5165 21.0407C12.9444 21.2488 12.3428 21.3541 11.7333 21.3541L12 22.5Z"
              fill="currentColor"
            />
          </svg>
        }
        position="top-right"
        delay={0.2}
      />

      <TechIcon
        name="Node.js"
        icon={
          <svg viewBox="0 0 24 24" className="w-full h-full text-[#68a063]" fill="currentColor">
            <path d="M12 21.8889C11.7663 21.8889 11.5428 21.8341 11.3295 21.7345L10.2312 21.1284C9.91711 20.9741 10.0453 20.9193 10.1348 20.8848C10.4489 20.7751 10.5081 20.7548 10.8626 20.5601C10.8971 20.5398 10.9418 20.5499 10.9763 20.5702L11.8408 21.0409C11.8855 21.0612 11.9402 21.0612 11.9747 21.0409L15.6348 18.9253C15.6795 18.905 15.7038 18.8644 15.7038 18.8137V14.5927C15.7038 14.542 15.6795 14.5014 15.6348 14.4811L11.9848 12.3655C11.9402 12.3452 11.8855 12.3452 11.8408 12.3655L8.19079 14.4811C8.14609 14.5014 8.12181 14.552 8.12181 14.5927V18.8137C8.12181 18.8644 8.14609 18.905 8.19079 18.9354L9.2992 19.5415C9.63359 19.7058 9.84679 19.5314 9.84679 19.3569V14.7773C9.84679 14.7367 9.88139 14.686 9.93619 14.686H10.4489C10.4935 14.686 10.5383 14.7266 10.5383 14.7773V19.3569C10.5383 19.7565 10.3149 19.9917 9.91711 19.9917C9.77791 19.9917 9.67841 19.9917 9.39061 19.8578L8.33261 19.2821C8.11941 19.1623 8 18.9456 8 18.7189V14.4979C8 14.2712 8.11941 14.0545 8.33261 13.9347L11.9928 11.8191C12.1957 11.7094 12.4633 11.7094 12.6662 11.8191L16.3264 13.9347C16.5396 14.0545 16.659 14.2712 16.659 14.4979V18.7189C16.659 18.9456 16.5396 19.1623 16.3264 19.2821L12.6662 21.3977C12.4531 21.4974 12.2195 21.4974 12.0064 21.3977L11.3295 21.7345C11.5428 21.8341 11.7663 21.8889 12 21.8889ZM13.1695 17.4164C11.7057 17.4164 11.3295 16.7394 11.3295 16.1536C11.3295 16.113 11.3743 16.0623 11.4291 16.0623H11.9522C11.997 16.0623 12.0315 16.1029 12.0315 16.1536C12.1108 16.5532 12.3037 16.7496 13.1695 16.7496C13.8464 16.7496 14.1402 16.6095 14.1402 16.2402C14.1402 16.0033 14.0509 15.8288 12.7957 15.7073C11.7552 15.6059 11.1229 15.3792 11.1229 14.6414C11.1229 13.9644 11.6764 13.5547 13.0262 13.5547C14.5148 13.5547 15.0278 14.0342 15.0885 14.7773C15.0885 14.8179 15.0743 14.8585 15.0499 14.889C15.0255 14.9195 14.9909 14.9296 14.9563 14.9296H14.4231C14.3885 14.9296 14.3438 14.899 14.3337 14.8483C14.2038 14.3891 13.9403 14.2215 13.0262 14.2215C12.2195 14.2215 12.0671 14.4482 12.0671 14.7773C12.0671 15.1566 12.2498 15.2479 13.4341 15.4093C14.6082 15.5707 15.0844 15.7872 15.0844 16.5148C15.0743 17.2526 14.4837 17.4164 13.1695 17.4164Z" />
          </svg>
        }
        position="bottom-left"
        delay={0.4}
      />

      <TechIcon
        name="TypeScript"
        icon={
          <svg viewBox="0 0 24 24" className="w-full h-full text-[#3178c6]" fill="currentColor">
            <path d="M3 3H21V21H3V3Z" fillOpacity="0.2" />
            <path d="M13.0767 13.7852H10.5122V20.625H8.4375V13.7852H5.89453V12H13.0767V13.7852Z" />
            <path d="M13.8047 20.625V12H17.7656C18.5104 12 19.1615 12.1302 19.7188 12.3906C20.276 12.651 20.7083 13.0156 21.0156 13.4844C21.3229 13.9531 21.4766 14.4948 21.4766 15.1094C21.4766 15.7344 21.3177 16.2734 21 16.7266C20.6823 17.1797 20.2344 17.5234 19.6562 17.7578C19.0781 17.9922 18.4062 18.1094 17.6406 18.1094H15.0469V16.3594H17.1797C17.5911 16.3594 17.9349 16.3021 18.2109 16.1875C18.487 16.0729 18.6953 15.9062 18.8359 15.6875C18.9766 15.4688 19.0469 15.2031 19.0469 14.8906C19.0469 14.5781 18.9766 14.3099 18.8359 14.0859C18.6953 13.862 18.487 13.6927 18.2109 13.5781C17.9349 13.4635 17.5911 13.4062 17.1797 13.4062H15.8438V20.625H13.8047Z" />
          </svg>
        }
        position="bottom-right"
        delay={0.6}
      />

      <TechIcon
        name="Python"
        icon={
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
            <path
              d="M11.93 2C9.57753 2 7.65534 2.39547 6.38639 3.1932C5.0777 4.02148 4.40466 5.24118 4.40466 6.87059V10.4137H11.9604V11.5863H2.75C1.61553 11.5863 0.719883 12.0235 0.283973 12.8518C-0.151936 13.6801 -0.0644354 14.8998 0.283973 16.3086C0.632382 17.7174 1.24926 18.9371 2.13491 19.7654C3.02055 20.5937 4.06957 21.0309 5.20404 21.0309H7.56651V18.3741C7.56651 16.6555 9.00097 15.2467 11.93 15.2467H19.5856C22.0778 15.2467 23.25 13.8379 23.25 11.5863V6.87059C23.25 4.61894 21.8155 3.1932 19.5856 3.1932C17.3557 3.1932 11.93 2 11.93 2ZM8.67578 5.10294C9.38857 5.10294 9.96161 5.67647 9.96161 6.39706C9.96161 7.11765 9.38857 7.69118 8.67578 7.69118C7.96299 7.69118 7.38995 7.11765 7.38995 6.39706C7.38995 5.67647 7.96299 5.10294 8.67578 5.10294Z"
              fill="#3776AB"
            />
            <path
              d="M12.0696 22C14.4221 22 16.3443 21.6045 17.6132 20.8068C18.9219 19.9785 19.595 18.7588 19.595 17.1294V13.5863H12.0392V12.4137H21.25C22.3845 12.4137 23.2801 11.9765 23.716 11.1482C24.1519 10.3199 24.0644 9.10019 23.716 7.69139C23.3676 6.28259 22.7507 5.06289 21.8651 4.23461C20.9794 3.40633 19.9304 2.96912 18.796 2.96912H16.4335V5.62588C16.4335 7.34447 14.999 8.75327 12.0696 8.75327H4.41443C1.92224 8.75327 0.75 10.1621 0.75 12.4137V17.1294C0.75 19.3811 2.18446 20.8068 4.41443 20.8068C6.6444 20.8068 12.0696 22 12.0696 22ZM15.3242 18.8971C14.6114 18.8971 14.0384 18.3235 14.0384 17.6029C14.0384 16.8824 14.6114 16.3088 15.3242 16.3088C16.037 16.3088 16.61 16.8824 16.61 17.6029C16.61 18.3235 16.037 18.8971 15.3242 18.8971Z"
              fill="#FFD43B"
            />
          </svg>
        }
        position="top-left"
        delay={0.8}
      />

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
                <p>hello@example.com</p>
                <p>+1 (555) 123-4567</p>
                <p>123 Developer Way, Tech City</p>
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
                <a href="#" className="text-white hover:text-[#a67c52] transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[#a67c52] transition-colors">
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
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#a67c52] transition-colors">
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
            <p>© {new Date().getFullYear()} Developer Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
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
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "3 months",
      teamSize: "4 developers",
      satisfaction: "98%",
      year: "2023",
    },
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, team workspaces, and progress tracking. Features include drag-and-drop interfaces and detailed analytics.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "2 months",
      teamSize: "3 developers",
      satisfaction: "95%",
      year: "2022",
    },
  },
  {
    title: "Social Media Dashboard",
    description:
      "A comprehensive dashboard for social media management, featuring content scheduling, analytics, and audience insights across multiple platforms.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Vue.js", "Express", "GraphQL", "Firebase", "D3.js"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "4 months",
      teamSize: "5 developers",
      satisfaction: "97%",
      year: "2023",
    },
  },
  {
    title: "Real Estate Marketplace",
    description:
      "A property listing platform with advanced search capabilities, virtual tours, and agent-client communication tools. Includes map integration and filtering options.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Django", "PostgreSQL", "AWS", "Mapbox"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "5 months",
      teamSize: "4 developers",
      satisfaction: "96%",
      year: "2022",
    },
  },
  {
    title: "Health & Fitness Tracker",
    description:
      "A comprehensive health tracking application with workout planning, nutrition logging, and progress visualization. Features include custom goal setting and social sharing.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React Native", "Node.js", "MongoDB", "Chart.js", "Auth0"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "3 months",
      teamSize: "3 developers",
      satisfaction: "94%",
      year: "2021",
    },
  },
  {
    title: "Learning Management System",
    description:
      "An educational platform for course creation, student enrollment, and progress tracking. Includes features for video lectures, quizzes, and discussion forums.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "Express", "MySQL", "AWS S3", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "6 months",
      teamSize: "6 developers",
      satisfaction: "98%",
      year: "2023",
    },
  },
  {
    title: "Creative Portfolio CMS",
    description:
      "A content management system designed specifically for creative professionals to showcase their work. Features include customizable layouts and integrated contact forms.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Gatsby", "Sanity.io", "GraphQL", "Netlify", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    stats: {
      devTime: "2 months",
      teamSize: "2 developers",
      satisfaction: "99%",
      year: "2022",
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
    image: "/placeholder.svg?height=400&width=600",
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
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "API development",
      "Database design",
      "Authentication systems",
      "Server optimization",
      "Cloud infrastructure",
    ],
  },
  {
    title: "Graphic Design",
    subtitle: "Visual storytelling that captivates",
    description:
      "Creating compelling visual assets that communicate your brand message effectively and leave a lasting impression on your audience.",
    image: "/placeholder.svg?height=400&width=600",
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
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "SEO optimization",
      "Content marketing",
      "Social media campaigns",
      "Email marketing",
      "Analytics and reporting",
    ],
  },
]
