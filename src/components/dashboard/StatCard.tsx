
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <span className={cn(
                "ml-2 text-xs font-medium",
                trend.isPositive ? "text-tniau-green" : "text-tniau-red"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
        </div>
        <div className="p-2 bg-primary/10 rounded-md">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
