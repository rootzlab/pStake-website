import type { Metadata } from "next";
import Header from "./_components/Header";
import "./index.scss";
import Unit1 from "@/app/pages/research/_components/Unit1";
import Unit4 from "@/app/pages/research/_components/Unit4";
import Unit5 from "@/app/pages/research/_components/Unit5";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { DEFAULT_MEDIUM_SOURCE, fetchMediumFeed } from "@/app/utils/medium";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

    const descriptions: Record<Locale, string> = {
        en: "Explore our research on AI-native assets, decentralized AI marketplaces, adaptive consensus, and the future of Web3 intelligence layers.",
        cn: "探索我们关于 AI 原生资产、去中心化 AI 市场、自适应共识以及 Web3 智能层未来的研究。",
        kr: "AI 네이티브 자산, 분산형 AI 마켓플레이스, 적응형 합의 및 Web3 지능 계층의 미래에 대한 연구를 살펴보세요.",
    };

    return generatePageMetadata({
        title: "Research",
        description: descriptions[locale],
        path: "/pages/research",
        locale,
    });
}

const HomePage = async () => {
    const source = DEFAULT_MEDIUM_SOURCE;
    let articles: Awaited<ReturnType<typeof fetchMediumFeed>>["articles"] = [];

    try {
        const feed = await fetchMediumFeed(source, 6);
        articles = feed.articles;
    } catch (error) {
        console.error("Failed to load Medium feed for research page", error);
    }

    return (
        <div className="pt-[45px] w-[1356px] mx-auto homePage mobile:w-full mobile:px-[16px] mobile:pt-[15px]">
            <Navbar className="bg-[rgba(37,68,65,0.96)]!" color="blue" />
            <Header />
            <Unit5 articles={articles} />
            <Unit4 />
            <Unit1 />
            <Footer className="bg-[#254441]!" />
        </div>
    )
}

export default HomePage
