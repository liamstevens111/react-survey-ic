import SurveyComponent from 'components/Survey';
import { Survey } from 'types/Survey';

type SurveyListProps = { surveys: Survey[] };

function SurveyList({ surveys }: SurveyListProps) {
  return (
    <div>
      {surveys.map((survey) => {
        return (
          <li key={survey.id}>
            <SurveyComponent {...survey} />
          </li>
        );
      })}
    </div>
  );
}

export default SurveyList;
