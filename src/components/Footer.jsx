import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "/", icon: <FaDiscord /> },
  { href: "/", icon: <FaTwitter /> },
  { href: "/", icon: <FaYoutube /> },
  { href: "/", icon: <FaMedium /> },
];

const Footer = () => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null); // Reference for the container section
  const contentRef = useRef(null); // Reference for the inner content

  // Mouse movement logic
  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();

    const xOffset = e.clientX - (rect.left + rect.width / 2);
    const yOffset = e.clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      gsap.to(sectionRef.current, {
        x: xOffset / 10,
        y: yOffset / 10,
        rotationY: xOffset / 20,
        rotationX: -yOffset / 20,
        duration: 0.5,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: -xOffset / 20,
        y: -yOffset / 20,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  }, [isHovering]);

  // Entrance Animation
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power4.out" }
    );
  }, []);

  return (
    <footer
      className=" h-40vh w-screen bg-[#5542ff] py-4 text-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={sectionRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative"
      >
        <div
          ref={contentRef}
          className="text-center font-bold text-8xl font-zentry"
        >
          <h1>ZENTRY</h1>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          © Nova 2024. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
