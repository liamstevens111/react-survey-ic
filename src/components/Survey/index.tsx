type SurveyProps = {
  title: string;
  description: string;
  coverImageUrl: string;
};

function Survey({ title, description, coverImageUrl }: SurveyProps) {
  return (
    <>
      <img src={coverImageUrl} alt="cover" />
      <p className="text-white"> {title}</p>
      <p className="text-white"> {description}</p>
    </>
  );
}

export default Survey;
