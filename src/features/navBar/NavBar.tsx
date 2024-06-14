import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => (
  <>
    <article className="relative flex h-[70px] items-center bg-black px-4">
      <header className="flex items-center">
        <Image
          src="/images/mtg_logo.png"
          alt="MTG logo"
          width={160}
          height={60}
          priority
        />
      </header>
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl">
        MTGenerator
      </div>
    </article>
    {children}
  </>
);
export { NavBar };
