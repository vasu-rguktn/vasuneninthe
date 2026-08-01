import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Navigation() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 pointer-events-none mix-blend-difference text-white">
      <div className="container mx-auto px-6 pt-12 flex items-center justify-between">
        <Link to="/" className="font-logo text-[28px] hover:opacity-70 transition-opacity pointer-events-auto leading-none" data-cursor="hover">
          vasu's verse
        </Link>
        <nav className="hidden lg:flex gap-16 pointer-events-auto items-center">
          <button onClick={() => scrollTo('marginalia')} className="group text-[28px] font-buttons font-medium relative py-2 transition-colors hover:text-gold-accent">
            Marginalia
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-accent group-hover:w-full transition-all duration-500 ease-out" />
          </button>
          <Link to="/writers-desk" className="group text-[28px] font-buttons font-medium relative py-2 transition-colors hover:text-gold-accent">
            Writer's desk
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-accent group-hover:w-full transition-all duration-500 ease-out" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
