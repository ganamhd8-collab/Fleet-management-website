(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[974],{

/***/ 2974:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5760));


/***/ }),

/***/ 5760:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ HomePage)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(2115);
// EXTERNAL MODULE: ./src/components/LanguageProvider.tsx + 1 modules
var LanguageProvider = __webpack_require__(7211);
// EXTERNAL MODULE: ./src/components/sections/Navbar.tsx
var Navbar = __webpack_require__(9000);
// EXTERNAL MODULE: ./src/content/images.ts
var content_images = __webpack_require__(6774);
// EXTERNAL MODULE: ./src/components/ui/LoginLink.tsx
var LoginLink = __webpack_require__(5199);
// EXTERNAL MODULE: ./src/components/ui/Icons.tsx
var Icons = __webpack_require__(1638);
;// ./src/components/sections/Hero.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





const clamp = (v, min, max)=>Math.min(max, Math.max(min, v));
function Hero() {
    const { t } = (0,LanguageProvider/* useLanguage */.o)();
    const sectionRef = (0,react.useRef)(null);
    const videoRef = (0,react.useRef)(null);
    const [chapterIdx, setChapterIdx] = (0,react.useState)(0);
    const [exitFade, setExitFade] = (0,react.useState)(0);
    (0,react.useEffect)(()=>{
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;
        let cancelled = false;
        let blobUrl = null;
        let rafId = 0;
        let inView = true;
        let lastTime = 0;
        let smoothed = 0;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // Fetch video into a local blob so scrubbing never stalls on network range requests
        fetch("/hero.mp4").then((res)=>res.ok ? res.blob() : null).then((blob)=>{
            if (!blob || cancelled) return;
            blobUrl = URL.createObjectURL(blob);
            const current = video.currentTime || 0;
            video.src = blobUrl;
            video.load();
            video.addEventListener("loadedmetadata", ()=>{
                if (!cancelled && Number.isFinite(video.duration)) {
                    video.currentTime = clamp(current, 0, Math.max(0, video.duration - 0.05));
                }
            }, {
                once: true
            });
        }).catch(()=>{
        // Keep direct /hero.mp4 source if blob fetch fails
        });
        const io = new IntersectionObserver((param)=>{
            let [entry] = param;
            inView = entry.isIntersecting;
        }, {
            rootMargin: "25% 0px"
        });
        io.observe(section);
        const computeScrollProgress = ()=>{
            const rect = section.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            return scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
        };
        let lastUiChapter = -1;
        let lastExit = -1;
        const tick = (now)=>{
            rafId = requestAnimationFrame(tick);
            const dt = lastTime ? Math.min(0.1, (now - lastTime) / 1000) : 1 / 60;
            lastTime = now;
            if (!inView) return;
            const raw = computeScrollProgress();
            const smoothFactor = reducedMotion ? 1 : 0.16;
            smoothed += (raw - smoothed) * (smoothFactor >= 1 ? 1 : 1 - Math.pow(1 - smoothFactor, dt * 60));
            if (Math.abs(raw - smoothed) < 0.001) smoothed = raw;
            if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
                const targetTime = clamp(smoothed * (video.duration - 0.04), 0, Math.max(0, video.duration - 0.04));
                if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.035) {
                    video.currentTime = targetTime;
                }
            }
            const nextChapter = Math.min(4, Math.floor(smoothed * 5));
            if (nextChapter !== lastUiChapter) {
                lastUiChapter = nextChapter;
                setChapterIdx(nextChapter);
            }
            const nextExit = smoothed > 0.88 ? Math.round(clamp((smoothed - 0.88) / 0.12, 0, 1) * 20) / 20 : 0;
            if (nextExit !== lastExit) {
                lastExit = nextExit;
                setExitFade(nextExit);
            }
        };
        rafId = requestAnimationFrame(tick);
        return ()=>{
            cancelled = true;
            cancelAnimationFrame(rafId);
            io.disconnect();
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    }, []);
    var _t_hero_chapters_chapterIdx;
    const chapter = (_t_hero_chapters_chapterIdx = t.hero.chapters[chapterIdx]) !== null && _t_hero_chapters_chapterIdx !== void 0 ? _t_hero_chapters_chapterIdx : t.hero.chapters[0];
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
        ref: sectionRef,
        id: "home",
        "aria-label": t.hero.headline,
        className: "relative h-[260vh] md:h-[400vh] bg-[#0B192C] pt-20 text-white",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "sticky top-20 flex h-[calc(100vh-5rem)] w-full flex-col justify-start overflow-hidden bg-[#0B192C]",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "pointer-events-none absolute inset-0 z-[1] translate-y-[120px] sm:translate-y-[140px] md:translate-y-[155px]",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("video", {
                        ref: videoRef,
                        src: "/hero.mp4",
                        poster: content_images/* images */.z.hero,
                        muted: true,
                        playsInline: true,
                        preload: "metadata",
                        "aria-hidden": "true",
                        className: "h-full w-full object-cover object-bottom",
                        style: {
                            maskImage: "linear-gradient(to bottom, transparent 0%, black 26%, black 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 26%, black 100%)"
                        }
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    "aria-hidden": "true",
                    className: "pointer-events-none absolute inset-0 z-[2] h-full w-full",
                    style: {
                        backgroundColor: "rgba(11, 25, 44, 0.45)"
                    }
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    "aria-hidden": "true",
                    className: "pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32",
                    style: {
                        background: "linear-gradient(180deg, transparent 0%, rgba(11, 25, 44, 0.65) 55%, rgba(245, 247, 250, ".concat((exitFade * 0.95).toFixed(2), ") 100%)")
                    }
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "container relative z-[3] flex flex-col items-center bg-transparent border-none shadow-none pt-5 sm:pt-7 md:pt-9 text-center",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "fade-in flex flex-col items-center space-y-4 sm:space-y-5",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                className: "max-w-[min(92vw,1240px)] text-[clamp(1.75rem,3.1vw,3.15rem)] font-bold leading-[1.2] tracking-tight text-white lg:whitespace-nowrap",
                                children: chapter.headline
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "max-w-[760px] text-[15px] leading-relaxed text-white/85 sm:text-lg",
                                children: chapter.description
                            }),
                            chapterIdx === 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "flex flex-col items-center space-y-3.5 pt-2",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                                href: "#contact",
                                                className: "btn-primary w-full sm:w-auto shadow-lift",
                                                children: [
                                                    t.hero.primary,
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(Icons/* IconArrow */.Pl, {
                                                        className: "h-4 w-4"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                href: "#solutions",
                                                className: "btn-ghost-light w-full sm:w-auto",
                                                children: t.hero.secondary
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                        className: "text-xs sm:text-sm text-white/75",
                                        children: [
                                            t.hero.clientPrefix,
                                            " ",
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(LoginLink/* default */.A, {
                                                className: "font-semibold text-turquoise underline underline-offset-4 hover:text-white transition-colors",
                                                children: t.hero.clientLink
                                            })
                                        ]
                                    })
                                ]
                            }),
                            chapterIdx === 4 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 pt-2",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                        href: "#contact",
                                        className: "btn-primary w-full sm:w-auto shadow-lift",
                                        children: [
                                            t.hero.primary,
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(Icons/* IconArrow */.Pl, {
                                                className: "h-4 w-4"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                        href: "#solutions",
                                        className: "btn-ghost-light w-full sm:w-auto",
                                        children: t.hero.secondary
                                    })
                                ]
                            })
                        ]
                    }, chapter.id)
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./node_modules/next/dist/client/app-dir/link.js
var app_dir_link = __webpack_require__(8173);
var link_default = /*#__PURE__*/__webpack_require__.n(app_dir_link);
;// ./src/components/ui/Reveal.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

/** Fades and lifts its content in once it enters the viewport (skipped for reduced motion via CSS). */ function Reveal(param) {
    let { as = "div", delay = 0, className = "", children } = param;
    const ref = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver((entries)=>{
            for (const e of entries){
                if (e.isIntersecting) {
                    e.target.classList.add("is-visible");
                    io.unobserve(e.target);
                }
            }
        }, {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.08
        });
        io.observe(el);
        return ()=>io.disconnect();
    }, []);
    const Tag = as;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(Tag, {
        ref: ref,
        className: "reveal ".concat(className),
        style: {
            "--reveal-delay": "".concat(delay, "ms")
        },
        children: children
    });
}

;// ./src/components/sections/Solutions.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





/** Clean, flat solid brand colors from FleetIntel's official palette (zero gradients) */ const cardThemes = {
    gps: {
        bg: "#14213D"
    },
    maintenance: {
        bg: "#283A88"
    },
    fuel: {
        bg: "#2A7EBD"
    },
    driver: {
        bg: "#65C2C8"
    },
    documents: {
        bg: "#7FC4A5"
    }
};
function Solutions() {
    const { t, lang } = (0,LanguageProvider/* useLanguage */.o)();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
        id: "solutions",
        "aria-label": t.solutions.headline,
        className: "section bg-offwhite border-b border-line",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(Reveal, {
                    className: "max-w-3xl space-y-4",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                            className: "text-h2 font-bold text-ink",
                            children: t.solutions.headline
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                            className: "text-lead text-ink-muted max-w-prose",
                            children: t.solutions.intro
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6",
                    children: t.solutions.items.map((item, idx)=>{
                        var _cardThemes_item_id;
                        const theme = (_cardThemes_item_id = cardThemes[item.id]) !== null && _cardThemes_item_id !== void 0 ? _cardThemes_item_id : cardThemes.gps;
                        const spanClass = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";
                        return /*#__PURE__*/ (0,jsx_runtime.jsx)(Reveal, {
                            delay: idx * 90,
                            className: spanClass,
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("article", {
                                style: {
                                    backgroundColor: theme.bg
                                },
                                className: "group flex h-full min-h-[280px] flex-col justify-between rounded-[24px] p-8 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                                className: "text-2xl font-bold leading-snug text-white",
                                                children: item.title
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-[15px] leading-relaxed text-white",
                                                children: item.description
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "pt-8",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                            href: "/services/".concat(item.id),
                                            className: "inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/30",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                    children: lang === "ar" ? "اقرأ المزيد" : "Read More"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(Icons/* IconArrow */.Pl, {
                                                    className: "h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        }, item.id);
                    })
                })
            ]
        })
    });
}

;// ./src/components/sections/HowItWorks.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const VIDEO_1080 = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4";
const VIDEO_720 = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4";
const VIDEO_POSTER = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2307e4bf-be39-42b4-b579-e168aeccabf0.jpg";
const A = 2.4; // Viewports dedicated to scrubbing the handling video clip
const HowItWorks_clamp = (v, min, max)=>Math.min(max, Math.max(min, v));
/** Crisp 38px white stroke icons for the 3 How It Works steps */ function StepStrokeIcon(param) {
    let { step } = param;
    const common = {
        width: 38,
        height: 38,
        viewBox: "0 0 38 38",
        fill: "none",
        stroke: "#FFFFFF",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true
    };
    if (step === "01") {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
            ...common,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("rect", {
                    x: "7",
                    y: "11",
                    width: "10",
                    height: "16",
                    rx: "2"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("rect", {
                    x: "21",
                    y: "11",
                    width: "10",
                    height: "16",
                    rx: "2"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M17 19h4M12 7v4M26 7v4"
                })
            ]
        });
    }
    if (step === "02") {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
            ...common,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("rect", {
                    x: "5",
                    y: "7",
                    width: "28",
                    height: "19",
                    rx: "2.5"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M11 17h4l2.5-5 3.5 9 2.5-4H27M14 31h10M19 26v5"
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        ...common,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M7 27l7-7 5 4 11-12"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M23 12h7v7"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M7 31h24",
                opacity: "0.45"
            })
        ]
    });
}
function HowItWorks() {
    const { t, lang, dir } = (0,LanguageProvider/* useLanguage */.o)();
    const trackRef = (0,react.useRef)(null);
    const sceneRef = (0,react.useRef)(null);
    const videoRef = (0,react.useRef)(null);
    const giantRef = (0,react.useRef)(null);
    const bandRef = (0,react.useRef)(null);
    const stripRef = (0,react.useRef)(null);
    const cardRefs = (0,react.useRef)([]);
    const [videoSrc, setVideoSrc] = (0,react.useState)(VIDEO_1080);
    const [trackHeightVh, setTrackHeightVh] = (0,react.useState)(480);
    const [settled, setSettled] = (0,react.useState)(false);
    const [speedKmh, setSpeedKmh] = (0,react.useState)(0);
    const leadLines = lang === "ar" ? [
        "من ربط المركبات",
        "إلى إدارة",
        "أكثر ذكاءً."
    ] : [
        "FROM CONNECTED VEHICLES",
        "TO SMARTER",
        "OPERATIONS."
    ];
    const leadIntro = lang === "ar" ? "اربط أجهزة أسطولك بمنصتنا المركزية وحوّل بيانات المركبات إلى قرارات تشغيلية دقيقة." : "Connect your fleet hardware to our centralized platform and turn raw vehicle telemetry into actionable operational intelligence.";
    (0,react.useEffect)(()=>{
        const updateSource = ()=>{
            setVideoSrc(window.innerWidth <= 900 ? VIDEO_720 : VIDEO_1080);
        };
        updateSource();
        window.addEventListener("resize", updateSource);
        return ()=>window.removeEventListener("resize", updateSource);
    }, []);
    (0,react.useEffect)(()=>{
        const track = trackRef.current;
        const scene = sceneRef.current;
        const video = videoRef.current;
        const giant = giantRef.current;
        const band = bandRef.current;
        const strip = stripRef.current;
        if (!track || !scene || !video || !strip) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let bFactor = 1.6;
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let stripWidth = strip.scrollWidth;
        let edgePx = Math.round(vh * 0.448);
        const measureLayout = ()=>{
            vw = window.innerWidth;
            vh = window.innerHeight;
            stripWidth = strip.scrollWidth || 1400;
            bFactor = (stripWidth + 0.45 * vw) / Math.max(1, vw) * 1.1;
            setTrackHeightVh((1 + A + bFactor) * 100);
            const isMobile = vw < 768 || vh > vw;
            if (isMobile) {
                edgePx = Math.round(vh * 0.36);
                scene.style.setProperty("--edge-px", "".concat(edgePx, "px"));
            } else {
                const vr = video.getBoundingClientRect();
                const sr = scene.getBoundingClientRect();
                const clipTop = vr.top - sr.top;
                const clipHeight = vr.height || vh;
                const rawEdge = Math.round(clipTop + 0.448 * clipHeight);
                edgePx = HowItWorks_clamp(rawEdge, Math.round(vh * 0.3), Math.round(vh * 0.65));
                scene.style.setProperty("--edge-px", "".concat(edgePx, "px"));
            }
        };
        measureLayout();
        const ro = new ResizeObserver(measureLayout);
        ro.observe(scene);
        ro.observe(strip);
        ro.observe(video);
        video.addEventListener("loadedmetadata", measureLayout);
        let rafId = 0;
        let inView = false;
        let curTime = 0;
        let lastScrollY = window.scrollY;
        let lastTs = performance.now();
        let smoothedSpeed = 0;
        let lastSettled = false;
        let lastShownSpeed = -1;
        const io = new IntersectionObserver((param)=>{
            let [entry] = param;
            inView = entry.isIntersecting;
        }, {
            rootMargin: "40% 0px"
        });
        io.observe(track);
        const tick = (now)=>{
            rafId = requestAnimationFrame(tick);
            const dt = Math.max(1, now - lastTs);
            lastTs = now;
            const curScrollY = window.scrollY;
            const dy = Math.abs(curScrollY - lastScrollY);
            lastScrollY = curScrollY;
            if (!inView) return;
            const trackRect = track.getBoundingClientRect();
            const sectionScrollY = Math.max(0, -trackRect.top);
            // 1. Video scrub progress q (0..1 across A viewports)
            const q = HowItWorks_clamp(sectionScrollY / (A * vh), 0, 1);
            if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
                const targetTime = q * Math.min(video.duration, 3.75);
                curTime = reducedMotion ? targetTime : curTime + (targetTime - curTime) * 0.2;
                if (!video.seeking && Math.abs(curTime - video.currentTime) > 1 / 60) {
                    video.currentTime = HowItWorks_clamp(curTime, 0, Math.max(0, video.duration - 0.02));
                }
            }
            // 2. Settled state (q >= 0.94), band rise (0.55 -> 0.94), & speed readout
            if (band) {
                const bandReveal = reducedMotion ? 1 : HowItWorks_clamp((q - 0.55) / 0.39, 0, 1);
                const riseY = Math.round((1 - bandReveal) * Math.max(0, vh - edgePx));
                band.style.transform = "translate3d(0, ".concat(riseY, "px, 0)");
            }
            const isSettledNow = q >= 0.94;
            if (isSettledNow !== lastSettled) {
                lastSettled = isSettledNow;
                setSettled(isSettledNow);
            }
            const rawVel = Math.min(99, Math.round(dy / dt * 1000 / 32));
            smoothedSpeed += (rawVel - smoothedSpeed) * 0.15;
            const displaySpeed = Math.min(99, Math.round(smoothedSpeed));
            if (displaySpeed !== lastShownSpeed) {
                lastShownSpeed = displaySpeed;
                setSpeedKmh(displaySpeed);
            }
            // 3. Horizontal strip & Giant background letters progress r (0..1 across B viewports)
            const r = HowItWorks_clamp((sectionScrollY - A * vh) / Math.max(1, bFactor * vh), 0, 1);
            const tx = vw - r * (stripWidth + 0.45 * vw);
            strip.style.transform = "translate3d(".concat(dir === "rtl" ? -tx : tx, "px, 0, 0)");
            if (giant) {
                const gx = vw * 0.35 - r * (vw * 0.95);
                giant.style.transform = "translate3d(".concat(dir === "rtl" ? -gx : gx, "px, 0, 0)");
            }
            // 4. Sky-blue to white gradient sweep on each card as it enters
            cardRefs.current.forEach((cardEl)=>{
                if (!cardEl) return;
                const cr = cardEl.getBoundingClientRect();
                const enterRatio = dir === "rtl" ? HowItWorks_clamp((cr.right - vw * 0.05) / (vw * 0.48), 0, 1) : HowItWorks_clamp((vw - cr.left) / (vw * 0.48), 0, 1);
                const pWhite = Math.round(enterRatio * 100);
                const pBlue = HowItWorks_clamp(pWhite + 16, 0, 100);
                const pEnd = HowItWorks_clamp(pWhite + 34, 0, 100);
                cardEl.style.setProperty("--sweep-w", "".concat(pWhite, "%"));
                cardEl.style.setProperty("--sweep-b", "".concat(pBlue, "%"));
                cardEl.style.setProperty("--sweep-e", "".concat(pEnd, "%"));
            });
        };
        rafId = requestAnimationFrame(tick);
        return ()=>{
            cancelAnimationFrame(rafId);
            io.disconnect();
            ro.disconnect();
            video.removeEventListener("loadedmetadata", measureLayout);
        };
    }, [
        dir,
        lang
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
        ref: trackRef,
        id: "how-it-works",
        "aria-label": t.how.headline,
        className: "how-it-works-track relative bg-white",
        style: {
            height: "".concat(trackHeightVh, "vh")
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            ref: sceneRef,
            className: "how-it-works-scene sticky top-0 h-screen w-full overflow-hidden bg-white",
            style: {
                "--edge-px": "44.8vh"
            },
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    dir: "ltr",
                    className: "pointer-events-none absolute top-24 left-6 z-30 font-mono text-xs font-semibold tracking-widest text-navy/75 transition-opacity duration-300 ".concat(settled ? "opacity-100" : "opacity-0"),
                    children: [
                        String(speedKmh).padStart(2, "0"),
                        " KM/H"
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    ref: giantRef,
                    "aria-hidden": "true",
                    className: "pointer-events-none absolute z-10 select-none whitespace-nowrap uppercase text-[#e9e9e9] ".concat(lang === "ar" ? "font-bold tracking-tight" : "font-anton tracking-normal"),
                    style: {
                        bottom: "calc(100vh - var(--edge-px))",
                        fontSize: "clamp(140px, 22vw, 330px)",
                        lineHeight: 0.8,
                        mixBlendMode: "darken"
                    },
                    children: lang === "ar" ? "كيف نعمل" : "HOW IT WORKS"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex h-full items-start justify-center overflow-hidden",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("video", {
                        ref: videoRef,
                        src: videoSrc,
                        poster: VIDEO_POSTER,
                        muted: true,
                        playsInline: true,
                        preload: "metadata",
                        "aria-hidden": "true",
                        className: "h-auto w-[155vw] max-w-none mt-[calc(36vh-0.448*100%)] md:mt-0 md:w-full md:h-full object-cover object-center"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    ref: bandRef,
                    className: "absolute inset-x-0 bottom-0 z-20 flex items-center overflow-hidden bg-[#2a7ebd] will-change-transform",
                    style: {
                        top: "var(--edge-px)",
                        transform: "translate3d(0, 100%, 0)"
                    },
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            ref: stripRef,
                            className: "flex items-start will-change-transform gap-[56px] md:gap-[120px] px-4",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "flex shrink-0 items-start gap-8 md:gap-12",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("h2", {
                                            className: "text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-white whitespace-nowrap ".concat(lang === "ar" ? "font-bold tracking-tight" : "font-anton uppercase tracking-wide"),
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                    className: "block",
                                                    children: leadLines[0]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                    className: "block",
                                                    children: leadLines[1]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                    className: "block text-[#14213D]",
                                                    children: leadLines[2]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                            className: "max-w-[260px] text-sm leading-relaxed text-white/85",
                                            children: leadIntro
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: "flex shrink-0 items-stretch",
                                    children: t.how.steps.map((step, idx)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            ref: (el)=>{
                                                cardRefs.current[idx] = el;
                                            },
                                            style: {
                                                "--sweep-w": "100%",
                                                "--sweep-b": "100%",
                                                "--sweep-e": "100%"
                                            },
                                            className: "w-[260px] md:w-[320px] shrink-0 px-[32px] flex flex-col justify-start ".concat(idx > 0 ? "border-s border-white/25" : ""),
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                                    className: "mb-5",
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(StepStrokeIcon, {
                                                        step: step.n
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("h3", {
                                                    className: "text-xl leading-snug ".concat(lang === "ar" ? "font-bold" : "font-anton uppercase tracking-wide"),
                                                    style: {
                                                        backgroundImage: "linear-gradient(".concat(dir === "rtl" ? "270deg" : "90deg", ", #ffffff 0%, #ffffff var(--sweep-w), #14213D var(--sweep-b), transparent var(--sweep-e))"),
                                                        WebkitBackgroundClip: "text",
                                                        backgroundClip: "text",
                                                        color: "transparent"
                                                    },
                                                    children: [
                                                        step.n,
                                                        " — ",
                                                        step.title
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                    className: "mt-2.5 text-sm leading-relaxed",
                                                    style: {
                                                        backgroundImage: "linear-gradient(".concat(dir === "rtl" ? "270deg" : "90deg", ", rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) var(--sweep-w), #14213D var(--sweep-b), transparent var(--sweep-e))"),
                                                        WebkitBackgroundClip: "text",
                                                        backgroundClip: "text",
                                                        color: "transparent"
                                                    },
                                                    children: step.text
                                                })
                                            ]
                                        }, step.n))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "pointer-events-none absolute inset-x-0 bottom-[36px] flex justify-center transition-opacity duration-300 ".concat(settled ? "opacity-100" : "opacity-0"),
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rounded-full border border-white/35 bg-[#2a7ebd]/85 px-5 py-1.5 text-xs font-medium tracking-wider text-white backdrop-blur-sm",
                                children: lang === "ar" ? "كيف نعمل" : "How It Works"
                            })
                        })
                    ]
                })
            ]
        })
    });
}

;// ./src/components/sections/Industries.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




function Industries() {
    const { t } = (0,LanguageProvider/* useLanguage */.o)();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
        id: "industries",
        className: "section bg-offwhite border-b border-line",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(Reveal, {
                    className: "max-w-3xl space-y-4",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                            className: "text-h2 font-bold text-ink",
                            children: t.industries.headline
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                            className: "text-lead text-ink-muted max-w-prose",
                            children: t.industries.description
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6",
                    children: t.industries.items.map((item, i)=>{
                        const src = content_images/* images */.z.industries[item.id];
                        // First 2 items span 3 cols on lg, next 3 span 2 cols on lg for balanced 5-item editorial grid
                        const spanClass = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
                        return /*#__PURE__*/ (0,jsx_runtime.jsx)(Reveal, {
                            delay: i * 70,
                            className: spanClass,
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("figure", {
                                className: "group relative aspect-[16/10] overflow-hidden rounded-panel bg-navy",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                        src: src,
                                        alt: item.alt,
                                        loading: "lazy",
                                        className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "absolute inset-0 transition-opacity duration-300",
                                        style: {
                                            background: "linear-gradient(180deg, rgba(20,33,61,0.12) 0%, rgba(20,33,61,0.85) 100%)"
                                        }
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("figcaption", {
                                        className: "absolute bottom-5 inset-x-6",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                            className: "text-lg font-semibold text-white",
                                            children: item.title
                                        })
                                    })
                                ]
                            })
                        }, item.id);
                    })
                })
            ]
        })
    });
}

;// ./src/components/sections/WhyFleetIntel.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



function WhyFleetIntel() {
    const { t } = (0,LanguageProvider/* useLanguage */.o)();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
        id: "why-fleetintel",
        className: "section bg-white border-b border-line",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "container grid items-start gap-12 lg:grid-cols-12",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(Reveal, {
                    className: "lg:col-span-5 space-y-5 lg:sticky lg:top-28",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                            className: "text-h2 font-bold text-ink",
                            children: t.why.headline
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                            className: "text-lead text-ink-muted max-w-prose",
                            children: t.why.copy
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "lg:col-span-7 divide-y divide-line border-t border-b border-line",
                    children: t.why.items.map((item, i)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(Reveal, {
                            delay: i * 70,
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                        className: "sm:col-span-2 text-xs font-semibold tracking-widest text-ocean-strong",
                                        children: [
                                            "0",
                                            i + 1
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                        className: "sm:col-span-5 text-lg font-semibold text-ink",
                                        children: item.title
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                        className: "sm:col-span-5 text-[15px] leading-relaxed text-ink-muted",
                                        children: item.text
                                    })
                                ]
                            })
                        }, item.title))
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./src/config/site.ts
var site = __webpack_require__(9194);
;// ./src/components/sections/BookDemo.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





const countryCodes = [
    {
        code: "+20",
        label: "EG +20"
    },
    {
        code: "+966",
        label: "SA +966"
    },
    {
        code: "+971",
        label: "AE +971"
    },
    {
        code: "+965",
        label: "KW +965"
    },
    {
        code: "+974",
        label: "QA +974"
    },
    {
        code: "+973",
        label: "BH +973"
    },
    {
        code: "+968",
        label: "OM +968"
    },
    {
        code: "+",
        label: "+"
    }
];
const initialState = {
    fullName: "",
    company: "",
    email: "",
    countryCode: "+20",
    phone: "",
    country: "",
    industry: "",
    fleetSize: "",
    services: [],
    consent: false
};
function BookDemo() {
    const { t } = (0,LanguageProvider/* useLanguage */.o)();
    const [form, setForm] = (0,react.useState)(initialState);
    const [errors, setErrors] = (0,react.useState)({});
    const [status, setStatus] = (0,react.useState)("idle");
    const validate = ()=>{
        const e = {};
        if (!form.fullName.trim()) e.fullName = t.demo.errors.required;
        if (!form.company.trim()) e.company = t.demo.errors.required;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.demo.errors.email;
        const digits = form.phone.replace(/[\s\-()]/g, "");
        if (!/^\d{6,14}$/.test(digits)) e.phone = t.demo.errors.phone;
        if (!form.country) e.country = t.demo.errors.required;
        if (!form.industry) e.industry = t.demo.errors.required;
        if (!form.fleetSize) e.fleetSize = t.demo.errors.required;
        if (form.services.length === 0) e.services = t.demo.errors.services;
        if (!form.consent) e.consent = t.demo.errors.consent;
        return e;
    };
    const toggleService = (service)=>{
        setForm((prev)=>({
                ...prev,
                services: prev.services.includes(service) ? prev.services.filter((s)=>s !== service) : [
                    ...prev.services,
                    service
                ]
            }));
        setErrors((prev)=>{
            const next = {
                ...prev
            };
            delete next.services;
            return next;
        });
    };
    const handleSubmit = async (ev)=>{
        ev.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length > 0) return;
        setStatus("submitting");
        if (site/* siteConfig */.C.demoEndpoint) {
            try {
                const res = await fetch(site/* siteConfig */.C.demoEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });
                if (!res.ok) throw new Error("Request failed");
            } catch (e) {
                setStatus("error");
                return;
            }
        }
        setStatus("success");
    };
    const setField = (key, value)=>{
        setForm((prev)=>({
                ...prev,
                [key]: value
            }));
        setErrors((prev)=>{
            const next = {
                ...prev
            };
            delete next[key];
            return next;
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
        id: "contact",
        className: "section bg-royal text-white",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "container grid items-start gap-12 lg:grid-cols-12",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(Reveal, {
                    className: "lg:col-span-5 space-y-5",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                            className: "text-h2 font-bold text-white",
                            children: t.demo.headline
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                            className: "text-lead text-white/80 max-w-prose",
                            children: t.demo.description
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(Reveal, {
                    delay: 100,
                    className: "lg:col-span-7",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rounded-panel bg-white p-6 sm:p-9 text-ink shadow-lift",
                        children: status === "success" ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            role: "status",
                            className: "py-10 text-center space-y-4",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint/25 text-navy",
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(Icons/* IconCheck */.iW, {
                                        className: "h-7 w-7"
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                    className: "text-h3 font-bold text-ink",
                                    children: t.demo.success.title
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                    className: "mx-auto max-w-md text-base leading-relaxed text-ink-muted",
                                    children: t.demo.success.text
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: "pt-3",
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setForm(initialState);
                                            setErrors({});
                                            setStatus("idle");
                                        },
                                        className: "btn-ghost-dark",
                                        children: t.demo.success.again
                                    })
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                            onSubmit: handleSubmit,
                            noValidate: true,
                            className: "space-y-7",
                            children: [
                                Object.keys(errors).length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                    role: "alert",
                                    className: "rounded-xl bg-[#C2413A]/10 px-4 py-3 text-sm font-medium text-[#C2413A]",
                                    children: t.demo.errors.summary
                                }),
                                status === "error" && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                    role: "alert",
                                    className: "rounded-xl bg-[#C2413A]/10 px-4 py-3 text-sm font-medium text-[#C2413A]",
                                    children: t.demo.errors.network
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("fieldset", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("legend", {
                                            className: "text-xs font-semibold uppercase tracking-wider text-ink-muted",
                                            children: t.demo.contactGroup
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            className: "grid gap-4 sm:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-name",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.fullName
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                            id: "demo-name",
                                                            type: "text",
                                                            autoComplete: "name",
                                                            value: form.fullName,
                                                            onChange: (e)=>setField("fullName", e.target.value),
                                                            "aria-invalid": Boolean(errors.fullName),
                                                            className: "field"
                                                        }),
                                                        errors.fullName && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.fullName
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-company",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.company
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                            id: "demo-company",
                                                            type: "text",
                                                            autoComplete: "organization",
                                                            value: form.company,
                                                            onChange: (e)=>setField("company", e.target.value),
                                                            "aria-invalid": Boolean(errors.company),
                                                            className: "field"
                                                        }),
                                                        errors.company && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.company
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            className: "grid gap-4 sm:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-email",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.email
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                            id: "demo-email",
                                                            type: "email",
                                                            autoComplete: "email",
                                                            dir: "ltr",
                                                            value: form.email,
                                                            onChange: (e)=>setField("email", e.target.value),
                                                            "aria-invalid": Boolean(errors.email),
                                                            className: "field"
                                                        }),
                                                        errors.email && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.email
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-phone",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.phone
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                            className: "flex gap-2",
                                                            dir: "ltr",
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("select", {
                                                                    "aria-label": t.demo.fields.countryCode,
                                                                    value: form.countryCode,
                                                                    onChange: (e)=>setField("countryCode", e.target.value),
                                                                    className: "field !w-28 shrink-0 !px-2.5 text-sm",
                                                                    children: countryCodes.map((c)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                            value: c.code,
                                                                            children: c.label
                                                                        }, c.code))
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                                    id: "demo-phone",
                                                                    type: "tel",
                                                                    autoComplete: "tel-national",
                                                                    value: form.phone,
                                                                    onChange: (e)=>setField("phone", e.target.value),
                                                                    "aria-invalid": Boolean(errors.phone),
                                                                    className: "field"
                                                                })
                                                            ]
                                                        }),
                                                        errors.phone && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.phone
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("fieldset", {
                                    className: "space-y-4 border-t border-line pt-6",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("legend", {
                                            className: "text-xs font-semibold uppercase tracking-wider text-ink-muted",
                                            children: t.demo.businessGroup
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            className: "grid gap-4 sm:grid-cols-3",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-country",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.country
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("select", {
                                                            id: "demo-country",
                                                            value: form.country,
                                                            onChange: (e)=>setField("country", e.target.value),
                                                            "aria-invalid": Boolean(errors.country),
                                                            className: "field",
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                    value: "",
                                                                    children: t.demo.fields.select
                                                                }),
                                                                t.demo.countries.map((c)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                        value: c,
                                                                        children: c
                                                                    }, c))
                                                            ]
                                                        }),
                                                        errors.country && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.country
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-industry",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.industry
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("select", {
                                                            id: "demo-industry",
                                                            value: form.industry,
                                                            onChange: (e)=>setField("industry", e.target.value),
                                                            "aria-invalid": Boolean(errors.industry),
                                                            className: "field",
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                    value: "",
                                                                    children: t.demo.fields.select
                                                                }),
                                                                t.demo.industries.map((ind)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                        value: ind,
                                                                        children: ind
                                                                    }, ind))
                                                            ]
                                                        }),
                                                        errors.industry && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.industry
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                                            htmlFor: "demo-size",
                                                            className: "mb-1.5 block text-sm font-medium text-ink",
                                                            children: t.demo.fields.fleetSize
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("select", {
                                                            id: "demo-size",
                                                            value: form.fleetSize,
                                                            onChange: (e)=>setField("fleetSize", e.target.value),
                                                            "aria-invalid": Boolean(errors.fleetSize),
                                                            className: "field",
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                    value: "",
                                                                    children: t.demo.fields.select
                                                                }),
                                                                t.demo.fleetSizes.map((sz)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("option", {
                                                                        value: sz,
                                                                        children: sz
                                                                    }, sz))
                                                            ]
                                                        }),
                                                        errors.fleetSize && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                            className: "mt-1 text-xs text-[#C2413A]",
                                                            children: errors.fleetSize
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    className: "mb-2 flex items-baseline justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                            className: "text-sm font-medium text-ink",
                                                            children: t.demo.fields.services
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                            className: "text-xs text-ink-muted",
                                                            children: t.demo.fields.servicesHint
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: t.demo.services.map((srv)=>{
                                                        const checked = form.services.includes(srv);
                                                        return /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>toggleService(srv),
                                                            "aria-pressed": checked,
                                                            className: "min-h-[40px] rounded-full border px-4 text-xs font-medium transition-colors ".concat(checked ? "border-ocean bg-ocean-strong text-white" : "border-line bg-offwhite text-ink hover:border-ocean"),
                                                            children: srv
                                                        }, srv);
                                                    })
                                                }),
                                                errors.services && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                    className: "mt-1.5 text-xs text-[#C2413A]",
                                                    children: errors.services
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("label", {
                                            className: "flex items-start gap-3 text-xs leading-relaxed text-ink-muted cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                    type: "checkbox",
                                                    checked: form.consent,
                                                    onChange: (e)=>setField("consent", e.target.checked),
                                                    className: "mt-0.5 h-4 w-4 rounded border-line text-ocean-strong focus:ring-ocean"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                    children: t.demo.fields.consent
                                                })
                                            ]
                                        }),
                                        errors.consent && /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                            className: "mt-1 text-xs text-[#C2413A]",
                                            children: errors.consent
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                                    type: "submit",
                                    disabled: status === "submitting",
                                    className: "btn-primary w-full justify-center disabled:opacity-60",
                                    children: status === "submitting" ? t.demo.sending : t.demo.cta
                                })
                            ]
                        })
                    })
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./src/components/sections/Footer.tsx
var Footer = __webpack_require__(7991);
;// ./src/app/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 










function HomePage() {
    const { t } = (0,LanguageProvider/* useLanguage */.o)();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                href: "#main-content",
                className: "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white",
                children: t.meta.skip
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Navbar/* default */.A, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                id: "main-content",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(Hero, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(Solutions, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(HowItWorks, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(Industries, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(WhyFleetIntel, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(BookDemo, {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Footer/* default */.A, {})
        ]
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [173,592,155,441,517,358], () => (__webpack_exec__(2974)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);