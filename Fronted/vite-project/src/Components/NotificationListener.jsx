import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../Socket/Socket.js";
import { addNotification } from "../../Redux/SocketSlic.js";

const NotificationListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const onBooking = (data) => {
      console.log("📩 New booking:", data);
      dispatch(addNotification(data));
    };

    socket.on("booking-notification", onBooking);

    return () => {
      socket.off("booking-notification", onBooking);
    };
  }, [dispatch]);

  return null;
};

export default NotificationListener;
