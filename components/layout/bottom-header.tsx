'use client'
import React from 'react'
import { BriefcaseIcon, CurrencyDollarIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/16/solid";

import { NavBar } from '../ui/tubelight-navbar'

function BottomHeader() {
    const navItems = [
        { name: 'Home', url: '/', icon: HomeIcon },
        { name: 'Work', url: '/work', icon: BriefcaseIcon },
        { name: 'Pricing', url: '/pricing', icon: CurrencyDollarIcon },
        { name: 'Contact', url: '/contact', icon: UserCircleIcon }
      ]
  return (
    
      <NavBar items={navItems} />
   
  )
}

export default BottomHeader
