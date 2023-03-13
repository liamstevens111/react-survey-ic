import { useState } from 'react';

import Button from 'components/Button';
import SurveyComponent from 'components/Survey';
import { Survey } from 'types/Survey';

type SurveyListProps = { surveys: Survey[] };

function SurveyList({ surveys }: SurveyListProps) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <SurveyComponent {...surveys[index]} />

      {/* TODO: For testing */}
      <Button type="button" onButtonClick={() => setIndex(index + 1)} text="Next" />
    </>
  );
}

export default SurveyList;
