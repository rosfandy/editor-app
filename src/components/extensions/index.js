/* eslint-disable */
// tiptap extension
import StarterKit from '@tiptap/starter-kit'
import { DocumentWithTitle, Title } from './title'
import Placeholder from './placeholder'
import Commands from './commands/commands'
import suggestion from './commands/suggestion'
import Heading from '@tiptap/extension-heading'

import YoutubeExtension from './youtube'

const defaultExtension = [
    DocumentWithTitle,
    YoutubeExtension,
    Title,
    Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
            class: 'heading',
        },
    }),
    Placeholder.configure({
        placeholder: ({ node }) => {
            let text = 'Write something … or type \'/\' to choose block'
            switch (node.type.name) {
                case 'title':
                    text = 'Untitled'
                    break
                case 'heading':
                    text = 'Heading'
                    break
                case 'codeBlock':
                    text = 'write code ...'
                    break
                default:
                    break
            }

            return text
        },
        showOnlyCurrent: false,
        includeChildren: true,
    }),
    StarterKit.configure({
        history: false,
        blockquote: false,
        document: false,
    }),
    Commands.configure({
        suggestion,
    }),

]

export default defaultExtension