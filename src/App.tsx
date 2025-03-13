import { useState } from 'react'
import { Button } from './components/ui'

function App() {

    const [count, setCount] = useState(0)

    return (
        <div className='bg-red-400 w-full h-screen flex flex-col items-center'>
            <h1 className='text-2xl'>Я подключил Tailwind, ShadCN</h1>
            <Button onClick={() => setCount(count + 1)} className='w-20'>{count}</Button>
        </div>
    )
}

export default App;
