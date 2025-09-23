import { FaMapMarkerAlt, FaDrawPolygon, FaHistory, FaUser } from "react-icons/fa";
import { BsGeoAltFill, BsBellFill, BsMapFill, BsBatteryHalf, BsPeopleFill, BsArrowRepeat, BsTagFill, BsBluetooth, BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";

export const features = [
    {
      icon: <BsGeoAltFill className="text-primary fs-5" />,
      title: "Real-Time Location Tracking",
      text: "Monitor your assets, vehicles, or loved ones with precise GPS tracking that updates in real-time."
    },
    {
      icon: <BsBellFill className="text-primary fs-5" />,
      title: "Ring Your Tag Remotely",
      text: "Locate misplaced items quickly by triggering an audible alert from your connected GeoPulse tags."
    },
    {
      icon: <BsMapFill className="text-primary fs-5" />,
      title: "Geofence Alerts",
      text: "Set virtual boundaries and receive instant notifications when your tracked objects enter or exit designated areas."
    },
    {
      icon: <BsBatteryHalf className="text-primary fs-5" />,
      title: "Battery & Speed Monitoring",
      text: "Keep track of device battery levels and movement speeds to ensure optimal performance of your trackers."
    },
    {
      icon: <BsPeopleFill className="text-primary fs-5" />,
      title: "User-Based Access Control",
      text: "Manage who can view and control your devices with customizable permission settings for family and team members."
    },
    {
      icon: <BsArrowRepeat className="text-primary fs-5" />,
      title: "Historical Data Analysis",
      text: "Access and analyze past location data to identify patterns, optimize routes, and improve efficiency."
    }
  ];

 export  const useCases = [
    {
      title: "Logistics Tracking",
      text: "Track assets across your supply chain in real-time and improve delivery precision. Monitor shipments from warehouse to customer doorstep with detailed analytics and ETA predictions.",
      img: "https://plus.unsplash.com/premium_photo-1664910349870-def6b8402912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRydWNrc3xlbnwwfHwwfHx8MA%3D%3D",
      reverse: false,
    },
    {
      title: "Vehicle Tracking",
      text: "Monitor your vehicles for location, speed, and safety from anywhere. Get insights on driving patterns, fuel efficiency, and receive alerts for unauthorized usage or maintenance needs.",
      img: "https://media.istockphoto.com/id/2191314207/photo/driver-using-navigation-app-on-smartphone-while-driving-car.jpg?s=612x612&w=0&k=20&c=JZbMSSeXh23zR5j4m_pe9I1im9Y4bZoGVukez06UI24=",
      reverse: true,
    },
    {
      title: "Share Location with Family & Friends",
      text: "Send your live location with a tap and stay connected with loved ones. Perfect for coordinating meetups or sharing your journey.",
      img: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZ2xlJTIwbWFwfGVufDB8fDB8fHww",
      reverse: false,
    },
    {
      title: "Child Tracking",
      text: "Keep your kids safe with smart GeoPulse tags in their school bags or pockets. Receive notifications when they arrive or return home.",
      img: "https://images.pexels.com/photos/4260325/pexels-photo-4260325.jpeg?auto=compress&cs=tinysrgb&w=800",
      reverse: true,
    },
    {
      title: "Retrace Your Steps",
      text: "Access your historical location logs to trace your path and activities. Useful for finding lost items, travel routes, or time management.",
      img: "https://media.istockphoto.com/id/488269650/photo/smartphone-with-gps.webp?a=1&s=612x612&w=0&k=20&c=TO6rhKmGFmSCdxZfsxldroMcFlnczn1PE62kh-sNs_E=",
      reverse: false,
    },
  ];
 export const team = [
    {
      name: "Mohit Soni",
      role: "Developer",
      img: "/images/mohit.jpeg", // Replace with actual image path
      desc: "I'm a passionate tech innovator building end-to-end IoT solutions for real-world problems. As the founder of GeoPulse, I aim to create smart, scalable systems that connect people and devices seamlessly.",
      socials: {
        linkedin: "https://www.linkedin.com/in/mohit-soni-8a9441256/",
        github: "https://github.com/mohit-soni2003",
        website: "http://mohitsoni.vercel.app/",
      },
    },
    {
      name: "Aditya Chaturvedi",
      role: "Developer",
      img: "images/aditya.jpeg", // Replace with actual image path
      desc: "Driven by innovation and collaboration, I focus on bringing ideas to life with clean tech, efficient systems, and intuitive design. At GeoPulse, I ensure every tag and line of code solves real problems.",
      socials: {
        linkedin: "#",
        github: "#",
        website: "#",
      },
    },
  ];


export const geopulseFeatures = [
  {
    icon: <FaMapMarkerAlt className="me-2 text-primary" />,
    title: "Live Location Tracking",
    desc: "Track devices in real-time with precise location data and movement history.",
  },
  {
    icon: <FaDrawPolygon className="me-2 text-purple" />,
    title: "Geofence Setup",
    desc: "Create custom geofences with adjustable boundaries and instant alerts.",
  },
  {
    icon: <FaHistory className="me-2 text-success" />,
    title: "History Tracking",
    desc: "Review detailed location history with timestamps and route visualization.",
  },
  {
    icon: <FaUser className="me-2 text-warning" />,
    title: "User Profile",
    desc: "Manage your profile, privacy settings, and connected devices.",
  },
];
