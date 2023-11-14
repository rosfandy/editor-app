/* eslint-disable  */
import { Node, wrappingInputRule } from '@tiptap/core'

const inputRegex = /^\s*>\s$/;
export const Callout = Node.create({
    name: 'callout',
    group: 'block',
    content: 'block+',
    defining: true,
    draggable: true,
    marks: '',
    // Your code goes here.
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    parseHTML() {
        return [
            { tag: 'callout' },
        ];
    },
    addCommands() {
        return {
            setCallout: () => ({ commands }) => {
                const command = commands.wrapIn(this.name);
                return command
            },
        };
    },
    addInputRules() {
        return [
            wrappingInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ];
    },
    addNodeView() {
        return () => {
            const container = document.createElement('callout')
            const bulb = document.createElement('div')
            const content = document.createElement('div')
            container.classList.add('callout')
            bulb.classList.add('callout-emoji')
            content.classList.add('callout-content')

            container.append(bulb)
            container.append(content)

            return {
                dom: container,
                contentDOM: content,
            }

        }
    },

})

