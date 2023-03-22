type SurveyProps = {
  title: string;
  description: string;
  coverImageUrl: string;
};

function Survey({ title, description, coverImageUrl }: SurveyProps) {
  return (
    <div>
      <img className="my-4 max-h-80 w-full rounded-xl" src={coverImageUrl} alt="cover" />
      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-white"> {title}</p>
          <p className="text-white opacity-60"> {description}</p>
        </div>
        <div>
          {/* TODO: Convert to Link for Survey Detail page */}
          <button className="arrow-button"></button>
        </div>
      </div>
    </div>
  );
}

export default Survey;
