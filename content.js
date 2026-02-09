(function() {
    chrome.storage.local.get(['enabled'], (result) => {
        if (result.enabled === false) return;

        if (window.self !== window.top) return;

        const currentUrl = window.location.href;
        const nakedScripts = /(dashboard|view|wato|graph_explorer|availability|discovery|conf)\.py/;

        if (nakedScripts.test(currentUrl) && !currentUrl.includes('index.py')) {
            const match = currentUrl.match(/(.*\/check_mk\/)(.*)/);
            if (match && match.length === 3) {
                const baseUrl = match[1] + "index.py";
                const startUrl = match[2];
                window.location.replace(`${baseUrl}?start_url=${encodeURIComponent(startUrl)}`);
            }
        }
    });
})();