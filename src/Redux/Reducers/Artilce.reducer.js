import { ArticleTypes } from "../Types/Article.types";

const initialState = {
  workingArticle: null,
};

const reducer = (state = initialState, action) => {
  const workingArticle = () => {
    const data = action.payload.data;
    return {
      ...state,
      workingArticle: {
        ...state.workingArticle,
        ...data,
      },
    };
  };

  switch (action.type) {
    case ArticleTypes.WORKING_ARTICLE:
      return workingArticle();
    default:
      return state;
  }
};

export default reducer;
