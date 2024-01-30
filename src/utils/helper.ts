export const createTags = (
  tags: string[]
): { slug: string; name: string }[] => {
  const newArr = tags.map((a: string) => {
    a.trim();
    return {
      slug: a,
      name: a,
    };
  });

  return newArr;
};
