import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import { Swiper, SwiperSlide } from "swiper/react";
import AnimationTitles from "../components/functions/AnimationTitles";
import { motion } from "framer-motion";

function Developers() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        let mounted = true;
        apiGet('/developers')
            .then((data) => {
                if (mounted) {
                    setDevelopers(data.developers || []);
                    setError('');
                }
            })
            .catch((e) => setError(e.message || 'Failed to load'))
            .finally(() => setLoading(false));
        return () => (mounted = false);
    }, []);

    return (
        <div className="developers">
            <div className="container-fluid">
                <AnimationTitles
                    title="Our the best developers"
                    className="title mx-auto"
                />
                <p className="gray-50 text-center mb-5">
                    The value of real estate can be affected by its utility, project, and
                    demand.{" "}
                </p>
                {error && <div className="text-danger my-3">{error}</div>}
                {loading ? (
                    <div className="text-white my-4">Loading...</div>
                ) : developers.length ? (
                    <motion.div
                        initial={{ x: -80 }}
                        whileInView={{ x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Swiper
                            className="mySwiper overflow-none justify-content-start"
                            grabCursor={true}
                            slidesPerView={5}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                },
                                596: {
                                    slidesPerView: 3,
                                },
                                998: {
                                    slidesPerView: 4,
                                },
                                1198: {
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {developers.map((developer) => (
                                <SwiperSlide key={developer._id}>
                                    <div className="d-flex justify-content-between align-items-center py-2 px-3">
                                        <img
                                            className="pe-3"
                                            src={developer.logo.url}
                                            alt={developer.name}
                                        />
                                        <h6 className="text-white m-0">{developer.name}</h6>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                ) : (
                    <div className="text-secondary my-4">No developers found.</div>
                )}
            </div>
        </div>
    );
}

export default Developers;