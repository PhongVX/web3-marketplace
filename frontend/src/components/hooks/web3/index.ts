
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation'
import { useHooks, useWeb3 } from "@/components/providers/web3"


const _isEmpty = data => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  )
}

const enhanceHook = (swrRes: any) => {
  const { data, error } = swrRes
  const hasInitialResponse = !!(data || error)
  const isEmpty = hasInitialResponse && _isEmpty(data)


  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse
  }
}

export const useNetwork = () => {
  const useN = useHooks(hooks => hooks?.useNetwork);
  const swrRes = enhanceHook(useN())
  return {
    network: swrRes
  }
}

export const useAccount = () => {
  const useA = useHooks(hooks => hooks?.useAccount);
  const swrRes = enhanceHook(useA())
  return {
    account: swrRes
  }
}

export const useWalletInfo = () => {
  const { account } = useAccount()
  const { network } = useNetwork()

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported)
  }
}

export const useAdmin = ({redirectTo}) => {
  const { account } = useAccount()
  const { requireInstall } = useWeb3()
  const router = useRouter()

  useEffect(() => {
    if ((
      requireInstall ||
      account.hasInitialResponse && !account.isAdmin) ||
      account.isEmpty) {

      router.push(redirectTo)
    }
  }, [account])

  return { account }
}

export const useOwnedCourses = (...args) => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args))

  return {
    ownedCourses: swrRes
  }
}

export const useOwnedCourse = (...args) => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourse)(...args))

  return {
    ownedCourse: swrRes
  }
}

export const useManagedCourses = (...args) => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.useManagedCourses)(...args))

  return {
    managedCourses: swrRes
  }
}