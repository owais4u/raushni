'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Heart,
  TrendingUp,
  Calendar,
  FileText,
  DollarSign,
  Briefcase,
  Activity,
  Mail,
  Newspaper,
  FolderKanban,
  Receipt,
  FileCheck,
  Award,
  UserPlus,
  HandHeart,
  GraduationCap,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const menuItems = [
  { category: "Main", items: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Beneficiary Management", href: "/beneficiaries", icon: Users },
    { name: "Crowd Funding", href: "/crowdfunding", icon: TrendingUp },
    { name: "Internship Management", href: "/internships", icon: Briefcase },
  ]},
  { category: "Management", items: [
    { name: "Donation Management", href: "/donations", icon: Heart },
    { name: "Activity Posts", href: "/activities", icon: Activity },
    { name: "Event Management", href: "/events", icon: Calendar },
    { name: "Designation Management", href: "/designations", icon: UserPlus },
    { name: "Enquiry Management", href: "/enquiries", icon: Mail },
    { name: "News Management", href: "/news", icon: Newspaper },
    { name: "Project Management", href: "/projects", icon: FolderKanban },
    { name: "Expense Management", href: "/expenses", icon: Receipt },
  ]},
  { category: "Documents", items: [
    { name: "Member ID Card", href: "/member-id", icon: FileText },
    { name: "80G Donation Receipt", href: "/donation-receipt", icon: FileCheck },
    { name: "Appointment Letter", href: "/appointment", icon: GraduationCap },
    { name: "Achievement Certificate", href: "/certificate", icon: Award },
    { name: "Annual Audit Report", href: "/audit", icon: FileText },
  ]},
  { category: "Support", items: [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ]}
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 overflow-y-auto shadow-xl lg:shadow-none ${
          sidebarOpen ? 'block' : 'hidden lg:block lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Raushni
                </h1>
                <p className="text-xs text-gray-500">NGO Management</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {menuItems.map((category, idx) => (
              <div key={idx}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {category.category}
                </p>
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                          active
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        <Icon size={18} className={active ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'} />
                        <span className="text-sm font-medium">{item.name}</span>
                        {active && (
                          <motion.div
                            layoutId="active-indicator"
                            className="ml-auto w-1 h-1 bg-white rounded-full"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}