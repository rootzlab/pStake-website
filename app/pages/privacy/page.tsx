import type { Metadata } from "next";
import Header from "./_components/Header";
import Content from "./_components/Content";
import Unit1 from "./_components/Unit1";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

    const descriptions: Record<Locale, string> = {
        en: "Read PSTAKE's privacy policy to understand how we collect, use, and protect your personal information.",
        cn: "阅读 PSTAKE 的隐私政策，了解我们如何收集、使用和保护您的个人信息。",
        kr: "PSTAKE의 개인정보 보호정책을 읽고 개인정보 수집, 사용 및 보호 방법을 확인하세요.",
    };

    return generatePageMetadata({
        title: "Privacy",
        description: descriptions[locale],
        path: "/pages/privacy",
        locale,
    });
}

const PrivacyPage = () => {
    return (
        <div className="pt-[45px] w-[1356px] mx-auto privacyPage mobile:w-full mobile:px-[16px] mobile:pt-[15px]">
            <Navbar className="bg-[rgba(22,7,4,0.96)]!"/>
            <Header/>
            <Content/>
            <Unit1/>
            <Footer/>
        </div>
    )
}

export default PrivacyPage

