import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

import SurveyComponent from 'components/Survey';
import { Survey } from 'types/Survey';

type SurveyListProps = { surveys: Survey[]; onPageChange: any };

function SurveyList({ surveys, onPageChange }: SurveyListProps) {
  return (
    <>
      <Swiper
        className="survey-swiper"
        modules={[Pagination]}
        speed={800}
        spaceBetween={100}
        pagination={{ el: '.swiper-pagination', clickable: true, dynamicBullets: true }}
        slidesPerView={1}
        onReachEnd={onPageChange}
      >
        {surveys.map((survey) => {
          return (
            <SwiperSlide key={survey.id}>
              <SurveyComponent {...survey} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="survey-swiper swiper-pagination"></div>
    </>
  );
}

export default SurveyList;
