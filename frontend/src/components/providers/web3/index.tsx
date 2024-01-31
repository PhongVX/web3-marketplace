"use client"
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  PropsWithChildren,
  useMemo,
} from 'react';
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import { loadContract } from '@/utils/loadContract';

import { setupHooks } from './hooks/setupHooks';


type Web3ContextType = {
  provider?: unknown;
  web3?: unknown;
  contract?: unknown;
  isLoading?: boolean;
  isWeb3Loaded?: boolean;
  hooks?: any;
  connect?: any;
  setSelectedCourse?: any;
  selectedCourse?: any;
  requireInstall?: boolean
}

const Web3Context = createContext<Web3ContextType>({
  hooks: {
    useAccount: () => { return {}},
    useNetwork: () => { return {}},
    useOwnedCourses: () =>  { return {}},
  }
});

const createWeb3State = ({web3, provider, contract, isLoading}) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({web3, provider, contract})
  }
}

const Web3Provider = ({children}: PropsWithChildren<Web3ContextType>) => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true
    })
  )

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      if (provider) {
        const web3 = new Web3(provider)
        const contract = await loadContract("CourseMarketplace", web3)
        console.log('contract', contract)
        if (!web3Api.web3) {
          setWeb3Api(
            createWeb3State({
              web3,
              provider,
              contract,
              isLoading: false
            })
          )
        }
 
      } else {
        setWeb3Api(api => ({
          ...api, 
          isLoading: false
        }))
        console.error("Please, install Metamask.")
      }
    }
    loadProvider()
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3 ,
      connect: provider ?
        async () => {
          try {
            await provider.request({method: "eth_requestAccounts"})
          } catch {
            location.reload()
          }
        } :
        () => console.error("Cannot connect to Metamask, try to reload your browser please.")
    }
  }, [web3Api])

  return (
    <Web3Context.Provider value={{..._web3Api, setSelectedCourse, selectedCourse}}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}

export function useHooks(cb: any) {
  const { hooks } = useWeb3();
  return cb(hooks);
}

export default Web3Provider;