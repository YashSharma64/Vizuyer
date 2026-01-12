import frontImg from './assets/images/front.png';
import sideImg from './assets/images/side.png';
import perspectiveImg from './assets/images/perspective.png';

export const products = [
  {
    id: 1,
    name: "Zenith X1 - Midnight Black",
    category: "Wireless Audio",
    price: "$299.00",
    description: "Experience pure sound with the Zenith X1. Featuring active noise cancellation, a 30-hour battery life, and plush memory foam earcups for all-day immersion.",
    trustMessage: "Zoom in to inspect the matte finish and build quality.",
    images: [
      { id: "front", src: frontImg, alt: "Front View", label: "Front" },
      { id: "side", src: sideImg, alt: "Side Profile", label: "Side" },
      { id: "perspective", src: perspectiveImg, alt: "Angle", label: "Angle" }
    ]
  },
  {
    id: 2,
    name: "Zenith X1 - Obsidian Core",
    category: "Limited Edition",
    price: "$329.00",
    description: "A special edition featuring enhanced bass drivers and a stealth-black logo application. Designed for those who demand both style and substance.",
    trustMessage: "Check the subtle detailing on the headband slider.",
    images: [
      { id: "perspective", src: perspectiveImg, alt: "Angle", label: "Angle" },
      { id: "front", src: frontImg, alt: "Front View", label: "Front" },
      { id: "side", src: sideImg, alt: "Side Profile", label: "Side" },
    ]
  },
  {
    id: 3,
    name: "Zenith X1 - Studio Pro",
    category: "Professional",
    price: "$399.00",
    description: "Engineered for creators. The Studio Pro edition offers flat frequency response for accurate mixing, wrapped in a durable, lightweight reinforced chassis.",
    trustMessage: "Explore the ergonomic contours designed for long studio sessions.",
    images: [
      { id: "side", src: sideImg, alt: "Side Profile", label: "Side" },
      { id: "front", src: frontImg, alt: "Front View", label: "Front" },
      { id: "perspective", src: perspectiveImg, alt: "Angle", label: "Angle" }
    ]
  }
];

export const getProductById = (id) => products.find(p => p.id === Number(id));
