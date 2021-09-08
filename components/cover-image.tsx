import cn from 'classnames';
import Link from 'next/link';

type Props = {
  title: string;
  src: string;
  slug?: string;
  coverFirstImage?: boolean;
};

const CoverImage = ({ title, src, slug, coverFirstImage }: Props) => {
  const image = (
    <img
      src={src}
      style={{
        width: '100%',
        height: coverFirstImage ? '100%' : '300px',
      }}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  );
  return (
    <div className='sm:mx-0'>
      {slug ? (
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
