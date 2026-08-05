import "../styles/Categories.css";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import WatchIcon from "@mui/icons-material/Watch";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const categories = [
  { name: "Mobiles", icon: <PhoneIphoneIcon fontSize="large" /> },
  { name: "Electronics", icon: <LaptopMacIcon fontSize="large" /> },
  { name: "Fashion", icon: <CheckroomIcon fontSize="large" /> },
  { name: "Furniture", icon: <ChairIcon fontSize="large" /> },
  { name: "Groceries", icon: <LocalGroceryStoreIcon fontSize="large" /> },
  { name: "Gaming", icon: <SportsEsportsIcon fontSize="large" /> },
  { name: "Watches", icon: <WatchIcon fontSize="large" /> },
  { name: "Books", icon: <MenuBookIcon fontSize="large" /> },
];

export default function Categories() {
  return (
    <section className="category-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="category-title">
            Shop By Category
          </h2>

          <p className="category-subtitle">
            Discover products from every category
          </p>

        </div>

        <div className="row g-4">

          {categories.map((item, index) => (

            <div
              className="col-lg-3 col-md-4 col-sm-6"
              key={index}
            >

              <div className="category-card">

                <div className="category-icon">

                  {item.icon}

                </div>

                <h5>{item.name}</h5>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}