import { l as languages } from './context-consumer.elsa-activity-editor-modal.elsa-activity-picker-modal.elsa-designer-tree.elsa-modal-dialog.elsa-monaco.elsa-toast-notification.elsa-workflow-definition-editor-notifications.elsa-workflow-definition-editor-screen.elsa-workflow-publish-button.elsa-workflow-settings-modal-38d86d9a.js';
import './index-efd13af9.js';
import './event-bus-4cad9569.js';
import './_commonjsHelpers-63c253cd.js';
import './plugin-manager-35220ed1.js';
import './domain-b51fc213.js';
import './utils-2841e02a.js';
import './collection-ba33bbb1.js';
import './activity-icon-provider-dd38871d.js';
import './forms-591db6fa.js';
import './zipObject-8f3d78af.js';
import './index-886428b8.js';
import './elsa-client-e01ed0bb.js';
import './workflow-editor-0395e413.js';
import './state-tunnel-04c0b67a.js';
import './index-21749d0d.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var conf = {
    comments: {
        blockComment: ['<!--', '-->']
    },
    brackets: [['<', '>']],
    autoClosingPairs: [
        { open: '<', close: '>' },
        { open: "'", close: "'" },
        { open: '"', close: '"' }
    ],
    surroundingPairs: [
        { open: '<', close: '>' },
        { open: "'", close: "'" },
        { open: '"', close: '"' }
    ],
    onEnterRules: [
        {
            beforeText: new RegExp("<([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
            afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
            action: {
                indentAction: languages.IndentAction.IndentOutdent
            }
        },
        {
            beforeText: new RegExp("<(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
            action: { indentAction: languages.IndentAction.Indent }
        }
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.xml',
    ignoreCase: true,
    // Useful regular expressions
    qualifiedName: /(?:[\w\.\-]+:)?[\w\.\-]+/,
    tokenizer: {
        root: [
            [/[^<&]+/, ''],
            { include: '@whitespace' },
            // Standard opening tag
            [/(<)(@qualifiedName)/, [{ token: 'delimiter' }, { token: 'tag', next: '@tag' }]],
            // Standard closing tag
            [
                /(<\/)(@qualifiedName)(\s*)(>)/,
                [{ token: 'delimiter' }, { token: 'tag' }, '', { token: 'delimiter' }]
            ],
            // Meta tags - instruction
            [/(<\?)(@qualifiedName)/, [{ token: 'delimiter' }, { token: 'metatag', next: '@tag' }]],
            // Meta tags - declaration
            [/(<\!)(@qualifiedName)/, [{ token: 'delimiter' }, { token: 'metatag', next: '@tag' }]],
            // CDATA
            [/<\!\[CDATA\[/, { token: 'delimiter.cdata', next: '@cdata' }],
            [/&\w+;/, 'string.escape']
        ],
        cdata: [
            [/[^\]]+/, ''],
            [/\]\]>/, { token: 'delimiter.cdata', next: '@pop' }],
            [/\]/, '']
        ],
        tag: [
            [/[ \t\r\n]+/, ''],
            [
                /(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/,
                ['attribute.name', '', 'attribute.value']
            ],
            [
                /(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/,
                ['attribute.name', '', 'attribute.value']
            ],
            [
                /(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/,
                ['attribute.name', '', 'attribute.value']
            ],
            [/@qualifiedName/, 'attribute.name'],
            [/\?>/, { token: 'delimiter', next: '@pop' }],
            [/(\/)(>)/, [{ token: 'tag' }, { token: 'delimiter', next: '@pop' }]],
            [/>/, { token: 'delimiter', next: '@pop' }]
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/<!--/, { token: 'comment', next: '@comment' }]
        ],
        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, { token: 'comment', next: '@pop' }],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content']
        ]
    }
};

export { conf, language };
