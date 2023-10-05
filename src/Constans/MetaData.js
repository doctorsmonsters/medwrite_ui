import { formatSemanticDate } from "../Constans/Helpers";

export const ARTICLE_TABLE_COLUMNS = [
  { field: "title", headerName: "Name", width: 300 },
  {
    field: "created_at",
    headerName: "Created At",
    width: 300,
    renderCell: (params) => formatSemanticDate(params.value),
  },
  {
    field: "Updated_at",
    headerName: "Update At",
    width: 300,
    renderCell: (params) => {
      if (!params.value) return "_";
      else return formatSemanticDate(params.value);
    },
  },
];

export const CKEDITOR_CONFIGS = {
  default: {
    toolbar: "Custom",
    toolbar_Custom: [
      ["Bold", "Italic", "Underline"],
      [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
      ],
      ["Link", "Unlink"],
      ["RemoveFormat", "Source"],
    ],
    width: "full",
    height: "full",
  },
};


export const navLinks = [
  {
    title: "About Us",
    link: "#about",
  },
  {
    title: "How it Works",
    link: "#work",
  },
  { title: "Contact", link: "#contact" },
];

export const loggedNavLinks = [
  {
    title: "Articles",
    link: "/articles",
    isPage: true,
  },
];

export const features = [
  {
    title: "heading",
    text: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
  },
  {
    title: "heading",
    text: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
  },
  {
    title: "heading",
    text: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
  },
];