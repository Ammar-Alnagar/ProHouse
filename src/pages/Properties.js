import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import ProductCard from '../components/ProductCard';

// Import bootstrap react components
import { Button, Card, Container } from "react-bootstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import CountDown from "../components/functions/CountDown";
// import framer motion
import { motion } from "framer-motion";
import AnimationTitles from "../components/functions/AnimationTitles";

function Properties() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        let mounted = true;
        apiGet('/products/categories')
            .then((data) => {
                if (mounted) {
                    setCategories(data.categories || []);
                }
            })
            .catch((e) => setError(e.message || 'Failed to load categories'));
    }, []);

    useEffect(() => {
        let mounted = true;
        let url = '/products';
        if (selectedCategory !== 'All') {
            url = `/products?category=${selectedCategory}`;
        }

        apiGet(url)
            .then((data) => {
                if (mounted) {
                    setProducts(data.products || []);
                    setError('');
                }
            })
            .catch((e) => setError(e.message || 'Failed to load products'))
            .finally(() => setLoading(false));
        return () => (mounted = false);
    }, [selectedCategory]);

    // Active on select a tab
    function active(e, category) {
        let act = document.querySelectorAll(".active");
        act[0].classList.remove("active");
        e.target.classList.add("active");
        setSelectedCategory(category);
    }

    // Like button of properties
    function like(e) {
        return e.target.classList.value === "fa-regular fa-heart like"
            ? (e.target.classList.value = "fa-solid fa-heart like text-danger")
            : (e.target.classList.value = "fa-regular fa-heart like");
    }

    return (
        // Start properties
        <div className="properties">
            <Container>
                <AnimationTitles
                    className="title mx-auto"
                    title="Discover more properties"
                />
                {/* Start tabs */}
                <div className="tabs d-flex justify-content-start justify-content-sm-center align-items-center flex-nowrap w-lg-50">
                    <Swiper
                        className="mySwiper overflow-none"
                        grabCursor={true}
                        spaceBetween={15}
                        slidesPerView={6}
                        breakpoints={{
                            0: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 6,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <Button className="ms-0 bg-black-100 border-0 active" onClick={(e) => active(e, 'All')}>
                                All
                            </Button>
                        </SwiperSlide>
                        {categories.map((category) => (
                            <SwiperSlide key={category._id}>
                                <Button className="ms-0 bg-black-100 border-0" onClick={(e) => active(e, category.name)}>
                                    {category.name}
                                </Button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* End tabs */}
                {/* Start product grid (API-driven) */}
                {error && <div className="text-danger my-3">{error}</div>}
                {loading ? (
                    <div className="text-white my-4">Loading...</div>
                ) : products.length ? (
                    <div className="d-flex flex-wrap gap-3 my-4">
                        {products.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-secondary my-4">No products found.</div>
                )}

                {/* Start cards */}
                <motion.div
                    initial={{ x: -80 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={15}
                        grabCursor={true}
                        loop={true}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            520: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            992: {
                                slidesPerView: 4,
                            },
                            1198: {
                                slidesPerView: 5,
                            },
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper mt-4"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product._id}>
                                <Card className="bg-black-100 rounded">
                                    <Card.Body className="p-2">
                                        <div className="rounded overflow-hidden position-relative">
                                            <Card.Img
                                                variant="top"
                                                alt={product.name}
                                                src={product.images[0].url}
                                            />
                                            <i className="fa-regular fa-heart like" onClick={like}></i>
                                        </div>
                                        <h5 className="mt-2 text-white fw-normal">
                                            {product.name}
                                        </h5>
                                        <p className="gray-90">@{product.brand.name}</p>
                                        <div className="d-flex">
                                            <div className="me-3">
                                                <CountDown h={9} m={45} s={8} />
                                                <span className="gray-90">Remaining Time</span>
                                            </div>
                                            <div>
                                                <h6 className="text-white">{product.price} ETH</h6>
                                                <span className="gray-90">Current Bid</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
                {/* End cards */}
            </Container>
        </div>
        // End properties
    );
}

export default Properties;