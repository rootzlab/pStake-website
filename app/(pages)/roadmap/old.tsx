"use client";

import { ReactNode } from "react";
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";

type RoadmapListItem = {
    content: ReactNode,
    children?: RoadmapListItem[]
}

const Item = ({
    title,
    time,
    label,
    list,
    position = "right"
}: {
    title: string,
    time: string,
    label: ReactNode,
    list: RoadmapListItem[]
    position?: string
}) => {

    const cardRef = useGsapEntrance({ start: "top 85%" });

    const renderList = (items: RoadmapListItem[], level: number = 0) => {
        return items.map((item, index) => {
            const bulletShade = level > 0 ? "bg-[rgba(247,247,247,0.50)]" : "bg-[rgba(247,247,247,0.70)]";
            return (
                <div key={`${level}-${index}`} className={`flex gap-x-[12px] ${level > 0 ? "mt-[18px]" : ""} mobile:gap-x-[8px] ${level > 0 ? "mobile:mt-[12px]" : ""}`}>
                    <div className="mt-[20px] text-[18px] leading-[25.92px] font-medium text-[rgba(247,247,247,0.70)] mobile:text-[16px] mobile:leading-[22px]">
                        {item.content}
                        {item.children && item.children.length > 0 && (
                            <div className="mt-[12px] pl-[29px] mobile:mt-[8px] mobile:pl-[10px]">
                                {renderList(item.children, level + 1)}
                            </div>
                        )}
                    </div>
                </div>
            )
        })
    }


    return (
        <div ref={cardRef} className="relative w-[450px] px-[48px] pt-[60px] pb-[78px] bg-[#160704] rounded-[12px] mobile:w-full mobile:px-[20px] mobile:pt-[40px] mobile:pb-[44px]">
            {/* <div className={`size-[48px] w-[48px]  absolute -right-[12px] -top-[12px] bg-[#FF4C33] rounded-[7.2px] flex items-center justify-center ${position === "left" && "-left-[12px]!"} mobile:size-[36px] mobile:w-[36px] mobile:-right-[8px] mobile:-top-[8px] mobile:left-auto!`}>
                <svg className="w-[28.8px] mobile:w-[21.6px]" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.72 0C15.9851 3.47915e-07 16.2 0.214904 16.2 0.48V10.0394L22.9606 3.27937C23.1481 3.092 23.4519 3.09195 23.6394 3.27937L25.5063 5.14625C25.6936 5.33369 25.6936 5.63758 25.5063 5.825L18.7312 12.6H28.32C28.5851 12.6 28.8 12.8149 28.8 13.08V15.72C28.8 15.9851 28.5851 16.2 28.32 16.2H18.7506L25.5106 22.96C25.698 23.1475 25.6981 23.4513 25.5106 23.6388L23.6444 25.505C23.4569 25.6925 23.1525 25.6925 22.965 25.505L16.2 18.74V28.32C16.2 28.5851 15.9851 28.8 15.72 28.8H13.08C12.8149 28.8 12.6 28.5851 12.6 28.32V18.7306L5.82 25.5106C5.63255 25.6981 5.3287 25.6981 5.14125 25.5106L3.27437 23.6444C3.08693 23.4569 3.08694 23.1525 3.27437 22.965L10.0394 16.2H0.48C0.214904 16.2 1.00116e-06 15.9851 0 15.72V13.08C-1.15877e-08 12.8149 0.214903 12.6 0.48 12.6H10.06L3.27937 5.81938C3.09198 5.63192 3.09196 5.32806 3.27937 5.14062L5.14625 3.27375C5.33369 3.08641 5.63758 3.08639 5.825 3.27375L12.6 10.0487V0.48C12.6 0.214904 12.8149 1.01275e-06 13.08 0H15.72ZM14.7394 11.7644C14.5519 11.5769 14.2481 11.5769 14.0606 11.7644L11.7694 14.055C11.582 14.2424 11.5822 14.5463 11.7694 14.7337L14.0606 17.025C14.2481 17.2125 14.5519 17.2125 14.7394 17.025L17.0306 14.7337C17.2178 14.5463 17.218 14.2424 17.0306 14.055L14.7394 11.7644Z" fill="#F7F7F7" />
                </svg>
            </div> */}

            <img className={`${position === "left" ? "left-[50px] -translate-x-[100%] rotate-180 origin-center -top-[48px]":"right-[50px] translate-x-[100%] -top-[28px]"} w-[185px] h-[87px] absolute mobile:hidden!`} src="/img/icon40.svg" alt="" />
            <div className="text-[#FF4C33] text-[42px] font-medium leading-[34px] tracking-[-1px] mobile:text-[32px] mobile:leading-[36px] mobile:tracking-[-0.64px]">
                {title}
            </div>
            <div className="flex gap-x-[15px] text-[#F7F7F7] text-[24px] leading-[21px] items-center font-medium mt-[25px] tracking-[0.72px] mobile:gap-x-[12px] mobile:text-[18px] mobile:leading-[24px] mobile:mt-[20px]">
                <img className="size-[19.2px]" src="/img/icon39.svg" alt="" />
                {time}
            </div>
            <div className="h-[1px] bg-[#F7F7F7]/12 mt-[35px] mobile:mt-[20px]"></div>
            <div className="text-[#F7F7F7] text-[24px] leading-[114%] font-medium mt-[38px] tracking-[-0.48px] mobile:text-[20px] mobile:leading-[28px] mobile:mt-[32px] mobile:tracking-[-0.4px]">{label}</div>
            <div className="mt-[35px] flex flex-col gap-y-[30px] tracking-[-0.3px] pl-[10px] mobile:mt-[28px] mobile:gap-y-[24px] mobile:pl-[6px]">
                {renderList(list)}
            </div>
        </div>
    )
}

const Unit2 = () => {

    return (
        <div className="flex justify-between px-[115px] mt-[-86px] mobile:flex-col mobile:px-[16px] mobile:pt-[20px]">
            <div className="flex flex-col gap-y-[95px] mobile:gap-y-[39px]">
                <Item
                    title="Phase 0"
                    time="Q1 - Q2, 2025"
                    label="Foundation & Research Layer"
                    list={[
                        { content: <div className="dot">Launch of the <span className="text-[#F7F7F7]">PSTAKE Research Hub</span> <br /> featuring open-access papers, simulations, <br /> and collaborative experiments.</div> },
                        { content: <div className="dot">Core research focused on <span className="text-[#F7F7F7]">generic sectors</span> including Music, healthcare, supply chain, infrastructure, and media.</div> },
                        { content: <div className="dot">Formation of the <span className="text-[#F7F7F7]">PSTAKE Research Team</span> <br /> with multidisciplinary expertise.</div> },
                        { content: <div className="dot">Strategic partnerships established with <span className="text-[#F7F7F7]">academic institutions</span> and <span className="text-[#F7F7F7]">AI labs</span> for<br /> co-publication, data validation, and knowledge exchange.</div> }
                    ]}
                />
                <Item
                    title="Phase 2"
                    time="Q1 - Q2, 2026"
                    label="Applied Research"
                    list={[
                        { content: <div className="dot">Dissemination of key <span className="text-[#F7F7F7]">research findings</span><br /> for practical applications and builder <br />adoption.</div> },
                        { content: <div className="dot mt-[7px]">Research partnerships with <span className="text-[#F7F7F7]">leading<br /> protocols</span><br />&nbsp;and <span className="text-[#F7F7F7]">institutional players</span> to drive cross-<br />sector adoption.</div> },
                        { content: <div className="dot mt-[7px]">Expansion of the <span className="text-[#F7F7F7]">Innovation Fund</span> to<br />support enterprise-level <span className="text-[#F7F7F7]">AI + Web3 <br />collaborations</span>.</div> }

                        // Dissemination of key research findings for practical applications and builder adoption.
                        // 
                        // 
                    ]}
                />
                <Item
                    title="Phase 4"
                    time="Q1 - Q2, 2027"
                    label="Cross-Industry Integration"
                    list={[
                        { content: <div className="dot">Expand PSTAKE Research into <span className="text-[#F7F7F7]">multi-<br />sector collaboration: </span> fintech, energy,<br /> logistics, and creative industries.</div> },
                        { content: <div className="dot mt-[6px]">Establish <span className="text-[#F7F7F7]">interoperable AI standards</span> for <br />data provenance, consent, and usage <br />across blockchains. </div> },
                        { content: <div className="dot mt-[6px]">Publish the <span className="text-[#F7F7F7]">AI x Web3 Industry <br />Integration Whitepaper</span> highlighting <br />proven economic models.</div> },
                        { content: <div className="dot mt-[6px]">Onboard <span className="text-[#F7F7F7]">enterprise partners </span>to run pilot <br />projects using AI-governed <br />infrastructure.</div> }
                    ]}
                />
                <Item
                    title="Phase 6"
                    time="Q1 - Q2, 2028"
                    label="Cross-Industry Integration"
                    list={[
                        { content: <div className="dot mt-[1px]">Launch of the <span className="text-[#F7F7F7]">PSTAKE Intelligence <br />Network</span> — an open, decentralized layer  <br />for verified AI systems.</div> },
                        { content: <div className="dot mt-[6px]">Onboard <span className="text-[#F7F7F7]">industry and government <br />partners</span> to utilize the Intelligence Layer <br />for policy, finance, and infrastructure <br />modeling.</div> },
                        { content: <div className="dot mt-[6px]">Enable <span className="text-[#F7F7F7]">AI-native tokens and incentive <br /> mechanisms</span> for global research <br />participation.</div> },
                        { content: <div className="dot mt-[6px]">Full integration of <span className="text-[#F7F7F7]">AI, blockchain, and <br />real-world data flows</span> across finance, <br />healthcare, and energy systems.</div> }
                    ]}
                />
            </div>
            <div className="mt-[-108px] w-[12px] h-[3605px] relative mobile:hidden">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,_#FF4C33_0%,_#FF4C33_85%,rgba(255,76,51,0)_100%)]"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,_#FF4C33_0%,_#FF4C33_85%,rgba(255,76,51,0)_100%)]"></div>
            </div>
            <div className="flex flex-col gap-y-[95px] pt-[192px] mobile:gap-y-[40px] mobile:pt-20">
                <Item
                    position="left"
                    title="Phase 1"
                    time="Q3 - Q4, 2025"
                    label="Ecosystem Activation & Innovation Fund"
                    list={[
                        { content: <div className="dot">Launch of <span className="text-[#F7F7F7]">$50 Million AI–Web3 <br />Innovation Fund</span>, backing research, pilot <br />projects, and strategic acquisitions.</div> },
                        { content: <div className="dot mt-[7px]">Open call for <span className="text-[#F7F7F7]">builders, researchers</span>, and <br /><span className="text-[#F7F7F7]">startups</span> to apply for funding.</div> },
                        { content: <div className="dot mt-[6px]"><span className="text-[#F7F7F7]">10+ pilot projects</span> selected and <br />incubated under PSTAKE Research.</div> },
                        { content: <div className="dot mt-[6px]">Publication of the <span className="text-[#F7F7F7]">AI + Web3 Market <br /> Intelligence Report.</span> </div> },
                        {
                            content: <div className="dot mt-[6px]">Launch of the <span className="text-[#F7F7F7]">PSTAKE Pioneer <br /> Ambassador Program:</span></div>,
                            children: [
                                { content: <div className="dot mt-[18px]">500+ applicants screened; <span className="text-[#F7F7F7]">30 <br />selected as PSTAKE Elites.</span></div> },
                                { content: <div className="dot mt-[18px]">Ambassadors lead <span className="text-[#F7F7F7]">community-<br />driven research</span>, translation, and <br />education initiatives.</div> }
                            ]
                        }
                    ]}
                />
                <Item
                    position="left"
                    title="Phase 3"
                    time="Q3 - Q4, 2026"
                    label={<div>AI Implementation & <br /> Applied Intelligence </div>}
                    list={[
                        { content: <div className="dot mt-[3px]">Deployment of <span className="text-[#F7F7F7]">AI-Driven Governance Systems</span> for real-time policy simulations and adaptive protocol optimization.</div> },
                        { content: <div className="dot mt-[5px]">Rollout of <span className="text-[#F7F7F7]">AI-Powered Provenance Solutions</span> in healthcare, music, and financial data ecosystems.</div> },
                        { content: <div className="dot mt-[7px]">Collaboration with <span className="text-[#F7F7F7]">enterprise partners</span> for pilot integrations across supply chain, fintech, and energy sectors.</div> },
                        { content: <div className="dot mt-[6px]">Culmination in the development of an <span className="text-[#F7F7F7]">AI-as-a-Service (AiaS) Layer;</span> enabling adaptive, verifiable intelligence for Web3 ecosystems.</div> }
                    ]}
                />
                <Item
                    position="left"
                    title="Phase 5"
                    time="Q3 - Q4, 2027"
                    label="Global Research Alliances"
                    list={[
                        { content: <div className="dot mt-[2px]">Form the <span className="text-[#F7F7F7]">PSTAKE Research Alliance (PRA);</span> a global consortium connecting universities, AI labs, and blockchain foundations.</div> },
                        { content: <div className="dot mt-[6px]">Host annual <span className="text-[#F7F7F7]">AI + Web3 Symposium,</span> uniting researchers and policymakers to set interoperability and ethics standards.</div> },
                        { content: <div className="dot mt-[6px]">Launch <span className="text-[#F7F7F7]">cross-border AI data registries,</span> powered by PSTAKE’s provenance layer.</div> },
                        { content: <div className="dot mt-[6px]">Co-develop <span className="text-[#F7F7F7]">education and certification programs</span> on decentralized AI research.</div> }
                    ]}
                />
                {/*<Item/>*/}
            </div>
        </div>
    )
}


export default Unit2;
