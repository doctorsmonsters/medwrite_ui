/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, TextField, Drawer } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import {
  getArticleById,
  searchDatabases,
  updateArticle,
} from "../../Services/Article.service";
import { CKEDITOR_CONFIGS } from "../../Constans/MetaData";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../../Components/Loading";
import Header from "../../Components/Header";
import ReadMore from "../../Components/ReadMore";
import useSystem from "../../Hooks/useSystem";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import ModalButton from "../../Components/Buttons/ModalButton";

const ArticleCreate = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const uuid = params.uuid;
  const { showError } = useSystem();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [artilceForm, setArticleForm] = React.useState({
    title: "",
    content: "",
  });
  const objectQuery = useQuery({
    queryFn: () =>
      getArticleById(uuid)
        .then((res) => {
          const { title, content } = res.data;
          setArticleForm({ title, content });
          return res.data;
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
    queryKey: ["articles", uuid],
  });

  const objectMutation = useMutation({
    mutationFn: () =>
      updateArticle(uuid, artilceForm)
        .then((res) => {
          navigate(`/articles/view/${uuid}`);
          return res.data;
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    },
  });

  const searchMutation = useMutation({
    mutationFn: (data) =>
      searchDatabases({ query: search, cursor: 0, ...data })
        .then((res) => {
          console.log(res.data);
          return res.data.data;
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),

    onSuccess: () => {
      queryClient.invalidateQueries([]);
    },
  });

  // handlers
  const handleArticleForm = ({ target: { name, value } }) => {
    setArticleForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ProtectedWrapper>
      <Header isConcise={true} />
      <Box component="main" py={7} className="px-6 md:px-10">
        <Box mb={3}>
          <div className="flex items-center">
            <div
              className="p-1 rounded-md bg-green-dark mr-3 cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <BiSearchAlt className="text-white" size={30} />
            </div>
            <Typography component="h1" variant="h3">
              Create Article
            </Typography>
          </div>
          <Typography component="p" variant="body1">
            Write you article with an amzaing rich text editor & bundle of
            Generative AI Operations.
          </Typography>
        </Box>

        {objectQuery.isLoading && (
          <div className="flex items-center justify-center my-32">
            <Loading />
          </div>
        )}

        {objectQuery.isSuccess && (
          <Box className="my-12">
            <Box className="editor py-3">
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Title"
                value={artilceForm.title}
                name="title"
                onChange={(e) => handleArticleForm(e)}
              />
            </Box>

            <Box className="my-4" id="editor">
              <CKEditor
                editor={ClassicEditor}
                data={artilceForm.content}
                config={CKEDITOR_CONFIGS}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleArticleForm({
                    target: { name: "content", value: data },
                  });
                }}
              />
            </Box>

            <Box className="flex justify-end">
              <CircularButton
                text="save"
                disabled={!artilceForm.title || !artilceForm.content}
                classes="!px-10 !w-max"
                loading={objectMutation.isLoading}
                onClick={() => objectMutation.mutate()}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: { width: "60%", background: "#EAECEE" },
        }}
        onClose={() => setOpen((prev) => !prev)}
      >
        <Box sx={{ px: 5, py: 8 }} color="white" height="100%">
          <Typography
            variant="h4"
            component="h5"
            className="text-black pb-4 border-b-2 border-black"
          >
            Search PubMed
          </Typography>
          <Box
            component="div"
            className="flex justify-between items-center bg-red-00"
            mt={2}
          >
            <TextField
              label="Enter Keywords"
              value={search}
              name="search"
              className="flex-1"
              onChange={(e) => setSearch(e.target.value)}
            />
            <ModalButton
              text="search"
              classes="!rounded-sm !ml-2 !py-4"
              disabled={!search}
              onClick={(e) => searchMutation.mutate({})}
            />
            <ModalButton
              text="Explore"
              classes="!rounded-sm !ml-2 !py-4"
              disabled={searchMutation.isLoading}
              onClick={(e) => {
                setSearch("");
                searchMutation.mutate({ query: "*" });
              }}
            />
          </Box>

          <Box
            component="div"
            className="my-5 h-96 w-full bg-pink-00 overflow-y-auto"
          >
            {searchMutation.isLoading && (
              <div className="flex items-center justify-center my-12">
                <Loading />
              </div>
            )}
            {searchMutation.isSuccess && (
              <>
                {searchMutation.data?.resultList?.result?.map((item, index) => {
                  return (
                    <Box
                      component="div"
                      className="p-3 mx-2 my-3 bg-[#f9f9f9] rounded-md"
                      key={index}
                    >
                      <Typography
                        variant="body1"
                        component="h5"
                        className="text-black py-2 font-semibold"
                      >
                        {item?.title}
                      </Typography>
                      <ReadMore
                        description={item?.abstractText}
                        maxChars={200}
                        link={`https://europepmc.org/article/MED/${item?.id}`}
                      />
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </ProtectedWrapper>
  );
};

export default ArticleCreate;

// <CKEditor
//   editor={ClassicEditor}
//   data={artilceForm.content}
//   // onReady={(editor) => {
//   //   // You can store the "editor" and use when it is needed.
//   //   console.log("Editor is ready to use!", editor);
//   // }}
//   config={CKEDITOR_CONFIGS}
//   onChange={(event, editor) => {
//     const data = editor.getData();
//     handleArticleForm({
//       target: { name: "content", value: data },
//     });
//   }}
//   // onBlur={(event, editor) => {
//   //   console.log("Blur.", editor);
//   // }}
//   // onFocus={(event, editor) => {
//   //   console.log("Focus.", editor);
//   // }}
// />;
