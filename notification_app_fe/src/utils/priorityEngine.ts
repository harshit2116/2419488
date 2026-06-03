type Notification = {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
};

const PRIORITY: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getTopNotifications(
  notifications: Notification[],
  count = 10
) {
  return [...notifications]
    .sort((a, b) => {
      const priorityDiff =
        PRIORITY[b.Type] -
        PRIORITY[a.Type];

      if (priorityDiff !== 0)
        return priorityDiff;

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    })
    .slice(0, count);
}