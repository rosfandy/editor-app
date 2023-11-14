/* eslint-disable  */
import { Node, mergeAttributes } from '@tiptap/core'

export const Bookmark = Node.create({
    name: 'bookmark',
    group: 'block',
    atom: true,
    defining: true,
    marks: '',
    draggable: true,
    // Your code goes here.
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
            img: {
                default: null,
            },
            title: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'div[data-type="draggable-item"]' },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'draggable-item' })]
    },
    addCommands() {
        return {
            setBookmark: options => ({ commands }) => {
                // commands.setNode(this.name)
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
                // console.log(options)

            },
        };
    },
    addNodeView() {
        return (options) => {
            const container = document.createElement('div');
            const thumbnail = document.createElement('img');
            const title = document.createElement('h3')
            const link = document.createElement('div')
            const wrapper = document.createElement('div')
            const content = document.createElement('div')

            container.classList.add('bookmark');
            thumbnail.classList.add('bookmark-thumbnail')
            title.classList.add('bookmark-title')
            link.classList.add('bookmark-link')
            wrapper.classList.add('bookmark-desc')
            content.classList.add('bookmark-content')

            thumbnail.src = options.HTMLAttributes.img
            title.innerText = options.HTMLAttributes.title
            link.innerText = options.HTMLAttributes.src

            wrapper.appendChild(title)
            wrapper.appendChild(link)

            content.appendChild(thumbnail)
            content.appendChild(wrapper)

            container.appendChild(content)
            container.setAttribute('data-type', 'draggable-item');
            content.addEventListener('click', () => {
                const src = options.HTMLAttributes.src;
                if (src) {
                    window.open(src, '_blank');
                }
            });
            return {
                dom: container,
            };

        }
    },

})

