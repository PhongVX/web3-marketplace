"use client"
import React from 'react'

import { ActiveLink, Button } from '@/components/ui/common';
import { useWeb3 } from '@/components/providers';
import { useWalletInfo } from '@/components/hooks/web3';


export const Navbar = () => {
  const { connect, isLoading, web3 } = useWeb3();
  const { account } = useWalletInfo();
  console.log('account', account)
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <ActiveLink href="/"> 
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</a>
              </ActiveLink>
              <ActiveLink href="/marketplace"> 
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</a>
              </ActiveLink>
              <ActiveLink href="/blogs"> 
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</a>
              </ActiveLink>
             
            </div>
            <div>
              <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Company</a>
              {isLoading ?
                <Button
                  disabled={true}>
                  Loading...
                </Button> :
                web3 != null ?
                  account.data ?
                    <Button
                      hoverable={false}
                      className="cursor-default">
                      Hi there {account.isAdmin && "Admin"}
                    </Button> :
                    <Button
                      onClick={connect}>
                      Connect
                    </Button> :
                  <Button
                    onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                    Install Metamask
                  </Button>
              }
            </div>
          </div>
        </nav>
      </div>
      {account.data && !window.location.pathname.includes("/marketplace") &&(
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>)
      }
    </section>
  )
}

export default Navbar;
