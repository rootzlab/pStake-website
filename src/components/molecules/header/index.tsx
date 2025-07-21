import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import {
  PSTAKE_BRIDGE_URL,
  BSC_BRIDGE_URL,
  PSTAKE_APP_URL,
  BNB_URL,
  ATOM_URL,
  ETH_URL,
  OSMO_URL,
  DYDX,
  BLAST_BRIDGE_URL,
  OPTIMISM_BRIDGE_URL,
} from "../../../utils/config";
import { useTranslation, LinkWithLocale } from "next-export-i18n";
import Icon from "../Icon";
import ButtonLink from "../../atoms/buttonLink/ButtonLink";
import { useOnClickOutside } from "../../../customHooks/useOnClickOutside";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import Button from "../../atoms/button/Button";
import GeofenceNotice from ".././geofence-banner";
import LearnDropdown from "./learn-dropdown";
import CommunityDropdown from "./community-dropdown";
import BridgeDropdown from "./bridge-dropdown";
import MobileHeader from "./mobile-header";
import LangDropdown from "./lang-dropdown";
import AboutDropdown from "./about-dropdown";
import GoveranaceDropdown from "./governanace-dropdown";
import StakingDropdown from "./staking-dropdown";

const socialList = [
  {
    optionName: "X (Twitter)",
    optionLink: "https://x.com/intent/follow?screen_name=pStakeFinance",
    icon: "twitter-logo",
    iconType: "fill",
    text: "Follow pSTAKE Finance",
  },
  {
    optionName: "Telegram",
    optionLink: "https://t.me/pstakefinancechat",
    icon: "telegram-plane",
    iconType: "fill",
    text: "Join the Community Chat",
  },
  {
    optionName: "Discord",
    optionLink: "https://discord.pstake.finance/",
    icon: "discord",
    iconType: "fill",
    text: "Join Our Community",
  },
  {
    optionName: "Governance Forum",
    optionLink: "https://forum.pstake.finance/",
    icon: "pstake",
    iconType: "",
    text: "Join Discussions",
  },
];

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(true);
  };

  const { isLandScape } = useWindowSize();

  const sideBarRef = useRef<HTMLUListElement>(null);
  useOnClickOutside(sideBarRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    let body: any = document.getElementsByTagName("body")[0];
    body.classList = "";
    window.addEventListener("scroll", scrollNavigation, true);
  }, []);

  const scrollNavigation = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    let topbar = document.getElementById("is-sticky") as HTMLElement;
    let navBar = document.getElementById("nav-bar") as HTMLElement;
    if (top > 50) {
      topbar.classList.add("topBar");
      navBar.classList.add("is-sticky");
    } else {
      topbar.classList.remove("topBar");
      navBar.classList.remove("is-sticky");
    }
  };

  let appURL = "https://app.pstake.finance/";

  if (router.pathname === "/") {
    appURL = PSTAKE_APP_URL;
  } else if (router.pathname === "/bnb") {
    appURL = BNB_URL;
  } else if (router.pathname === "/atom") {
    appURL = ATOM_URL;
  } else if (router.pathname === "/osmo") {
    appURL = OSMO_URL;
  } else if (router.pathname === "/dydx") {
    appURL = DYDX;
  } else if (router.pathname === "/eth/testnet") {
    appURL = ETH_URL;
  }

  const learnList = [
    {
      optionName: t("NAV_LEARN_1_TITLE"),
      subText: t("NAV_LEARN_1_SUB_TITLE"),
      icon: "btc-icon",
      iconType: "fill",
      optionLink:
        "https://blog.pstake.finance/category/bitcoin-liquid-staking/",
    },
    {
      optionName: t("NAV_LEARN_2_TITLE"),
      subText: t("NAV_LEARN_2_SUB_TITLE"),
      icon: "circle_info",
      iconType: "stroke",
      optionLink: "https://blog.pstake.finance/category/bitcoin-101/",
    },
    {
      optionName: t("NAV_LEARN_3_TITLE"),
      subText: t("NAV_LEARN_3_SUB_TITLE"),
      icon: "guides",
      optionLink: "https://blog.pstake.finance/category/guides/",
      iconType: "stroke",
    },
    {
      optionName: t("NAV_LEARN_5_TITLE"),
      subText: t("NAV_LEARN_5_SUB_TITLE"),
      icon: "roadmap",
      optionLink: "/roadmap",
      iconType: "stroke",
    },
    {
      optionName: t("NAV_LEARN_4_TITLE"),
      subText: t("NAV_LEARN_4_SUB_TITLE"),
      icon: "code",
      optionLink: "https://github.com/persistenceOne/pStake-auditReports",
      iconType: "stroke",
    },
  ];

  const governanceList = [
    {
      optionName: t("NAV_GOVERNANCE_1_TITLE"),
      subText: t("NAV_GOVERNANCE_1_SUB_TITLE"),
      icon: "pstake",
      iconType: "",
      optionLink: "https://forum.pstake.finance/",
    },
    {
      optionName: t("NAV_GOVERNANCE_2_TITLE"),
      subText: t("NAV_GOVERNANCE_2_SUB_TITLE"),
      icon: "governance_process",
      iconType: "stroke",
      optionLink:
        "https://blog.pstake.finance/2022/03/24/introducing-pstake-community-governance/",
    },
    {
      optionName: t("NAV_GOVERNANCE_3_TITLE"),
      subText: t("NAV_GOVERNANCE_3_SUB_TITLE"),
      icon: "snapshot",
      optionLink: "https://snapshot.org/#/pstakefinance.eth",
      iconType: "stroke",
    },
  ];

  const aboutList = [
    {
      optionName: t("NAV_ABOUT_7_TITLE"),
      subText: t("NAV_ABOUT_7_SUB_TITLE"),
      icon: "pstake",
      iconType: "stroke",
      optionLink: "/pstake",
    },
    {
      optionName: t("NAV_ABOUT_1_TITLE"),
      subText: t("NAV_ABOUT_1_SUB_TITLE"),
      icon: "blog",
      iconType: "stroke",
      optionLink: "https://blog.pstake.finance/",
    },
    {
      optionName: t("NAV_ABOUT_3_TITLE"),
      subText: t("NAV_ABOUT_3_SUB_TITLE"),
      icon: "bug_bounty",
      optionLink: "https://immunefi.com/bug-bounty/pstakeoncosmos/",
      iconType: "fill",
    },
    {
      optionName: t("NAV_ABOUT_4_TITLE"),
      subText: t("NAV_ABOUT_4_SUB_TITLE"),
      icon: "careers",
      optionLink: "https://www.linkedin.com/company/pstake/jobs/",
      iconType: "stroke",
    },
    {
      optionName: t("NAV_ABOUT_5_TITLE"),
      subText: t("NAV_ABOUT_5_SUB_TITLE"),
      icon: "download",
      iconType: "fill",
      optionLink: "https://docs.pstake.finance/media-kit/brand-guidelines",
    },
  ];

  const bridgeList = [
    {
      imgUrl: "/images/networks/base.svg",
      optionName: t("ETH_TO_BASE_BRIDGE"),
      optionLink: "https://superbridge.app/base",
      subText: t("ETH_TO_BASE_BRIDGE_HELPER_TEXT"),
    },
    {
      imgUrl: "/images/networks/atom.svg",
      optionName: t("ETH_TO_COSMOS_BRIDGE"),
      optionLink: PSTAKE_BRIDGE_URL,
      subText: t("ETH_TO_COSMOS_BRIDGE_HELPER_TEXT"),
    },
    {
      imgUrl: "/images/networks/bnb.svg",
      optionName: t("ETH_TO_BSC_BRIDGE"),
      optionLink: BSC_BRIDGE_URL,
      subText: t("ETH_TO_BSC_BRIDGE_HELPER_TEXT"),
    },
    {
      imgUrl: "/images/networks/blast.svg",
      optionName: t("ETH_TO_BLAST_BRIDGE"),
      optionLink: BLAST_BRIDGE_URL,
      subText: t("ETH_TO_BLAST_BRIDGE_HELPER_TEXT"),
    },
    {
      imgUrl: "/images/networks/optimism.svg",
      optionName: t("ETH_TO_OPTIMISM_BRIDGE"),
      optionLink: OPTIMISM_BRIDGE_URL,
      subText: t("ETH_TO_OPTIMISM_BRIDGE_HELPER_TEXT"),
    },
  ];

  const langList = [
    {
      imgUrl: "/images/lang/en.png",
      code: "en",
      name: "ENGLISH",
    },
    {
      imgUrl: "/images/lang/cn.png",
      code: "cn",
      name: "CHINESE",
    },
    {
      imgUrl: "/images/lang/kr.png",
      code: "ko",
      name: "KOREAN",
    },
  ];

  const stakingList = [
    {
      optionName: t("NAV_STAKING_1_TITLE"),
      subText: t("NAV_STAKING_1_SUB_TITLE"),
      icon: "btc-icon",
      iconType: "fill",
      optionLink: "https://app.btc.pstake.finance/",
    },
    {
      optionName: t("NAV_STAKING_2_TITLE"),
      subText: t("NAV_STAKING_2_SUB_TITLE"),
      icon: "pstake",
      iconType: "",
      optionLink: "https://app.btc.pstake.finance/pstake/staking",
    },
    {
      optionName: t("NAV_STAKING_4_TITLE"),
      subText: t("NAV_STAKING_4_SUB_TITLE"),
      icon: "cosmos",
      iconType: "stroke",
      optionLink: "https://app.pstake.finance/",
    },
    {
      optionName: t("NAV_STAKING_3_TITLE"),
      subText: t("NAV_STAKING_3_SUB_TITLE"),
      icon: "guides",
      iconType: "stroke",
      optionLink: "/institutional",
    },
  ];

  return (
    <React.Fragment>
      <div id="is-sticky" className="top-bar w-full fixed z-[100]">
        {/*<GeofenceNotice />*/}
        <nav
          className={`[.topBar_&]:bg-black-900 py-6 px-0 flex relative 
            items-center navbar navbar-expand-lg navbar-custom flex-column 
            md:flex-wrap justify-start ${
              router.pathname !== "/xprt/validators" &&
              router.pathname !== "/" &&
              router.pathname !== "/bnb" &&
              router.pathname !== "/pstake" &&
              router.pathname !== "/team" &&
              router.pathname !== "/roadmap" &&
              router.pathname !== "/institutional"
                ? "bg-white-emphasis"
                : ""
            } ${router.pathname.split("/")[1]}
          `}
          id="nav-bar"
        >
          <div className="container max-w-[1280px] mx-auto flex flex-wrap items-center justify-between ">
            {router.pathname === "/" ||
            router.pathname.includes("validators") ||
            router.pathname === "/pstake" ||
            router.pathname === "/team" ||
            router.pathname === "/roadmap" ||
            router.pathname === "/institutional" ? (
              <LinkWithLocale
                aria-label="logo"
                className="bg-logoLight
                      [.is-sticky_&]:bg-logoLight bg-[length:160px] md:bg-[length:140px] w-[160px] md:w-[140px] h-[40px] bg-no-repeat bg-center"
                href="/"
              />
            ) : (
              <LinkWithLocale
                aria-label="logo"
                className="bg-logoDark
                      [.is-sticky_&]:bg-logoLight  bg-[length:160px]  md:bg-[length:140px] w-[160px] md:w-[140px] h-[40px]  bg-no-repeat bg-center"
                href="/"
              />
            )}

            <Button
              aria-label="menu"
              className={`${
                router.pathname === "/"
                  ? "[.is-sticky_&]:bg-[#EE972C]"
                  : "[.is-sticky_&]:bg-[#EE972C]"
              } -lg:hidden md:py-2 !py-2.5 md:text-sm`}
              variant={"custom"}
              onClick={toggleMenu}
              id={"toggleButton"}
              scale="lg"
              isDisabled={false}
              customButtonClass={`bg-black-800 text-light-high ${
                router.pathname === "/bnb"
                  ? "[.is-sticky_&]:text-dark-high"
                  : router.pathname === "/"
              } text-[12px]`}
            >
              <Icon
                viewClass="w-[14px] h-[14px] fill-[#fff]"
                icon="hamberger"
              />
            </Button>
            <div
              className={`${
                isOpen ? "lg:transform-none" : "lg:-translate-x-full"
              } lg:fixed lg:top-0 lg:left-0 md:z-40 lg:w-[100%] lg:h-screen lg:transition-transform lg:bg-[#141414]
               lg:basis-auto lg:basis-full lg:grow menu-open
               `}
              id="navbarCollapse"
            >
              {isLandScape ? (
                <MobileHeader
                  aboutList={aboutList}
                  learnList={learnList}
                  governanceList={governanceList}
                  communityList={socialList}
                  bridgeList={bridgeList}
                  stakingList={stakingList}
                  closeMenu={() => {
                    setIsOpen(false);
                  }}
                  className={"-lg:hidden"}
                />
              ) : (
                <ul
                  className={`flex gap-[16px] items-center md:flex-row -md:ml-auto md:flex-col 
                md:items-baseline md:fixed md:h-full md:left-0 md:bottom-0 md:p-2`}
                >
                  <li className="nav-item nav__menu-item lg:hidden">
                    <LearnDropdown
                      learnList={learnList}
                      isTablet={isLandScape}
                    />
                  </li>
                  <li className="nav-item nav__menu-item lg:hidden">
                    <AboutDropdown
                      aboutList={aboutList}
                      isTablet={isLandScape}
                    />
                  </li>
                  <li className="nav-item nav__menu-item lg:hidden">
                    <GoveranaceDropdown
                      govList={governanceList}
                      isTablet={isLandScape}
                    />
                  </li>
                  <li className="nav-item nav__menu-item lg:hidden">
                    <CommunityDropdown
                      communityList={socialList}
                      isTablet={isLandScape}
                    />
                  </li>
                  <li className="nav-item nav__menu-item lg:hidden">
                    <BridgeDropdown list={bridgeList} isTablet={isLandScape} />
                  </li>
                  <li className="nav-item nav__menu-item lg:hidden">
                    <StakingDropdown
                      stakingList={stakingList}
                      isTablet={isLandScape}
                    />
                  </li>
                  <li className="nav-item md:w-full ml-2.5 md:ml-0 md:mb-2">
                    {router.pathname === "/bnb" ? (
                      <ButtonLink
                        className={`dropDownButton w-full md:py-2 !py-2.5 md:text-sm`}
                        variant={"custom"}
                        href={appURL}
                        scale="lg"
                        target={"_blank"}
                        isDisabled={false}
                        customButtonClass={`${
                          router.pathname === "/bnb"
                            ? "bg-bnbPrimary"
                            : "bg-black-800 text-light-high"
                        } ${
                          router.pathname === "/bnb"
                            ? "[.is-sticky_&]:text-dark-high"
                            : router.pathname === "/"
                        } text-[12px]`}
                      >
                        <span className="nav-link pophover tooltip-multiline app-btn uppercase">
                          {t("LIQUID_STAKE_NOW")}
                        </span>
                      </ButtonLink>
                    ) : null}
                  </li>
                  <li className="nav-item nav__menu-item lg:hidden">
                    <LangDropdown
                      langList={langList.filter((item) => item)}
                      isTablet={isLandScape}
                    />
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
