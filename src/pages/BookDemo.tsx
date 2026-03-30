import Registration from '../components/Registration';
import { motion } from 'motion/react';

const BookDemo = () => {
    return (
        <div className="min-h-screen pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-4"
            >
                <Registration />
            </motion.div>
        </div>
    );
};

export default BookDemo;
