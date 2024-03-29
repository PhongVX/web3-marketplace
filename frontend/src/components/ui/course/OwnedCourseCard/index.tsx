
import { useOwnedCourses, useAccount } from "@/components/hooks/web3";
import { getAllCourses } from "@/content/courses/fetcher"
import { Button } from "@/components/ui/common";

const STATE_COLORS = {
  purchased: "indigo",
  activated: "green",
  deactivated: "red"
}

const OwnedCourseCard = () => {
  const { data } = getAllCourses()
  const { account } = useAccount()
  const { ownedCourses } = useOwnedCourses(data, account.data)

  const renderCourseCard = () => {
    return ownedCourses?.data?.map((course: any) => {

      const stateColor = STATE_COLORS[course.state]
      return (
        <div key={course.proof} className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span className="mr-2">{course.title}</span>
              <span className={`text-xs text-${stateColor}-700 bg-${stateColor}-200 rounded-full p-2`}>
                {course.state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course.price} ETH
            </p>
          </div>
  
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Course ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.ownedCourseId} 
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Proof
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <Button
                  onClick={() => window.location.replace(`/courses/${course.slug}`)}
                >
                  Watch the course
                </Button>
              </div>
            </dl>
          </div>
        </div>
      )
    });
  }
  return (
    <>
      {renderCourseCard()}
    </>
  )
}

export default OwnedCourseCard;