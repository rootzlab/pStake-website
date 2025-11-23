import type { Metadata } from "next";
import Header from "./_components/Header";
import "./index.scss";
import Unit1 from "@/app/(pages)/blog/_components/Unit1";
import Unit5 from "@/app/(pages)/blog/_components/Unit5";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { DEFAULT_MEDIUM_SOURCE } from "@/app/utils/medium";
import type { MediumArticle } from "@/app/utils/medium";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";
import { fetchMediumWithFallback } from "@/app/api/medium/fetchLogic";

// 强制动态渲染以绕过缓存问题
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

    const descriptions: Record<Locale, string> = {
        en: "Explore PSTAKE Research insights, articles, and updates on Web3, AI, and decentralized technologies.",
        cn: "探索 PSTAKE Research 关于 Web3、AI 和去中心化技术的洞察、文章与更新。",
        kr: "PSTAKE Research의 Web3, AI 및 분산 기술에 대한 인사이트, 기사 및 업데이트를 확인하세요.",
    };

    return generatePageMetadata({
        title: "Blog",
        description: descriptions[locale],
        path: "/blog",
        locale,
    });
}

const HomePage = async () => {
    const source = DEFAULT_MEDIUM_SOURCE;
    let articles: MediumArticle[] = [];

    try {
        // 直接调用共享逻辑，避免服务端 HTTP 自调用
        console.log('========== BLOG PAGE FETCH START ==========');
        console.log('[Blog Page] Source:', source);
        console.log('[Blog Page] Fetching directly via fetchMediumWithFallback');

        const payload = await fetchMediumWithFallback(source, 30);
        articles = payload.articles;

        // 🔍 数据接收后日志
        console.log('========== BLOG PAGE DATA ==========');
        console.log('[Blog Page] Data source:', payload.dataSource);
        console.log('[Blog Page] Articles count:', articles.length);
        console.log('[Blog Page] Article titles:', articles.map((a: any) => a.title.substring(0, 40)));
        console.log('====================================\n');
    } catch (error) {
        console.error("[Blog Page] Failed to load Medium feed:", error);
        console.error("[Blog Page] Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    }

    return (
        <div className="pt-[45px] w-[1356px] mx-auto homePage mobile:w-full mobile:px-[16px] mobile:pt-[15px]">
            <Navbar className="bg-[rgba(37,68,65,0.96)]!" color="blue"/>
            <Header/>
            <Unit5 articles={articles}/>
            <Unit1/>
            <Footer className="bg-[#254441]!"/>
        </div>
    )
}

export default HomePage
