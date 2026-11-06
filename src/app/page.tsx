import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Credentials } from "@/components/Credentials";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Credentials />
    </>
  );
}
