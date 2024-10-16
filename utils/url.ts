// Extract the top-level domain from the url
// eg: https://www.example.com/path/to/page => example.com
export const extractDomainFromUrl = (urlString: string) => {
  const url = new URL(urlString);
  const hostnameParts = url.hostname.split('.');
  if (hostnameParts.length >= 2) {
    return hostnameParts.slice(-2).join('.');
  } else {
    return url.hostname;
  }
};
