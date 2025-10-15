import React from "react";
import { useTranslation } from "next-export-i18n";
import InteropWidget from "@persistenceone/interop-widget";


export const defaultTheme = {
  borderRadius: {
    "button-lg-primary": "3.75rem",
    "button-lg-secondary": "3.75rem",
    "button-lg-tertiary": "3.75rem",
    "button-md-primary": "1.25rem",
    "button-md-secondary": "1.25rem",
    "button-md-tertiary": "1.25rem",
    "button-sm-primary": "1.25rem",
    "button-sm-secondary": "1.25rem",
    "button-sm-tertiary": "1.25rem",
    "container": "1.875rem",
    "input": "9999px",
    "menu-sm": "0.9375rem",
    "menu-lg": "1.25rem",
    "modal": "1.875rem"
  },
  fontSize: {
    "caption": "0.875rem",
    "body-small": "0.875rem",
    "body-medium": "1rem",
    "body-large": "1.25rem",
    "heading-small": "1.5rem",
    "heading-medium": "2rem",
    "heading-large": "2.25rem"
  },
  fontWeight: {
    "caption": "400",
    "body-small": "400",
    "body-medium": "400",
    "body-large": "400",
    "heading-small": "400",
    "heading-medium": "400",
    "heading-large": "400"
  },
  fontFamily: {
    "interop-main": "Poppins, sans-serif"
  },
  boxShadow: {
    "input": "none",
    "container": "0px 2px 4px 0px rgba(0, 0, 0, 0.20), 0px 5px 50px -1px rgba(0, 0, 0, 0.33)"
  },
  color: {
    "text-primary": "#ffffff",
    "text-faint": "#EDEFF3",
    "text-muted": "#D1D6E0",
    "text-disabled": "#A7ABBE",
    "text-secondary": "#787878",
    "text-default": "#676B7E",
    "text-strong": "#4C515D",
    "text-inverted": "#17191C",
    "royal-300": "#284925",
    "royal-400": "#2b4a28",
    "royal-500": "#5d9358",
    "royal-600": "#40ba35",
    "royal-700": "#6bca63",
    "status-positive": "#7AE870",
    "status-negative": "#FF4D5B",
    "button-lg-primary-bg": "#6bca63",
    "button-lg-primary-text": "#1E1C23",
    "button-lg-secondary-bg": "#1E1C23",
    "button-lg-secondary-text": "#6bca63",
    "button-lg-tertiary-bg": "#292C32",
    "button-lg-tertiary-text": "#D1D6E0",
    "button-md-primary-bg": "#6bca63",
    "button-md-primary-text": "#1E1C23",
    "button-md-secondary-bg": "#1E1C23",
    "button-md-secondary-text": "#6bca63",
    "button-md-tertiary-bg": "#292C32",
    "button-md-tertiary-text": "#D1D6E0",
    "button-sm-primary-bg": "#6bca63",
    "button-sm-primary-text": "#1E1C23",
    "button-sm-secondary-bg": "#1E1C23",
    "button-sm-secondary-text": "#6bca63",
    "button-sm-tertiary-bg": "#292C32",
    "button-sm-tertiary-text": "#D1D6E0",
    "input-bg": "transparent",
    "input-border": "transparent",
    "input-border-focus": "none",
    "input-outline": "0px",
    "input-placeholder": "#ffffff",
    "input-text": "#ffffff",
    "input-selection": "#ffffff",

    "menu-bg": "#17191CA8",
    "menu-text": "#FBFBFDA8",
    "menu-backdrop": "#FBFBFD1A",
    "modal-backdrop": "#17191C54",
    "primary-bg": "#252731",
    "secondary-bg": "#31333F",
    "ternary-bg": "#393C4B",
  }
};



const Reasons = () => {
  const { t } = useTranslation();
  const list = [
    {
      title: (
        <>
          {t("BTC_WHY_BUILD_TITLE_1")}{" "}
          <span className={"invisible"}>BTC_WHY_BUILD_TITLE_1 </span>
        </>
      ),
      image: "/images/btc/building_asset1.svg",
      content: t("BTC_WHY_BUILD_CONTENT_1"),
    },
    {
      title: t("BTC_WHY_BUILD_TITLE_2"),
      image: "/images/btc/building_asset2.svg",
      content: t("BTC_WHY_BUILD_CONTENT_2"),
    },
    {
      title: t("BTC_WHY_BUILD_TITLE_3"),
      image: "/images/btc/building_asset3.svg",
      content: t("BTC_WHY_BUILD_CONTENT_3"),
    },
  ];
  return (
    <div className="bg-[#141414]">
      <div className="max-w-[1272px] mx-auto py-[65px]  md:mx-4 md:py-[35px]">
        <h3 className="sectionTitle mb-8 md:mb-6 max-w-[1060px] mx-auto">
          {t("BTC_WHY_BUILD_HEADING")}
        </h3>
        <div className="flex flex-wrap gap-5 md:block">
          <InteropWidget theme={defaultTheme} defaultRouteConfig={{
            fromChain: 'Base',
          }}/>
        </div>
      </div>
    </div>
  );
};

export default Reasons;
