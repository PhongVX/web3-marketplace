"use client"
import { useState, useCallback, memo } from "react"
import { List } from "@/components/ui/course"
import { getAllCourses } from "@/content/courses/fetcher"
import { CourseCard } from "@/components/ui/course"
import { Button } from "@/components/ui/common"
import { OrderModal } from "@/components/ui/order"
import { MarketHeader } from "@/components/ui/marketplace"
import { useWeb3 } from "@/components/providers"
import { useWalletInfo } from "@/components/hooks/web3"


function Marketplace() {
 
  const { web3, contract, selectedCourse, setSelectedCourse } = useWeb3()
  const { account } = useWalletInfo()
   console.log('selectedCourse', selectedCourse)
  const { data } = getAllCourses()
  console.log('web3 rerender', web3)
  
  console.log('account', account)
  const purchaseCourse = async(order) => {
    console.log('before hexCourseId')
    const hexCourseId = web3.utils.padLeft(web3.utils.utf8ToHex(selectedCourse.id), 32)
    console.log('hexCourseId', hexCourseId)
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    )
    console.log('orderHash', orderHash)
    const emailHash = web3.utils.sha3(order.email)
    console.log('emailHash', emailHash)
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    )

    console.log('proof', proof)
    const value = web3.utils.toWei(String(order.price), 'ether');
    console.log('value', value)
    try {
      const result = await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({from: account.data, value})
      console.log(result)
    } catch (ex){
      console.error("Purchase course: Operation has failed.", ex)
    }
  }
  return (
    <>
      <div className="pt-4">
        <MarketHeader />
      </div>
      <List courses={data}>
        {course =>
          <CourseCard
            key={course.id}
            course={course}
            Footer={(props) =>
              <div className="mt-4">
                <Button 
                  {...props}
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            }
          />
        }
      </List>
      { selectedCourse &&
        <OrderModal
          onSubmit={purchaseCourse}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      }
    </>
  )
}

export default memo(Marketplace); 