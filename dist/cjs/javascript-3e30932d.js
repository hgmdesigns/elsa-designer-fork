'use strict';

const typescript = require('./typescript-24ab3a69.js');
require('./context-consumer.elsa-activity-editor-modal.elsa-activity-picker-modal.elsa-designer-tree.elsa-modal-dialog.elsa-monaco.elsa-toast-notification.elsa-workflow-definition-editor-notifications.elsa-workflow-definition-editor-screen.elsa-workflow-publish-button.elsa-workflow-settings-modal-5afa69ba.js');
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
var conf = typescript.conf;
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
    operators: typescript.language.operators,
    symbols: typescript.language.symbols,
    escapes: typescript.language.escapes,
    digits: typescript.language.digits,
    octaldigits: typescript.language.octaldigits,
    binarydigits: typescript.language.binarydigits,
    hexdigits: typescript.language.hexdigits,
    regexpctl: typescript.language.regexpctl,
    regexpesc: typescript.language.regexpesc,
    tokenizer: typescript.language.tokenizer
};

exports.conf = conf;
exports.language = language;
