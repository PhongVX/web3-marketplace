"use client"
import { Hero } from "@/components/ui/common"
import { List } from "@/components/ui/course"
import { Card } from "@/components/ui/order"
import { BaseLayout } from "@/components/ui/layout"
import { CourseCard } from "@/components/ui/course"

import { getAllCourses } from "@/content/courses/fetcher"
import { useAccount, useNetwork } from "@/components/hooks/web3";
import { MarketHeader } from "@/components/ui/marketplace"

export default function Home() {
  const { data } = getAllCourses();
  const { account } = useAccount();
  const { network } = useNetwork();
  const canPurchaseCourse = !!(account.data && network.isSupported)
  return (
    <BaseLayout>
      <Hero />
      <MarketHeader />
      <Card />
      <List courses={data}>
        {course =>
          <CourseCard
            disabled={!canPurchaseCourse}
            key={course.id}
            course={course}
          />
        }
      </List> 
    </BaseLayout>
  )
}
