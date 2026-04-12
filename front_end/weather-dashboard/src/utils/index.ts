
export const formatDay = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });