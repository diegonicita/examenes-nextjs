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
  const { className, style, onClick } = props
  return (
    <div
      onKeyDown={onClick}
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props
  return (
    <div
      onKeyDown={onClick}
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
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
    nextArrow: <SampleNextArrow />,
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
