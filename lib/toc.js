const HEADING_PATTERN = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm;

function stripInlineMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function slugifyHeading(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function textFromChildren(children) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  if (children?.props?.children) {
    return textFromChildren(children.props.children);
  }

  return "";
}

export function extractHeadings(markdown) {
  const contentWithoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const headings = [];

  for (const match of contentWithoutCode.matchAll(HEADING_PATTERN)) {
    const text = stripInlineMarkdown(match[2]);

    if (!text) {
      continue;
    }

    headings.push({
      id: slugifyHeading(text),
      text,
      level: match[1].length,
    });
  }

  return headings;
}
