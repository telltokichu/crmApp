import type { Icon } from "@tabler/icons-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function NavMain({
    items,
    activePath,
}: {
    activePath: string;
    items: {
        title: string;
        url: string;
        icon?: Icon;
        path: string;
    }[];
}) {
    const navigate = useNavigate();
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} onClick={() => navigate(item.path)}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                isActive={activePath === item.path}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
