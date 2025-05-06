import { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Zoom in={isVisible}>
            <Fab
                color="secondary"
                aria-label="scroll to top"
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    boxShadow: 3,
                }}
            >
                <ArrowCircleUpIcon sx={{ fontSize: 40 }}  />
            </Fab>
        </Zoom>
    );
};

export default ScrollToTopButton;