/* eslint-disable  */
import { Extension } from "@tiptap/core"
import { Youtube } from "./youtube"

export const YoutubeExtension = Extension.create({
    name: "youtubeExtension",

    addExtensions() {
        const extensions = []
        extensions.push(Youtube)
        return extensions
    }
})

export default YoutubeExtension
