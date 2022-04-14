const track = (event: string, data?: string) => {
  if (typeof window !== "undefined") {
    if (typeof (window as any).umami !== "undefined") {
      (window as any).umami.trackEvent(data ?? "", event);
      // (window as any).umami.trackEvent(typeof data === 'string' ? data : JSON.stringify(data) ?? '', event);
    }
  }
};

export default track;
