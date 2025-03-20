
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { countries } from "@/utils/countryData";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultCountry?: string;
  onCountryChange?: (country: string) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, defaultCountry = "IN", onChange, onCountryChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState(
      countries.find((country) => country.code === defaultCountry) || countries.find((country) => country.code === "IN")
    );

    const handleCountrySelect = (country: typeof selectedCountry) => {
      setSelectedCountry(country);
      setOpen(false);
      if (onCountryChange) {
        onCountryChange(country?.code || "");
      }
    };

    return (
      <div className={cn("flex", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex gap-1 h-10 rounded-r-none border-r-0 focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 w-[4.5rem]"
              type="button"
            >
              <span className="text-sm">{selectedCountry?.code}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandList className="max-h-[300px]">
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      onSelect={() => handleCountrySelect(country)}
                    >
                      <span className="mr-2">{country.code}</span>
                      <span>{country.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {country.dialCode}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex items-center rounded-l-none border h-10 px-3 text-sm">
          {selectedCountry?.dialCode}
        </div>
        <Input
          ref={ref}
          className="rounded-l-none border-l-0"
          type="tel"
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
