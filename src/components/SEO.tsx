import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    gaId?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = '/og-image.png',
    url = 'https://smart-play.app',
    gaId
}) => {
    const { t } = useTranslation();

    const siteTitle = title ? `${title} | Smart Play` : 'Smart Play - Backing Tracks & Real-time Transposition';
    const metaDescription = description || t('landing.heroSubtitle') || 'Professional backing tracks with real-time pitch and speed control.';
    const metaKeywords = keywords || 'backing tracks, transpose, pitch shift, musician tools, playback, audio player';

    return (
        <Helmet>
            {/* Google Analytics */}
            {gaId && (
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            )}
            {gaId && (
                <script>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gaId}');
                    `}
                </script>
            )}

            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
