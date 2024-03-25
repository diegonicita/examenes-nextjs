import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onClick?: any
}
function SampleNextArrow(props: ArrowProps) {
  const { onClick } = props
  return (
    <div
      onKeyDown={onClick}
      className='block md:cursor-pointer  md:flex md:justify-end md:w-full '
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='#50C4ED'
        className='relative bottom-[292px] -right-5  '
        viewBox='0 0 16 16'
      >
        <title>siguiente</title>
        <path
          fillRule='evenodd'
          d='M5.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 1 1-.708-.708L11.793 8 5.646 1.854a.5.5 0 0 1 0-.708z'
        />
      </svg>
    </div>
  )
}

function SamplePrevArrow(props: ArrowProps) {
  const { onClick } = props
  return (
    <div
      className='block md:cursor-pointer'
      onClick={onClick}
      onKeyDown={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg '
        width='16'
        height='16'
        fill='#50C4ED'
        className='relative top-48 -left-5'
        viewBox='0 0 16 16'
      >
        <title>anterior</title>
        <path
          fillRule='evenodd'
          d='M10.354 1.646a.5.5 0 0 1 0 .708L4.707 8l5.647 5.646a.5.5 0 1 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
        />
      </svg>
    </div>
  )
}

export default function SliderResponsive({
  children,
}: { children: React.ReactNode }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    initialSlide: 0,
    nextArrow: <SampleNextArrow className='fill-blue-500' />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className='slider-container'>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}
