import supabase from "../supabase";
import Ring from "../assets/order_ring.mp3";

const OrderRing = () => {
  const playSound = () => {
    const audio = new Audio(Ring);
    audio.play();
  };

  const orders = supabase
    .from("orders")
    .on("INSERT", (payload) => {
      playSound();
      console.log("Change received!", payload);
    })
    .subscribe();
  return <h1 onClick={playSound}>Order Alerts</h1>;
};

export default OrderRing;
