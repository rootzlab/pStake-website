"use client"
import { useState, useEffect } from "react";
import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales, type Locale } from '../../../i18n';

// 这些将在组件内部使用翻译函数动态生成

const CTA_LINKS = {
    research: "https://pstake.finance/research",
    token: "https://coinmarketcap.com/currencies/pstake-finance"
};

const DESKTOP_LINK_CLASS = "text-[14px] font-medium cursor-pointer hover:text-[#FF4C33] text-[#F7F7F7]/80 leading-[1.4em] whitespace-nowrap transition-colors";
const MOBILE_LINK_CLASS = "mobile:text-[16px] mobile:text-[#F7F7F7]/80 mobile:font-medium mobile:cursor-pointer mobile:py-[8px] mobile:transition-colors mobile:duration-200 hover:mobile:text-[#FF4C33]";

const Navbar = ({ color = "red", className = "" }) => {
    const t = useTranslations();
    const locale = useLocale() as Locale;
    const router = useRouter();
    
    const [isSticky, setIsSticky] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
    const desktopNavRef = useGsapImmediate({ delay: 0.2, duration: 0.8, disableY: true });
    
    // 切换语言 - 使用cookie存储
    const switchLocale = (newLocale: Locale) => {
        // 设置cookie，next-intl默认使用NEXT_LOCALE作为cookie名称
        const doc = document;
        // eslint-disable-next-line react-hooks/immutability
        doc.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`; // 1年有效期
        // 刷新页面以应用新语言
        window.location.reload();
        closeMobileMenu();
    };
    
    // 构建导航链接数据
    const NAV_LINKS = {
        ai: [
            {
                label: t('nav.innovationFund'),
                href: "https://blog.pstake.finance/2025/08/07/pstake-foundation-opens-applications-for-50m-ai-web3-innovation-fund/"
            },
            { label: t('nav.research'), href: "https://pstake.finance/research" },
            { label: t('nav.blog'), href: "/blog" }
        ],
        governance: [
            { label: t('nav.governanceForum'), href: "https://forum.pstake.finance/" },
            { label: t('nav.governanceProcess'), href: "https://blog.pstake.finance/2022/03/24/introducing-pstake-community-governance/" },
            { label: t('nav.snapshotVoting'), href: "https://snapshot.box/#/s:pstakefinance.eth" }
        ]
    };

    const COMMUNITY_COLUMNS = [
        {
            title: t('nav.community'),
            links: [
                { label: t('nav.communityHub'), href: "https://pstake.finance/community" },
                { label: t('nav.roadmap'), href: "https://pstake.finance/roadmap" },
                { label: t('nav.securityAudit'), href: "https://github.com/persistenceOne/pStake-auditReports?lang=en" }
            ]
        },
        {
            title: t('footer.learn'),
            links: [
                { label: t('nav.bitcoinLiquidStaking'), href: "https://blog.pstake.finance/category/bitcoin-liquid-staking/?lang=en" },
                { label: t('nav.bitcoin101'), href: "https://blog.pstake.finance/category/bitcoin-101/?lang=en" },
                { label: t('nav.guides'), href: "https://blog.pstake.finance/category/guides/?lang=en" }
            ],
            withDivider: true
        }
    ];

    const PRODUCT_COLUMNS = [
        {
            title: t('nav.bridge'),
            links: [
                { label: t('nav.ethToBaseBridge'), href: "https://superbridge.app/base?lang=en" },
                { label: t('nav.ethToCosmosBridge'), href: "https://bridge.persistence.one/?lang=en" },
                { label: t('nav.ethToBnbBridge'), href: "https://cbridge.celer.network/56/1/PSTAKE?lang=en" },
                { label: t('nav.ethToOptimismBridge'), href: "https://superbridge.app/optimism?lang=en" }
            ]
        },
        {
            title: t('nav.staking'),
            links: [
                { label: t('nav.liquidStaking'), href: "https://app.btc.pstake.finance/?lang=en" },
                { label: t('nav.pstakeStaking'), href: "https://app.btc.pstake.finance/pstake/staking?lang=en" },
                { label: t('nav.institutionalStaking'), href: "https://pstake.finance/institutional?lang=en" }
            ],
            withDivider: true
        }
    ];
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setExpandedMobileMenu(null);
    };
    const handleMobileLinkClick = () => closeMobileMenu();
    const handleMobileMenuToggle = () => {
        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            setMobileMenuOpen(true);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.removeProperty("overflow");
        }

        return () => {
            document.body.style.removeProperty("overflow");
        };
    }, [mobileMenuOpen]);

    return (
        <nav ref={desktopNavRef} className={`sticky flex justify-center top-[10px] left-0 z-50 mobile:top-0`}>
            {/* 桌面端导航栏 */}
            <div
                className={`mt-[9px] px-[36px] w-[1200px] py-[17px] rounded-[9px] flex justify-between items-center absolute top-0 left-1/2 -translate-x-1/2 mobile:hidden bg-[rgba(22,7,4,0.96)]
          ${isSticky ? "backdrop-blur-2xl" : ""}
          ${className}
        `}
            >
                {/* 左侧 Logo */}
                <Link href="/" aria-label="Home" className="inline-block">
                    <img className="w-[160px]" src="/img/icon1.svg" alt="PSTAKE Logo" />
                </Link>

                {/* 中间导航 */}
                <div className="flex gap-x-[48px] text-[#F7F7F7] text-[15px] font-medium">
                    {/* AI 下拉菜单 */}
                    <div className="relative group py-[16px] cursor-pointer">
                        <div>{t('nav.ai')}</div>
                        <div className="min-w-[180px] py-[15px] px-[18px] hidden group-hover:flex flex-col gap-y-[15px] absolute top-full left-1/2 -translate-x-1/2 rounded-[9px] bg-[rgba(22,7,4,0.95)] backdrop-blur-2xl border border-[rgba(247,247,247,0.08)]">
                            {NAV_LINKS.ai.map(({ label, href }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={DESKTOP_LINK_CLASS}>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Governance 下拉菜单 */}
                    <div className="relative group py-[16px] cursor-pointer">
                        <div>{t('nav.governance')}</div>
                        <div className="min-w-[200px] py-[15px] px-[18px] hidden group-hover:flex flex-col gap-y-[15px] absolute top-full left-1/2 -translate-x-1/2 rounded-[9px] bg-[rgba(22,7,4,0.95)] backdrop-blur-2xl border border-[rgba(247,247,247,0.08)]">
                            {NAV_LINKS.governance.map(({ label, href }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={DESKTOP_LINK_CLASS}>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Community 双栏下拉菜单 */}
                    <div className="relative group py-[16px] cursor-pointer">
                        <div>{t('nav.community')}</div>
                        <div className="min-w-[420px] py-[18px] px-[20px] hidden group-hover:grid grid-cols-2 gap-x-[24px] absolute top-full left-1/2 -translate-x-1/2 rounded-[9px] bg-[rgba(22,7,4,0.95)] backdrop-blur-2xl border border-[rgba(247,247,247,0.08)]">
                            {COMMUNITY_COLUMNS.map(({ title, links, withDivider }) => (
                                <div key={title} className={`flex flex-col gap-y-[15px] ${withDivider ? "border-l border-[rgba(247,247,247,0.08)] pl-[24px]" : ""}`}>
                                    <div className="text-[13px] font-semibold text-[#F7F7F7]/50 leading-[1.4em] mb-[3px] uppercase tracking-wide">
                                        {title}
                                    </div>
                                    {links.map(({ label, href }) => (
                                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={DESKTOP_LINK_CLASS}>
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product 双栏下拉菜单 */}
                    <div className="relative group py-[16px] cursor-pointer">
                        <div>{t('nav.product')}</div>
                        <div className="min-w-[450px] py-[18px] px-[20px] hidden group-hover:grid grid-cols-2 gap-x-[24px] absolute top-full left-1/2 -translate-x-1/2 rounded-[9px] bg-[rgba(22,7,4,0.95)] backdrop-blur-2xl border border-[rgba(247,247,247,0.08)]">
                            {PRODUCT_COLUMNS.map(({ title, links, withDivider }) => (
                                <div key={title} className={`flex flex-col gap-y-[15px] ${withDivider ? "border-l border-[rgba(247,247,247,0.08)] pl-[24px]" : ""}`}>
                                    <div className="text-[13px] font-semibold text-[#F7F7F7]/50 leading-[1.4em] mb-[3px] uppercase tracking-wide">
                                        {title}
                                    </div>
                                    {links.map(({ label, href }) => (
                                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={DESKTOP_LINK_CLASS}>
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 右侧按钮 */}
                <div className="flex gap-x-[12px] items-center">
                    <a
                        href={CTA_LINKS.research}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group pt-[3px] h-[42px] cursor-pointer w-[107px] justify-center flex items-center rounded-[9px] border-[rgba(247,247,247,0.12)] border-solid border backdrop-blur-[9px] bg-[rgba(247,247,247,0.03)] transition-all duration-200 hover:bg-[rgba(247,247,247,0.08)] hover:border-[rgba(247,247,247,0.18)] hover:scale-[1.02] [box-shadow:0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)]"
                    >
                        <div className="text-[15px] text-[#F7F7F7] opacity-70 font-medium leading-[1] transition-colors group-hover:opacity-90">
                            {t('nav.research')}
                        </div>
                    </a>

                    <a
                        href={CTA_LINKS.token}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group pt-[3px] h-[42px] cursor-pointer w-[107px] justify-center flex items-center rounded-[9px] bg-[#F7F7F7] transition-all duration-200 hover:bg-[#FFFFFF] hover:scale-[1.02] [box-shadow:0_-0.6px_0.9px_0_rgba(254,47,0,0.12)_inset,0_0.6px_1.2px_0_rgba(254,47,0,0.12)] hover:[box-shadow:0_-0.6px_0.9px_0_rgba(254,47,0,0.18)_inset,0_0.6px_1.2px_0_rgba(254,47,0,0.18)]"
                    >
                        <div className={`text-[15px] text-[#FF4C33] opacity-70 font-semibold leading-[1] transition-colors group-hover:opacity-90 ${color === "blue" && "text-[#43AA8B]!"}`}>
                            $PSTAKE
                        </div>
                    </a>

                    {/* 语言切换 */}
                    <div className="relative group py-[18px] cursor-pointer">
                        <img className="size-[18px] ml-[24px]" src="/img/icon2.svg" alt="" />
                        <div className="w-[66px] py-[15px] hidden group-hover:flex flex-col gap-y-[18px] absolute top-full rounded-[9px] bg-[#F7F7F7]">
                            {locales.map((loc) => (
                                <div
                                    key={loc}
                                    onClick={() => switchLocale(loc)}
                                    className={`text-[15px] font-medium cursor-pointer hover:text-[#160704] leading-[1em] text-center transition-colors ${
                                        locale === loc ? 'text-[#160704]' : 'text-[#160704]/60'
                                    }`}
                                >
                                    {loc.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 移动端导航栏 */}
            <div className="hidden mobile:flex mobile:fixed mobile:top-0 mobile:left-0 mobile:right-0 mobile:h-[56px] mobile:px-[20px] mobile:items-center mobile:justify-between mobile:bg-[#000000]/96 mobile:backdrop-blur-2xl mobile:z-50">
                {/* Logo */}
                <Link href="/" aria-label="Home" className="inline-block">
                    <img className="mobile:w-[120px]" src="/img/icon1.svg" alt="PSTAKE Logo" />
                </Link>

                {/* 汉堡菜单图标 */}
                <button
                    onClick={handleMobileMenuToggle}
                    className="mobile:w-[44px] mobile:h-[44px] mobile:flex mobile:items-center mobile:justify-center mobile:cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {mobileMenuOpen ? (
                            // X 图标
                            <>
                                <path d="M18 6L6 18" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                                <path d="M6 6L18 18" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                            </>
                        ) : (
                            // 汉堡图标
                            <>
                                <path d="M3 12H21" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 6H21" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 18H21" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* 移动端全屏导航菜单 */}
            <div
                className={`navbar-mobile-overlay fixed inset-0 z-40 flex items-center justify-center bg-[#000000]/90 backdrop-blur-2xl transition-opacity duration-300 ${
                    mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!mobileMenuOpen}
            >
                {/* 关闭按钮 - 右上角固定 */}
                <button
                    onClick={closeMobileMenu}
                    className="mobile:absolute mobile:top-[20px] mobile:right-[20px] mobile:w-[44px] mobile:h-[44px] mobile:flex mobile:items-center mobile:justify-center mobile:cursor-pointer mobile:z-10"
                    aria-label="Close menu"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 6L18 18" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* 内容容器 - 靠上对齐可滚动 */}
                <div className="mobile:flex mobile:flex-col mobile:items-center mobile:justify-start mobile:overflow-y-auto mobile:pt-[80px] mobile:pb-[40px] mobile:gap-y-[40px] mobile:px-[40px] mobile:w-full mobile:max-w-[90%] mobile:max-h-screen">
                    {/* 导航项 - 手风琴式 */}
                    <div className="mobile:flex mobile:flex-col mobile:w-full mobile:gap-y-[8px]">
                        {/* AI 手风琴 */}
                        <div className="mobile:w-full">
                            <div
                                onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'AI' ? null : 'AI')}
                                className="mobile:flex mobile:items-center mobile:justify-between mobile:text-[22px] mobile:text-[#F7F7F7] mobile:font-medium mobile:cursor-pointer mobile:py-[16px] mobile:px-[20px] mobile:rounded-[9px] mobile:transition-all mobile:duration-200 hover:mobile:bg-[#F7F7F7]/10"
                            >
                                <span>{t('nav.ai')}</span>
                                <svg
                                    className={`mobile:w-[16px] mobile:h-[16px] mobile:transition-transform mobile:duration-300 ${expandedMobileMenu === 'AI' ? 'mobile:rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className={`mobile:overflow-hidden mobile:transition-all mobile:duration-300 ${expandedMobileMenu === 'AI' ? 'mobile:max-h-[300px] mobile:opacity-100' : 'mobile:max-h-0 mobile:opacity-0'}`}>
                                <div className="mobile:flex mobile:flex-col mobile:gap-y-[12px] mobile:px-[20px] mobile:py-[12px] mobile:ml-[16px]">
                                    {NAV_LINKS.ai.map(({ label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleMobileLinkClick}
                                            className={MOBILE_LINK_CLASS}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Governance 手风琴 */}
                        <div className="mobile:w-full">
                            <div
                                onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'Governance' ? null : 'Governance')}
                                className="mobile:flex mobile:items-center mobile:justify-between mobile:text-[22px] mobile:text-[#F7F7F7] mobile:font-medium mobile:cursor-pointer mobile:py-[16px] mobile:px-[20px] mobile:rounded-[9px] mobile:transition-all mobile:duration-200 hover:mobile:bg-[#F7F7F7]/10"
                            >
                                <span>{t('nav.governance')}</span>
                                <svg
                                    className={`mobile:w-[16px] mobile:h-[16px] mobile:transition-transform mobile:duration-300 ${expandedMobileMenu === 'Governance' ? 'mobile:rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className={`mobile:overflow-hidden mobile:transition-all mobile:duration-300 ${expandedMobileMenu === 'Governance' ? 'mobile:max-h-[400px] mobile:opacity-100' : 'mobile:max-h-0 mobile:opacity-0'}`}>
                                <div className="mobile:flex mobile:flex-col mobile:gap-y-[12px] mobile:px-[20px] mobile:py-[12px] mobile:ml-[16px]">
                                    {NAV_LINKS.governance.map(({ label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleMobileLinkClick}
                                            className={MOBILE_LINK_CLASS}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Community 手风琴 - 垂直堆叠 */}
                        <div className="mobile:w-full">
                            <div
                                onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'Community' ? null : 'Community')}
                                className="mobile:flex mobile:items-center mobile:justify-between mobile:text-[22px] mobile:text-[#F7F7F7] mobile:font-medium mobile:cursor-pointer mobile:py-[16px] mobile:px-[20px] mobile:rounded-[9px] mobile:transition-all mobile:duration-200 hover:mobile:bg-[#F7F7F7]/10"
                            >
                                <span>{t('nav.community')}</span>
                                <svg
                                    className={`mobile:w-[16px] mobile:h-[16px] mobile:transition-transform mobile:duration-300 ${expandedMobileMenu === 'Community' ? 'mobile:rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className={`mobile:overflow-hidden mobile:transition-all mobile:duration-300 ${expandedMobileMenu === 'Community' ? 'mobile:max-h-[600px] mobile:opacity-100' : 'mobile:max-h-0 mobile:opacity-0'}`}>
                                <div className="mobile:flex mobile:flex-col mobile:gap-y-[20px] mobile:px-[20px] mobile:py-[12px] mobile:ml-[16px]">
                                    {COMMUNITY_COLUMNS.map(({ title, links }, index) => (
                                        <div key={title} className={`mobile:flex mobile:flex-col mobile:gap-y-[12px] ${index > 0 ? 'mobile:pt-[12px] mobile:border-t mobile:border-[#F7F7F7]/10' : ''}`}>
                                            <div className="mobile:text-[13px] mobile:font-semibold mobile:text-[#F7F7F7]/50 mobile:uppercase mobile:tracking-wide mobile:mb-[4px]">
                                                {title}
                                            </div>
                                            {links.map(({ label, href }) => (
                                                <a
                                                    key={label}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={handleMobileLinkClick}
                                                    className={MOBILE_LINK_CLASS}
                                                >
                                                    {label}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product 手风琴 - 垂直堆叠 */}
                        <div className="mobile:w-full">
                            <div
                                onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'Product' ? null : 'Product')}
                                className="mobile:flex mobile:items-center mobile:justify-between mobile:text-[22px] mobile:text-[#F7F7F7] mobile:font-medium mobile:cursor-pointer mobile:py-[16px] mobile:px-[20px] mobile:rounded-[9px] mobile:transition-all mobile:duration-200 hover:mobile:bg-[#F7F7F7]/10"
                            >
                                <span>{t('nav.product')}</span>
                                <svg
                                    className={`mobile:w-[16px] mobile:h-[16px] mobile:transition-transform mobile:duration-300 ${expandedMobileMenu === 'Product' ? 'mobile:rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className={`mobile:overflow-hidden mobile:transition-all mobile:duration-300 ${expandedMobileMenu === 'Product' ? 'mobile:max-h-[700px] mobile:opacity-100' : 'mobile:max-h-0 mobile:opacity-0'}`}>
                                <div className="mobile:flex mobile:flex-col mobile:gap-y-[20px] mobile:px-[20px] mobile:py-[12px] mobile:ml-[16px]">
                                    {PRODUCT_COLUMNS.map(({ title, links }, index) => (
                                        <div key={title} className={`mobile:flex mobile:flex-col mobile:gap-y-[12px] ${index > 0 ? 'mobile:pt-[12px] mobile:border-t mobile:border-[#F7F7F7]/10' : ''}`}>
                                            <div className="mobile:text-[13px] mobile:font-semibold mobile:text-[#F7F7F7]/50 mobile:uppercase mobile:tracking-wide mobile:mb-[4px]">
                                                {title}
                                            </div>
                                            {links.map(({ label, href }) => (
                                                <a
                                                    key={label}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={handleMobileLinkClick}
                                                    className={MOBILE_LINK_CLASS}
                                                >
                                                    {label}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 按钮组 */}
                    <div className="mobile:flex mobile:items-center mobile:gap-[16px] mobile:w-full">
                        <a
                            href={CTA_LINKS.research}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleMobileLinkClick}
                            className="group mobile:h-[48px] mobile:w-full mobile:justify-center mobile:flex mobile:items-center mobile:rounded-[9px] mobile:border-[rgba(247,247,247,0.12)] mobile:border-solid mobile:border mobile:backdrop-blur-[9px] mobile:bg-[rgba(247,247,247,0.03)] mobile:transition-all mobile:duration-200 hover:mobile:bg-[rgba(247,247,247,0.08)] hover:mobile:border-[rgba(247,247,247,0.18)] hover:mobile:scale-[1.02]"
                        >
                            <div className="mobile:text-[18px] mobile:text-[#F7F7F7] mobile:opacity-70 mobile:font-medium mobile:leading-[1] mobile:transition-colors hover:mobile:opacity-90">
                                {t('nav.research')}
                            </div>
                        </a>

                        <a
                            href={CTA_LINKS.token}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleMobileLinkClick}
                            className="group mobile:h-[48px] mobile:w-full mobile:justify-center mobile:flex mobile:items-center mobile:rounded-[9px] mobile:bg-[#F7F7F7] mobile:transition-all mobile:duration-200 hover:mobile:bg-[#FFFFFF] hover:mobile:scale-[1.02]"
                        >
                            <div className={`mobile:text-[18px] mobile:text-[#FF4C33] mobile:opacity-70 mobile:font-semibold mobile:leading-[1] mobile:transition-colors hover:mobile:opacity-90 ${color === "blue" && "text-[#43AA8B]!"}`}>
                                $PSTAKE
                            </div>
                        </a>
                    </div>

                    {/* 语言选择 */}
                    <div className="mobile:flex mobile:flex-row mobile:items-center mobile:gap-x-[24px] mobile:mt-[8px]">
                        {locales.map((loc) => (
                            <div
                                key={loc}
                                onClick={() => switchLocale(loc)}
                                className={`mobile:text-[16px] mobile:font-medium mobile:cursor-pointer mobile:py-[8px] mobile:px-[12px] mobile:rounded-[6px] mobile:transition-all mobile:duration-200 hover:mobile:bg-[#F7F7F7]/10 hover:mobile:text-[#FF4C33] ${
                                    locale === loc ? 'mobile:text-[#FF4C33]' : 'mobile:text-[#F7F7F7]'
                                }`}
                            >
                                {loc === 'cn' ? '中文' : loc === 'kr' ? '한국어' : 'EN'}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
