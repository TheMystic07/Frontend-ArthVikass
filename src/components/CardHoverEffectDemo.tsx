//@ts-nocheck
import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Property Tax ",
    // description:
    //   "A technology company that builds economic infrastructure for the internet.",
    link: "/tax/property ",
  },
  {
    title: "Water Tax",
    // description:
    //   "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "/tax/water",
  },
  {
    title: "Garbage Collection Tax",
    // description:
    //   "A multinational technology company that specializes in Internet-related services and products.",
    link: "/tax/garbage",
  },
  // {
  //   title: "All Taxes in a Single Click",
  //   description:
  //     "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
  //   link: "/",
  // },
  // {
  //   title: "Frequently Asked Questions",
  //   description:
  //     "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  //   link: "/",
  // },
  // {
  //   title: "Payment History",
  //   description:
  //     "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
  //   link: "/",
  // },
];
