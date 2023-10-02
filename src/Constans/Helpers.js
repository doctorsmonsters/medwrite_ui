export function formatSemanticDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const date = new Date(dateString);
  return date.toLocaleString(undefined, options);
}

export const clearLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userToken");
};
