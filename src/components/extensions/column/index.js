/* eslint-disable  */
import { Extension } from "@tiptap/core"

import { Column } from "./column"
import { ColumnBlock } from "./columnBlock"

export const ColumnExtension = Extension.create({
    name: "columnExtension",

    addExtensions() {
        const extensions = []

        // if (this.options.column !== false) {
        // console.log('col: ', this.options.column)
        extensions.push(Column)
        // }

        // if (this.options.columnBlock !== false) {
        extensions.push(ColumnBlock)
        // }

        return extensions
    }
})

export { Column, ColumnBlock }

export default ColumnExtension
