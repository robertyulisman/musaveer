import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@material-ui/core";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import { useRef, useState } from "react";

const Directions = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin dan desitination tolong diambilkan dari file vertex.json ya mas
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        {/* <GoogleMap
            // center={center}
            // zoom={15}
            // mapContainerStyle={{ width: '100%', height: '100%' }}
            // options={{
            //   zoomControl: false,
            //   streetViewControl: false,
            //   mapTypeControl: false,
            //   fullscreenControl: false,
            // }}
            // onLoad={map => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap> */}
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <InputLabel>Pilih Titik Awal</InputLabel>
            <Select>
              <MenuItem>Vertex 1</MenuItem>
              <MenuItem>Vertex 2</MenuItem>
              <MenuItem>Vertex 3</MenuItem>
              <MenuItem>Vertex 4</MenuItem>
            </Select>
          </Box>
          <Box flexGrow={1}>
            <InputLabel>Pilih Titik Tujuan</InputLabel>
            <Select>
              <MenuItem>Vertex 1</MenuItem>
              <MenuItem>Vertex 2</MenuItem>
              <MenuItem>Vertex 3</MenuItem>
              <MenuItem>Vertex 4</MenuItem>
            </Select>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Hitung Jarak
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Jarak: {distance} </Text>
          <Text>Durasi: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default Directions;
