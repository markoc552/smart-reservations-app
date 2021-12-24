import React, { useState, useEffect } from "react";
import Navigation from "../components/util/Navigation";
import {
  HomeWrapper,
  RestaurantWrapper,
  ReviewNameWrapper,
  AppImage,
  ListWrapper
} from "../components/util/RestaurantStyledComponents";
import { Icon, Image, Button, Select, Input } from "semantic-ui-react";
import BookingModal from "../components/bookings/BookingsTable";
import { motion } from "framer-motion";
import history from "../history";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Bottom from "../components/util/Bottom";
import { secondVariants } from "../util/animations";
import Spinner from "react-bootstrap/Spinner";

const openClosed = [
  {
    key: "open",
    value: "Open",
    text: "Open",
  },
  {
    key: "closed",
    value: "Closed",
    text: "Closed",
  },
];

const availablePlaces = [
  {
    key: "1",
    value: "1",
    text: "1",
  },
  {
    key: "2",
    value: "2",
    text: "2",
  },
];

const Restaurants = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataToRender, setDataToRender] = useState([]);
  const [available, setAvailableTables] = useState();
  const [restaurantName, setRestaurantName] = useState();
  const [addressName, setAddressName] = useState();
  const [open, setOpenClosed] = useState();
  const [showRestaurant, setShowRestaurant] = useState({});
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.auth.user);

  const { addToast } = useToasts();

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/getRestaurants`,
      {
        params: {
          manager: `${user.firstname} ${user.lastname}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((result) => {
        setDataToRender(result.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateRestaurant = (restaurant) => {
    Axios.post(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/updateRestaurant`,
      {
        ...restaurant,
        openClosed: `${open}`,
        availableTables: `${available}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        addToast("Restaurant updated!", {
          appearance: "success",
        });
      })
      .catch(() => {
        addToast("Error while updating restaurant!", {
          appearance: "error",
        });
      });
  };

  const renderRestaurants = () => {
    return dataToRender.map((restaurant) => (
      <motion.div initial="hidden" animate="visible" variants={secondVariants}>
        <RestaurantWrapper style={{ height: "30vh", width: "45vw" }}>
          <div
            style={{
              height: "15vh",
              width: "30vw",
              margin: "2vh auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image size="small" style={{margin: "auto auto"}} src={`${restaurant.images[0]}`} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReviewNameWrapper>
                <Input
                  iconPosition="left"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  icon="info circle"
                />
              </ReviewNameWrapper>{" "}
              <ReviewNameWrapper>
                <Input
                  iconPosition="left"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                  icon="address book"
                />
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Select
                  options={openClosed}
                  placeholder="Open/Closed"
                  onChange={(e, { value }) => setOpenClosed(value)}
                />
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Select
                  options={availablePlaces}
                  icon={
                    <Icon name="map" color="green" style={{ marginLeft: 5 }} />
                  }
                  placeholder="Available tables"
                  iconPosition="left"
                  onChange={(e, { value }) => setAvailableTables(value)}
                />
              </ReviewNameWrapper>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReviewNameWrapper>
                <Button
                  color="orange"
                  style={{ margin: "1.4vh 0" }}
                  basic
                  onClick={() => {
                    setShowRestaurant(restaurant);
                    setShowModal(true);
                  }}
                >
                  <Icon name="book" />
                  Bookings
                </Button>
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Button
                  color="blue"
                  basic
                  onClick={() => history.push(`/updateMenu/${restaurant.name}`)}
                >
                  <Icon name="zoom" /> Menus
                </Button>
              </ReviewNameWrapper>
              <ReviewNameWrapper>
                <Button
                  color="green"
                  onClick={() => {
                    updateRestaurant(restaurant);
                  }}
                >
                  <Icon name="upload" /> Update
                </Button>
              </ReviewNameWrapper>
            </div>
          </div>
        </RestaurantWrapper>
      </motion.div>
    ));
  };

  return (
    <AppImage>
      <HomeWrapper>
        <Navigation />
        <ListWrapper>
          {loading ? (
            <div style={{ margin: "auto auto" }}>
              <Spinner animation="border" size="lg" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            renderRestaurants()
          )}
        </ListWrapper>
        <Bottom />
      </HomeWrapper>
      {showModal && (
        <BookingModal
          show={showModal}
          setShow={setShowModal}
          restaurant={showRestaurant}
        />
      )}
    </AppImage>
  );
};

export default Restaurants;
