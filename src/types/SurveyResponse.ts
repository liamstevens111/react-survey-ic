export type SurveyResponse = {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    survey_type: string;
    cover_image_url: string;
  };
}[];
