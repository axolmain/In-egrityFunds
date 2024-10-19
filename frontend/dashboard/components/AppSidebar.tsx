'use client';
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronUp,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user, isLoading, error } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle sidebar collapse/expand toggle
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Sidebar collapsible='icon' className='flex flex-col h-screen'>
      {/* Sidebar Content */}
      <SidebarContent className='flex-1'>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className='flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors'
                    >
                      <item.icon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                      {/* Hide text if collapsed */}
                      {!isCollapsed && (
                        <span className='text-gray-700 dark:text-gray-300'>
                          {item.title}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className='border-t border-gray-200 dark:border-gray-700 p-4'>
        {!isLoading && user && (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className='flex items-center gap-2 w-full'>
                    {/* Adjust Avatar size and remove padding */}
                    <Avatar className='w-5 h-5 rounded-md'>
                      <AvatarImage
                        src={user.picture || '/path/to/default-avatar.jpg'}
                        alt={user.name || 'User Avatar'}
                      />
                      <AvatarFallback>
                        {user.name ? user.name.charAt(0) : 'U'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Show user info only if sidebar is not collapsed */}
                    {!isCollapsed && (
                      <div className='flex flex-col text-left'>
                        <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                          {user.name || 'Username'}
                        </span>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                          {user.email || 'user@example.com'}
                        </span>
                      </div>
                    )}

                    {/* Chevron only shown when not collapsed */}
                    {!isCollapsed && (
                      <ChevronUp className='ml-auto w-4 h-4 text-gray-500 dark:text-gray-400' />
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  side='right'
                  className='w-[--radix-popper-anchor-width] p-2 bg-white dark:bg-gray-800 shadow-lg rounded-md'
                >
                  <DropdownMenuItem>
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        {isLoading && (
          <div className='flex items-center gap-2 p-0'>
            <div className='w-5 h-5 bg-gray-300 rounded-md animate-pulse' />
            <div className='flex flex-col'>
              <div className='w-16 h-3 bg-gray-300 rounded animate-pulse' />
              <div className='w-24 h-3 bg-gray-300 rounded mt-1 animate-pulse' />
            </div>
          </div>
        )}
        {error && (
          <div className='text-red-500'>Error loading user information</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
