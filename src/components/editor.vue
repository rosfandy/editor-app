<!-- eslint-disable  -->
<template>
  <div class="flex">
    <div class="absolute top-20 left-4 w-[15%]">
      <div class="">Online: {{ total }}</div>
      <div>Status: {{ status }}</div>
      <div>Your Name: {{ currentUser.name }}</div>
      <div class="my-4">
        <button class="bg-gray-200 border border-black px-2" @click="gantiNama">
          Ganti Nama
        </button>
      </div>
    </div>
    <div v-if="editor" class="editor-canvas w-full">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<!-- eslint-disable  -->
<script>
// collaboration
import { HocuspocusProvider, TiptapCollabProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from './extensions/collaborationCursor'
import Provider from "y-partykit/provider";

import { uuid } from 'vue-uuid';

import { Editor, EditorContent } from '@tiptap/vue-3'
import TextAlign from '@tiptap/extension-text-align'
import defaultExtension from './extensions'

const ydoc = new Y.Doc()
const RandomColor = list => list[Math.floor(Math.random() * list.length)]
const RandomAvatar = list => list[Math.floor(Math.random() * list.length)]

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      provider: null,
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        id: uuid.v4(),
        name: 'anonymous',
        color: this.getRandomColor(),
        avatar: this.getRandomAvatar(),
      },
      total: 0,
      users: '',
      status: 'disconnect',
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        ...defaultExtension,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          defaultAlignment: 'right',
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ],
    })
    this.provider.awareness.on('change', () => {
      // this.awareness = this.filterUsers(this.provider.awareness.getStates())
      this.awareness = this.provider.awareness.getStates()
      this.users = this.awareness
      this.total = this.awareness.size
      this.$emit('update:dataUsers', this.users);
    })
    this.provider.on('status', evt => {
      if (evt.status === 'disconnected') {
        this.status = 'unauthorized'
      } else {
        this.status = evt.status
      }
      console.log('status: ', evt.status)
    })
  },
  methods: {
    filterUsers(dataMap) {
      const mapBaru = new Map()
      for (const [key, value] of dataMap) {
        const userId = value.user.id
        if (!mapBaru.has(userId)) {
          mapBaru.set(userId, value)
        }
      }
      return mapBaru
    }, gantiNama() {
      const name = (window.prompt('Name') || '')
        .trim()
        .substring(0, 32)
      const id = uuid.v4()
      if (name) {
        return this.updateCurrentUser({
          id,
          name,
        })
      }
    },
    updateCurrentUser(attributes) {
      this.currentUser = { ...this.currentUser, ...attributes }
      this.editor.chain().focus().updateUser(this.currentUser).run()
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },
    getRandomAvatar() {
      return RandomAvatar([
        'brook.svg',
        'chopper.svg',
        'franky.svg',
        'jimbei.svg',
        'nami.svg',
        'robin.svg',
        'sanji.svg',
        'usopp.svg',
        'zoro.svg',
        'luffy.svg',
      ])
    },
    getRandomColor() {
      return RandomColor([
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
      ])
    },
  },
  created() {
    this.provider = new TiptapCollabProvider({
      appId: 'jkv85lmx', // get this at collab.tiptap.dev
      name: 'collabDocs', // e.g. a uuid uuidv4();
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTk5NzI3OTUsIm5iZiI6MTY5OTk3Mjc5NSwiZXhwIjoxNzAwMDU5MTk1LCJpc3MiOiJodHRwczovL2NvbGxhYi50aXB0YXAuZGV2IiwiYXVkIjoiYnJvc2ZhbmR5QGdtYWlsLmNvbSJ9.tnlk2YqA-lJ88zMq3omA0gjSARvF--SrsrxrjDeoNIw', // see "Authentication" below
      document: ydoc // pass your existing doc, or leave this out and use provider.document
    });

  },
  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style>
h1 {
  font-size: 2.25rem;
  /* 36px */
  line-height: 2.5rem;
  /* 40px */
  font-weight: 700;
}

h2 {
  font-size: 1.875rem;
  /* 30px */
  line-height: 2.25rem;
  /* 36px */
  font-weight: 700;
}

h3 {
  font-size: 1.5rem;
  /* 24px */
  line-height: 2rem;
  /* 32px */
  font-weight: 700;
}

@import "style.css"
</style>