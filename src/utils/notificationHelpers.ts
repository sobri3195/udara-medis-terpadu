export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'critical';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export const createNotification = (
  type: NotificationType,
  title: string,
  message: string,
  priority: NotificationPriority = 'medium',
  metadata?: Record<string, any>
): Notification => {
  return {
    id: generateNotificationId(),
    type,
    priority,
    title,
    message,
    timestamp: new Date(),
    read: false,
    metadata,
  };
};

export const generateNotificationId = (): string => {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const sortNotificationsByPriority = (notifications: Notification[]): Notification[] => {
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  return [...notifications].sort((a, b) => {
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
};

export const filterUnreadNotifications = (notifications: Notification[]): Notification[] => {
  return notifications.filter((n) => !n.read);
};

export const filterByType = (
  notifications: Notification[],
  type: NotificationType
): Notification[] => {
  return notifications.filter((n) => n.type === type);
};

export const filterByDateRange = (
  notifications: Notification[],
  startDate: Date,
  endDate: Date
): Notification[] => {
  return notifications.filter((n) => n.timestamp >= startDate && n.timestamp <= endDate);
};

export const markAsRead = (notifications: Notification[], id: string): Notification[] => {
  return notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
};

export const markAllAsRead = (notifications: Notification[]): Notification[] => {
  return notifications.map((n) => ({ ...n, read: true }));
};

export const deleteNotification = (notifications: Notification[], id: string): Notification[] => {
  return notifications.filter((n) => n.id !== id);
};

export const getNotificationIcon = (type: NotificationType): string => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    critical: '🚨',
  };
  return icons[type];
};

export const getNotificationColor = (type: NotificationType): string => {
  const colors = {
    info: 'blue',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    critical: 'purple',
  };
  return colors[type];
};

export const shouldPlaySound = (priority: NotificationPriority): boolean => {
  return priority === 'urgent' || priority === 'high';
};

export const groupNotificationsByDate = (
  notifications: Notification[]
): Record<string, Notification[]> => {
  return notifications.reduce((groups, notification) => {
    const dateKey = notification.timestamp.toLocaleDateString('id-ID');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);
};

export const getNotificationSummary = (notifications: Notification[]): {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
} => {
  const unread = filterUnreadNotifications(notifications).length;
  
  const byType: Record<NotificationType, number> = {
    info: 0,
    success: 0,
    warning: 0,
    error: 0,
    critical: 0,
  };
  
  const byPriority: Record<NotificationPriority, number> = {
    low: 0,
    medium: 0,
    high: 0,
    urgent: 0,
  };
  
  notifications.forEach((n) => {
    byType[n.type]++;
    byPriority[n.priority]++;
  });
  
  return {
    total: notifications.length,
    unread,
    byType,
    byPriority,
  };
};

export const createInventoryAlertNotification = (
  itemName: string,
  currentStock: number,
  minStock: number
): Notification => {
  return createNotification(
    'warning',
    'Stok Menipis',
    `${itemName} tersisa ${currentStock} unit (minimal: ${minStock})`,
    'high',
    { itemName, currentStock, minStock }
  );
};

export const createExpiryAlertNotification = (
  itemName: string,
  expiryDate: Date,
  daysUntilExpiry: number
): Notification => {
  return createNotification(
    daysUntilExpiry <= 7 ? 'critical' : 'warning',
    'Peringatan Kadaluarsa',
    `${itemName} akan kadaluarsa dalam ${daysUntilExpiry} hari (${expiryDate.toLocaleDateString('id-ID')})`,
    daysUntilExpiry <= 7 ? 'urgent' : 'high',
    { itemName, expiryDate, daysUntilExpiry }
  );
};

export const createMaintenanceReminderNotification = (
  equipmentName: string,
  dueDate: Date
): Notification => {
  return createNotification(
    'info',
    'Pengingat Perawatan',
    `${equipmentName} memerlukan perawatan pada ${dueDate.toLocaleDateString('id-ID')}`,
    'medium',
    { equipmentName, dueDate }
  );
};
