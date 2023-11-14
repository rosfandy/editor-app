/* eslint-disable  */
import { Node } from '@tiptap/core'

export const Loading = Node.create({
    name: 'loading',
    group: 'block',
    content: 'inline*',
    defining: true,
    marks: '',
    // Your code goes here.
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    addAttributes() {
        return {
            content: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'loading' },
        ];
    },
    addCommands() {
        return {
            setLoading: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
    addNodeView() {
        return options => {
            const container = document.createElement('div');

            container.classList.add('loading');

            container.innerText = options.HTMLAttributes.content

            return {
                dom: container,
            };

        }
    },

})

