import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FormControl,
  InputAdornment,
  TextField,
  Box,
  Typography,
  Grid
} from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import { ARTICLE_TABLE_COLUMNS } from "../../Constans/MetaData";
import { getArticles, bulkDelete } from "../../Services/Article.service.js";
import Header from "../../Components/Header";
import Table from "../../Components/Table";
import Loading from "../../Components/Loading";
import ModalButton from "../../Components/Buttons/ModalButton";
import ArticleModal from "../../Components/Modals/ArticleModal";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";
import DeleteDrawer from "../../Components/Drawer/DeleteDrawer/DeleteDrawer";
import useSystem from "../../Hooks/useSystem";

const Article = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { showError, showSuccess } = useSystem();

  const articleQuery = useQuery({
    queryKey: ["article"],
    queryFn: () => getArticles().then((res) => [...res.data]),
  });

  const deleteMutation = useMutation({
    mutationFn: (data) =>
      bulkDelete(data)
        .then(() => {
          handleClose();
          showSuccess("Articles deleted Successfully.");
        })
        .catch((error) => showError(error)),
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    },
  });

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
    if (articleQuery.data) {
      const _serarchFilter = articleQuery.data.filter((i) =>
        i.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchFilter(_serarchFilter);
    }
  };

  const handleClose = () => {
    setOpenDrawer(false);
    setSelectedRows([]);
  };

  return (
    <ProtectedWrapper>
      <Header isConcise={true} />
      <Box component="main" py={7} className="px-6 md:px-10">
        {/* Heading */}
        <Box mb={3}>
          <div className="flex items-center">
            <div className="p-1 rounded-md bg-green-dark mr-3">
              <MdArticle className="text-white" size={30} />
            </div>
            <Typography component="h1" variant="h3">
              Articles
            </Typography>{" "}
          </div>
          <Typography component="p" variant="body1">
            All you artciles in a tabular format
          </Typography>
        </Box>

        {/* Toolbar */}
        <Grid
          container
          component="div"
          mb={5}
          gap={2}
          className="flex items-end justify-between"
        >
          <Grid item xs={12} md={9} className="">
            <FormControl fullWidth>
              <TextField
                id="standard-search"
                placeholder="Search Articles"
                type="search"
                onChange={(e) => handleSearchChange(e)}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiSearchAlt />
                    </InputAdornment>
                  ),
                }}
                value={search}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} className="">
            <ModalButton
              classes="!rounded-lg !w-full"
              text="Create"
              onClick={() => setOpen((prev) => !prev)}
              icon={<BsPlusCircle className="mr-3 text-xl" />}
            />
          </Grid>
        </Grid>

        {/* Table */}
        <Box className="h-[450px] shadow-lg shadow-gray-dark rounded-xl flex items-center justify-center">
          {articleQuery.error && (
            <p className="text-center text-gray-dark">
              Error Loading the data try again in few.
            </p>
          )}
          {articleQuery.isLoading && <Loading />}
          {articleQuery.isSuccess && (
            <Table
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              style={{ height: "inherit" }}
              data={searchFilter || articleQuery.data || []}
              columns={ARTICLE_TABLE_COLUMNS}
              onDeleteClick={() => setOpenDrawer(true)}
            />
          )}
        </Box>
      </Box>

      {/* Componenets */}
      <ArticleModal open={open} setOpen={setOpen} />
      {openDrawer && (
        <DeleteDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          selectedRows={selectedRows}
          handleClose={handleClose}
          deleteMutation={deleteMutation}
        />
      )}
    </ProtectedWrapper>
  );
};

export default Article;
