type Author = {
  name: string;
  icon: string;
};

type Authors = {
  [key: string]: Author;
};

export const authors: Authors = {
  tomokisun: {
    name: 'tomokisun',
    icon: 'https://engineering.0x1.company/tomokisun.png',
  },
  // Add more authors as needed
};

export const getAuthor = (authorId?: string): Author => {
  if (!authorId || !authors[authorId]) {
    // Default author if not specified or not found
    return {
      name: 'Anonymous',
      icon: 'https://engineering.0x1.company/tomokisun.png',
    };
  }
  
  return authors[authorId];
};
