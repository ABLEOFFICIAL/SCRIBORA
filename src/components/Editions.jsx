import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Editions({ colour = "white" }) {
  return (
    <div
      className={`flex items-center space-x-2 text-${colour} relative z-[1000]`}
    >
      <span>Editions:</span>
      <Select defaultValue="light">
        <SelectTrigger className="w-[180px] border focus:outline-none focus-visible:ring-ring/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">🇳🇬Nigeria</SelectItem>
          <SelectItem value="dark">🇲🇻Cameroon</SelectItem>
          <SelectItem value="system">🇰🇼Cote d' ivoire</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
