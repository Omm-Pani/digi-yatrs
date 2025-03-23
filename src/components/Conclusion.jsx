import React, { useState, useEffect, useRef } from "react";
import PrimaryButton from "../ui/PrimaryButton";

// Animation configuration
const ANIMATION_DISTANCE = 300; // Increased distance for smoother transition
const SCALE_FACTOR = 0.2; // Reduced scale factor for subtler effect
const TRANSITION = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export default function Conclusion() {
  const [progress, setProgress] = useState({ third: 0, second: 0, first: 0 });
  const refs = {
    third: useRef(null),
    second: useRef(null),
    first: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = {
        third: refs.third.current,
        second: refs.second.current,
        first: refs.first.current,
      };

      if (!Object.values(elements).every(Boolean)) return;

      const newProgress = calculateProgressions(elements);
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateProgressions = (elements) => {
    const progressions = { third: 0, second: 0, first: 0 };

    // Calculate progress for each element with overlap
    progressions.third = calculateProgress(elements.third);
    progressions.second = calculateProgress(
      elements.second,
      progressions.third
    );
    progressions.first = calculateProgress(elements.first, progressions.second);

    return progressions;
  };

  const calculateProgress = (element, previousProgress = 0) => {
    const rect = element.getBoundingClientRect();
    const distance = window.innerHeight - rect.top;
    const rawProgress = 1 - distance / ANIMATION_DISTANCE;

    // Add 0.2 overlap with previous section
    return Math.max(0, Math.min(1, rawProgress + previousProgress * 0.2));
  };

  const getSectionStyle = (sectionProgress) => ({
    opacity: 1 - sectionProgress,
    transform: `scale(${1 - SCALE_FACTOR * sectionProgress}) translateZ(0px)`,
    transition: TRANSITION,
    willChange: "opacity, transform",
  });

  return (
    <div className="overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto py-10">
        <div className="max-w-[1000px] mx-auto">
          {/* First Section */}
          <div ref={refs.first} style={getSectionStyle(progress.first)}>
            <div className="px-4">
              <h4 className="text-4xl text-center text-black py-4 font-bold">
                Conclusion
              </h4>
              <h6 className="font-medium text-xl py-4 leading-1.6">
                Wow, what a whirlwind adventure we had with Digi Yatra! This
                awesome app taught us all about the magic of AI, from making our
                boarding passes to recognizing our faces at the airport. Let's
                relive our journey and see what amazing things we discovered!
              </h6>
              <h6 className="text-xl font-bold py-4 leading-1.6">
                Our Incredible Journey:
              </h6>
              <h6 className="font-medium text-xl py-4 leading-1.6">
                When we used Digi Yatra, we felt like we had a real-life wizard
                helping us out. First, AI worked its magic to create our
                boarding passes for the big trip. It was like having a super
                speedy assistant who knew just what we needed!
              </h6>
              <h6 className="font-medium text-xl py-4 leading-1.6">
                Then, when we arrived at the airport, we stepped up to a
                mysterious-looking machine with a camera. We were a little
                nervous at first, but when we stood in front of it, something
                amazing happened. The machine recognized our faces, just like
                that! It was like having a friend who could spot us in a crowded
                room.
              </h6>
              <h6 className="font-medium text-xl py-4 leading-1.6">
                And not only did it recognize us, but it also showed our names
                on the screen! It felt like we were in a magical storybook,
                where everything knows who we are.
              </h6>
            </div>
          </div>

          {/* Second Section */}
          <div ref={refs.second} style={getSectionStyle(progress.second)}>
            <div className="px-4">
              <h6 className="text-xl font-bold py-4 leading-1.6">
                What We Learned:
              </h6>
              <h6 className="font-medium text-xl py-4 leading-1.6">
                Through our adventure, we realized that AI isn't just some fancy
                technology. It's like having a wise friend who can do all sorts
                of incredible things, like making sure we have our boarding
                passes ready and helping us breeze through airport security.
              </h6>
              <h6 className="font-medium text-xl py-4 leading-1.6">
                We also learned that AI isn't perfect. Sometimes, it might get a
                little mixed up or not recognize us right away. But that's okay!
                We can help teach it and make it even better, just like helping
                a friend learn something new.
              </h6>
            </div>
          </div>

          {/* Third Section */}
          <div ref={refs.third} style={getSectionStyle(progress.third)}>
            <div className="px-4">
              <h6 className="text-xl font-bold pt-4 leading-[1.6]">
                Dreaming of More Adventures:
              </h6>
              <h6 className="font-medium text-xl pb-4 pt-2 leading-[1.6]">
                As we head home from our journey, we can't help but dream of
                more adventures with AI by our side. With its help, we can
                explore new places, discover new things, and make memories that
                will last a lifetime. Who knows what magical adventures await us
                next time!
              </h6>
            </div>
          </div>
        </div>
      </div>
      {/* ... button section ... */}
      <div className="w-full mt-20 flex justify-center gap-6 pb-10">
        <PrimaryButton name={"Previous"} borderRadius={"50px"} />
      </div>
    </div>
  );
}
