import { formatSemanticDate } from "../Constans/Helpers";
import { SiAppwrite } from "react-icons/si";

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

export const homeContent = {
  hero: {
    title: "Generative AI assistance for manuscript writing challenge",
    para: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
  },
  work: {
    title: "How Does it Work",
    para: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
    cards: [
      {
        icon: <SiAppwrite size={50} className="text-charcol" />,
        title: "heading",
        text: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
      },
      {
        icon: <SiAppwrite size={50} className="text-charcol" />,
        title: "heading",
        text: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
      },
      {
        icon: <SiAppwrite size={50} className="text-charcol" />,
        title: "heading",
        text: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
      },
    ],
  },
  about: {
    para1:
      "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
    para2:
      "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps.",
    para3:
      "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts.",
  },
  cta: {
    title: "DEDICATED TEAM OF CUSTOMER STATISFACTION EXPERTS",
    para: "Experience the power of AI as you effortlessly create professional and visually captivating manuscripts. Our web app not only helps you search through research paper databases, but also provides stylistic rendering options to make your logo truly stand out.",
  },
};
