'use client';

import { useEffect } from 'react';
import { initCookieConsent } from '../utils/cookieConsentConfig';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export default function CookieConsentBanner() {
    useEffect(() => {
        initCookieConsent();
    }, []);

    return null;
}
