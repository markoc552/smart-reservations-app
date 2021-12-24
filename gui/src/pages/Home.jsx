import React from "react";
import { Icon, Divider, Header } from "semantic-ui-react";
import Navigation from "../components/util/Navigation";
import WelcomeImage from "../components/util/WelcomeImage";
import Details from "../components/util/Details";
import Reviews from "../components/util/Reviews";
import Bottom from "../components/util/Bottom";
import {
  HomeWrapper,
  AppImage,
} from "../components/util/RestaurantStyledComponents";
import { motion } from "framer-motion";
import { variants, secondVariants } from "../util/animations";

const Home = () => {
  return (
    <AppImage>
      <motion.div initial="hidden" animate="visible" variants={secondVariants}>
        <HomeWrapper>
          <Navigation />
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <WelcomeImage />
          </motion.div>
          <Divider horizontal style={{ margin: "2vh auto", width: "50vw" }}>
            <Header as="h4">
              <Icon name="info" color="brown" />
              Features
            </Header>
          </Divider>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={secondVariants}
          >
            <Details />
          </motion.div>
          <Divider horizontal style={{ margin: "2vh auto", width: "50vw" }}>
            <Header as="h4">
              <Icon name="tag" color="brown" />
              Reviews
            </Header>
          </Divider>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={secondVariants}
          >
            <Reviews />
          </motion.div>
          <Bottom />
        </HomeWrapper>
      </motion.div>
    </AppImage>
  );
};

export default Home;
