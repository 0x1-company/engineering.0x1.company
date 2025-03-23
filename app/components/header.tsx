import { JSX } from 'hono/jsx/jsx-runtime';

// Navigation Link Component
type NavLinkProps = {
  href: string;
  children: JSX.Element;
  isExternal?: boolean;
}

const NavLink = ({ href, children, isExternal = false }: NavLinkProps) => (
  <li>
    <a 
      href={href} 
      className="px-4 py-2 text-gray-700 hover:text-[#FF8040] transition-colors font-medium text-sm"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  </li>
);


// Main Header Component
export const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center">
          <ul className="flex justify-between items-center w-full">
            <NavLink href="/">
              <p class='font-bold'>Engineering Blog</p>
            </NavLink>
            <NavLink href="https://herp.careers/v1/oneinc" isExternal>
              <p>採用情報</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </header>
  );
};
