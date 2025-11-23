// components/BottomHeader.tsx
'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { BriefcaseIcon, CurrencyDollarIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { NavBar } from '../ui/tubelight-navbar'

function BottomHeader() {
    const pathname = usePathname()
    
    // Hide on these pages
    const hiddenRoutes = ['/onboarding', '/admin', '/dashboard']
    if (hiddenRoutes.includes(pathname)) {
        return null
    }

    const navItems = [
        { name: 'Home', url: '/', icon: HomeIcon },
        { name: 'Work', url: '/work', icon: BriefcaseIcon },
        { name: 'Pricing', url: '/pricing', icon: CurrencyDollarIcon },
        { name: 'Contact', url: '/contact', icon: UserCircleIcon }
    ]

    return <NavBar items={navItems} />
}

export default BottomHeader