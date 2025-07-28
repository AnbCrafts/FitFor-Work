// JobIcons.js
import {
  Briefcase,
  UserCheck,
  UserPlus,
  BadgeCheck,
  Building2,
  FolderSearch,
  ClipboardList,
  Handshake,
  MonitorCheck,
} from "lucide-react";

 const jobIcons = [
  { id: "briefcase", icon: Briefcase },
  { id: "user-check", icon: UserCheck },
  { id: "user-plus", icon: UserPlus },
  { id: "badge-check", icon: BadgeCheck },
  { id: "building", icon: Building2 },
  { id: "folder-search", icon: FolderSearch },
  { id: "clipboard", icon: ClipboardList },
  { id: "handshake", icon: Handshake },
  { id: "monitor-check", icon: MonitorCheck },
];


export const getRandomJobIcon = () => {
  const index = Math.floor(Math.random() * jobIcons.length);
  return jobIcons[index];
};
