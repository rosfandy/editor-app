<!-- eslint-disable  -->
<template>
  <div class="w-full min-h-screen">
    <navbar :users="users"></navbar>
    <div class="flex">
      <div class="absolute hidden lg:inline border rounded bg-white shadow p-4 top-20 left-4 ">
        <div class=" text-green-400 font-semibold">Online: {{ total }}</div>
        <div class="font-semibold text-zinc-700">Status: {{ status }}</div>
        <div class="font-semibold text-zinc-700">Name: {{ currentUser.name }}</div>
        <div class="my-4">
          <button class="w-full bg-[#FC881D] text-white rounded text-sm py-1 px-2" @click="gantiNama">
            Change Name
          </button>
        </div>
        <div class="">
          <button class="bg-[#FC881D] text-white rounded text-sm py-1 px-2 w-full"
            @click="updateCurrentUser({ avatar: getRandomAvatar() })">
            Random Avatar
          </button>
        </div>
      </div>
      <div v-if="editor" class="editor-canvas md:px-[20%] w-full flex flex-col bg-gray-50 py-8 min-h-screen">
        <div class="bg-white min-h-screen shadow border lg:px-16 px-4 py-20 lg:py-32 w-full ">
          <FloatingMenu v-if="editor" :should-show="shouldShowMainToolbar" :editor="editor" :class="{
            'mouse:pointer-events-none mouse:opacity-0': isTyping,
          }" :tippy-options=floatingTippy>
            <div v-if="topLevelNodeType !== 'title' && topLevelNodeType !== 'loading'" class="flex flex-row">
              <button class="ml-1 my-2 hover:bg-slate-100 rounded">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                  focusable="false" class="w-5 h-5 md:w-6 md:h-6">
                  <path d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z">
                  </path>
                </svg>
              </button>
            </div>
          </FloatingMenu>
          <editor-content :editor="editor" />
        </div>
      </div>
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
import {
  DragNode,
  GetTopLevelBlockCoords,
  GetTopLevelNode,
} from './utils/pm-utils.js'
import { mergeArrays } from './utils/utils'
import defaultBlockTools from './tools/block-tools'

import { uuid } from 'vue-uuid';

import { Editor, EditorContent, FloatingMenu } from '@tiptap/vue-3'
import TextAlign from '@tiptap/extension-text-align'
import defaultExtension from './extensions'
import Navbar from './Navbar.vue';

const ydoc = new Y.Doc()
const RandomColor = list => list[Math.floor(Math.random() * list.length)]
const RandomAvatar = list => list[Math.floor(Math.random() * list.length)]

export default {
  props: {
    editorClass: {
      type: String,
    },
    blockTools: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    EditorContent,
    Navbar,
    FloatingMenu
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
      floatingTippy: {
        maxWidth: '350',
        placement: 'left-start',
        animation: 'fade',
        duration: 300,
        getReferenceClientRect: this.getMenuCoords,
        onCreate: instance => instance.popper.classList.add(
          'max-md:!sticky',
          'max-md:!bottom-0',
          'max-md:!top-auto',
          'max-md:!transform-none',
        ),
      },
      topLevelNodeType: null,
      currentBlockTool: null,
      total: 0,
      dragging: false,
      draggedNodePosition: null,
      users: [],
      status: 'disconnect',
      allBlockTools: mergeArrays(defaultBlockTools(), this.blockTools),
    }
  },
  computed: {
    activeAlignmentTools() {
      if (this.topLevelNodeType) {
        return this.allAlignmentTools.filter(alignmentToolGroup => alignmentToolGroup.find(tool => tool.isActiveTest(this.editor, this.topLevelNodeType)))
      }
      return null
    },
  },
  watch: {
    isEditable(value) {
      this.editor.setEditable(value)
    },
    topLevelNodeType() {
      this.currentBlockTool = this.getCurrentBlockTool()
    },
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
      onUpdate: () => {
        this.updateToolbar()
      },
      onSelectionUpdate: () => {
        this.updateToolbar()
      },
    })
    this.provider.awareness.on('change', () => {
      this.awareness = this.filterUsers(this.provider.awareness.getStates())
      this.users = this.awareness
      this.total = this.awareness.size
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
    getMenuCoords() {
      const coord = GetTopLevelBlockCoords(this.editor.view)
      const val = coord.left - 12
      const updatedCoord = {
        bottom: coord.bottom,
        height: coord.height,
        left: val,
        right: coord.right,
        top: coord.top,
        width: coord.width,
        x: coord.x,
        y: coord.y,
      }
      return updatedCoord
    },
    getTopLevelNodeType() {
      // this.isLink = this.editor.view.state.selection.$head.parent.content.content[0]?.marks[0]?.type.name === 'link'
      console.log('type: ', GetTopLevelNode(this.editor.view)?.type.name)
      return GetTopLevelNode(this.editor.view)?.type.name
    },
    updateToolbar() {
      this.topLevelNodeType = this.getTopLevelNodeType()
    },
    getCurrentBlockTool() {
      return this.allBlockTools.find(
        tool => tool.name == this.topLevelNodeType
          || tool.tools?.find(tool => tool.name == this.topLevelNodeType),
      )
    },
    filterUsers(dataMap) {
      const mapBaru = new Map()
      for (const [key, value] of dataMap) {
        const userId = value.user.id
        if (!mapBaru.has(userId)) {
          mapBaru.set(userId, value)
        }

      }
      return mapBaru
    },
    shouldShowMainToolbar() {
      return this.editor.isActive()
    },
    gantiNama() {
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
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjQ2MzE2MDksIm5iZiI6MTcyNDYzMTYwOSwiZXhwIjoxNzI0NzE4MDA5LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJqa3Y4NWxteCJ9.pJCAq_9PFQY9w_P9_ZCCSZ8F48nuyMausbKN8qAcY5U', // see "Authentication" below
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
