import React from "react";
import Icon from "./Icon";
import Link from "next/link";
import { useTranslation, LinkWithLocale } from "next-export-i18n";
import { useRouter } from "next/router";

import {
  PSTAKE_TWITTER_URL,
  PSTAKE_TELEGRAM_URL,
  PSTAKE_YOUTUBE_URL,
  PERSISTENCE_ONE_URL,
  PSTAKE_MEDIUM_URL,
  STK_BNB_TWITTER_URL,
  STK_ATOM_TWITTER_URL,
  STK_ETH_TWITTER,
  pstake_cosmos_twitter_url,
  PSTAKE_DISCORD,
  GITHUB_URL,
  PSTAKE_FORUM_URL,
  PSTAKE_AUDITS_URL,
  GUIDES_FAQ_URL,
  GUIDES_URL,
  GOV_URL,
  DOCS_URL,
  PSTAKE_BRIDGE_URL,
  BSC_BRIDGE_URL,
  BLAST_BRIDGE_URL,
  OPTIMISM_BRIDGE_URL,
} from "../../utils/config";
import Image from "next/image";

const FooterBottom = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const iconFooterList = [
    {
      name: "Telegram",
      url: PSTAKE_TELEGRAM_URL,
      icon: "telegram-plane",
      text: "Chat with the community",
    },
    {
      name: "X (Formerly Twitter)",
      url: PSTAKE_TWITTER_URL,
      icon: "twitter-logo",
      text: "Stay updated",
    },
    {
      name: "Blogs",
      url: PSTAKE_MEDIUM_URL,
      icon: "medium-m",
      text: "Learn about pSTAKE",
    },
    {
      name: "Discord",
      url: PSTAKE_DISCORD,
      icon: "discord",
      text: "Subscribe for tutorials",
    },
  ];

  const liveNetworks = [
    {
      externLink: false,
      link: "/btc",
      text: `BTC (${t("COMING_SOON")})`,
    },
    {
      externLink: false,
      link: "/atom",
      text: "ATOM",
    },
    {
      externLink: false,
      link: "/bnb",
      text: "BNB",
    },

    {
      externLink: false,
      link: "/dydx",
      text: "DYDX",
    },
  ];

  const learnList = [
    {
      externLink: true,
      link: "https://blog.pstake.finance/category/bitcoin-liquid-staking/",
      text: t("NAV_LEARN_1_TITLE"),
    },
    {
      externLink: true,
      link: "https://blog.pstake.finance/category/bitcoin-101/",
      text: t("NAV_LEARN_2_TITLE"),
    },
    {
      externLink: true,
      link: "https://blog.pstake.finance/category/guides/",
      text: t("NAV_LEARN_3_TITLE"),
    },
    {
      externLink: false,
      link: "/roadmap",
      text: t("NAV_LEARN_5_TITLE"),
    },
    {
      externLink: true,
      link: PSTAKE_AUDITS_URL,
      text: t("SECURITY_AUDITS"),
    },
  ];

  const aboutList = [
    {
      externLink: false,
      link: "/pstake",
      text: t("NAV_ABOUT_7_TITLE"),
    },
    {
      externLink: true,
      link: "https://blog.pstake.finance/",
      text: t("BLOGS"),
    },

    {
      externLink: true,
      link: "https://immunefi.com/bug-bounty/pstakeoncosmos/",
      text: t("NAV_ABOUT_3_TITLE"),
    },
    {
      externLink: true,
      link: "https://www.linkedin.com/company/pstake/jobs/",
      text: t("NAV_ABOUT_4_TITLE"),
    },
  ];

  const communityList = [
    {
      externLink: true,
      link: "https://forum.pstake.finance/",
      text: t("NAV_GOVERNANCE_1_TITLE"),
    },
    {
      externLink: true,
      link: "https://blog.pstake.finance/2022/03/24/introducing-pstake-community-governance/",
      text: t("NAV_GOVERNANCE_2_TITLE"),
    },
    {
      externLink: true,
      link: "https://snapshot.org/#/pstakefinance.eth",
      text: t("NAV_GOVERNANCE_3_TITLE"),
    },
  ];

  const bridgeList = [
    {
      externLink: true,
      link: "https://superbridge.app/base",
      text: t("ETH_TO_BASE_BRIDGE"),
    },
    {
      externLink: true,
      link: PSTAKE_BRIDGE_URL,
      text: t("ETH_TO_COSMOS_BRIDGE"),
    },
    {
      externLink: true,
      link: BSC_BRIDGE_URL,
      text: t("ETH_TO_BSC_BRIDGE"),
    },
    {
      externLink: true,
      link: BLAST_BRIDGE_URL,
      text: t("ETH_TO_BLAST_BRIDGE"),
    },
    {
      externLink: true,
      link: OPTIMISM_BRIDGE_URL,
      text: t("ETH_TO_OPTIMISM_BRIDGE"),
    },
  ];
  return (
    <>
      <div className={`aos-init aos-animate ${router.pathname}`}>
        <div className="container py-[50px] md:py-[30px]">
          <div>
            <div className="max-w-[1240px] mx-auto flex items-center md:block">
              <div className="flex flex-wrap justify-between w-full">
                <div className={"w-[300px] md:mb-4"}>
                  <Image
                    src={"/images/logo.svg"}
                    alt={"logo"}
                    width={168}
                    height={38}
                    className="w-[172px] md:w-[160px] mb-2"
                  />
                  <a
                    href={
                      "https://docs.pstake.finance/media-kit/brand-guidelines"
                    }
                    className={
                      "font-semibold text-[#FCFCFC] flex items-center mb-8 md:mb-3 hover:text-[#D5D5D5B2] group"
                    }
                    rel="noopener noreferrer"
                  >
                    {t("FOOTER_VIEW_PRESS_KIT")}
                    <Icon
                      viewClass="socialIcon ml-2 !w-[16px] !h-[16px] stroke-[#F8EAEA] fill-transparent group-hover:stroke-[#EE972C]"
                      icon={"right-arrow2"}
                    />
                  </a>
                  <div className={"flex items-center justify-start lg:hidden"}>
                    {iconFooterList.map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        aria-label={item.name}
                        className={`flex items-center rounded-full group`}
                        rel="noopener noreferrer"
                      >
                        <div
                          className={`w-[24px] h-[24px] bg-[#434343] flex 
                        items-center justify-center rounded-full mr-3`}
                        >
                          <Icon
                            viewClass="socialIcon fill-[#000] !w-[12px] !h-[12px]"
                            icon={item.icon}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div
                  className={
                    "flex-1 flex justify-end md:justify-start md:flex-wrap"
                  }
                >
                  <div className={"mr-[60px] md:mr-10 md:mb-3"}>
                    <p
                      className={
                        "font-semibold text-[#FCFCFCE3] text-[20px] mb-4"
                      }
                    >
                      {t("LEARN")}
                    </p>
                    {learnList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "text-[#D5D5D5B0] mb-[12px] flex items-center"
                          }
                        >
                          <Link
                            href={item.link}
                            className="nav-link group flex items-center text-base md:text-sm md:mb-3"
                            passHref
                            target={item.externLink ? "_blank" : "_self"}
                          >
                            {item.text}
                            {item.externLink ? (
                              <Icon
                                viewClass="fill-transparent stroke-[#D5D5D5B2] !w-[14px] !h-[16px] ml-1 mt-[3px] group-hover:stroke-[#EE972C]"
                                icon="external-link"
                              />
                            ) : null}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className={"mr-[60px] md:mr-0 md:mb-3"}>
                    <p
                      className={
                        "font-semibold text-[#FCFCFCE3] text-[20px] mb-4"
                      }
                    >
                      {t("ABOUT")}
                    </p>
                    {aboutList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "text-[#D5D5D5B0] mb-[12px] flex items-center"
                          }
                        >
                          <Link
                            href={item.link}
                            className="nav-link group flex items-center text-base md:text-sm md:mb-3"
                            passHref
                            target={item.externLink ? "_blank" : "_self"}
                          >
                            {item.text}
                            {item.externLink ? (
                              <Icon
                                viewClass="fill-transparent stroke-[#D5D5D5B2] !w-[14px] !h-[16px] ml-1 mt-[3px] group-hover:stroke-[#EE972C]"
                                icon="external-link"
                              />
                            ) : null}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className={"mr-[60px] md:mr-10 md:mb-3"}>
                    <p
                      className={
                        "font-semibold text-[#FCFCFCE3] text-[20px] mb-4"
                      }
                    >
                      {t("GOVERNANCE")}
                    </p>
                    {communityList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={"text-[#D5D5D5B0]  mb-[12px]  "}
                        >
                          <Link
                            href={item.link}
                            className="nav-link group flex items-center text-base md:text-sm md:mb-3"
                            passHref
                            target={item.externLink ? "_blank" : "_self"}
                          >
                            {item.text}
                            {item.externLink ? (
                              <Icon
                                viewClass="fill-transparent stroke-[#D5D5D5B2] !w-[14px] !h-[16px] ml-1 group-hover:stroke-[#EE972C]"
                                icon="external-link"
                              />
                            ) : null}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className={" md:mr-0 md:mb-3"}>
                    <p
                      className={
                        "font-semibold text-[#FCFCFCE3] text-[20px] mb-4"
                      }
                    >
                      {t("BRIDGES")}
                    </p>
                    {bridgeList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={"text-[#D5D5D5B0]  mb-[12px]  "}
                        >
                          <Link
                            href={item.link}
                            className="nav-link group flex items-center text-base md:text-sm md:mb-3"
                            passHref
                            target={item.externLink ? "_blank" : "_self"}
                          >
                            {item.text}
                            {item.externLink ? (
                              <Icon
                                viewClass="fill-transparent stroke-[#D5D5D5B2] !w-[14px] !h-[16px] ml-1 group-hover:stroke-[#EE972C]"
                                icon="external-link"
                              />
                            ) : null}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={"flex items-center justify-start -lg:hidden"}>
                {iconFooterList.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    className={`flex items-center rounded-full group`}
                    rel="noopener noreferrer"
                  >
                    <div
                      className={`w-[24px] h-[24px] bg-[#434343] flex 
                        items-center justify-center rounded-full mr-3`}
                    >
                      <Icon
                        viewClass="socialIcon fill-[#000] !w-[12px] !h-[12px]"
                        icon={item.icon}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="max-w-[1240px] mx-auto flex items-center justify-between flex-wrap sm:block sm:text-center
        pb-[60px] md:px-4 pt-[20px] border-t border-[#D5D5D533] md:pb-4"
        >
          <p className="text-[#70747c] text-[12px] sm:mb-4 md:text-center">
            © Copyright {new Date().getFullYear()} PSTAKE Finance.{" "}
            {t("RIGHTS_RESERVE")}
          </p>
          <div className={"flex items-center md:justify-between md:px-4"}>
            <LinkWithLocale
              href="/terms"
              className="text-[#70747c] text-[12px] mx-4 block md:m-0"
            >
              {t("TERMS_OF_USE")}
            </LinkWithLocale>
            <LinkWithLocale
              href="/privacy"
              className="text-[#70747c] text-[12px] sm:mb-4 block"
            >
              {t("PRIVACY_POLICY")}
            </LinkWithLocale>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBottom;
