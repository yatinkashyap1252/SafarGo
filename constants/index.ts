import treeImage from "../assets/images/tree.png";
import towerImage from "../assets/images/tower.png";
import MountainImage from "../assets/images/mountain.png";
import FlowerImage from "../assets/images/flower.png";
import CatImage from "../assets/images/cat.png";
import BusImage from "../assets/images/bus.jpg";
import LadyImage from "../assets/images/lady.jpg";

export const onBoarding = [
  {
    id: 1,
    title: "Reliable Rides, Every Time",
    desc: '"Count on us to get you where you need to be, safely and efficiently. We’re committed to providing dependable transportation 24/7."',
    image: treeImage,
    icon_color: "#FFA500", // Hex color for orange
  },
  {
    id: 2,
    title: "Quick & Easy Booking",
    desc: "Book your ride in just a few taps, and we’ll be there in minutes. No waiting, no hassle—just seamless convenience.",
    image: BusImage,
    icon_color: "#2196F3", // Hex color for green
  },
  {
    id: 3,
    title: "Affordable Prices",
    desc: "Get where you need to go without breaking the bank. Our fares are transparent and affordable, so you can travel with peace of mind.",
    image: LadyImage,
    icon_color: "#909099", // Hex color for blue
  },
  {
    id: 4,
    title: "Safe & Secure",
    desc: "Your safety is our priority. All drivers are vetted and vehicles are regularly inspected to ensure a safe, secure ride every time.",
    image: CatImage,
    icon_color: "#F44336", // Hex color for red
  },
  {
    id: 5,
    title: "Track Your Ride",
    desc: "Stay informed by tracking your driver’s location in real-time. You’ll know exactly when to expect your arrival.",
    image: MountainImage,
    icon_color: "#009688", // Hex color for yellow
  },
  {
    id: 6, // New Slide
    title: "Eco-Friendly Rides",
    desc: "Join us in reducing the carbon footprint. Our fleet includes electric and hybrid vehicles, helping you travel sustainably.",
    image: FlowerImage, // New image added for this slide
    icon_color: "#FFEB3B", // Hex color for teal
  },
];
