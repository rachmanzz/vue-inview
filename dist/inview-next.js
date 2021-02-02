(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['vueinview-next'] = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	const DYNAMIC_REQUIRE_LOADERS = Object.create(null);
	const DYNAMIC_REQUIRE_CACHE = Object.create(null);
	const DEFAULT_PARENT_MODULE = {
		id: '<' + 'rollup>', exports: {}, parent: undefined, filename: null, loaded: false, children: [], paths: []
	};
	const CHECKED_EXTENSIONS = ['', '.js', '.json'];

	function normalize (path) {
		path = path.replace(/\\/g, '/');
		const parts = path.split('/');
		const slashed = parts[0] === '';
		for (let i = 1; i < parts.length; i++) {
			if (parts[i] === '.' || parts[i] === '') {
				parts.splice(i--, 1);
			}
		}
		for (let i = 1; i < parts.length; i++) {
			if (parts[i] !== '..') continue;
			if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
				parts.splice(--i, 2);
				i--;
			}
		}
		path = parts.join('/');
		if (slashed && path[0] !== '/')
		  path = '/' + path;
		else if (path.length === 0)
		  path = '.';
		return path;
	}

	function join () {
		if (arguments.length === 0)
		  return '.';
		let joined;
		for (let i = 0; i < arguments.length; ++i) {
		  let arg = arguments[i];
		  if (arg.length > 0) {
			if (joined === undefined)
			  joined = arg;
			else
			  joined += '/' + arg;
		  }
		}
		if (joined === undefined)
		  return '.';

		return joined;
	}

	function isPossibleNodeModulesPath (modulePath) {
		let c0 = modulePath[0];
		if (c0 === '/' || c0 === '\\') return false;
		let c1 = modulePath[1], c2 = modulePath[2];
		if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
			(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
		if (c1 === ':' && (c2 === '/' || c2 === '\\'))
			return false;
		return true;
	}

	function dirname (path) {
	  if (path.length === 0)
	    return '.';

	  let i = path.length - 1;
	  while (i > 0) {
	    const c = path.charCodeAt(i);
	    if ((c === 47 || c === 92) && i !== path.length - 1)
	      break;
	    i--;
	  }

	  if (i > 0)
	    return path.substr(0, i);

	  if (path.chartCodeAt(0) === 47 || path.chartCodeAt(0) === 92)
	    return path.charAt(0);

	  return '.';
	}

	function commonjsResolveImpl (path, originalModuleDir, testCache) {
		const shouldTryNodeModules = isPossibleNodeModulesPath(path);
		path = normalize(path);
		let relPath;
		if (path[0] === '/') {
			originalModuleDir = '/';
		}
		while (true) {
			if (!shouldTryNodeModules) {
				relPath = originalModuleDir ? normalize(originalModuleDir + '/' + path) : path;
			} else if (originalModuleDir) {
				relPath = normalize(originalModuleDir + '/node_modules/' + path);
			} else {
				relPath = normalize(join('node_modules', path));
			}

			if (relPath.endsWith('/..')) {
				break; // Travelled too far up, avoid infinite loop
			}

			for (let extensionIndex = 0; extensionIndex < CHECKED_EXTENSIONS.length; extensionIndex++) {
				const resolvedPath = relPath + CHECKED_EXTENSIONS[extensionIndex];
				if (DYNAMIC_REQUIRE_CACHE[resolvedPath]) {
					return resolvedPath;
				}			if (DYNAMIC_REQUIRE_LOADERS[resolvedPath]) {
					return resolvedPath;
				}		}
			if (!shouldTryNodeModules) break;
			const nextDir = normalize(originalModuleDir + '/..');
			if (nextDir === originalModuleDir) break;
			originalModuleDir = nextDir;
		}
		return null;
	}

	function commonjsResolve (path, originalModuleDir) {
		const resolvedPath = commonjsResolveImpl(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	}

	function commonjsRequire (path, originalModuleDir) {
		const resolvedPath = commonjsResolveImpl(path, originalModuleDir);
		if (resolvedPath !== null) {
	    let cachedModule = DYNAMIC_REQUIRE_CACHE[resolvedPath];
	    if (cachedModule) return cachedModule.exports;
	    const loader = DYNAMIC_REQUIRE_LOADERS[resolvedPath];
	    if (loader) {
	      DYNAMIC_REQUIRE_CACHE[resolvedPath] = cachedModule = {
	        id: resolvedPath,
	        filename: resolvedPath,
	        path: dirname(resolvedPath),
	        exports: {},
	        parent: DEFAULT_PARENT_MODULE,
	        loaded: false,
	        children: [],
	        paths: [],
	        require: function (path, base) {
	          return commonjsRequire(path, (base === undefined || base === null) ? cachedModule.path : base);
	        }
	      };
	      try {
	        loader.call(commonjsGlobal, cachedModule, cachedModule.exports);
	      } catch (error) {
	        delete DYNAMIC_REQUIRE_CACHE[resolvedPath];
	        throw error;
	      }
	      cachedModule.loaded = true;
	      return cachedModule.exports;
	    }	}
		return require(path);
	}

	commonjsRequire.cache = DYNAMIC_REQUIRE_CACHE;
	commonjsRequire.resolve = commonjsResolve;

	var inView = commonjsRequire("/$$rollup_base$$/node_modules/in-view/dist/in-view.min.js", "/$$rollup_base$$/node_modules/in-view/dist");

	var vueInview = function () { };
	vueInview.install = function (Vue, option) {
	    if (option)
	        inView.offset(option);
	};
	vueInview.threshold = function (arg) { inView.threshold(arg); };
	vueInview.offset = function (arg) { inView.offset(arg); };

	return vueInview;

})));
