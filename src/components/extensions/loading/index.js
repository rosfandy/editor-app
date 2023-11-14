/* eslint-disable  */
import { Extension } from "@tiptap/core"
import { Loading } from "./loading"

export const LoadingExtension = Extension.create({
    name: "loadingExtension",

    addExtensions() {
        const extensions = []
        extensions.push(Loading)
        return extensions
    }
})

export default LoadingExtension
