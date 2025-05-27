import { Text, ListItem } from '../atoms'
import { NavLink } from '../molecules'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center">
          <nav className="w-full">
            <ul className="flex justify-between items-center w-full">
              <ListItem>
                <NavLink href="/">
                  <Text className="font-bold">ONE Engineering</Text>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink href="https://herp.careers/v1/oneinc" isExternal>
                  <Text>採用情報</Text>
                </NavLink>
              </ListItem>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}