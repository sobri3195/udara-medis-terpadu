import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size], className)} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export const LoadingPage = ({ text = 'Memuat...' }: { text?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="xl" text={text} />
    </div>
  );
};

export const LoadingOverlay = ({ text = 'Memuat...' }: { text?: string }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
