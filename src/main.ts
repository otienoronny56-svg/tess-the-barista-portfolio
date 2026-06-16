import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  createIcons,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  Code2,
  Database,
  Layout,
  PenTool,
  Cpu,
  Layers,
  Globe,
  Award,
  BookOpen,
  Coffee,
  Leaf,
  Users,
  Mic
} from 'lucide'

gsap.registerPlugin(ScrollTrigger)

// --- Initialization ---

const init = () => {
  setupTheme()
  setupAnimations()
  renderContent()
  setupScrollEffects()
  setupMobileMenu()
  setupProjectTabs()
  setupCardTilt()
}

// --- Theme Logic ---

const setupTheme = () => {
  const toggle = document.querySelector('.theme-toggle')
  const body = document.body
  const savedTheme = localStorage.getItem('theme') || 'dark'

  body.setAttribute('data-theme', savedTheme)
  updateThemeIcon(savedTheme)

  toggle?.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateThemeIcon(newTheme)
  })
}

const updateThemeIcon = (theme: string) => {
  const iconContainer = document.querySelector('.theme-icon')
  if (iconContainer) {
    iconContainer.innerHTML = '<i data-lucide="' + (theme === 'dark' ? 'sun' : 'moon') + '"></i>';
    createIcons({
      icons: { Sun, Moon }
    });
  }
}

// --- Content Rendering ---

const renderContent = () => {
  // Use createIcons for existing tech icons
  createIcons({
    icons: { ExternalLink, Code2, Database, Layout, PenTool, Cpu, Menu, X, Layers, Globe, Award, BookOpen, Coffee, Leaf, Users, Mic }
  });
}

// --- Animations ---

const setupAnimations = () => {
  // Hero Entrance
  const tl = gsap.timeline()
  tl.from('.hero-title', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out'
  })
    .from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-cta', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3')

  // Reveal Sections on Scroll
  gsap.utils.toArray<HTMLElement>('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power4.out'
    })
  })
}

const setupMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  const links = document.querySelectorAll('.nav-links a')

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active')
    // We could toggle icons here if needed, but simple toggle is enough
  })

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active')
    })
  })
}

const setupScrollEffects = () => {
  const nav = document.querySelector('nav')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled')
    } else {
      nav?.classList.remove('scrolled')
    }
  })
}

const setupProjectTabs = () => {
  const tabBtns = document.querySelectorAll('.tab-btn')
  const coreGrid = document.getElementById('core-systems')
  const corporateGrid = document.getElementById('corporate-systems')
  const heroBtn = document.getElementById('hero-view-systems')

  heroBtn?.addEventListener('click', () => {
    const corporateTab = document.querySelector('.tab-btn[data-category="corporate"]') as HTMLElement
    corporateTab?.click()
  })

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      // Switch grids
      const category = btn.getAttribute('data-category')
      if (category === 'core') {
        coreGrid?.classList.remove('hidden')
        coreGrid?.classList.add('visible')
        corporateGrid?.classList.add('hidden')
        corporateGrid?.classList.remove('visible')
      } else {
        corporateGrid?.classList.remove('hidden')
        corporateGrid?.classList.add('visible')
        coreGrid?.classList.add('hidden')
        coreGrid?.classList.remove('visible')
      }
    })
  })
}

const setupCardTilt = () => {
  // Disable on touch devices for smoother mobile scrolling
  if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) return

  const cards = gsap.utils.toArray<HTMLElement>('.glass, .contact-link')

  cards.forEach(card => {
    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = card.getBoundingClientRect()
      const x = mouseEvent.clientX - rect.left
      const y = mouseEvent.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 12
      const rotateY = (centerX - x) / 12

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    })
  })
}

// --- Kickoff ---
window.addEventListener('DOMContentLoaded', init)
