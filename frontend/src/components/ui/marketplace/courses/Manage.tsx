"use client"
import { MarketHeader } from "@/components/ui/marketplace";
import { useAdmin, useManagedCourses } from "@/components/hooks/web3";
import ManagedCourseCard from "@/components/ui/course/Card/Manage";
import { Button, Message } from "@/components/ui/common";

import { useState } from "react";
import { useWeb3 } from "@/components/providers";

const VerificationInput = ({ onVerify }) => {
    const [email, setEmail] = useState("")

    return (
        <div className="flex mr-2 relative rounded-md">
            <input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                type="text"
                name="account"
                id="account"
                className="text-black w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..." />
            <Button
                onClick={() => {
                    onVerify(email)
                }}
            >
                Verify
            </Button>
        </div>
    )
}



export default function ManageCoursesPage() {
    const [email, setEmail] = useState("")
    const [proofedOwnership, setProofedOwnership] = useState({})
    const { account } = useAdmin({redirectTo: "/marketplace"})
    const { managedCourses } = useManagedCourses(account)
    const { web3 } = useWeb3()

    const verifyCourse = (email, { hash, proof }) => {
        const emailHash = web3.utils.sha3(email)
        const proofToCheck = web3.utils.soliditySha3(
            { type: "bytes32", value: emailHash },
            { type: "bytes32", value: hash }
        )

        proofToCheck === proof ?
            setProofedOwnership({
                ...proofedOwnership,
                [hash]: true
            }) :
            setProofedOwnership({
                ...proofedOwnership,
                [hash]: false
            })
    }
    if (!account.isAdmin) {
        return null
    }
    return (
        <>
            <div className="py-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                {managedCourses.data?.map(course =>
                    <ManagedCourseCard
                        key={course.ownedCourseId}
                        course={course}
                    >
                        <VerificationInput
                            onVerify={email => {
                                verifyCourse(email, {
                                    hash: course.hash,
                                    proof: course.proof
                                })
                            }}
                        />
                        {proofedOwnership[course.hash] &&
                            <div className="mt-2">
                                <Message type="success">
                                    Verified!
                                </Message>
                            </div>
                        }
                        {proofedOwnership[course.hash] === false &&
                            <div className="mt-2">
                                <Message type="danger">
                                    Wrong Proof!
                                </Message>
                            </div>
                        }
                    </ManagedCourseCard>
                )}
            </section>
        </>
    )
}