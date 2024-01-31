import React from "react"
import Link from "next/link"

const ActiveLink = ({children, activeLinkClass, ...props}: any) => {
  let className = children.props.className || ""
  if (window?.location?.pathname === props.href) {
    className = `${className} ${activeLinkClass ? activeLinkClass : "text-indigo-600"}`
  }
  return (
    <Link legacyBehavior {...props}>
      {
        React.cloneElement(children, {className})
      }
    </Link>
  )
}

export default ActiveLink;