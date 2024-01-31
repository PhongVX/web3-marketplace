import React from 'react'

export const List = ({ courses, children }: any) => {
    return (
        <section className="grid grid-cols-2 gap-4 mb-5">
            { courses.map(course => children(course))}
        </section>
    )
}

export default List;
