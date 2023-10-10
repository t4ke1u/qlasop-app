'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

// eslint-disable-next-line import/named
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { GoCpu } from 'react-icons/go'
import { RxTable, RxGear, RxRocket, RxMagnifyingGlass } from 'react-icons/rx'

import type { BoxProps, FlexProps } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

type LinkItemProps = {
  href?: string
  icon: IconType
  name: string
}
const LinkItems: Array<LinkItemProps> = [
  { icon: RxRocket, name: 'Dashboard' },
  { href: '/project/timetable', icon: RxTable, name: 'Timetable' },
  { href: '/project/search', icon: RxMagnifyingGlass, name: 'Search' },
  { icon: GoCpu, name: 'Auto Create' },
  { icon: RxGear, name: 'Settings' },
]

export const ProjectSidebarWithHeader = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box bg='white' minH='100vh'>
      <SidebarContent display={{ base: 'none', md: 'block' }} onClose={() => onClose} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={onClose}
        placement='left'
        returnFocusOnClose={false}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  )
}

type SidebarProps = {
  onClose: () => void
} & BoxProps

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg='white'
      borderRight='1px'
      borderRightColor='gray.200'
      h='full'
      pos='fixed'
      transition='3s ease'
      w={{ base: 'full', md: 60 }}
      {...rest}
    >
      <Flex alignItems='center' h='20' justifyContent='space-between' mx='8'>
        <Text fontFamily='monospace' fontSize='2xl' fontWeight='bold'>
          Opclass
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem href={link.href} icon={link.icon} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

type NavItemProps = {
  children: React.ReactNode
  href?: string
  icon: IconType
} & FlexProps
const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      _focus={{ boxShadow: 'none' }}
      href={href ? href : '#'}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        _hover={{
          bg: 'gray.400',
          color: 'white',
        }}
        align='center'
        borderRadius='lg'
        cursor='pointer'
        mx='4'
        p='4'
        role='group'
        {...rest}
      >
        {icon && (
          <Icon
            _groupHover={{
              color: 'white',
            }}
            as={icon}
            fontSize='16'
            mr='4'
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

type HeaderProps = {
  onOpen: () => void
} & FlexProps

const Header = ({ onOpen, ...rest }: HeaderProps) => {
  return (
    <Flex
      alignItems='center'
      bg='white'
      borderBottomColor={'gray.200'}
      borderBottomWidth='1px'
      height='20'
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      {...rest}
    >
      <IconButton
        aria-label='open menu'
        display={{ base: 'flex', md: 'none' }}
        icon={<FiMenu />}
        onClick={onOpen}
        variant='outline'
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontFamily='monospace'
        fontSize='2xl'
        fontWeight='bold'
      >
        Opclass
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton size='lg' variant='ghost' aria-label='open menu' icon={<FiBell />} /> */}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton _focus={{ boxShadow: 'none' }} py={2} transition='all 0.3s'>
              <HStack>
                <Avatar bg='teal.500' size={'sm'} />
                <VStack
                  alignItems='flex-start'
                  display={{ base: 'none', md: 'flex' }}
                  ml='2'
                  spacing='1px'
                >
                  <Text fontSize='sm'>User Name</Text>
                  <Text color='gray.600' fontSize='xs'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
