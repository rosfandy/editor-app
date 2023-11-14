/* eslint-disable  */

import { ok as assert } from './devlop'
import HighlightJs from 'highlight.js/lib/core'

const emptyOptions = {}
const defaultPrefix = 'hljs-'


export function createLowlight(grammars) {
    const high = HighlightJs.newInstance()

    if (grammars) {
        register(grammars)
    }

    return {
        highlight,
        highlightAuto,
        listLanguages,
        register,
        registerAlias,
        registered
    }

    function highlight(language, value, options) {
        assert(typeof language === 'string', 'expected `string` as `name`')
        assert(typeof value === 'string', 'expected `string` as `value`')
        const settings = options || emptyOptions
        const prefix =
            typeof settings.prefix === 'string' ? settings.prefix : defaultPrefix

        if (!high.getLanguage(language)) {
            throw new Error('Unknown language: `' + language + '` is not registered')
        }

        high.configure({ __emitter: HastEmitter, classPrefix: prefix })

        const result = (
            high.highlight(value, { ignoreIllegals: true, language })
        )

        if (result.errorRaised) {
            throw new Error('Could not highlight with `Highlight.js`', {
                cause: result.errorRaised
            })
        }

        const root = result._emitter.root

        // Cast because it is always defined.
        const data = /** @type {RootData} */ (root.data)

        data.language = result.language
        data.relevance = result.relevance

        return root
    }


    function highlightAuto(value, options) {
        assert(typeof value === 'string', 'expected `string` as `value`')
        const settings = options || emptyOptions
        const subset = settings.subset || listLanguages()

        let index = -1
        let relevance = 0
        /** @type {Root | undefined} */
        let result

        while (++index < subset.length) {
            const name = subset[index]

            if (!high.getLanguage(name)) continue

            const current = highlight(name, value, options)

            if (
                current.data &&
                current.data.relevance !== undefined &&
                current.data.relevance > relevance
            ) {
                relevance = current.data.relevance
                result = current
            }
        }

        return (
            result || {
                type: 'root',
                children: [],
                data: { language: undefined, relevance }
            }
        )
    }


    function listLanguages() {
        return high.listLanguages()
    }

    function register(grammarsOrName, grammar) {
        if (typeof grammarsOrName === 'string') {
            assert(grammar !== undefined, 'expected `grammar`')
            high.registerLanguage(grammarsOrName, grammar)
        } else {
            /** @type {string} */
            let name

            for (name in grammarsOrName) {
                if (Object.hasOwn(grammarsOrName, name)) {
                    high.registerLanguage(name, grammarsOrName[name])
                }
            }
        }
    }

    function registerAlias(aliasesOrName, alias) {
        if (typeof aliasesOrName === 'string') {
            assert(alias !== undefined)
            high.registerAliases(
                // Note: copy needed because hljs doesn’t accept readonly arrays yet.
                typeof alias === 'string' ? alias : [...alias],
                { languageName: aliasesOrName }
            )
        } else {
            /** @type {string} */
            let key

            for (key in aliasesOrName) {
                if (Object.hasOwn(aliasesOrName, key)) {
                    const aliases = aliasesOrName[key]
                    high.registerAliases(
                        // Note: copy needed because hljs doesn’t accept readonly arrays yet.
                        typeof aliases === 'string' ? aliases : [...aliases],
                        { languageName: key }
                    )
                }
            }
        }
    }

    function registered(aliasOrName) {
        return Boolean(high.getLanguage(aliasOrName))
    }
}

class HastEmitter {
    constructor(options) {
        this.options = options
        this.root = {
            type: 'root',
            children: [],
            data: { language: undefined, relevance: 0 }
        }
        this.stack = [this.root]
    }


    addText(value) {
        if (value === '') return

        const current = this.stack[this.stack.length - 1]
        const tail = current.children[current.children.length - 1]

        if (tail && tail.type === 'text') {
            tail.value += value
        } else {
            current.children.push({ type: 'text', value })
        }
    }


    startScope(rawName) {
        this.openNode(String(rawName))
    }


    endScope() {
        this.closeNode()
    }


    __addSublanguage(other, name) {
        const current = this.stack[this.stack.length - 1]
        // Assume only element content.
        const results = /** @type {Array<ElementContent>} */ (other.root.children)

        if (name) {
            current.children.push({
                type: 'element',
                tagName: 'span',
                properties: { className: [name] },
                children: results
            })
        } else {
            current.children.push(...results)
        }
    }


    openNode(name) {
        const self = this
        const className = name.split('.').map(function (d, i) {
            return i ? d + '_'.repeat(i) : self.options.classPrefix + d
        })
        const current = this.stack[this.stack.length - 1]
        const child = {
            type: 'element',
            tagName: 'span',
            properties: { className },
            children: []
        }

        current.children.push(child)
        this.stack.push(child)
    }

    closeNode() {
        this.stack.pop()
    }


    finalize() { }

    toHTML() {
        return ''
    }
}
