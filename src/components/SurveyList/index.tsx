import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles
// import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import SurveyComponent from 'components/Survey';
import { Survey } from 'types/Survey';

type SurveyListProps = { surveys: Survey[] };

function SurveyList({ surveys }: SurveyListProps) {
  return (
    <Swiper
      className="survey-swiper"
      modules={[Pagination]}
      speed={800}
      pagination={{ clickable: true, dynamicBullets: true }}
      slidesPerView={1}
    >
      {surveys.map((survey) => {
        return (
          <SwiperSlide key={survey.id}>
            <SurveyComponent {...survey} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SurveyList;
