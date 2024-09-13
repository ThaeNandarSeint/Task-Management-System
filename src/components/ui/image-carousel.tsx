import { CarouselProps, Carousel as MantineCarousel } from "@mantine/carousel";

export const ImageCarousel = ({
  items,
  ...props
}: { items: { value: string }[] } & CarouselProps) => {
  return (
    <MantineCarousel withIndicators {...props}>
      {items.map((item) => (
        <MantineCarousel.Slide>
          <img
            src={item.value}
            alt="product"
            className="w-full h-full object-cover"
          />
        </MantineCarousel.Slide>
      ))}
    </MantineCarousel>
  );
};
