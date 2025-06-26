export type ResponseInfo = {
  url: string;
  host: string;
  status: number;
  statusText: string;
  duration?: string | null;
  icons: {
    sizes?: string;
    href: string;
  }[];
};

// Fetch favicons from a given URL and return ResponseInfo
export const getFavicons = async ({
  url,
  headers,
}: {
  url: string;
  headers?: Headers;
}): Promise<ResponseInfo> => {
  const newUrl = new URL(url); // Create a URL object to extract the host

  try {
    // Perform the fetch request with optional headers and redirection follow
    const requestHeaders = new Headers(headers);
    requestHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
    requestHeaders.set('Accept-Language', 'en-US,en;q=0.5');
    requestHeaders.set('Accept-Encoding', 'gzip, deflate');
    requestHeaders.set('User-Agent', 'Mozilla/5.0 (compatible; FaviconBot/1.0)');
    
    const response = await fetch(newUrl.toString(), {
      method: 'GET',
      redirect: 'follow',
      headers: requestHeaders,
    });

    // 获取响应的字符编码
    const contentType = response.headers.get('content-type') || '';
    let body: string;
    
         // 尝试从 Content-Type 头部获取编码
     const charsetMatch = contentType.match(/charset=([^;]+)/i);
     const charset = charsetMatch?.[1]?.toLowerCase() || null;
    
    if (charset && charset !== 'utf-8') {
      // 如果指定了非 UTF-8 编码，使用 arrayBuffer 然后解码
      const buffer = await response.arrayBuffer();
      const decoder = new TextDecoder(charset);
      body = decoder.decode(buffer);
    } else {
      // 默认使用 UTF-8
      body = await response.text();
    }
    
    const responseUrl = new URL(response.url);

    // Regex to match <link> tags with "rel" containing icon-related values
    // Matches: icon, shortcut icon, apple-touch-icon, apple-touch-icon-precomposed, etc.
    const regex = /<link[^>]*rel=['"]?[^'"]*(?:shortcut\s+|apple-touch-)?icon[^'"]*['"]?[^>]*?>/gi;
    const matches = Array.from(body.matchAll(regex));
    const icons: { sizes: string; href: string }[] = [];

    matches.forEach((match) => {
      const linkTag = match[0];

      // Extract href value
      const hrefMatch = linkTag.match(/href=['"]?([^\s>'"]*)['"]?/i);
      const href = hrefMatch ? hrefMatch[1] : null;

      // Extract sizes value
      const sizesMatch = linkTag.match(/sizes=['"]?([^\s>'"]*)['"]?/i);
      const sizes = sizesMatch ? sizesMatch[1] : null;

      if (href) {
        let fullHref: string;
        
        if (href.startsWith('http') || href.startsWith('data:image')) {
          // 绝对 URL 或 data URL
          fullHref = href;
        } else if (href.startsWith('//')) {
          // 协议相对 URL (//example.com/favicon.ico)
          fullHref = `${responseUrl.protocol}${href}`;
        } else if (href.startsWith('/')) {
          // 根相对 URL (/favicon.ico)
          fullHref = `${responseUrl.protocol}//${responseUrl.host}${href}`;
        } else {
          // 相对 URL (favicon.ico)
          fullHref = `${responseUrl.protocol}//${responseUrl.host}/${href}`;
        }
        
        icons.push({
          sizes: sizes || 'unknown',
          href: fullHref,
        });
      }
    });

    return {
      url: responseUrl.href,
      host: responseUrl.host,
      status: response.status,
      statusText: response.statusText,
      icons,
    };
  } catch (error: any) {
    console.error(`Error fetching favicons: ${error.message}`);
    return {
      url: newUrl.href,
      host: newUrl.host,
      status: 500,
      statusText: 'Failed to fetch icons',
      icons: [],
    };
  }
};

// Function to fetch favicon from alternative sources
export const proxyFavicon = async ({ domain }: { domain: string }) => {
  // List of alternative sources to fetch favicons
  const sources = [
    `https://favicon.im/${domain}?larger=true`,
    `https://www.google.com/s2/favicons?domain=${domain}`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ];
  let response: Response = new Response('', {
    status: 500,
  });

  // Attempt to fetch favicon from each source
  for (const source of sources) {
    try {
      response = await fetch(source, {
        redirect: 'follow',
      });
      if (response.ok) {
        console.log('icon source ok:', source);
        break;
      }
    } catch (error: any) {
      console.error(`Error fetching proxy favicon: ${error.message}`, source);
    }
  }
  if (!response.ok) {
    const firstLetter = domain.charAt(0).toUpperCase();
    const svgContent = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#cccccc"/>
        <text x="50%" y="50%" font-size="48" text-anchor="middle" dominant-baseline="middle" fill="#000000">${firstLetter}</text>
      </svg>
    `;
    return new Response(svgContent, {
      status: 404,
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'Content-Type': 'image/svg+xml',
      },
    });
  } else {
    // Return the fetched favicon
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/x-icon',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }
};
