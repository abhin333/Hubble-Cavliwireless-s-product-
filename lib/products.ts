import {
  Cpu,
  Globe2,
  CloudLightning,
  RadioTower,
  SlidersHorizontal,
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
    icon: Cpu,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Smart Cellular IoT Modules",
    description: "Industrial-grade 5G, 4G LTE Cat 1bis, Cat 4, and LPWA modules built with integrated eSIM technology.",
  },
  {
    id: 2,
    icon: CloudLightning,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    title: "Cavli Hubble™ Platform",
    description: "Enterprise-ready IoT connectivity and cloud management platform for global device orchestration.",
  },
  {
    id: 3,
    icon: Globe2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    title: "Global eSIM & Subscriptions",
    description: "Seamless over-the-air local profile provisioning across 180+ countries and 160+ local network operators.",
  },
  {
    id: 4,
    icon: RadioTower,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Hubble Lens & Diagnostics",
    description: "Remote AT-command execution and real-time monitoring of 40+ critical modem parameters.",
  },
  {
    id: 5,
    icon: SlidersHorizontal,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    title: "FOTA & Fleet Management",
    description: "Secure Firmware Over-The-Air (FOTA) updates and remote lifecycle management to scale deployments effortlessly.",
  },
];