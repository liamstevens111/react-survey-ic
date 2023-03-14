type SurveyProps = {
  title: string;
  description: string;
  coverImageUrl: string;
};

function Survey({ title, description, coverImageUrl }: SurveyProps) {
  return (
    <div>
      <img className="h-80 w-full" src={coverImageUrl} alt="cover" />
      <p className="text-white"> {title}</p>
      <p className="text-white opacity-60"> {description}</p>
    </div>
  );
}

export default Survey;
