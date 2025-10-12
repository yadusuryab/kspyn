import React from 'react'

interface TitleHeaderProps {
  title?: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  overlay?: boolean
  overlayOpacity?: 'low' | 'medium' | 'high'
  className?: string
}

const TitleHeader = ({ 
  title = "shopigo", 
  subtitle, 
  align = 'center',
  overlay = false,
  overlayOpacity = 'medium',
  className = ''
}: TitleHeaderProps) => {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  const titleSizes = {
    base: 'text-4xl md:text-8xl',
    subtitle: 'text-sm md:text-lg'
  }

  return (
    <div className={`absolute top-2 z-10 w-full p-4 flex ${alignments[align]} ${className}`}>
      <div className="flex  w-full items-center justify-between">
        <h1 className={`font-bold italic tracking-tight ${titleSizes.base} text-black dark:text-white`}>
          {title}{subtitle &&`.${subtitle.toLowerCase()}`}
        </h1>

      
          <p className={` ${titleSizes.subtitle} font-medium text-muted-foreground`}>
            &copy; shopigo 2025
          </p>
     
      </div>
    </div>
  )
}

export default TitleHeader
