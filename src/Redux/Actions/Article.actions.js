import { ArticleTypes } from "../Types/Article.types";

export const ActionCreators = {
  setWorkingArticle: (data) => ({
    type: ArticleTypes.WORKING_ARTICLE,
    payload: { data },
  }),
};
