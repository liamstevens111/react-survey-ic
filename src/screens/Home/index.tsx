import { useState, useEffect, useRef } from 'react';

import SurveyAdapter from 'adapters/surveyAdapter';
import { Survey } from 'types/Survey';
import { SurveyResponse } from 'types/SurveyResponse';

import SurveyList from '../../components/SurveyList';

const HomeScreen = (): JSX.Element => {
  const [surveyPage, setSurveyPage] = useState(1);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const loading = useRef(false);

  const handlePageChange = () => {
    setSurveyPage(surveyPage + 1);
  };

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyResponse = await SurveyAdapter.list(surveyPage);

      const surveyData: SurveyResponse = await surveyResponse.data;

      const parsedSurveys: Survey[] = [];

      surveyData.forEach((survey) => {
        parsedSurveys.push({
          id: survey.id,
          title: survey.attributes.title,
          description: survey.attributes.description,
          coverImageUrl: survey.attributes.cover_image_url,
          type: survey.attributes.survey_type,
        });
      });

      setSurveys((existingSurveys) => [...existingSurveys, ...parsedSurveys]);
      loading.current = false;
    };
    if (!loading.current) {
      loading.current = true;
      fetchSurveys();
    }
  }, [surveyPage]);

  if (surveys.length === 0) {
    return <h3 data-test-id="loading-surveys">Loading Surveys</h3>;
  }

  return (
    <section>
      <div className="my-8 text-white" data-test-id="app-main-heading">
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        <p className="text-3xl font-extrabold">Today</p>
      </div>

      <div className="w-screen max-w-3xl">
        <SurveyList surveys={surveys} onPageChange={handlePageChange} />
      </div>
    </section>
  );
};

export default HomeScreen;
