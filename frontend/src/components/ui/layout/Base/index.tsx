"use client"
import React, { PropsWithChildren } from 'react'
import { Footer, Navbar } from '@/components/ui/common';
import { Web3Provider } from '@/components/providers';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <Web3Provider>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </Web3Provider>
  )
}

export default BaseLayout;
