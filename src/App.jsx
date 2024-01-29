import ChatBox from "./Components/ChatBox"
import User from "./Components/User"



function App() {

  return (
    <div className="w-screen h-screen flex">
            <div className="bg-red-400 w-1/4 h-screen p-4">
                {/* userside */}
                <User/>

            </div>
            <div className="w-3/4"> 
                <ChatBox/>
            </div>
            
        </div>
  )
}

export default App
