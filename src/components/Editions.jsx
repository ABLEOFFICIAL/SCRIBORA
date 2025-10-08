import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Editions({
  colour = "white",
  className,
  dropDownClass = "w-[180px]",
}) {
  const [selectedEdition, setSelectedEdition] = useState("light"); // State to track selection

  return (
    <div
      className={`flex ${className} items-center space-x-2 text-${colour} relative z-[1000]`}
    >
      <span>Editions:</span>
      <Select value={selectedEdition} onValueChange={setSelectedEdition}>
        <SelectTrigger
          className={`${dropDownClass} border focus:outline-none focus-visible:ring-ring/50`}
          data-sidebar-element="true" // Add identifier
        >
          <SelectValue placeholder="Select an edition" />
        </SelectTrigger>
        <SelectContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()} // Prevent focus-related issues
          position="popper"
          sideOffset={4}
          className="z-[9999]"
          data-sidebar-element="true" // Add identifier
        >
          <SelectItem value="light">🇳🇬 Nigeria</SelectItem>
          <SelectItem value="dark">🇲🇻 Cameroon</SelectItem>
          <SelectItem value="system">🇰🇼 Cote d'Ivoire</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
