/* eslint-disable  */
import { Extension } from "@tiptap/core"
import { Callout } from "./callout"

export const CalloutExtension = Extension.create({
  name: "calloutExtension",

  addExtensions() {
    const extensions = []
    extensions.push(Callout)
    return extensions
  }
})

export default CalloutExtension
