import type { Metadata } from "next";
import HomePage from "./(pages)/home/page";

export const metadata: Metadata = {
  title: "PSTAKE | Home",
};

const Page = () => {
  return (
    <div>
      <HomePage />
       {/* <img className=" pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full opacity-50" src="/blog.jpg" alt="" /> */}
    </div>
  );
}

export default Page
