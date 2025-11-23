import type { Metadata } from "next";
import Header from "./_components/Header";
import "./index.scss";
import Unit1 from "@/app/(pages)/home/_components/Unit1";
import Unit2 from "@/app/(pages)/home/_components/Unit2";
import Unit3 from "@/app/(pages)/home/_components/Unit3";
import Unit4 from "@/app/(pages)/home/_components/Unit4";
import Unit5 from "@/app/(pages)/home/_components/Unit5";
import Unit6 from "@/app/(pages)/home/_components/Unit6";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { DEFAULT_MEDIUM_SOURCE, fetchMediumFeed } from "@/app/utils/medium";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

    const descriptions: Record<Locale, string> = {
        en: "PSTAKE Research explores the intelligence layer for Web3 & AI collaboration with autonomous action, modular assets, and cross-chain interoperability.",
        cn: "PSTAKE Research 探索 Web3 与 AI 协作的智能层，拥有自主行动、模块化资产与跨链互操作性。",
        kr: "PSTAKE Research는 자율 실행, 모듈형 자산, 체인 간 상호운용성을 갖춘 Web3와 AI 협업을 위한 지능 계층을 탐구합니다.",
    };

    return generatePageMetadata({
        title: "Home",
        description: descriptions[locale],
        path: "/home",
        locale,
    });
}

const HomePage = async () => {
    const source = DEFAULT_MEDIUM_SOURCE;
    let articles: Awaited<ReturnType<typeof fetchMediumFeed>>["articles"] = [];

    try {
        const feed = await fetchMediumFeed(source, 3);
        articles = feed.articles;
    } catch (error) {
        console.error("Failed to load Medium feed for home page", error);
    }

    return (
        <div className="pt-[45px] w-[1356px] mx-auto homePage mobile:w-full mobile:px-[16px] mobile:pt-[15px]">
            <Navbar className="bg-[rgba(22,7,4,0.94)]!" />
            <Header/>
            <Unit1/>
            <Unit2/>
            <Unit3/>
            <Unit4/>
            <Unit5 articles={articles}/>
            <Unit6/>
            <Footer/>
        </div>
    )
}

export default HomePage
