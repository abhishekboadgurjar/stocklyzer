"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
      setParticles(newParticles)
    }

    createParticles()

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full animate-float morph-shape" />
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg animate-float float-animation"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-20 right-40 w-24 h-24 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-lg animate-float morph-shape"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
