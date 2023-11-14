/* eslint-disable  */
import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
export const Video = Node.create({
    name: 'video',
    draggable: true,
    allowGapCursor: true,
    isolating: true,
    // Your code goes here
    addOptions() {
        return {
            inline: false,
            HTMLAttributes: {},
        };
    },

    inline() {
        return this.options.inline;
    },
    group() {
        return this.options.inline ? "inline" : "block";
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'video[data-type="embed"]' },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addCommands() {
        return {
            setVideo: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
    addNodeView() {
        return ({ editor, node }) => {
            const iframe = document.createElement('iframe');
            const container = document.createElement('div')
            iframe.width = '640';
            iframe.height = '360';
            iframe.frameborder = "0";
            iframe.allowfullscreen = true;
            iframe.src = node.attrs.src;

            container.appendChild(iframe)

            return {
                dom: container,
            }
        }
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: match => {
                    const [, , alt, src, title] = match;
                    return { src, alt, title };
                },
            }),
        ];
    },

})

