import type { Metadata } from "next";
import Header from "./_components/Header";
import "./index.scss";
import Unit1 from "@/app/pages/roadmap/_components/Unit1";
import Unit5 from "@/app/pages/roadmap/_components/Unit5";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import Unit2 from "@/app/pages/roadmap/_components/Unit2";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

    const descriptions: Record<Locale, string> = {
        en: "Explore the PSTAKE roadmap and our vision for building the intelligence layer connecting AI, Web3, and the future of decentralized economies.",
        cn: "探索 PSTAKE 路线图，了解我们连接 AI、Web3 和去中心化经济未来的智能层愿景。",
        kr: "PSTAKE 로드맵을 살펴보고 AI, Web3 및 분산 경제의 미래를 연결하는 지능 계층 구축 비전을 확인하세요.",
    };

    return generatePageMetadata({
        title: "Roadmap",
        description: descriptions[locale],
        path: "/pages/roadmap",
        locale,
    });
}

const HomePage = () => {
    return (
        <div className="pt-[45px] w-[1356px] mx-auto roadmapPage mobile:w-full mobile:px-[16px] mobile:pt-[15px]">
            <Navbar className="bg-[rgba(22,7,4,0.96)]!"/>
            <Header/>
            {/*<Unit5/>*/}
            <Unit2/>
            <Unit1/>
            <Footer/>
        </div>
    )
}

export default HomePage