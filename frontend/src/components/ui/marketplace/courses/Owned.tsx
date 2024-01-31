"use client"
import { MarketHeader } from "@/components/ui/marketplace";
import { OwnedCourseCard } from "@/components/ui/course";
import { Message } from "@/components/ui/common";
import { useWeb3 } from "@/components/providers"
import { useAccount } from "@/components/hooks/web3";

export default function OwnedCoursesPage() {
  const { requireInstall } = useWeb3()
  const { account } = useAccount()
  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      {account.isEmpty &&
        <div className="w-1/2">
          <Message type="warning">
            <div>Please connect to Metamask</div>
          </Message>
        </div>
      }
      {requireInstall &&
        <div className="w-1/2">
          <Message type="warning">
            <div>Please install Metamask</div>
          </Message>
        </div>
      }
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  )
}