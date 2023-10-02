import { formatSemanticDate } from '../Constans/Helpers';

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