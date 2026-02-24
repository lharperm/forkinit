import { Utensils } from 'lucide-react';

interface ForkLogoProps {
  className?: string;
}

export function ForkLogo({ className }: ForkLogoProps) {
  return <Utensils className={className} />;
}