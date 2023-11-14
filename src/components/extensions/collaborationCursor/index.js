/* eslint-disable  */
import { Extension } from '@tiptap/core'
import { defaultSelectionBuilder, yCursorPlugin } from 'y-prosemirror'

const awarenessStatesToArray = states => Array.from(states.entries()).map(([key, value]) => ({
    clientId: key,
    ...value.user,
}))
const defaultOnUpdate = () => null
const CollaborationCursor = Extension.create({
    name: 'collaborationCursor',
    addOptions() {
        return {
            provider: null,
            user: {
                id: '',
                name: null,
                color: null,
                avatar: null
            },
            render: user => {
                const cursor = document.createElement('span')
                cursor.classList.add('collaboration-cursor__caret')
                cursor.setAttribute('style', `border-color: ${user.color}`)
                const label = document.createElement('div')
                label.classList.add('collaboration-cursor__label')
                label.setAttribute('style', `background-color: ${user.color}`)
                label.insertBefore(document.createTextNode(user.name), null)
                cursor.insertBefore(label, null)

                return cursor
            },
            selectionRender: defaultSelectionBuilder,
            onUpdate: defaultOnUpdate,
        }
    },
    onCreate() {
        if (this.options.onUpdate !== defaultOnUpdate) {
            console.warn('[tiptap warn]: DEPRECATED: The "onUpdate" option is deprecated. Please use `editor.storage.collaborationCursor.users` instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor')
        }
    },
    addStorage() {
        return {
            users: [],
        }
    },
    addCommands() {
        return {
            updateUser: attributes => () => {
                this.options.user = attributes
                this.options.provider.awareness.setLocalStateField('user', this.options.user)

                return true
            },
            user: attributes => ({ editor }) => {
                console.warn('[tiptap warn]: DEPRECATED: The "user" command is deprecated. Please use "updateUser" instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor')

                return editor.commands.updateUser(attributes)
            },
        }
    },
    addProseMirrorPlugins() {
        return [
            yCursorPlugin((() => {
                this.options.provider.awareness.setLocalStateField('user', this.options.user)
                this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states)
                this.options.provider.awareness.on('update', () => {
                    this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states)
                })

                return this.options.provider.awareness
            })(),
                // @ts-ignore
                {
                    cursorBuilder: this.options.render,
                    selectionBuilder: this.options.selectionRender,
                }),
        ]
    },
})

export { CollaborationCursor, CollaborationCursor as default }
// # sourceMappingURL=index.js.map
