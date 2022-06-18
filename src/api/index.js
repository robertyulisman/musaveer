import axios from "axios";

export const getDataTempat = async (tipe, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${tipe}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          // "X-RapidAPI-Key":
          //   "8236318e18msh5038e58db50ae9dp177eabjsnfe272d20638d",
        },
      }
    );

    console.dir("data map ====>", data);
    return data;
  } catch (error) {
    console.log("error get location", error);
  }
};
