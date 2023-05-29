export function parseAuthToken(token: string): Record<string, any> {
  return JSON.parse(atob(token.split(".")[1]));
}

export function fixDates(...keys: string[]) {
  return (data: any) => {
    for (const key of keys) {
      data[key] += "Z";
    }
    return data;
  };
}
