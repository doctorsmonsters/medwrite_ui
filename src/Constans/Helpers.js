export function formatSemanticDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const date = new Date(dateString);
  return date.toLocaleString(undefined, options);
}

export const clearLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userToken");
};

export function removeHTMLTags(inputText) {
  return inputText && inputText.replace(/<[^>]*>/g, " ");
}

export const referenceStyles = [
  {
    id: "1",
    name: "APA",
    sample: (
      <>
        <div className="">
          <p>Maqbool, J.</p>
          <p>
            (2005, September 10). <em>Explorations of genes,</em>
            <i>The New Yorker</i>.
          </p>
          <p>http://www.newyorker.com/magazine/2005/09/10/explorationgenes</p>
        </div>
      </>
    ),
  },
  {
    id: "2",
    name: "MLA",
    sample: (
      <>
        <div className="">
          <p>Maqbool, Junaid.</p>
          <p>
            "Chinese Lexicographly Past and Present":
            <i>
              Dictionaries: Journal of the Dictionary Society of North America,
            </i>
            PubMed, 2007, September 10.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "3",
    name: "Chicago",
    sample: (
      <>
        <div className="">
          <p>
            Maqbool, Junaid and Michael R. Solomon.
            <i>The French Revolution: Faith, Desire and Politics</i>
          </p>
          <pre> London: Routledge, 2014.</pre>
        </div>
      </>
    ),
  },
];

export const referenceMaker = (style, reference) => {
  const authString = reference?.configurations?.authorString;
  const source = reference?.configurations?.source;
  const link = reference?.configurations?.link;
  const journalInfo = reference?.configurations?.journalInfo;
  const publishDate = journalInfo?.dateOfPublication;
  let content;
  switch (style) {
    case referenceStyles[0].name:
      content = `
        <div class="">
          <p>${authString}</p>
          <p>
            (${publishDate}).
            <em>${reference?.title}</em>
            <i>${source}</i>.
          </p>
          <p>${link}</p>
        </div>
      `;
      break;
    case referenceStyles[1].name:
      content = `
        <div class="">
          <p>${authString}</p>
          <p>
            <i>${reference?.title}</i>
            ${source},${publishDate}.
          </p>
        </div>
      `;
      break;
    default:
      content = `
        <div class="">
          <p>
            ${authString}
            <i>${reference?.title}</i>
          </p>
          <pre>    ${publishDate}.</pre>
        </div>
      `;
  }

  return content;
};
