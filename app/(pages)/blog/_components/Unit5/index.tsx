"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { MediumArticle, resolveArticleUrl } from "@/app/utils/medium";
import { formatArticleDate } from "@/app/utils/articleDate";
import { useLocale } from 'next-intl';
import { blogContent } from '@/app/content/blog';
import type { Locale } from '@/i18n';

interface Props {
    articles: MediumArticle[];
}

const renderMeta = (
    dateLabel: string,
    readTime: string | null,
    dateAlt: string,
    readAlt: string,
    {
        className = "",
        compact,
    }: {
        className?: string;
        compact?: boolean;
    } = {}
) => {
    if (!dateLabel && !readTime) return null;
    const baseClass = "flex gap-x-[15px] items-center";
    return (
        <div className={`${baseClass} ${className}`.trim()}>
            {dateLabel ? (
                <div className="flex">
                    <img src="/img/icon3.svg" className={`size-[15px] ${compact ? "mobile:size-[12px]" : ""}`.trim()} alt={dateAlt} />
                    <div className="text-[#160704] font-medium ml-[9px] opacity-60">{dateLabel}</div>
                </div>
            ) : null}
            {dateLabel && readTime ? (
                <svg className="size-[3px]" xmlns="" width="3" height="3" viewBox="0 0 3 3" fill="none">
                    <circle opacity="0.6" cx="1.5" cy="1.5" r="1.5" fill="#160704" />
                </svg>
            ) : null}
            {readTime ? (
                <div className="flex items-center ml-[28px]">
                    <img src="/img/icon19.svg" className={`size-[11px] ${compact ? "mobile:size-[10px]" : ""}`.trim()} alt={readAlt} />
                    <div className="text-[#160704] font-medium ml-[9px] opacity-60">{readTime}</div>
                </div>
            ) : null}
        </div>
    );
};

const Unit5 = ({ articles }: Props) => {
    const featuredRef = useGsapImmediate({ delay: 0.2, duration: 0.8 });
    const gridTopRef = useGsapEntrance({ delay: 0.12, start: "top 85%" });
    const locale = useLocale() as Locale;
    const content = blogContent[locale] ?? blogContent.en;

    if (!articles.length)
        return (
            <div className="pt-[60px] px-[114px] pb-[40px] mobile:px-[16px]">
                <div className="text-[24px] font-medium">{content.emptyState.title}</div>
                <div className="mt-[8px] text-[14px] opacity-70">{content.emptyState.subtitle}</div>
            </div>
        );

    const articleMeta = content.articles;
    const featuredArticles = articles.slice(0, 2);
    const gridArticles = articles.slice(2); // 移除上限，显示所有剩余文章

    const renderFeaturedCard = (article: MediumArticle) => {
        const dateLabel = formatArticleDate(article.pubDate, locale);
        const href = resolveArticleUrl(article);
        return (
            <a
                key={article.guid}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile:w-full block w-[533px]"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="p-[12px] border-[#DCDAD9] border-[1px] border-solid rounded-[12px] mobile:p-[10px]">
                    {article.coverImage ? (
                        <img src={article.coverImage} className="bg-[#727272] w-full h-[304px] mobile:h-auto rounded-[12px] object-cover" alt={article.title} />
                    ) : (
                        <div className="size-full bg-[#727272]"></div>
                        // <div className="w-[533px] h-[304px] mobile:w-full mobile:h-auto rounded-[12px] skeleton-loading"></div>
                    )}
                </div>
                <div className="line-clamp-2 relative items-center flex mt-[20px] mobile:mt-[16px]">
                    <div className="text-[21px] pl-[12px] leading-[144%] font-medium tracking-[-0.3px] mobile:text-[18px] mobile:pl-[10px]">
                        {article.title}
                    </div>
                </div>
                {renderMeta(dateLabel, null, articleMeta.dateAlt, articleMeta.readAlt, {
                    className: "pl-[12px] mt-[28px] text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:pl-[10px] mobile:mt-[12px]",
                    compact: false,
                })}
            </a>
        );
    };

    const renderGridCard = (article: MediumArticle) => {
        const dateLabel = formatArticleDate(article.pubDate, locale);
        const href = resolveArticleUrl(article);
        return (
            <a
                key={article.guid}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="rounded-[12px] bg-[#727272]">
                    {article.coverImage ? (
                        <img
                            src={article.coverImage}
                            className="w-full h-[190px] object-cover rounded-[12px] mobile:h-[220px]"
                        />
                    ) : (
                        <div className="size-full "></div>
                    )}
                </div>
                <div className="relative items-center flex mt-[38px] mobile:mt-[16px]">
                    <div className="line-clamp-2 text-[21px] leading-[141%] font-medium tracking-[-0.36px] mobile:text-[16px] mobile:pl-[10px] text-[#254441]">
                        {article.title}
                    </div>
                </div>
                {renderMeta(dateLabel, null, articleMeta.dateAlt, articleMeta.readAlt, { className: "mt-[26px] text-[12px] tracking-[0.72px] mobile:pl-[10px] mobile:mt-[12px] mobile:text-[11px]", compact: true })}
            </a>
        );
    };

    return (
        <div className="gap-y-[96px] flex flex-col border-b border-solid border-[rgba(22,7,4,0.12)] pb-[189px] mb-[70px] mobile:pb-[70px] mobile:gap-y-[39px]">
            {featuredArticles.length ? (
                <div ref={featuredRef} className="px-[99px] pb-[23px] mobile:px-0 flex justify-center gap-x-[44px] mobile:flex-col mobile:items-center mobile:gap-[39px] gap-[44px]">
                    {featuredArticles.map(renderFeaturedCard)}
                </div>
            ) : null}

            {gridArticles.length ? (
                <div ref={gridTopRef} className="px-[114px] mobile:px-0 grid grid-cols-3 mobile:grid-cols-1 gap-x-[51px] gap-y-[95px] mobile:gap-y-[39px]">
                    {gridArticles.map(renderGridCard)}
                </div>
            ) : null}
        </div>
    );
};

export default Unit5;
