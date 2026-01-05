'use client';

import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (command: string, ...args: unknown[]) => void;
    }
}

// Zawsze aktualizuj tę datę po zmianach w treści polityki prywatności
const POLICY_VERSION = '2026-01-05';

const logConsent = (cookie: { categories: string[]; consentId: string }) => {
    try {
        const URL = 'https://script.google.com/macros/s/AKfycbyrnJUqxRQzZWBddD9bT6NR6nXchJQwsEooJUmt4Vjmk8_gSnY6LufQyn8z3C9uZQ37/exec';
        fetch(URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                site: window.location.hostname,
                consentId: cookie.consentId,
                accepted: cookie.categories,
                userAgent: navigator.userAgent,
                policyVersion: POLICY_VERSION
            })
        });
    } catch (e) {
        console.error('Consent logging failed', e);
    }
};

const updateGtagConsent = (categories: string[]) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        const hasAnalytics = categories.includes('analytics');
        const hasAdvertising = categories.includes('advertising');

        const consentState = {
            ad_storage: hasAdvertising ? 'granted' : 'denied',
            ad_user_data: hasAdvertising ? 'granted' : 'denied',
            ad_personalization: hasAdvertising ? 'granted' : 'denied',
            analytics_storage: hasAnalytics ? 'granted' : 'denied',
            personalization_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
        };

        window.gtag('consent', 'update', consentState);
    }
};

export const initCookieConsent = () => {
    if (typeof window === 'undefined') return;

    if (!window.dataLayer) window.dataLayer = [];
    if (!window.gtag) {
        window.gtag = function (...args: unknown[]) {
            window.dataLayer.push(args);
        };
    }

    CookieConsent.run({
        revision: 1,
        guiOptions: {
            consentModal: {
                layout: "box",
                position: "bottom left",
                equalWeightButtons: true,
                flipButtons: false
            },
            preferencesModal: {
                layout: "box",
                position: "right",
                equalWeightButtons: true,
                flipButtons: false
            }
        },

        categories: {
            necessary: { readOnly: true, enabled: true },
            analytics: {
                autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }] }
            },
            advertising: {
                autoClear: { cookies: [{ name: /^_gcl/ }, { name: /^__gads/ }] }
            }
        },

        language: {
            default: 'pl',
            autoDetect: 'browser',
            translations: {
                pl: {
                    consentModal: {
                        title: 'Szanujemy Twoją prywatność',
                        description: 'Używamy plików cookies, aby zapewnić poprawne działanie strony, analizować ruch oraz dostarczać spersonalizowane treści. Klikając „Akceptuj wszystko”, wyrażasz zgodę na użycie wszystkich plików cookies. Możesz również dostosować swoje wybory.',
                        acceptAllBtn: 'Akceptuj wszystko',
                        acceptNecessaryBtn: 'Tylko niezbędne',
                        showPreferencesBtn: 'Ustawienia',
                        footer: '<a href="/polityka-prywatnosci">Polityka prywatności</a>'
                    },
                    preferencesModal: {
                        title: 'Ustawienia prywatności',
                        acceptAllBtn: 'Akceptuj wszystko',
                        acceptNecessaryBtn: 'Tylko niezbędne',
                        savePreferencesBtn: 'Zapisz ustawienia',
                        closeIconLabel: 'Zamknij',
                        sections: [
                            {
                                title: 'Niezbędne pliki cookies',
                                description: 'Te pliki są wymagane do działania strony.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Analityka',
                                description: 'Pomagają nam zrozumieć, jak korzystasz ze strony.',
                                linkedCategory: 'analytics'
                            },
                            {
                                title: 'Reklama',
                                description: 'Służą do personalizacji reklam.',
                                linkedCategory: 'advertising'
                            }
                        ]
                    }
                },
                en: {
                    consentModal: {
                        title: 'We respect your privacy',
                        description: 'We use cookies to ensure the proper functioning of the site, analyze traffic and provide personalized content. By clicking "Accept all", you agree to the use of all cookies. You can also customize your choices.',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        showPreferencesBtn: 'Manage preferences',
                        footer: '<a href="/polityka-prywatnosci">Privacy Policy</a>'
                    },
                    preferencesModal: {
                        title: 'Privacy Preferences',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        savePreferencesBtn: 'Save preferences',
                        closeIconLabel: 'Close',
                        sections: [
                            {
                                title: 'Strictly Necessary Cookies',
                                description: 'These cookies are essential for the proper functioning of the website.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Analytics',
                                description: 'Cookies used for analytics.',
                                linkedCategory: 'analytics'
                            },
                            {
                                title: 'Advertising',
                                description: 'Cookies used for advertising.',
                                linkedCategory: 'advertising'
                            }
                        ]
                    }
                }
            }
        },

        onFirstConsent: ({ cookie }) => {
            updateGtagConsent(cookie.categories);
            logConsent(cookie);
        },
        onConsent: ({ cookie }) => {
            updateGtagConsent(cookie.categories);
        },
        onChange: ({ cookie }) => {
            updateGtagConsent(cookie.categories);
            logConsent(cookie);
        }
    });
};
