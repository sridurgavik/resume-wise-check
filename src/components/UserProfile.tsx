
import React from 'react';
import { User } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserProfileProps {
  userName?: string;
}

export const UserProfile = ({ userName = "User" }: UserProfileProps) => {
  // Mock user data - this would come from your API/backend
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    remainingScans: 1
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background/40 text-sm hover:bg-background/60 transition-colors">
          <User className="h-4 w-4" />
          <span>Hello, {userName}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">{userData.name}</h4>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phone:</span>
              <span>{userData.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining scans today:</span>
              <span className="font-medium">{userData.remainingScans}</span>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Free plan: 1 scan per day
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
