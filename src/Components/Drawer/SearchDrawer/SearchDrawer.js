import React from "react";
import { Drawer, Box, Typography, TextField } from "@mui/material";
import { createReference } from "../../../Services/Reference.service";
import { searchDatabases } from "../../../Services/Article.service";
import useSystem from "../../../Hooks/useSystem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CardButtons from "../../../Components/ReadMore";
import Loading from "../../../Components/Loading";
import ModalButton from "../../../Components/Buttons/ModalButton";

const SearchDrawer = ({
  open,
  setOpen,
  search,
  setSearch,
  article,
  addTextToEditor,
}) => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useSystem();
  const [refIndex, setRefIndex] = React.useState(null);

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
          showSuccess("Reference has been added successfully.");
          return res.data;
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
    onSuccess: () => {
      queryClient.invalidateQueries(["references"]);
    },
  });

  return (
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
                    className="p-3 mx-2 my-3 bg-[#f9f9f9] rounded-md relative"
                    key={index}
                  >
                    {referenceMutation.isLoading && refIndex === index && (
                      <div className="absolute h-full w-full bg-gray-200 opacity-60 flex items-center justify-center">
                        <Loading />
                      </div>
                    )}
                    <Typography
                      variant="body1"
                      component="h5"
                      className="text-black py-2 font-semibold"
                    >
                      {item?.title}
                    </Typography>
                    <CardButtons
                      item={item}
                      article={article}
                      handleSelect={referenceMutation.mutate}
                      setRefIndex={() => setRefIndex(index)}
                    />
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;
