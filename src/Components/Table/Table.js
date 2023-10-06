import * as React from "react";
import { Box, Typography } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function Table({
  style,
  columns,
  data,
  onDeleteClick,
  selectedRows,
  setSelectedRows,
}) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = React.useState(false);

  React.useEffect(() => {
    const _showOptions = Boolean(selectedRows && selectedRows?.length);
    setShowOptions(_showOptions);
  }, [selectedRows]);

  return (
    <div style={{ height: 400, width: "100%", ...style }}>
      {showOptions && (
        <Box
          component="div"
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            border: "1px solid lightgray",
          }}
          className="bg-white-300"
        >
          <Typography
            id="modal-modal-title"
            pl={0.5}
            pr={2}
            variant="body1"
            component="h6"
            sx={{ borderRight: "1px solid black" }}
          >
            Options...
          </Typography>

          <Box sx={{ display: "flex", gap: 4 }} ml={3}>
            <span
              onClick={onDeleteClick}
              className="p-3 rounded-full text-black hover:text-white hover:bg-black cursor-pointer border border-gray-600 "
            >
              <AiOutlineDelete className="" />
            </span>
          </Box>
        </Box>
      )}

      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={[...selectedRows.map((item) => item.id)]}
        onRowClick={(row, event) => {
          event.preventDefault();
          navigate(`/articles/view/${row.row.id}`);
        }}
        onRowSelectionModelChange={(rows) => {
          const selectedRowData = data.filter((row) =>
            rows.includes(row.id.toString())
          );
          setSelectedRows(selectedRowData);
        }}
      />
    </div>
  );
}
