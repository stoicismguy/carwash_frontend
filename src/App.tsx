import { useState } from 'react'
import { Button } from '@/components/ui'
import undraw_apps from '@/assets/undraw_apps.svg'
import { motion } from 'motion/react'

function App() {

    const [count, setCount] = useState(0)

    return (
        <div className='w-full h-screen flex flex-col items-center pt-10'>
            <img src={undraw_apps} alt="Vite logo" className='w-[20%] my-10'/>
            <h1 className='text-2xl'>Я подключил Tailwind, ShadCN</h1>
            <h1 className='text-2xl'>DEVMODE</h1>
            <motion.div
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className='text-xl'>А еще научился добавлять прикольные картинки</h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className='text-xl'>И добавил framer motion</h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, rotate: 720 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1 }}
            >
                <Button className='my-2 w-30' onClick={() => setCount(count + 1)}>{count}</Button>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 15 }}
            >
                <h1 className='text-xl'>АХАХХАХАХАХАХАХАХАХ</h1>
            </motion.div>
        </div>
    )
}

export default App;
