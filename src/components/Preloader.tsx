import { useEffect, useState } from "react";

const Preloader = ({ onDone }: { onDone: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(onDone, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <img
        src="/images/logo.png"
        alt="MISAPLAY-TV"
        className="w-40 md:w-56"
        style={{ animation: "preloader-zoom 1.5s ease-out forwards" }}
      />
    </div>
  );
};

export default Preloader;
