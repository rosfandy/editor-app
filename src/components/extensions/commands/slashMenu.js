/* eslint-disable */
const blockTools = [
    {
        name: 'paragraph',
        title: 'Paragraph',
        desc: 'Create a simple text',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 28 32" fill="none"> <path d="M9 0C4 0 0 4 0 9C0 14 4 18 9 18H14V32H18V4H20V32H24V4H28V0H9Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('paragraph')
                .run()
        },
    },
    {
        name: 'heading1',
        title: 'Heading 1',
        desc: 'Big section heading',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 50" fill="none"> <g filter="url(#filter0_d_12_47)"> <path d="M6 8V40M25 8V40M6 24H25M34.226 24L39 19.017V40" stroke="#272829" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <filter id="filter0_d_12_47" x="-4" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="4"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_47"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_47" result="shape"/> </filter> </defs> </svg>',
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading', { level: 1 })
                .run()
        },
    },
    {
        name: 'heading2',
        title: 'Heading 2',
        desc: 'Medium section heading',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M6 8V40M24 8V40M7 24H23M32 25C32 21.833 34.667 20 37 20C39.333 20 42 21.833 42 25C42 30.7 32 34.933 32 40H42" stroke="#272829" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading', { level: 2 })
                .run()
        },
    },
    {
        name: 'heading3',
        title: 'Heading 3',
        desc: 'Small section heading',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M6 8V40M24 8V40M7 24H23M32 20H42L35 29C39 29 42 31 42 35C42 39 39 40 37 40C34.619 40 33 39 32 37.9" stroke="#272829" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading', { level: 3 })
                .run()
        },
    },
]

export default blockTools
