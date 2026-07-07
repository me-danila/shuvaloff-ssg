// biome-ignore-all lint: third-party integration bootstrap
(function (w) {
    var CONTEXT = "TL-INT-academia-shuvaloff_2024-03-18";
    var HOSTS = [
        "ru-ibe.tlintegration.ru",
        "ibe.tlintegration.ru",
        "ibe.tlintegration.com",
    ];
    var WIDGETS = [
        ["booking-form", "tl-booking-form"],
        ["search-form", "tl-search-form"],
        ["reputation-widget", "tl-reputation-widget"],
        ["reputation-widget", "tl-reputation-widget-mobile"],
        ["reviews-widget", "tl-reviews-widget"],
    ];
    var RETRY_DELAY = 2500;
    var MAX_RETRIES = 3;
    var elementState =
        typeof WeakMap === "function"
            ? new WeakMap()
            : {
                  get: function (element) {
                      return element.__tlAcademiaState;
                  },
                  set: function (element, value) {
                      element.__tlAcademiaState = value;
                  },
                  delete: function (element) {
                      delete element.__tlAcademiaState;
                  },
              };
    var elementRetries =
        typeof WeakMap === "function"
            ? new WeakMap()
            : {
                  get: function (element) {
                      return element.__tlAcademiaRetries;
                  },
                  set: function (element, value) {
                      element.__tlAcademiaRetries = value;
                  },
              };

    function getLocale(locale) {
        if (locale === "en" || locale === "ru") return locale;
        var path = w.location && w.location.pathname;
        return path === "/en" || path.indexOf("/en/") === 0 ? "en" : "ru";
    }

    function getIntegration() {
        var t = (w.travelline = w.travelline || {});
        return (t.integration = t.integration || {});
    }

    function shouldResetBeforeEmbed(kind) {
        return kind === "reputation-widget";
    }

    function resetElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function isEmbedCommand(command, kind) {
        return (
            Array.isArray(command) &&
            command[0] === "embed" &&
            command[1] === kind
        );
    }

    function hasResettableEmbed(commands) {
        return commands.some(function (command) {
            return isEmbedCommand(command, "reputation-widget");
        });
    }

    function getCommands(locale, includeMissing) {
        var commands = [["setContext", CONTEXT, locale]];

        WIDGETS.forEach(function (widget) {
            var kind = widget[0];
            var container = widget[1];
            var element = w.document.getElementById(container);

            if (!includeMissing && !element) return;
            if (element) {
                var stateKey = locale + ":" + kind;
                if (elementState.get(element) === stateKey) return;
                if (shouldResetBeforeEmbed(kind)) {
                    resetElement(element);
                }
                elementState.set(element, stateKey);
            }

            commands.push([
                "embed",
                kind,
                {
                    container: container,
                },
            ]);
        });

        return commands;
    }

    function appendQueue(commands) {
        var ti = getIntegration();
        var queue = Array.isArray(ti.__cq) ? ti.__cq : [];

        if (hasResettableEmbed(commands)) {
            queue = queue.filter(function (command) {
                return !isEmbedCommand(command, "reputation-widget");
            });
        }

        ti.__cq = queue.concat(commands);
    }

    function loadFromHosts(hosts) {
        if (!hosts.length) return;

        var ti = getIntegration();
        if (ti.__academiaLoaderLoading) return;

        ti.__academiaLoaderLoading = true;
        ti.__loader = true;

        var d = w.document;
        var c =
            d.getElementsByTagName("head")[0] ||
            d.getElementsByTagName("body")[0];

        function next(script, remaining) {
            return function () {
                ti.__academiaLoaderLoading = false;
                if (!w.TL && script.parentNode) {
                    script.parentNode.removeChild(script);
                    loadFromHosts(remaining);
                }
            };
        }

        var script = d.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.dataset.academiaTlLoader = "true";
        script.src = "https://" + hosts[0] + "/integration/loader.js";
        script.onerror = script.onload = next(script, hosts.slice(1));
        c.appendChild(script);
    }

    function ensureLoader() {
        var ti = getIntegration();

        if (ti.__academiaLoaderLoading) return;

        if (ti.loaded) {
            ti.loaded = false;
            ti.__loader = false;
        }

        if (!ti.__loader) {
            loadFromHosts(HOSTS);
        }
    }

    function isContainerFilled(element) {
        if (!element) return true;
        var text = (element.textContent || "").replace(/\s+/g, "");
        return element.children.length > 0 && text !== "TravelLine";
    }

    var verifyWaits = 0;

    function verify(locale) {
        if (!w.TL) {
            // loader ещё грузится: повторный embed сейчас даст дубль iframe
            if (verifyWaits < MAX_RETRIES) {
                verifyWaits += 1;
                w.setTimeout(function () {
                    verify(locale);
                }, RETRY_DELAY);
            }
            return;
        }

        WIDGETS.forEach(function (widget) {
            var container = widget[1];
            var element = w.document.getElementById(container);
            if (!element || isContainerFilled(element)) return;

            var retries = Number(elementRetries.get(element) || 0);
            if (retries >= MAX_RETRIES) return;

            elementRetries.set(element, retries + 1);
            elementState.delete(element);
            resetElement(element);
            refresh(locale, true);
        });
    }

    function refresh(locale, includeMissing) {
        var resolvedLocale = getLocale(locale);
        var commands = getCommands(resolvedLocale, includeMissing);

        if (commands.length === 1 && !includeMissing) return;

        appendQueue(commands);
        ensureLoader();
        w.setTimeout(function () {
            verify(resolvedLocale);
        }, RETRY_DELAY);
    }

    var refreshTimer = 0;
    w.__academiaTravelLine = {
        refresh: function (locale) {
            w.clearTimeout(refreshTimer);
            refreshTimer = w.setTimeout(function () {
                refresh(locale, false);
            }, 50);
        },
        init: function (locale) {
            refresh(locale, true);
        },
    };

    try {
        w.dispatchEvent(new Event("academia:tl-ready"));
    } catch (e) {
        var readyEvent = w.document.createEvent("Event");
        readyEvent.initEvent("academia:tl-ready", false, false);
        w.dispatchEvent(readyEvent);
    }
})(window);
