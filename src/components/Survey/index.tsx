type SurveyProps = {
  title: string;
  description: string;
  coverImageUrl: string;
};

function Survey({ title, description, coverImageUrl }: SurveyProps) {
  return (
    <>
      <img className="my-4 h-full max-h-80 w-full max-w-full" src={coverImageUrl} alt="cover" />
      <p className="text-white"> {title}</p>
      <p className="text-white opacity-60"> {description}</p>
    </>
  );
}

export default Survey;
