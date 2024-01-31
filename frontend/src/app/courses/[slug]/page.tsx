import Modal from "@/components/ui/common/Modal";
import {
  Hero,
  Curriculum,
  KeyPoint
} from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import CoursePage from '@/components/ui/course/page'
import { getAllCourses } from "@/content/courses/fetcher";
export default function Course({ params }: any) {
  const { data } = getAllCourses();
  const course = data.filter(c => c.slug === params.slug)[0];
  return (
    <BaseLayout>
        <CoursePage course={course} />
    </BaseLayout>
  )
}
