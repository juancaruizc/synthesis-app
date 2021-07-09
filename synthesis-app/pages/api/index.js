import axios from "axios";

// eslint-disable-next-line
export default async (req, res) => {
  const { meetingDetails } = req.body;
  axios
    .post("https://api.zoom.us/v2/users/me/meetings", meetingDetails, {
      headers: {
        Authorization: `Bearer ${process.env.ZOOM_TOKEN}`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
