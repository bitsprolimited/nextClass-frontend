// components/HeroSection.tsx
import { Link } from "lucide-react";
import Image from "next/image";

export default function HeroSection(): React.JSX.Element {
  return (
    <section className="w-full bg-primary">
      <div className="container mx-auto h-full relative">
        <div className="relative h-full w-full">
          <div className="flex items-center justify-between gap-10 h-full w-full overflow-hidden">
            {/* Text Content */}
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col items-start mx-auto">
                <h1 className="text-[58px] font-aero-trial font-medium text-white">
                  Create Your Tutor Profile
                </h1>
                {/* Static breadcrumb */}
                <nav className="mt-2 text-sm text-white">
                  <ol className="list-reset flex">
                    <li>
                      Home
                      {/* <Link href="/" className="underline">
                        Home
                      </Link> */}
                    </li>
                    <li>
                      <span className="mx-2">{"//"}</span>
                    </li>
                    <li className="text-secondary">Register</li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* Primary image */}
            <div className="w-full h-full max-w-[450px] relative -bottom-2">
              <Image
                src="/images/profile-create.png"
                alt="Main Visual"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
