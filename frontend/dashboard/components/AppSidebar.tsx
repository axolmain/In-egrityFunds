'use client';
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  DollarSign,
  PieChart,
  Landmark,
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
  useSidebar, // Use the useSidebar hook
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

// Menu items
const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Budgets', url: '/budgets', icon: DollarSign },
  { title: 'Connections', url: '/connections', icon: Landmark },
  { title: 'Widgets', url: '/overview', icon: Calendar },
  { title: 'Search', url: '#', icon: Search },
  { title: 'Settings', url: '#', icon: Settings },
];

export function AppSidebar() {
  const { user, isLoading, error } = useUser();
  const { state } = useSidebar(); // Get the state of the sidebar (collapsed or expanded)
  const router = useRouter();
  const handleLogout = () => {
    router.push('/api/auth/logout'); // Redirect to Auth0 logout route
  };

  return (
    <Sidebar
      collapsible='icon'
      className='flex flex-col h-screen border-gray-200 dark:border-gray-700'
    >
      {/* Sidebar Content */}
      <SidebarContent className='flex-1'>
        <SidebarGroup>
          <SidebarGroupLabel className=' '>INEGRITY</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className='flex items-center gap-2 p-2 text-sm rounded-md'
                    >
                      <item.icon className='w-5 h-5' />
                      {state === 'expanded' && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer - Avatar and User Info */}
      <SidebarFooter className='border-t border-gray-200 dark:border-gray-700'>
        {!isLoading && user && (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    className={`flex items-center gap-2 w-full text-sm hover:bg-gray-100 rounded-md transition-colors p-0`}
                  >
                    {/* Avatar centered when collapsed */}
                    <div
                      className={`flex items-center w-full ${
                        state === 'collapsed'
                          ? 'justify-center'
                          : 'justify-start'
                      }`}
                    >
                      <Avatar className='w-6 h-6 rounded-md'>
                        <AvatarImage
                          src={user.picture || '/path/to/default-avatar.jpg'}
                          alt={user.name || 'User Avatar'}
                        />
                        <AvatarFallback>
                          {user.name ? user.name.charAt(0) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Show email when sidebar is expanded, closer to the avatar */}
                    {state === 'expanded' && (
                      <div className='flex flex-col text-left ml-1'>
                        <span className='text-xs text-gray-500 dark:text-gray-400 pr-[100px]'>
                          {user.email || 'user@example.com'}
                        </span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align='end'
                  side='right'
                  className='w-[--radix-popper-anchor-width] p-2 bg-white dark:bg-gray-800 shadow-lg rounded-md'
                >
                  <DropdownMenuItem>Upgrade to Pro</DropdownMenuItem>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Loading and Error States */}
        {isLoading && (
          <div className='flex items-center gap-2'>
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
