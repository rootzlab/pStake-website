"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { MediumArticle, resolveArticleUrl } from "@/app/utils/medium";
import { formatArticleDate } from "@/app/utils/articleDate";
import { useLocale } from 'next-intl';
import { homeContent } from '@/app/content/home';
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
    }: {
        className?: string;
    } = {}
) => {
    if (!dateLabel && !readTime) return null;
    return (
        <div className={`flex gap-x-[15px] items-center ${className}`.trim()}>
            {dateLabel ? (
                <div className="flex">
                    <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt={dateAlt} />
                    <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                        {dateLabel}
                    </div>
                </div>
            ) : null}
            {dateLabel && readTime ? (
                <svg className="size-[3px]" xmlns="" width="3" height="3" viewBox="0 0 3 3" fill="none">
                    <circle opacity="0.6" cx="1.5" cy="1.5" r="1.5" fill="#160704" />
                </svg>
            ) : null}
            {readTime ? (
                <div className="flex items-center">
                    <img src="/img/icon19.svg" className="size-[11px] mobile:size-[9px]" alt={readAlt} />
                    <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                        {readTime}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const Unit5 = ({ articles }: Props) => {
    const headingRef = useGsapEntrance();
    const cardsRef = useGsapEntrance({ delay: 0.15, start: "top 80%" });
    const locale = useLocale() as Locale;
    const content = homeContent[locale] ?? homeContent.en;
    const unit5 = content.unit5;
    const articleMeta = content.articles;

    const displayedArticles = articles.slice(0, 3);

    const renderCard = (article: MediumArticle) => {
        const date = formatArticleDate(article.pubDate, locale);
        const href = resolveArticleUrl(article);
        return (
            <a
                key={article.guid}
                href={href}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="p-[12px] border-[#DCDAD9] border-[1px] border-solid rounded-[12px] mobile:p-[8px]">
                    {article.coverImage ? (
                        <div className="w-full h-[192px] mobile:h-[220px] rounded-[12px] overflow-hidden">
                            <img
                                src={article.coverImage}
                                className="w-full h-full object-cover"
                                alt={article.title}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-[192px] mobile:h-[220px] rounded-[12px] bg-[#254441]/10 flex items-center justify-center text-[#254441]/60 text-[14px]">
                            {articleMeta.noCover}
                        </div>
                    )}
                </div>
                <div className="relative items-center flex mt-[22px] mobile:h-auto mobile:mt-[20px]">
                    <div className="line-clamp-2 text-[21px] pl-[12px] leading-[144%] font-medium tracking-[-0.4px] mobile:text-[16px] mobile:pl-[8px] mobile:tracking-[-0.28px]">
                        {article.title}
                    </div>
                </div>
                {renderMeta(date, null, articleMeta.dateAlt, articleMeta.readAlt, {
                    className: "pl-[12px] mt-[25px] mobile:pl-[8px] mobile:mt-[20px]",
                })}
            </a>
        );
    };

    const renderFallback = () => (
        <div className="w-full text-center py-[60px] text-[18px] text-[#160704] opacity-60">
            {articleMeta.emptyState}
        </div>
    );

    return (
        <div className="pt-[104px] px-[114px]  border-b-[1px] border-solid border-[rgba(22,7,4,0.12)] pb-[122px] mobile:pt-[40px] mobile:px-[16px] mobile:pb-[40px]">
            <div ref={headingRef} className="flex justify-between mobile:flex-col mobile:gap-y-[24px]">
                <div className="h-[125px] relative flex items-center mobile:h-auto">
                    <div className="text-[60px] font-medium leading-[114%] text-[#FE3D11] tracking-[-1px] mobile:text-[32px] mobile:leading-[38px] mobile:tracking-[-0.64px]">
                        <span className="text-[#160704]">{unit5.titlePrefix}</span>
                        <br />
                        {unit5.titleHighlight}
                    </div>
                </div>
                <div className="w-[426px] h-[120px] flex flex-col justify-between mr-[130px] tracking-[0.78px] mobile:w-full mobile:h-auto mobile:mr-0 mobile:gap-y-[16px]">
                    <div className="text-[18px] text-[#160704] tracking-[-0.36px] [leading-trim:both] leading-[144%] mobile:text-[14px] mobile:tracking-[-0.24px]">
                        {unit5.description}
                    </div>
                    <a href="/pages/research" target="_blank" className="flex group w-max">
                        <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt="" />
                        <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] text-[12px] mobile:text-[11px] mobile:ml-[6px]">
                            {unit5.featuredLabel}
                        </div>
                    </a>
                </div>
            </div>
            {displayedArticles.length ? (
                <div ref={cardsRef} className="flex justify-between mt-[61px] mobile:flex-col mobile:mt-[24px] gap-[15px] mobile:gap-[39px]">
                    {displayedArticles.map(renderCard)}
                </div>
            ) : (
                <div ref={cardsRef} className="mt-[61px] mobile:mt-[24px]">
                    {renderFallback()}
                </div>
            )}
        </div>
    );
};

export default Unit5;
