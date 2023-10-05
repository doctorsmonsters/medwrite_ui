import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SiAppwrite } from "react-icons/si";
import { features } from "../../Constans/MetaData";
import TopBar from "../../Components/TopBar";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import HeroImg from "../../assets/images/imageThree.jpg";
import AboutImg from "../../assets/images/imageTwo.jpg";
import ModalButton from "../../Components/Buttons/ModalButton";

const Home = () => {
  const navigate = useNavigate();
  const islogged = useSelector((state) => state.user.isLogged);
  return (
    <Box component="main">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <Grid container px={3} className="my-10 md:my-24">
        <Grid item sm={12} md={6}>
          <img src={HeroImg} alt="Doctor Assistant" className="rounded-md" />
        </Grid>
        <Grid item sm={12} md={6} className="flex items-center">
          <Box className="pl-0 md:pl-7">
            <Typography component="h1" variant="h3" my={2}>
              Generative AI assistance for manuscript writing challenge
            </Typography>
            <Typography component="p" variant="body1" pr={8}>
              Experience the power of AI as you effortlessly create professional
              and visually captivating manuscripts. Our web app not only helps
              you search through research paper databases, but also provides
              stylistic rendering options to make your logo truly stand out.
            </Typography>
            {!islogged ? (
              <ModalButton
                text="Sign Up"
                classes="!px-10 !mt-5 !w-max"
                onClick={() => navigate("/signup")}
              />
            ) : (
              <ModalButton
                text="Create new article"
                classes="!px-10 !mt-5 !w-max"
                onClick={() => navigate("/articles")}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* work */}
      <Box
        component="div"
        px={3}
        className="bg-[#dee6eb] my-10 md:my-24 py-12 md:py-24"
        id="work"
      >
        <Typography component="h3" variant="h3" my={2}>
          How Does it Work
        </Typography>
        <Typography component="p" variant="body1" className="w-full md:w-1/2">
          Experience the power of AI as you effortlessly create professional and
          visually captivating manuscripts. Our web app not only helps you
          search through research paper databases, but also provides stylistic
          rendering options to make your logo truly stand out.
        </Typography>
        <Box component="div" my={4}>
          <Grid container gap={2}>
            {features.map((item, index) => {
              return (
                <Grid item sm={12} md={5} key={index}>
                  <Box
                    py={5}
                    bgcolor="#dee6eb"
                    className="rounded-md p-5 shadow-lg shadow-[#9fb6be]"
                  >
                    <SiAppwrite color="#212F3C" size={50} className="" />
                    <Typography
                      component="h4"
                      variant="h6"
                      color="primary.main"
                      my={1}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      className="w-full"
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* About Us */}
      <Box component="div" className="" id="about">
        <Grid container className="min-h-screen my-10 md:my-24">
          <Grid item sm={12} md={7} className="h-screen w-full">
            <Box
              sx={{
                backgroundImage: `url(${AboutImg})`,
              }}
              className="bg-cover bg-center bg-fixed h-full w-full"
            />
          </Grid>
          <Grid item sm={12} md={5} className="flex items-center">
            <Box className="pl-4 md:pl-7">
              <Typography component="h2" variant="h3" my={2}>
                About Us
              </Typography>
              <Typography component="p" variant="body1" className="pr-16">
                Experience the power of AI as you effortlessly create
                professional and visually captivating manuscripts. Our web app
                not only helps you search through research paper databases, but
                also provides stylistic rendering options to make your logo
                truly stand out.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className="pr-16">
                Experience the power of AI as you effortlessly create
                professional and visually captivating manuscripts. Our web app
                not only helps.
              </Typography>

              <br />
              <Typography component="p" variant="body1" className="pr-16">
                Experience the power of AI as you effortlessly create
                professional and visually captivating manuscripts.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Contact us */}
      <Box className="mt-12 md:mt-24 mx-4 rounded-lg bg-[#00231f] p-12 md:p-24 text-white" id="contact">
        <Grid container>
          <Grid item sm={12} md={6}>
            <Typography component="h4" variant="h4" my={2}>
              DEDICATED TEAM OF CUSTOMER STATISFACTION EXPERS
            </Typography>
            <Typography component="p" variant="body1" className="mt-4">
              Experience the power of AI as you effortlessly create professional
              and visually captivating manuscripts. Our web app not only helps
              you search through research paper databases, but also provides
              stylistic rendering options to make your logo truly stand out.
            </Typography>
            <ModalButton text="Contact Us" classes="!px-16 !bg-white !text-black !mt-6 !font-bold"/>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
