/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  TextField,
  Drawer,
  CircularProgress,
  Modal,
} from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import {
  getArticleById,
  searchDatabases,
  updateArticle,
} from "../../Services/Article.service";
import { createReference } from "../../Services/Reference.service";
import { TINYMCE_API_KEY } from "../../Constans/Api";
import { processText } from "../../Services/Actions.service";
import { Editor } from "@tinymce/tinymce-react";
import { removeHTMLTags } from "../../Constans/Helpers";
import PromptModal from "../../Components/Modals/PromptModal";
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
  let autoSaveTimer;
  const inactivityPeriod = 30000;
  const { showError, showSuccess } = useSystem();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [promptProps, setpromptProps] = React.useState({});
  const [promptOpen, setPromptOpen] = React.useState(false);
  const [artilceForm, setArticleForm] = React.useState({
    title: "",
    content: "",
  });

  const editorRef = React.useRef(null);

  // Hooks
  React.useEffect(() => {
    // Autosave when action is followed by inaction.
    if (editorRef.current) {
      const handleKeyDown = () => {
        if (autoSaveTimer) {
          clearTimeout(autoSaveTimer);
        }
        autoSaveTimer = setTimeout(() => {
          updateArticle(uuid, {
            ...artilceForm,
            content: editorRef.current.getContent(),
          })
            .then((res) => showSuccess("Content Auto Saved."))
            .catch((error) => {
              const err = error?.response?.data || error.message;
              showError(err);
            });
        }, inactivityPeriod);
      };

      editorRef.current.on("keydown", handleKeyDown);
      return () => editorRef.current.off("keydown", handleKeyDown);
    }
  }, [editorRef.current]);

  // Quiries & Mutations
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
      updateArticle(uuid, {
        ...artilceForm,
        content: editorRef.current.getContent(),
      })
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

  const referenceMutation = useMutation({
    mutationFn: (data) =>
      createReference(data)
        .then((res) => {
          return res.data.data;
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
  });

  // handlers
  const handleAction = async (type, content) => {
    setLoading(true);
    const params = {
      text: content,
      prompt_key: type,
    };
    return processText(params)
      .then((res) => res.data.data)
      .catch((error) => {
        const err = error?.response?.data || error.message;
        showError(err);
        return content;
      })
      .finally(() => setLoading(false));
  };

  const handleArticleForm = ({ target: { name, value } }) => {
    setArticleForm((prev) => ({ ...prev, [name]: value }));
  };

  const EditorContentHandler = (type, data) => {
    switch (type) {
      case "h":
        editorRef.current.execCommand(
          "mceInsertContent",
          false,
          `<h3>${data}</h3>`
        );
        break;
      case "p":
        editorRef.current.execCommand(
          "mceInsertContent",
          false,
          `<p>${data}</p>`
        );
        break;
      default:
        break;
    }
  };

  const addTextToEditor = ({ abstractText }) => {
    if (editorRef.current) {
      EditorContentHandler("p", removeHTMLTags(abstractText || ""));
    }
    // setOpen((prev) => !prev);
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

            <Box component="div" className="my-4" id="editor">
              <Editor
                apiKey={TINYMCE_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={artilceForm.content}
                init={{
                  height: 400,
                  width: "100%",
                  toolbar: [
                    "undo redo | fontsize | forecolor backcolor | styleselect | heading bold italic |" +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist | outdent indent | link image",
                    "bullets prompt rephrase summarize",
                  ],
                  menubar: true,
                  plugins:
                    "advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link linkchecker lists media nonbreaking pagebreak preview quickbars save searchreplace table tinydrive visualblocks visualchars wordcount",
                  toolbar_sticky: true,
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  autoresize_bottom_margin: 0,
                  setup: (editor) => {
                    editor.ui.registry.addButton("bullets", {
                      text: "Create Bullets",
                      onAction: () => {
                        const selectedContent = editor.selection.getContent();
                        if (!selectedContent || !selectedContent.trim())
                          return showError(
                            "You need to select text from the editor"
                          );
                        handleAction("bullets", selectedContent).then((res) => {
                          const { processed_text } = res;
                          editor.execCommand(
                            "mceReplaceContent",
                            false,
                            processed_text
                          );
                        });
                      },
                    });

                    editor.ui.registry.addButton("prompt", {
                      text: "Prompt",
                      onAction: () => {
                        const selectedContent = editor.selection.getContent();
                        if (!selectedContent || !selectedContent.trim())
                          return showError(
                            "You need to select text from the editor"
                          );
                        const promptProps = {
                          text: selectedContent,
                          callback: (res) => {
                            editor.execCommand("mceReplaceContent", false, res);
                          },
                        };
                        setpromptProps(promptProps);
                        setPromptOpen(true);
                      },
                    });

                    editor.ui.registry.addButton("rephrase", {
                      text: "Rephrase",
                      onAction: () => {
                        const selectedContent = editor.selection.getContent();
                        if (!selectedContent || !selectedContent.trim())
                          return showError(
                            "You need to select text from the editor"
                          );
                        handleAction("rephrase", selectedContent).then(
                          (res) => {
                            const { processed_text } = res;
                            editor.execCommand(
                              "mceReplaceContent",
                              false,
                              processed_text
                            );
                          }
                        );
                      },
                    });

                    editor.ui.registry.addButton("summarize", {
                      text: "Summarize",
                      onAction: () => {
                        const selectedContent = editor.selection.getContent();
                        if (!selectedContent || !selectedContent.trim())
                          return showError(
                            "You need to select text from the editor"
                          );
                        handleAction("summarize", selectedContent).then(
                          (res) => {
                            const { processed_text } = res;
                            editor.execCommand(
                              "mceReplaceContent",
                              false,
                              processed_text
                            );
                          }
                        );
                      },
                    });
                  },
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
        disableAutoFocus
        PaperProps={{
          sx: {
            width: "60%",
            background: "#EAECEE",
            "@media (max-width: 768px)": {
              width: "90%",
            },
          },
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
              autoFocus
              name="search"
              onKeyUp={(e) => e.key === "Enter" && searchMutation.mutate({})}
              className="flex-1"
              onChange={(e) => setSearch(e.target.value)}
            />
            <ModalButton
              text="search"
              classes="!rounded-sm !ml-2 !py-4"
              disabled={!search || searchMutation.isLoading}
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
            className="my-5 h-full w-full bg-pink-00 overflow-y-auto"
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
                        handleSelect={() => addTextToEditor(item)}
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

      <PromptModal
        open={promptOpen}
        setOpen={setPromptOpen}
        promptProps={promptProps}
        setLoading={setLoading}
      />
      <LoadingModal open={loading} />
    </ProtectedWrapper>
  );
};

const LoadingModal = ({ open }) => {
  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress className="!text-white !fill-white !border-none !outline-none" />
    </Modal>
  );
};

export default ArticleCreate;
