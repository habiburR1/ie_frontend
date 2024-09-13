import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scroller } from 'react-scroll'; // Import react-scroll for smooth scrolling

const CompostingGuide: React.FC = () => {
  const navigate = useNavigate();
    const handleScrollTo = (section: string) => {
        scroller.scrollTo(section, {
            smooth: true,
            duration: 500,
        });
    };

    return (
        <div className="container">
            <h1>Composting Guide with Organic Waste Produced at Home</h1>

            {/* Scroll Navigation Links */}
            <nav className="nav">
                <ul>
                    <li><button onClick={() => handleScrollTo("step1")}>Step 1</button></li>
                    <li><button onClick={() => handleScrollTo("step2")}>Step 2</button></li>
                    <li><button onClick={() => handleScrollTo("step3")}>Step 3</button></li>
                    <li><button onClick={() => handleScrollTo("step4")}>Step 4</button></li>
                    <li><button onClick={() => handleScrollTo("step5")}>Step 5</button></li>
                </ul>
            </nav>

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2>Introduction</h2>
                <p>Composting is a fantastic way to manage organic waste produced at home and create valuable compost for your garden. This guide will walk you through the steps to set up a compost bin, select materials, and maintain your compost effectively.</p>
            </motion.section>

            <section>
                <h2>Step-by-Step Guide</h2>

                {/* Step 1 */}
                <div id="step1">
                    <motion.div
                        className="step"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="step-number">Step 1:</div>
                        <h3>Setting Up Your Compost Bin</h3>
                        <img src="https://via.placeholder.com/400x200" alt="Compost Bin" className="step-image" />
                        <p>Choose a suitable location for your compost bin. It should be in a shaded area with good drainage. You can use a commercial compost bin or make your own using wooden pallets, wire mesh, or a simple plastic container.</p>
                    </motion.div>
                </div>

                {/* Step 2 */}
                <div id="step2">
                    <motion.div
                        className="step"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="step-number">Step 2:</div>
                        <h3>Selecting Materials</h3>
                        <img src="https://via.placeholder.com/400x200" alt="Composting Materials" className="step-image" />
                        <p>Compost requires a balance of 'greens' (nitrogen-rich materials) and 'browns' (carbon-rich materials). Greens include fruit and vegetable scraps, coffee grounds, and grass clippings. Browns include dry leaves, cardboard, and paper. Aim for a ratio of 2-3 parts browns to 1 part greens.</p>
                    </motion.div>
                </div>

                {/* Step 3 */}
                <div id="step3">
                    <motion.div
                        className="step"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="step-number">Step 3:</div>
                        <h3>Adding Materials to the Bin</h3>
                        <img src="https://via.placeholder.com/400x200" alt="Layering Materials" className="step-image" />
                        <p>Start by adding a layer of coarse materials like twigs or straw at the bottom of the bin. Then, alternate layers of greens and browns, ensuring each layer is relatively even. Avoid adding meat, dairy, and oily foods to prevent odors and pests.</p>
                    </motion.div>
                </div>

                {/* Step 4 */}
                <div id="step4">
                    <motion.div
                        className="step"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="step-number">Step 4:</div>
                        <h3>Maintaining Your Compost</h3>
                        <img src="https://via.placeholder.com/400x200" alt="Maintaining Compost" className="step-image" />
                        <p>Turn the compost regularly to aerate it and speed up decomposition. Keep the compost moist but not too wet. If the compost is too dry, add water; if too wet, add more browns to absorb excess moisture.</p>
                    </motion.div>
                </div>

                {/* Step 5 */}
                <div id="step5">
                    <motion.div
                        className="step"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <div className="step-number">Step 5:</div>
                        <h3>Harvesting Compost</h3>
                        <img src="https://via.placeholder.com/400x200" alt="Harvesting Compost" className="step-image" />
                        <p>After a few months, the compost will become dark, crumbly, and earthy-smelling. This indicates it's ready to use. Remove the finished compost from the bottom of the bin and use it to enrich your garden soil.</p>
                    </motion.div>
                </div>
            </section>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ marginTop: '20px' }}
            >
                <button
                    onClick={() => navigate('/CompostRatioCalculator')}
                    style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Go to Compost Ratio Calculator
                </button>
            </motion.div>
        </div>
    );
};

export default CompostingGuide;
