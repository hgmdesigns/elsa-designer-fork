const win = window;
const require = win.require;
let initialized = false;
export function initializeMonacoWorker(libPath) {
  if (initialized)
    return;
  if (!libPath)
    return;
  const origin = document.location.origin;
  const baseUrl = libPath.startsWith('http') ? libPath : `${origin}/${libPath}`;
  require.config({ paths: { 'vs': `${baseUrl}/vs` } });
  win.MonacoEnvironment = { getWorkerUrl: () => proxy };
  let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: '${baseUrl}'
	};
	importScripts('${baseUrl}/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));
  initialized = true;
}
