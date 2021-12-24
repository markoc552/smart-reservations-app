import React, { useState } from "react";
import {
  DetailsWrapper,
  ReviewNameWrapper,
} from "./RestaurantStyledComponents";
import { motion } from "framer-motion";
import useMediaQuery from "use-mediaquery";
import { Segment, Image, Icon } from "semantic-ui-react";

const reviews = [
  {
    name: "Marko Matic",
    role: "Software developer",
    time: "Long time user",
    comment: "I am very satisfied with this application!",
    image:
      "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
  },
  {
    name: "Mia Matic",
    role: "Housewife",
    time: "New user",
    comment:
      "Application is simple and easy to use. I love the design and idea behind it because it help you a lot.",
    image:
      "https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png",
  },
];

const Reviews = () => {
  const [shown, setShownReview] = useState(1);
  const isMobileView = useMediaQuery("only screen and (max-width: 900px)");

  setTimeout(() => {
    setShownReview(shown === 1 ? 0 : 1);
  }, 3000);

  return (
    <DetailsWrapper>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{ margin: "0 auto" }}
      >
        <Segment
          color="brown"
          raised
          style={{
            width: isMobileView ? "85vw" : "50vw",
            height: "40vh",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "15vh",
              width: isMobileView ? "60vw" : "47vw",
              borderBottom: "1px solid grey",
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Image size="small" src={`${reviews[shown].image}`} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReviewNameWrapper>
                <Icon name="user" /> {reviews[shown].name}
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Icon name="cog" /> {reviews[shown].role}
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Icon name="calendar outline" />
                {reviews[shown].time}
              </ReviewNameWrapper>
            </div>
          </div>
          <ReviewNameWrapper
            style={{ textAlign: "center", marginTop: "5vh", fontSize: "20px" }}
          >
            {reviews[shown].comment}
          </ReviewNameWrapper>
        </Segment>
      </motion.div>
    </DetailsWrapper>
  );
};

export default Reviews;
