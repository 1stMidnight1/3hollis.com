(function (global) {
	const defaultSideAdFiles = [
		'/images/ad1.gif',
		'/images/ad2.gif',
		'/images/ad3.gif',
		'/images/ad4.gif',
		'/images/ad5.gif'
	];

	function shuffle(array) {
		if (!Array.isArray(array)) return [];
		const copy = array.slice();
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	}

	function updateSideAds(options) {
		if (!global.document) return;
		const opts = Object.assign({
			sideAdFiles: defaultSideAdFiles,
			body: global.document.body,
			selector: '#left-ads img.side-ad, #right-ads img.side-ad',
			minSpacing: 100,
			maxSpacing: 1000
		}, options || {});

		const { body, sideAdFiles, selector, minSpacing, maxSpacing } = opts;
		if (!body || (body.classList && body.classList.contains('boring-mode'))) return;

		const sideImgs = Array.from(global.document.querySelectorAll(selector));
		if (!sideImgs.length) return;

		const picks = shuffle(sideAdFiles).slice(0, Math.min(sideAdFiles.length, sideImgs.length));

		sideImgs.forEach((imgEl, index) => {
			if (!imgEl) return;
			if (index < picks.length) {
				imgEl.src = picks[index];
				imgEl.style.display = '';
				if (imgEl.parentNode) imgEl.parentNode.style.display = '';
				const margin = Math.floor(Math.random() * (maxSpacing - minSpacing + 1)) + minSpacing;
				imgEl.style.marginTop = margin + 'px';
			} else {
				imgEl.style.display = 'none';
				if (imgEl.parentNode) imgEl.parentNode.style.display = 'none';
			}
		});
	}

	function positionSideAds(options) {
		if (!global.document) return;
		const opts = Object.assign({
			containerSelector: '.container',
			leftId: 'left-ads',
			rightId: 'right-ads',
			adWidth: 132,
			topOffset: 120
		}, options || {});

		const container = global.document.querySelector(opts.containerSelector);
		const leftAds = global.document.getElementById(opts.leftId);
		const rightAds = global.document.getElementById(opts.rightId);
		if (!container || !leftAds || !rightAds) return;

		const rect = container.getBoundingClientRect();
		const leftGutterCenter = rect.left / 2;
		const rightGutterCenter = global.innerWidth - (global.innerWidth - rect.right) / 2;

		leftAds.style.left = Math.max(8, leftGutterCenter - opts.adWidth / 2) + 'px';
		rightAds.style.left = Math.min(global.innerWidth - opts.adWidth - 8, rightGutterCenter - opts.adWidth / 2) + 'px';

		const containerTop = global.scrollY + rect.top;
		leftAds.style.top = (containerTop + opts.topOffset) + 'px';
		rightAds.style.top = (containerTop + opts.topOffset) + 'px';
	}

	function initBoringMode(options) {
		if (!global.document) {
			return { setBoringMode: function () {} };
		}
		const opts = Object.assign({
			body: global.document.body,
			toggle: null,
			toggleId: 'modeToggle',
			storageKey: 'boringMode',
			boringOnText: 'boring mode on :/',
			boringOffText: 'awesome mode: on :3',
			onToggle: function () {}
		}, options || {});

		const body = opts.body || global.document.body;
		const toggle = opts.toggle || global.document.getElementById(opts.toggleId);

		function apply(on) {
			if (!body) return;
			body.classList.toggle('boring-mode', !!on);
			if (toggle) {
				toggle.classList.toggle('boring', !!on);
				toggle.textContent = on ? opts.boringOnText : opts.boringOffText;
				toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
			}
			try {
				global.localStorage && global.localStorage.setItem(opts.storageKey, on ? '1' : '0');
			} catch (err) {}
			try {
				opts.onToggle(!!on);
			} catch (err) {}
		}

		if (toggle) {
			toggle.addEventListener('click', function () {
				const next = !(body && body.classList.contains('boring-mode'));
				apply(next);
			});
		}

		let stored = null;
		try {
			stored = global.localStorage && global.localStorage.getItem(opts.storageKey);
		} catch (err) {}
		if (stored === '1') {
			apply(true);
		} else if (body && body.classList.contains('boring-mode')) {
			try { opts.onToggle(true); } catch (err) {}
		}

		return { setBoringMode: apply };
	}

	global.ThreeHollisShared = {
		defaultSideAdFiles,
		shuffle,
		updateSideAds,
		positionSideAds,
		initBoringMode
	};
})(window);
