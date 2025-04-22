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
    icon: 'https://pbs.twimg.com/profile_images/1660378428145807360/6tw_dYvx_400x400.png',
  },
  // Add more authors as needed
};

export const getAuthor = (authorId?: string): Author => {
  if (!authorId || !authors[authorId]) {
    // Default author if not specified or not found
    return {
      name: 'Anonymous',
      icon: 'https://pbs.twimg.com/profile_images/1660378428145807360/6tw_dYvx_400x400.png',
    };
  }
  
  return authors[authorId];
};
