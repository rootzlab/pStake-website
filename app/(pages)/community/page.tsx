import type { Metadata } from "next";
import Header from "./_components/Header";
import "./index.scss";
import Unit1 from "@/app/(pages)/community/_components/Unit1";
import Unit2 from "@/app/(pages)/community/_components/Unit2";
import Unit6 from "@/app/(pages)/community/_components/Unit6";
import Unit7 from "@/app/(pages)/community/_components/Unit7";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

    const descriptions: Record<Locale, string> = {
        en: "Join the PSTAKE community at the intersection of AI and Web3. Contribute to experiments, ship pilots, and help build the future of decentralized intelligence.",
        cn: "加入 PSTAKE 社区，在 AI 与 Web3 的交汇处并肩前行。贡献实验、交付试点项目，共建去中心化智能的未来。",
        kr: "AI와 Web3의 교차점에서 PSTAKE 커뮤니티에 참여하세요. 실험을 기여하고 파일럿을 출시하며 분산 지능의 미래를 함께 구축하세요.",
    };

    return generatePageMetadata({
        title: "Community",
        description: descriptions[locale],
        path: "/community",
        locale,
    });
}

const HomePage = () => {


    return (
        <div className="pt-[45px] w-[1356px] mx-auto communityPage mobile:w-full mobile:px-[16px] mobile:pt-[15px]">
            <Navbar className="bg-[rgba(22,7,4,0.96)]!" />
            <Header/>
            <Unit1/>
            <Unit7/>
            <Unit2/>
            <Unit6/>
            <Footer/>
        </div>
    )
}

export default HomePage