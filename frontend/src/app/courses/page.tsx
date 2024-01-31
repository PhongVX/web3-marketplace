import Modal from "@/components/ui/common/Modal"
import { Curriculum, Hero, KeyPoint } from "@/components/ui/course"
import { BaseLayout } from "@/components/ui/layout"

export default function Course() {
    return (
      <BaseLayout>
        <div className="py-4">
          <Hero />
        </div>
        <KeyPoint />
        <Curriculum />
        <Modal />
      </BaseLayout>
    )
  }