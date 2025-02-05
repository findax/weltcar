import Image from "next/image";
import linkDarkImage from '@/images/icons/link-dark.svg';
import linkLightImage from '@/images/icons/link-light.svg';
import { Article } from "@/types/blog";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useEffect } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import Link from "next/link";
import { Route } from "next";

interface IProps {
  blogItem: Article;
  heightImage?: string;
  sizeTitle?: string;
  className?: string;
}

const BlogCard = ({
  className = '',
  heightImage,
  sizeTitle = 'text-3xl',
  blogItem,
}: IProps) => {
  const { isDarkMode, mounted } = useThemeMode();
  const {formattedDate} = useFormattedDate(blogItem.published_at);
  const { slug } = blogItem;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <Link href={`/blog-details/${slug}` as Route} target='_blank'>
      <div
        className={`w-full h-full cursor-pointer hover:shadow-lg flex flex-col border-neutral-950 bg-white dark:bg-neutral-950 rounded-3xl ${className}`}
        data-nc-id='BlogCard'
      >
        <div className={`w-full ${heightImage}`}>
          <img 
            src={blogItem.preview_image.thumb}
            alt="blog image"
            className="w-full h-full object-cover rounded-t-3xl"
          />
        </div>
        <div className="flex flex-col p-8 gap-4">
          <span className={`block font-semibold leading-9 text-neutral-1050 dark:text-white leading-9 ${sizeTitle}`}>{blogItem.title}</span>
          <span className="block text-lg text-neutral-500 dark:text-neutral-400">{blogItem.preview_text}</span>
          <div className="flex items-center justify-between">
            <div className="p-2.5 cursor-pointer">
              <Image 
                src={isDarkMode ? linkDarkImage : linkLightImage}
                alt="link arrow"
                className="w-3 h-3"
              />
            </div>
            <span className="block text-lg text-primary-600 dark:text-secondary-950">{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
