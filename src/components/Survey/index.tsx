type SurveyProps = {
  title: string;
  description: string;
  coverImageUrl: string;
};

function Survey({ title, description, coverImageUrl }: SurveyProps) {
  return (
    <>
      <img src={coverImageUrl} alt="cover" />
      <p> {title}</p>
      <p> {description}</p>
    </>
  );
}

export default Survey;
