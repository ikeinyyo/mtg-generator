import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => (
  <>
    <article className="relative flex h-[50px] items-center bg-black px-4">
      <header className="flex items-center">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl"
          style={{ fontFamily: "Beleren" }}
        >
          MTGenerator
        </div>
      </header>
    </article>
    {children}
  </>
);
export { NavBar };
