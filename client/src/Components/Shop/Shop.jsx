import React, { useEffect, useState, useRef } from "react";
import "./Style/Shop.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

// ***********************
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Shop = () => {
  const [products, setProducts] = useState([]);
  console.log("products", products);
  // pagination
  const perPageRecords = 6;
  const totlaPageRecords = products.length;
  const totalPages = Math.ceil(totlaPageRecords / perPageRecords);

  const [startPageIndex, setStartPageIndex] = useState(0);
  const [endPageIndex, setEndPageIndex] = useState(perPageRecords - 1);
  const topRef = useRef(null);
  const displayPage = (pageNo) => {
    scrollToTop();
    const start_page_index = perPageRecords * pageNo - perPageRecords;
    const end_page_index = perPageRecords * pageNo - 1;

    setStartPageIndex(start_page_index);

    if (end_page_index > totlaPageRecords) {
      setEndPageIndex(totlaPageRecords - 1);
    } else {
      setEndPageIndex(end_page_index);
    }
  };

  const fetchProduct = () => {
    axios
      .get("https://example-data.draftbit.com/cars?_limit=51")
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  // https://example-data.draftbit.com/sneakers?_limit=10
  const scrollToTop = () => {
    // topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollTo(0, 0);
  };
  return (
    // <div>
    <div ref={topRef}>
      {products.length > 0 ? (
        <div className="Products">
          {/* style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:"3rem"}} */}
          <div className="ProductCardContainer">
            {(() => {
              const displayProducts = [];
              products
                .slice(startPageIndex, endPageIndex + 1)
                .map((product, ind) => {
                  displayProducts.push(
                    <Card sx={{ width: 345 }} key={product.id}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          // height="140"
                          height="300"
                          image={product.image}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="#2196f3"
                            style={{ textAlign: "center" }}
                          >
                            {product.model}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ textAlign: "center" }}
                          >
                            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica */}
                            ${product.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="lg"
                          fullWidth={true}
                          color="primary"
                          style={{ backgroundColor: "#4CAF50", color: "white" }}
                        >
                          Add To Cart
                        </Button>
                      </CardActions>
                    </Card>
                  );
                });

              return displayProducts;
            })()}
          </div>

          <div className="ProductsPaginationContainer">
            <Pagination
              count={totalPages}
              color="primary"
              onChange={(event, value) => displayPage(value)}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    // </div>
  );
};

export default Shop;
