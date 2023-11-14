/* eslint-disable  */
import { Extension } from "@tiptap/core"
import { Video } from "./video"

export const VideoExtension = Extension.create({
    name: "videoExtension",

    addExtensions() {
        const extensions = []
        extensions.push(Video)
        return extensions
    }
})

export default VideoExtension
