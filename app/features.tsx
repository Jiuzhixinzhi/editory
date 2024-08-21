'use client'

import { motion } from 'framer-motion'
import { Card } from '@nextui-org/react'
import { PiCloudDuotone, PiMicrosoftWordLogoDuotone, PiGithubLogoDuotone } from 'react-icons/pi'

export default function Features() {
    return <motion.div
        className='flex flex-wrap justify-center gap-6'
        initial='hidden'
        whileInView='visible'
        variants={{
            visible: { transition: { staggerChildren: 0.1 } },
        }}
    >
        {[
            { icon: PiCloudDuotone, title: 'Sync to the Cloud', description: 'Keep your papers safe and accessible from anywhere.', gradient: 'from-blue-100/70 to-purple-100/70', iconColor: 'text-blue-500' },
            { icon: PiMicrosoftWordLogoDuotone, title: 'Export to Word', description: 'Easily export your papers to Microsoft Word format (coming soon).', gradient: 'from-purple-100/70 to-pink-100/70', iconColor: 'text-purple-500' },
            { icon: PiGithubLogoDuotone, title: 'Proudly Open Source', description: 'You can always see what we\'re doing or deploy your own version.', gradient: 'from-pink-100/70 to-red-100/70', iconColor: 'text-pink-500' },
        ].map((feature, index) => (
            <motion.div
                key={index}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Card shadow='none' className={`w-full sm:w-64 p-6 bg-gradient-to-br dark:bg-none dark:bg-default-200/20 h-full ${feature.gradient}`}>
                    <feature.icon className={`w-12 h-12 mb-4 ${feature.iconColor}`} />
                    <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                    <p className='opacity-70'>{feature.description}</p>
                </Card>
            </motion.div>
        ))}
    </motion.div>
}