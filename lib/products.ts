import {
  Radio,
  MonitorSmartphone,
  CloudCog,
  Share2,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

type Product = {
  id: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    icon: Radio,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "IoT Connectivity",
    description: "Reliable and global connectivity for your devices, anywhere.",
  },
  {
    id: 2,
    icon: MonitorSmartphone,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    title: "Device Management",
    description: "Easily manage, configure and monitor your devices at scale.",
  },
  {
    id: 3,
    icon: CloudCog,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    title: "IoT Platform",
    description: "Build, deploy and scale your IoT applications with ease.",
  },
  {
    id: 4,
    icon: Share2,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Network Management",
    description: "Optimize network performance and ensure uptime.",
  },
  {
    id: 5,
    icon: BarChart3,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    title: "Analytics & Insights",
    description:
      "Turn your data into meaningful insights and better decisions.",
  },
];
