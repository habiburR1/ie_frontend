import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header.tsx';

const CompostRatioCalculator: React.FC = () => {
    const [greens, setGreens] = useState<number | string>('');
    const [browns, setBrowns] = useState<number | string>('');
    const [ratio, setRatio] = useState<number | null>(null);
    const [balanceMessage, setBalanceMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const calculateRatio = (e: React.FormEvent) => {
        e.preventDefault();
        if (greens && browns && +greens > 0 && +browns > 0) {
            const compostRatio = +browns / +greens;
            setRatio(compostRatio);

            if (compostRatio >= 2 && compostRatio <= 3) {
                setBalanceMessage("Your compost ratio is balanced!");
            } else {
                setBalanceMessage("Adjust the ratio to have 2-3 parts browns to 1 part greens for optimal composting.");
            }
            setError(null);
        } else {
            setError("Please enter valid amounts for both greens and browns.");
            setRatio(null);
            setBalanceMessage('');
        }
    };

    return (
        <div className="container">
            <Header />
            <h1>Compost Ratio Calculator</h1>

            <motion.div
                className="box"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <form onSubmit={calculateRatio}>
                    <label htmlFor="greens">Amount of Greens (kg):</label>
                    <input
                        type="number"
                        id="greens"
                        name="greens"
                        step="0.1"
                        value={greens}
                        onChange={(e) => setGreens(e.target.value)}
                    />

                    <label htmlFor="browns">Amount of Browns (kg):</label>
                    <input
                        type="number"
                        id="browns"
                        name="browns"
                        step="0.1"
                        value={browns}
                        onChange={(e) => setBrowns(e.target.value)}
                    />

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}
                    >
                        Calculate Ratio
                    </motion.button>
                </form>
            </motion.div>

            {ratio && (
                <motion.div
                    className="result"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <p>Your compost ratio (Browns to Greens) is: {ratio.toFixed(2)}</p>
                    <p>{balanceMessage}</p>
                </motion.div>
            )}

            {error && (
                <motion.p
                    style={{ color: 'red' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {error}
                </motion.p>
            )}

            {/* Help Box */}
            <motion.div
                className="help-box"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2>Tips: Understanding Greens and Browns</h2>
                <p><strong>Greens:</strong> These are nitrogen-rich materials. Examples include fruit and vegetable scraps, coffee grounds, grass clippings, and plant trimmings. They are typically moist and high in protein.</p>
                <p><strong>Browns:</strong> These are carbon-rich materials. Examples include dry leaves, straw, cardboard, and paper. They are typically dry and high in fiber.</p>
                <p>The balance between greens and browns is crucial for efficient composting. A good ratio is usually 2-3 parts browns to 1 part greens.</p>
            </motion.div>
        </div>
    );
};

export default CompostRatioCalculator;
