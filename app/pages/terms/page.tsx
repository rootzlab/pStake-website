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
        en: "Read PSTAKE's terms of service to understand the rules and guidelines for using our platform and services.",
        cn: "阅读 PSTAKE 的服务条款，了解使用我们平台和服务的规则与指南。",
        kr: "PSTAKE의 서비스 약관을 읽고 플랫폼 및 서비스 이용 규칙과 가이드라인을 확인하세요.",
    };

    return generatePageMetadata({
        title: "Terms",
        description: descriptions[locale],
        path: "/pages/terms",
        locale,
    });
}

const termsPage = () => {
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

export default termsPage

