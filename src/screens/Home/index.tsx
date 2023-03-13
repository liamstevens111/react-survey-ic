import { useState, useEffect } from 'react';

import SurveyAdapter from 'adapters/surveyAdapter';
import { Survey } from 'types/Survey';
import { SurveyResponse } from 'types/SurveyResponse';

import SurveyList from '../../components/SurveyList';

const HomeScreen = (): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyResponse = await SurveyAdapter.list();

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

      setSurveys(parsedSurveys);

      setLoaded(true);
    };
    fetchSurveys();
  }, []);

  if (!loaded) {
    return <h3>Loading Surveys</h3>;
  }

  return (
    <>
      {surveys.length > 0 && (
        <section>
          <div className="my-8 text-white" data-test-id="app-main-heading">
            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <p className="text-3xl font-extrabold">Today</p>
          </div>

          <SurveyList surveys={surveys} />
        </section>
      )}
    </>
  );
};

export default HomeScreen;
