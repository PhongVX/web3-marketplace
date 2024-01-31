"use client"
import { memo } from "react"

import { useWalletInfo, useOwnedCourse } from "@/components/hooks/web3"
import {Modal, Message} from "@/components/ui/common";
import {
    Hero,
    Curriculum,
    KeyPoint
} from "@/components/ui/course";
import { useWeb3 } from "@/components/providers";

function Course({ course }) {
    const { isLoading } = useWeb3()
    const { account } = useWalletInfo()
    const { ownedCourse } = useOwnedCourse(course, account.data)
    const courseState = ownedCourse.data?.state
    console.log('ownedCourse', ownedCourse, courseState)

    const isLocked =
    courseState === "purchased" ||
    courseState === "deactivated"
    return (
        <>

            <div className="py-4">
                <Hero
                    title={course.title}
                    description={course.description}
                    image={course.coverImage}
                    hasOwner={!!ownedCourse.data}
                />
            </div>
            <KeyPoint
                points={course.wsl}
            />
         
            {courseState &&
                <div className="max-w-5xl mx-auto text-black">
                    {courseState === "purchased" &&
                        <Message type="warning">
                            Course is purchased and waiting for the activation. Process can take up to 24 hours.
                            <i className="block font-normal">In case of any questions, please contact info@eincode.com</i>
                        </Message>
                    }
                    {courseState === "activated" &&
                        <Message type="success">
                            Eincode wishes you happy watching of the course.
                        </Message>
                    }
                    {courseState === "deactivated" &&
                        <Message type="danger">
                            Course has been deactivated, due the incorrect purchase data.
                            The functionality to watch the course has been temporaly disabled.
                            <i className="block font-normal">Please contact info@eincode.com</i>
                        </Message>
                    }
                </div>
            }
            <Curriculum
                isLoading={isLoading}
                locked={isLocked}
                courseState={courseState}
            />
            <Modal />
        </>
    )
}

export default memo(Course); 