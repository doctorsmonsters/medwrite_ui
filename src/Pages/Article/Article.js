import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FormControl,
  InputAdornment,
  TextField,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { ARTICLE_TABLE_COLUMNS } from "../../Constans/MetaData";
import { getArticles } from "../../Services/Article.service.js";
import Table from "../../Components/Table";
import ModalButton from "../../Components/Buttons/ModalButton";
import ArticleModal from "../../Components/Modals/ArticleModal";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";

const Article = () => {
  const [search, setSearch] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const articleQuery = useQuery({
    queryKey: ["article"],
    queryFn: () => getArticles().then((res) => [...res.data]),
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

  if (articleQuery.isLoading) {
    return <ProtectedWrapper>Loading...</ProtectedWrapper>;
  }

  if (articleQuery.isError) {
    return JSON.stringify(articleQuery.error);
  }
  return (
    <ProtectedWrapper>
      <Box component="main" px={5} py={5}>
        {/* Heading */}
        <Box mb={3}>
          <Typography component="h1" variant="h3">
            Articles
          </Typography>{" "}
          <Typography component="p" variant="body1">
            All you artciles in a tabular format
          </Typography>
        </Box>

        {/* Toolbar */}
        <Grid container component="div" mb={5} className="flex items-end">
          <Grid item sm={12} md={10}>
            <FormControl fullWidth>
              <TextField
                id="standard-search"
                placeholder="Search Articles"
                type="search"
                onChange={(e) => handleSearchChange(e)}
                variant="standard"
                className="!rounded-full"
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
          <Grid item sm={12} md={2} className="flex justify-end">
            <ModalButton
              text="Create"
              onClick={() => setOpen((prev) => !prev)}
              icon={<BsPlusCircle className="mr-3 text-xl" />}
            />
          </Grid>
        </Grid>

        {/* Table */}
        <Box className="h-[400px]">
          <Table
            data={searchFilter || articleQuery.data}
            columns={ARTICLE_TABLE_COLUMNS}
          />
        </Box>
      </Box>
      <ArticleModal open={open} setOpen={setOpen} />
    </ProtectedWrapper>
  );
};

export default Article;
