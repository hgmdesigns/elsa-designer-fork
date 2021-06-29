import { conf as conf$1, language as language$1 } from './typescript-f7a2fe15.js';
import './context-consumer.elsa-activity-editor-modal.elsa-activity-picker-modal.elsa-designer-tree.elsa-modal-dialog.elsa-monaco.elsa-toast-notification.elsa-workflow-definition-editor-notifications.elsa-workflow-definition-editor-screen.elsa-workflow-publish-button.elsa-workflow-settings-modal-38d86d9a.js';
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
var conf = conf$1;
var language = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    tokenPostfix: '.js',
    keywords: [
        'break',
        'case',
        'catch',
        'class',
        'continue',
        'const',
        'constructor',
        'debugger',
        'default',
        'delete',
        'do',
        'else',
        'export',
        'extends',
        'false',
        'finally',
        'for',
        'from',
        'function',
        'get',
        'if',
        'import',
        'in',
        'instanceof',
        'let',
        'new',
        'null',
        'return',
        'set',
        'super',
        'switch',
        'symbol',
        'this',
        'throw',
        'true',
        'try',
        'typeof',
        'undefined',
        'var',
        'void',
        'while',
        'with',
        'yield',
        'async',
        'await',
        'of'
    ],
    typeKeywords: [],
    operators: language$1.operators,
    symbols: language$1.symbols,
    escapes: language$1.escapes,
    digits: language$1.digits,
    octaldigits: language$1.octaldigits,
    binarydigits: language$1.binarydigits,
    hexdigits: language$1.hexdigits,
    regexpctl: language$1.regexpctl,
    regexpesc: language$1.regexpesc,
    tokenizer: language$1.tokenizer
};

export { conf, language };
