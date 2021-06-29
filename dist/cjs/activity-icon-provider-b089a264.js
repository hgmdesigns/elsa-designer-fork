'use strict';

const index = require('./index-ca95b980.js');

const ReadLineIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <polyline points="5 7 10 12 5 17"/>
        <line x1="13" y1="17" x2="19" y2="17"/>
      </svg>
    </span>`);

const WriteLineIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
      </svg>
    </span>`);

const IfIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </span>`);

const ForkIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6 elsa-transform elsa-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <circle cx="12" cy="18" r="2"/>
        <circle cx="7" cy="6" r="2"/>
        <circle cx="17" cy="6" r="2"/>
        <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
      </svg>
    </span>`);

const JoinIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <circle cx="12" cy="18" r="2"/>
        <circle cx="7" cy="6" r="2"/>
        <circle cx="17" cy="6" r="2"/>
        <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
      </svg>
    </span>`);

const TimerIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-rose-50 elsa-text-rose-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </span>`);

const SendEmailIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    </span>`);

const HttpEndpointIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-rose-50 elsa-text-rose-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    </span>`);

const SendHttpRequestIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    </span>`);

const ScriptIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"/>
        <line x1="9" y1="7" x2="13" y2="7"/>
        <line x1="9" y1="11" x2="13" y2="11"/>
      </svg>
    </span>`);

const LoopIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"/>
        <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3"/>
        <path d="M11 11l1 -1v4"/>
      </svg>
    </span>`);

const BreakIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
        <path d="M7 12h14l-3 -3m0 6l3 -3"/>
      </svg>
    </span>`);

const SwitchIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <polyline points="15 4 19 4 19 8"/>
        <line x1="14.75" y1="9.25" x2="19" y2="4"/>
        <line x1="5" y1="19" x2="9" y2="15"/>
        <polyline points="15 19 19 19 19 15"/>
        <line x1="5" y1="5" x2="19" y2="19"/>
      </svg>
    </span>`);

const WriteHttpResponseIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    </span>`);

const RedirectIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <circle cx="6" cy="19" r="2"/>
        <circle cx="18" cy="5" r="2"/>
        <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"/>
      </svg>
    </span>`);

const EraseIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9"/>
        <path d="M18 12.3l-6.3 -6.3"/>
      </svg>
    </span>`);

const CogIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </span>`);

const RunWorkflowIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="3" y="3" width="6" height="6" rx="1"/>
        <rect x="15" y="15" width="6" height="6" rx="1"/>
        <path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3"/>
        <path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3"/>
      </svg>
    </span>`);

const SendSignalIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="2"/>
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
      </svg>
    </span>`);

const SignalReceivedIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-rose-50 elsa-text-rose-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </span>`);

const FinishIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    </span>`);

const InterruptTriggerIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M8 16v-4a4 4 0 0 1 8 0v4"/>
        <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7"/>
        <rect x="6" y="16" width="12" height="4" rx="1"/>
      </svg>
    </span>`);

const CorrelateIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-light-blue-50 elsa-text-light-blue-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"/>
        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"/>
      </svg>
    </span>`);

const StateIcon = props => (`<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-green-50 elsa-text-green-700 elsa-ring-4 elsa-ring-white">
      <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    </span>`);

const WebhookIcon = props => (`<span class="${`elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-rose-50 elsa-text-rose-700 elsa-ring-4 elsa-ring-white`}">
      <svg class="elsa-h-6 elsa-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </span>`);

class ActivityIconProvider {
  constructor() {
    this.map = {
      'If': () => index.h(IfIcon, null),
      'Fork': () => index.h(ForkIcon, null),
      'Join': () => index.h(JoinIcon, null),
      'For': () => index.h(LoopIcon, null),
      'ForEach': () => index.h(LoopIcon, null),
      'While': () => index.h(LoopIcon, null),
      'ParallelForEach': () => index.h(LoopIcon, null),
      'Break': () => index.h(BreakIcon, null),
      'Switch': () => index.h(SwitchIcon, null),
      'SetVariable': () => index.h(CogIcon, null),
      'SetTransientVariable': () => index.h(CogIcon, null),
      'SetContextId': () => index.h(CogIcon, null),
      'Correlate': () => index.h(CorrelateIcon, null),
      'SetName': () => index.h(CogIcon, null),
      'RunWorkflow': () => index.h(RunWorkflowIcon, null),
      'Timer': () => index.h(TimerIcon, null),
      'StartAt': () => index.h(TimerIcon, null),
      'Cron': () => index.h(TimerIcon, null),
      'ClearTimer': () => index.h(EraseIcon, null),
      'SendSignal': () => index.h(SendSignalIcon, null),
      'SignalReceived': () => index.h(SignalReceivedIcon, null),
      'Finish': () => index.h(FinishIcon, null),
      'State': () => index.h(StateIcon, null),
      'InterruptTrigger': () => index.h(InterruptTriggerIcon, null),
      'RunJavaScript': () => index.h(ScriptIcon, null),
      'ReadLine': () => index.h(ReadLineIcon, null),
      'WriteLine': () => index.h(WriteLineIcon, null),
      'HttpEndpoint': () => index.h(HttpEndpointIcon, null),
      'SendHttpRequest': () => index.h(SendHttpRequestIcon, null),
      'WriteHttpResponse': () => index.h(WriteHttpResponseIcon, null),
      'Redirect': () => index.h(RedirectIcon, null),
      'SendEmail': () => index.h(SendEmailIcon, null),
      'Webhook': () => index.h(WebhookIcon, null)
    };
  }
  register(activityType, icon) {
    this.map[activityType] = icon;
  }
  getIcon(activityType) {
    const provider = this.map[activityType];
    if (!provider)
      return undefined;
    return provider();
  }
}
const activityIconProvider = new ActivityIconProvider();

exports.activityIconProvider = activityIconProvider;
