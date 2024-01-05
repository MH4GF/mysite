import { MyAvatar } from "@/app/_components";
import { Link } from "@/app/_features/viewTransition";

export const Footer = () => {
  return (
    <footer>
      <section className="mb-4 text-center">
        <Link href="/">
          <MyAvatar />
          <h2 className="mt-2 font-bold">Hirotaka Miyagi</h2>
          <p className="text-sm text-slate-400">Software Engineer / @mh4gf</p>
        </Link>
      </section>
    </footer>
  );
};
