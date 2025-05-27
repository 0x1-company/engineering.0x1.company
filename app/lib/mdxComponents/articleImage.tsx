type Props = {
  src: string;
  alt: string;
};

export const ArticleImage = (props: Props) => {
  const isFullUrl = props.src.startsWith("http");
  // In development, use a relative path
  const imageUrl = `/assets/${props.src}`;
  return (
    <figure className="full-width justify-center flex">
      <a href={isFullUrl ? props.src : imageUrl}>
        <img
          className={"object-contain max-h-[500px] max-w-full h-auto w-auto"}
          src={isFullUrl ? props.src : imageUrl}
          loading="lazy"
          alt={props.alt}
          width={"auto"}
          height={"auto"}
        />
      </a>
    </figure>
  );
};
