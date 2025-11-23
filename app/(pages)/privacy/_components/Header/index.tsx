"use client";
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";

const Header = () => {
    const heroRef = useGsapEntrance({ start: "top 90%" });
    const ctaRef = useGsapEntrance({ delay: 0.15, start: "top 85%" });

    return (
        <div className="mt-[78px] mobile:mt-[20px]">
            <div ref={heroRef} className="pt-[120px] mobile:pt-[80px]">
                <div className="h-[55px] flex items-center justify-center mobile:h-auto">
                    <div className="text-[60px] text-center text-[#FF4C33] font-medium tracking-[-1.8px] leading-[68.4px] mobile:text-[36px] mobile:leading-[44px] mobile:tracking-[-0.6px]">
                        Privacy Policy
                    </div>
                </div>
                <div ref={ctaRef} className="text-[#FF4C33] text-[15px] w-max px-[21px] border border-solid border-[#FF4C33] rounded-[9px] font-medium h-[42px] flex items-center justify-center text-center mx-auto leading-[30px] mt-[46px] tracking-[-0.3px] mobile:text-[13px] mobile:h-[36px] mobile:px-[16px] mobile:rounded-[8px] mobile:mt-[40px] pt-[3px]">
                    Last Updated: July 13th, 2025
                </div>
            </div>
            <div className="bg-[#d9d9d9] h-px w-[1356px] mx-auto mt-[97px] mobile:w-full mobile:mt-[40px]"></div>
        </div>
    )
}

export default Header

