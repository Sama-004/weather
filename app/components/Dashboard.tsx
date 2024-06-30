"use client"

import { Chart } from "chart.js";


function Dashboard() {

    

    return (
        <div className="flex -z-10">
            <div className="relative top-20 left-40">
            <iframe
                src="http://127.0.0.1:5500/index.html?embed=true"
                width="800px"
                height="500px">    
            </iframe>
            </div>
        </div>
        
    )
}

export default Dashboard;