import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/summary",
        icon: LayoutDashboard,
      },
      {
        title: "Customer",
        url: "/dashboard/customers",
        icon: Users,
      },
      {
        title: "Celebrity",
        url: "/dashboard/celebrities",
        icon: Users,
      },
      {
        title: "Voice Notes",
        url: "/dashboard/voice-notes",
        icon: ShoppingBag,
      },
      {
        title: "Plans",
        url: "/dashboard/plans",
        icon: ShoppingBag,
      },
      {
        title: "Payment Histories",
        url: "/dashboard/payment-histories",
        icon: ReceiptText,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: Forklift,
      },
    ],
  },
  // {
  //   id: 2,
  //   label: "Pages",
  //   items: [
  //     {
  //       title: "Email",
  //       url: "/mail",
  //       icon: Mail,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Chat",
  //       url: "/chat",
  //       icon: MessageSquare,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Calendar",
  //       url: "/calendar",
  //       icon: Calendar,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Kanban",
  //       url: "/kanban",
  //       icon: Kanban,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Invoice",
  //       url: "/invoice",
  //       icon: ReceiptText,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Users",
  //       url: "/users",
  //       icon: Users,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Roles",
  //       url: "/roles",
  //       icon: Lock,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Authentication",
  //       url: "/auth",
  //       icon: Fingerprint,
  //       subItems: [
  //         { title: "Login v1", url: "/auth/v1/login", newTab: true },
  //         { title: "Login v2", url: "/auth/v2/login", newTab: true },
  //         { title: "Register v1", url: "/auth/v1/register", newTab: true },
  //         { title: "Register v2", url: "/auth/v2/register", newTab: true },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   label: "Misc",
  //   items: [
  //     {
  //       title: "Others",
  //       url: "/others",
  //       icon: SquareArrowUpRight,
  //       comingSoon: true,
  //     },
  //   ],
  // },
];
