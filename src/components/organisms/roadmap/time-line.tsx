import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTranslation } from "next-export-i18n";
import { roadMapData } from "./data";
import React from "react";
import Icon from "../../molecules/Icon";

const Timeline = () => {
  const { t } = useTranslation("common");
  const list = roadMapData(t);
  return (
    <div className={"timeline"}>
      <VerticalTimeline animate={false}>
        {list.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "#252525",
              color: "#fff",
              borderRadius: "12px",
            }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            // date="2011 - present"
            position={item.position}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={
              <img
                src={"/images/timeline-status.svg"}
                alt={"timeline-status"}
                className="w-[38px] h-[38px] "
              />
            }
          >
            <div>
              <h3 className="mb-[36px] flex items-center vertical-timeline-element-title font-semibold text-[24px] leading-[36px] text-[#E3983D]">
                <Icon
                  viewClass=" mr-2 !w-[17px] !h-[17px]"
                  icon={
                    item.year === "Work In Progress"
                      ? "settings"
                      : item.year === "Coming Next"
                      ? "loader"
                      : "clock"
                  }
                />
                {item.year}
              </h3>
              {item.monthList.map((month) => (
                <div key={month.month} className={"mb-5"}>
                  <p
                    className={
                      "font-semibold text-[20px] leading-[30px] text-[#FFFFFF] mb-2"
                    }
                  >
                    {month.month}
                  </p>
                  <ul className="list-disc pl-[25px]">
                    {month.content.map((content, cindex) => (
                      <li className={"text-[#C6C6C6]"} key={cindex}>
                        {content.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      {/*<VerticalTimeline>*/}

      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--work"*/}
      {/*    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}*/}
      {/*    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}*/}
      {/*    date="2011 - present"*/}
      {/*    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Creative Director</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>*/}
      {/*    <p>*/}
      {/*      Creative Direction, User Experience, Visual Design, Project Management, T_ea_m Leading*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--work"*/}
      {/*    date="2010 - 2011"*/}
      {/*    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Art Director</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>*/}
      {/*    <p>*/}
      {/*      Creative Direction, User Experience, Visual Design, SEO, Online Marketing*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--work"*/}
      {/*    date="2008 - 2010"*/}
      {/*    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Web Designer</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>*/}
      {/*    <p>*/}
      {/*      User Experience, Visual Design*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--work"*/}
      {/*    date="2006 - 2008"*/}
      {/*    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Web Designer</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>*/}
      {/*    <p>*/}
      {/*      User Experience, Visual Design*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--education"*/}
      {/*    date="April 2013"*/}
      {/*    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>*/}
      {/*    <p>*/}
      {/*      Strategy, Social Media*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--education"*/}
      {/*    date="November 2012"*/}
      {/*    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">Certification</h4>*/}
      {/*    <p>*/}
      {/*      Creative Direction, User Experience, Visual Design*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    className="vertical-timeline-element--education"*/}
      {/*    date="2002 - 2006"*/}
      {/*    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  >*/}
      {/*    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>*/}
      {/*    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>*/}
      {/*    <p>*/}
      {/*      Creative Direction, Visual Design*/}
      {/*    </p>*/}
      {/*  </VerticalTimelineElement>*/}
      {/*  <VerticalTimelineElement*/}
      {/*    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}*/}
      {/*    icon={<p>T</p>}*/}
      {/*  />*/}
      {/*</VerticalTimeline>*/}
    </div>
  );
};

export default Timeline;
