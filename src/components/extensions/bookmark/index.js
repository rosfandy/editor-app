/* eslint-disable  */
import { Extension } from "@tiptap/core"
import { Bookmark } from "./bookmark"

export const BookmarkExtension = Extension.create({
    name: "bookmarkExtension",

    addExtensions() {
        const extensions = []
        extensions.push(Bookmark)
        return extensions
    }
})

export default BookmarkExtension
