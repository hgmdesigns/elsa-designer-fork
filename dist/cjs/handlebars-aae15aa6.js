'use strict';

const contextConsumer_elsaActivityEditorModal_elsaActivityPickerModal_elsaDesignerTree_elsaModalDialog_elsaMonaco_elsaToastNotification_elsaWorkflowDefinitionEditorNotifications_elsaWorkflowDefinitionEditorScreen_elsaWorkflowPublishButton_elsaWorkflowSettingsModal_entry = require('./context-consumer.elsa-activity-editor-modal.elsa-activity-picker-modal.elsa-designer-tree.elsa-modal-dialog.elsa-monaco.elsa-toast-notification.elsa-workflow-definition-editor-notifications.elsa-workflow-definition-editor-screen.elsa-workflow-publish-button.elsa-workflow-settings-modal-5afa69ba.js');
require('./index-ca95b980.js');
require('./event-bus-468c034a.js');
require('./_commonjsHelpers-206db00d.js');
require('./plugin-manager-64cf2928.js');
require('./domain-ec2ef82c.js');
require('./utils-bb625a12.js');
require('./collection-542fafac.js');
require('./activity-icon-provider-b089a264.js');
require('./forms-04d5e94e.js');
require('./zipObject-8c1347b6.js');
require('./index-169661bf.js');
require('./elsa-client-90ac335e.js');
require('./workflow-editor-fdda4c4b.js');
require('./state-tunnel-786a62ce.js');
require('./index-1d5f86ef.js');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var EMPTY_ELEMENTS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
];
var conf = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
    comments: {
        blockComment: ['{{!--', '--}}']
    },
    brackets: [
        ['<!--', '-->'],
        ['<', '>'],
        ['{{', '}}'],
        ['{', '}'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
    ],
    surroundingPairs: [
        { open: '<', close: '>' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
    ],
    onEnterRules: [
        {
            beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
            afterText: /^<\/(\w[\w\d]*)\s*>$/i,
            action: {
                indentAction: contextConsumer_elsaActivityEditorModal_elsaActivityPickerModal_elsaDesignerTree_elsaModalDialog_elsaMonaco_elsaToastNotification_elsaWorkflowDefinitionEditorNotifications_elsaWorkflowDefinitionEditorScreen_elsaWorkflowPublishButton_elsaWorkflowSettingsModal_entry.languages.IndentAction.IndentOutdent
            }
        },
        {
            beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
            action: { indentAction: contextConsumer_elsaActivityEditorModal_elsaActivityPickerModal_elsaDesignerTree_elsaModalDialog_elsaMonaco_elsaToastNotification_elsaWorkflowDefinitionEditorNotifications_elsaWorkflowDefinitionEditorScreen_elsaWorkflowPublishButton_elsaWorkflowSettingsModal_entry.languages.IndentAction.Indent }
        }
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '',
    // ignoreCase: true,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/\{\{!--/, 'comment.block.start.handlebars', '@commentBlock'],
            [/\{\{!/, 'comment.start.handlebars', '@comment'],
            [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.root' }],
            [/<!DOCTYPE/, 'metatag.html', '@doctype'],
            [/<!--/, 'comment.html', '@commentHtml'],
            [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],
            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],
            [/(<)([:\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
            [/(<\/)(\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
            [/</, 'delimiter.html'],
            [/\{/, 'delimiter.html'],
            [/[^<{]+/] // text
        ],
        doctype: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.comment'
                }
            ],
            [/[^>]+/, 'metatag.content.html'],
            [/>/, 'metatag.html', '@pop']
        ],
        comment: [
            [/\}\}/, 'comment.end.handlebars', '@pop'],
            [/./, 'comment.content.handlebars']
        ],
        commentBlock: [
            [/--\}\}/, 'comment.block.end.handlebars', '@pop'],
            [/./, 'comment.content.handlebars']
        ],
        commentHtml: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.comment'
                }
            ],
            [/-->/, 'comment.html', '@pop'],
            [/[^-]+/, 'comment.content.html'],
            [/./, 'comment.content.html']
        ],
        otherTag: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.otherTag'
                }
            ],
            [/\/?>/, 'delimiter.html', '@pop'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/] // whitespace
        ],
        // -- BEGIN <script> tags handling
        // After <script
        script: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.script'
                }
            ],
            [/type/, 'attribute.name', '@scriptAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@scriptEmbedded.text/javascript',
                    nextEmbedded: 'text/javascript'
                }
            ],
            [/[ \t\r\n]+/],
            [
                /(<\/)(script\s*)(>)/,
                ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]
            ]
        ],
        // After <script ... type
        scriptAfterType: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.scriptAfterType'
                }
            ],
            [/=/, 'delimiter', '@scriptAfterTypeEquals'],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@scriptEmbedded.text/javascript',
                    nextEmbedded: 'text/javascript'
                }
            ],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <script ... type =
        scriptAfterTypeEquals: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.scriptAfterTypeEquals'
                }
            ],
            [
                /"([^"]*)"/,
                {
                    token: 'attribute.value',
                    switchTo: '@scriptWithCustomType.$1'
                }
            ],
            [
                /'([^']*)'/,
                {
                    token: 'attribute.value',
                    switchTo: '@scriptWithCustomType.$1'
                }
            ],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@scriptEmbedded.text/javascript',
                    nextEmbedded: 'text/javascript'
                }
            ],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <script ... type = $S2
        scriptWithCustomType: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.scriptWithCustomType.$S2'
                }
            ],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@scriptEmbedded.$S2',
                    nextEmbedded: '$S2'
                }
            ],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        scriptEmbedded: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInEmbeddedState.scriptEmbedded.$S2',
                    nextEmbedded: '@pop'
                }
            ],
            [/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
        ],
        // -- END <script> tags handling
        // -- BEGIN <style> tags handling
        // After <style
        style: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.style'
                }
            ],
            [/type/, 'attribute.name', '@styleAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@styleEmbedded.text/css',
                    nextEmbedded: 'text/css'
                }
            ],
            [/[ \t\r\n]+/],
            [
                /(<\/)(style\s*)(>)/,
                ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]
            ]
        ],
        // After <style ... type
        styleAfterType: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.styleAfterType'
                }
            ],
            [/=/, 'delimiter', '@styleAfterTypeEquals'],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@styleEmbedded.text/css',
                    nextEmbedded: 'text/css'
                }
            ],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <style ... type =
        styleAfterTypeEquals: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.styleAfterTypeEquals'
                }
            ],
            [
                /"([^"]*)"/,
                {
                    token: 'attribute.value',
                    switchTo: '@styleWithCustomType.$1'
                }
            ],
            [
                /'([^']*)'/,
                {
                    token: 'attribute.value',
                    switchTo: '@styleWithCustomType.$1'
                }
            ],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@styleEmbedded.text/css',
                    nextEmbedded: 'text/css'
                }
            ],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <style ... type = $S2
        styleWithCustomType: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInSimpleState.styleWithCustomType.$S2'
                }
            ],
            [
                />/,
                {
                    token: 'delimiter.html',
                    next: '@styleEmbedded.$S2',
                    nextEmbedded: '$S2'
                }
            ],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        styleEmbedded: [
            [
                /\{\{/,
                {
                    token: '@rematch',
                    switchTo: '@handlebarsInEmbeddedState.styleEmbedded.$S2',
                    nextEmbedded: '@pop'
                }
            ],
            [/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
        ],
        // -- END <style> tags handling
        handlebarsInSimpleState: [
            [/\{\{\{?/, 'delimiter.handlebars'],
            [/\}\}\}?/, { token: 'delimiter.handlebars', switchTo: '@$S2.$S3' }],
            { include: 'handlebarsRoot' }
        ],
        handlebarsInEmbeddedState: [
            [/\{\{\{?/, 'delimiter.handlebars'],
            [
                /\}\}\}?/,
                {
                    token: 'delimiter.handlebars',
                    switchTo: '@$S2.$S3',
                    nextEmbedded: '$S3'
                }
            ],
            { include: 'handlebarsRoot' }
        ],
        handlebarsRoot: [
            [/"[^"]*"/, 'string.handlebars'],
            [/[#/][^\s}]+/, 'keyword.helper.handlebars'],
            [/else\b/, 'keyword.helper.handlebars'],
            [/[\s]+/],
            [/[^}]/, 'variable.parameter.handlebars']
        ]
    }
};

exports.conf = conf;
exports.language = language;
