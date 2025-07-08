import { Text, ListItem } from '../atoms'
import { NavLink } from '../molecules'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="h-16 md:h-20 flex items-center">
          <nav className="w-full">
            <ul className="flex justify-between items-center w-full">
              <ListItem>
                <NavLink href="/">
                  <Text className="font-bold text-lg md:text-xl text-gray-900 hover:text-blue-600 transition-colors duration-200">ONE Engineering</Text>
                </NavLink>
              </ListItem>
              <div className="flex items-center gap-6">
                <ListItem>
                  <NavLink href="/authors">
                    <Text className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                      Authors
                    </Text>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink href="https://herp.careers/v1/oneinc" isExternal>
                    <Text className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-2">
                      採用情報
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Text>
                  </NavLink>
                </ListItem>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}