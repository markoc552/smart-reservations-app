import React, { useState, useRef, useEffect } from "react";
import Navigation from "../components/home/Navigation";
import {
  HomeWrapper,
  RestaurantWrapper,
  ReviewNameWrapper,
  AppImage,
  ImageIndicator,
  ListWrapper,
} from "../components/util/RestaurantStyledComponents";
import {
  Divider,
  Header,
  Icon,
  Image,
  Label,
  Button,
  Segment,
} from "semantic-ui-react";
import Modal from "../components/bookings/BookingsModal";
import { motion } from "framer-motion";
import history from "../history";
import ImageModal from "../components/util/ImageModal";
import Axios from "axios";
import { Slide } from "react-slideshow-image";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { secondVariants } from "../util/animations";
import Bottom from "../components/home/Bottom";
import useMediaQuery from "use-mediaquery";

const properties = {
  duration: 5000,
  autoplay: false,
  transitionDuration: 500,
  arrows: false,
  infinite: true,
  easing: "ease",
  indicators: (i) => (
    <ImageIndicator style={{ padding: "5px" }} className="indicator">
      {i + 1}
    </ImageIndicator>
  ),
};

const Restaurants = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImage] = useState(false);
  const [showRestaurant, setShowRestaurant] = useState({});
  const [dataToRender, setDataToRender] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const isMobileView = useMediaQuery("only screen and (max-width: 940px)");

  const slideRef = useRef();

  const handleBack = () => {
    slideRef.current.goBack();
  };

  const handleNext = () => {
    slideRef.current.goNext();
  };

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/getAllRestaurants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((result) => {
        setLoading(false);

        setDataToRender(result.data);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderRestaurantImages = (restaurant) => {
    return restaurant.images.map((image) => (
      <ImageIndicator
        style={{
          width: "10vw",
          height: "15vh",
          margin: "1.5vh auto",
          paddingTop: "5px",
        }}
      >
        <Image
          style={{
            width: "10vw",
            height: "15vh",
            margin: "1.5vh auto",
            paddingTop: "5px",
            borderRadius: "20px"
          }}
          onClick={() => {
            setShowImage(true);
            setShowRestaurant(restaurant);
          }}
          src={`${image}`}
        />
      </ImageIndicator>
    ));
  };

  const renderImageModal = () => {
    return (
      showImageModal && (
        <ImageModal
          show={showImageModal}
          setShow={setShowImage}
          body={
            <div className="App">
              <div className="slide-container">
                <Slide ref={slideRef} {...properties}>
                  {showRestaurant.images.map((each, index) => (
                    <div key={index} className="each-slide">
                      <Image className="lazy" src={each} size="massive" />
                    </div>
                  ))}
                </Slide>
              </div>

              <div className="slide-container buttons">
                <Button onClick={handleBack} color="orange" basic type="button">
                  Go Back
                </Button>
                <Button onClick={handleNext} color="green" basic type="button">
                  Go Next
                </Button>
              </div>
            </div>
          }
        />
      )
    );
  };

  const notifyIfNothingToRender = () =>
    dataToRender.length === 0 && (
      <Segment
        color="brown"
        style={{
          margin: "auto auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header icon>
          <Icon name="stack exchange" />
          There are no restaurants to show currently
        </Header>
        <Button color="brown" style={{ margin: "1vh auto" }}>
          Add Restaurant
        </Button>
      </Segment>
    );

  const renderRestaurants = () => {
    return dataToRender.map((restaurant) => (
      <motion.div initial="hidden" animate="visible" variants={secondVariants}>
        <RestaurantWrapper>
          <div
            style={{
              height: "15vh",
              width: "65vw",
              margin: "2vh auto",
              display: "flex",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Image size="small" style={{width: "10vw", margin: "1vh 1vw", borderRadius: "20px"}} src={`${restaurant.images[0]}`} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReviewNameWrapper>
                <Icon name="info circle" size="large" /> {restaurant.name}
              </ReviewNameWrapper>{" "}
              <ReviewNameWrapper>
                <Icon name="address book" size="large" /> {restaurant.address}
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Label
                  color={restaurant.openClosed === "Closed" ? "red" : "green"}
                  size="large"
                  basic
                >
                  {restaurant.openClosed}
                </Label>
              </ReviewNameWrapper>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                color="orange"
                style={{ margin: "2vh 0" }}
                basic
                onClick={() => {
                  setShowModal(true);
                  setShowRestaurant(restaurant);
                }}
              >
                <Icon name="book" />
                Book
              </Button>
              <Button
                color="blue"
                basic
                onClick={() =>
                  history.push(`/restaurants/menu/${restaurant.name}`)
                }
              >
                <Icon name="zoom" /> See menu
              </Button>
            </div>
            {!isMobileView && (
              <div style={{ margin: "5vh 4vw" }}>
                <div style={{ fontFamily: "'Arvo', serif" }}>
                  <Icon name="map" color="green" />
                  {restaurant.availableTables} tables
                </div>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Icon
                name="facebook square"
                color="facebook"
                size="big"
                style={{ margin: "1vh 0" }}
              />
              <Icon
                name="twitter"
                color="blue"
                size="big"
                style={{ margin: "1vh 0" }}
              />
              <Icon
                name="instagram"
                color="red"
                size="big"
                style={{ margin: "1vh 0" }}
              />
            </div>
          </div>
          <Divider horizontal style={{ margin: "0 auto", width: "50vw" }}>
            <Header as="h4">
              <Icon name="image" color="blue" />
              Images
            </Header>
          </Divider>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0 auto",
            }}
          >
            {renderRestaurantImages(restaurant)}
          </div>
        </RestaurantWrapper>
        {renderImageModal()}
      </motion.div>
    ));
  };

  return (
    <AppImage
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=100",
      }}
    >
      <HomeWrapper>
        <Navigation />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={secondVariants}
          style={{ margin: "auto auto" }}
        >
          {loading ? (
            <div style={{ margin: "50vh auto" }}>
              <Spinner animation="border" size="lg" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <ListWrapper>
              {notifyIfNothingToRender()}
              {renderRestaurants()}
            </ListWrapper>
          )}
        </motion.div>
        <Bottom />
      </HomeWrapper>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          restaurant={showRestaurant}
        />
      )}
    </AppImage>
  );
};

export default Restaurants;
