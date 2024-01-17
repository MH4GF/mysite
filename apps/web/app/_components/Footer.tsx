import { MyAvatar } from "./MyAvatar";
import { UniversalLink } from "./UniversalLink";

export const Footer = () => {
  return (
    <footer>
      <section className="mb-4 text-center">
        <UniversalLink href="/">
          <MyAvatar />
          <h2 className="mt-2 font-bold">Hirotaka Miyagi</h2>
          <p className="text-sm text-slate-400">Software Engineer / @mh4gf</p>
        </UniversalLink>
      </section>
    </footer>
  );
};
