import { Search, Bell, HelpCircle, Calendar, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border flex items-center px-4 gap-4 bg-card">
      <SidebarTrigger />
      
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-secondary border-border"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Calendar className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@finicify.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};
