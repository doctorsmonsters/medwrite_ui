/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, TextField } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { getArticleById, updateArticle } from "../../Services/Article.service";
import { TINYMCE_API_KEY } from "../../Constans/Api";
import { processText } from "../../Services/Actions.service";
import { Editor } from "@tinymce/tinymce-react";
import { removeHTMLTags } from "../../Constans/Helpers";
import PromptModal from "../../Components/Modals/PromptModal";
import LoadingModal from "../../Components/Modals/LoadingModal";
import Loading from "../../Components/Loading";
import SearchDrawer from "../../Components/Drawer/SearchDrawer/SearchDrawer";
import Header from "../../Components/Header";
import useSystem from "../../Hooks/useSystem";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import ModalButton from "../../Components/Buttons/ModalButton";
import ReferenceDrawer from "../../Components/Drawer/ReferenceDrawer/ReferenceDrawer";

const ArticleCreate = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const uuid = params.uuid;
  let autoSaveTimer;
  const inactivityPeriod = 10000;
  const { showError, showSuccess } = useSystem();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [promptProps, setpromptProps] = React.useState({});
  const [promptOpen, setPromptOpen] = React.useState(false);
  const [refOpen, setRefOpen] = React.useState(false);
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
            .then(() => showSuccess("Content Auto Saved."))
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

  const addTextToEditor = (text) => {
    if (editorRef.current) {
      EditorContentHandler("p", removeHTMLTags(text || ""));
    }
  };

  return (
    <ProtectedWrapper>
      <Header isConcise={true} />
      <Box component="main" py={7} className="px-6 md:px-10">
        <Box>
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

        <Box component="div" className="flex justify-end my-0">
          <ModalButton
            text="References"
            classes="!rounded-md !px-10 !py-2"
            badge={true}
            onClick={() => setRefOpen((prev) => !prev)}
          />
        </Box>

        {objectQuery.isLoading && (
          <div className="flex items-center justify-center my-32">
            <Loading />
          </div>
        )}

        {objectQuery.isSuccess && (
          <Box className="my-5">
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

      <PromptModal
        open={promptOpen}
        setOpen={setPromptOpen}
        promptProps={promptProps}
        setLoading={setLoading}
      />
      <SearchDrawer
        search={search}
        setSearch={setSearch}
        open={open}
        setOpen={setOpen}
        article={uuid}
        addTextToEditor={addTextToEditor}
      />
      <ReferenceDrawer open={refOpen} setOpen={setRefOpen} article={uuid} />
      <LoadingModal open={loading} />
    </ProtectedWrapper>
  );
};

export default ArticleCreate;
