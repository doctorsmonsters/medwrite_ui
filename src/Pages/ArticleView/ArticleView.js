import React from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { MdGridView } from "react-icons/md";
import { getArticleById, deleteArticle } from "../../Services/Article.service";
import Header from "../../Components/Header";
import useSystem from "../../Hooks/useSystem";
import ModalButton from "../../Components/Buttons/ModalButton";
import Loading from "../../Components/Loading";

const ArticleView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const currentURL = window.location.href;
  const { showError, showSuccess } = useSystem();
  const artilceQuery = useQuery({
    queryKey: ["article", params.uuid],
    queryFn: () =>
      getArticleById(params.uuid)
        .then((res) => res.data)
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteArticle(params.uuid)
        .then((res) => {
          showSuccess("Article Deleted Successfully.");
          navigate("/articles");
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
  });

  React.useEffect(() => {
    document.title = `Med Writer | ${artilceQuery?.data?.title}`;

    return () => {
      document.title = "Med Writer";
    };
  }, [artilceQuery?.data]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      showSuccess("Copied To Clipboard");
    } catch (error) {
      showSuccess("Failed To Copy, Try Again");
    }
  };

  const publicActions = [
    <ModalButton
      className="copy-button"
      classes="!bg-white !text-black !py-1 !px-5 !rounded-full !font-semibold !tracking-wider"
      text="Share"
      onClick={handleCopyClick}
    />,
    <ModalButton
      classes="!bg-white !text-black !py-1 !px-5 !rounded-full !font-semibold !tracking-wider"
      text="Print"
      onClick={(e) => window.print()}
    />,
  ];

  const userActions = [
    ...publicActions,
    <ModalButton
      classes="!bg-white !text-black !py-1 !px-5 !rounded-full !font-semibold !tracking-wider"
      text="Edit"
      onClick={() => {}}
    />,
    <ModalButton
      classes="!bg-white !text-black !py-1 !px-5 !rounded-full !font-semibold !tracking-wider"
      text="Delete"
      onClick={() => deleteMutation.mutate()}
    />,
  ];

  return (
    <>
      <Header isConcise={true} />
      <Box component="main" py={7} className="px-6 md:px-10">
        {/* Heading */}
        <Box mb={3}>
          <div className="flex items-center">
            <div className="p-1 rounded-md bg-green-dark mr-3">
              <MdGridView className="text-white" size={30} />
            </div>
            <Typography component="h1" variant="h3">
              View Article
            </Typography>
          </div>
          <Typography component="p" variant="body1">
            Watch you content live like an html page.
          </Typography>
        </Box>

        {artilceQuery.isLoading && (
          <div className="flex items-center justify-center my-32">
            <Loading />
          </div>
        )}

        {artilceQuery.isSuccess && (
          <Box className="my-12">
            <Box className="controls flex flex-wrap justify-end px-5 gap-3 bg-green-dark py-3">
              {user.isLogged && user.user.pk === artilceQuery.data.user
                ? userActions
                : publicActions}
            </Box>

            <Box className="py-12 px-8 bg-light">
              <Typography component="h2" variant="h4" className="pb-5">
                {artilceQuery.data.title}
              </Typography>

              <Box
                compoenent="div"
                className="space-y-8"
                dangerouslySetInnerHTML={{ __html: artilceQuery.data.content }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ArticleView;
