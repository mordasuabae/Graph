import React, { useState,useContext,useEffect } from "react";
import "./reports.css"
import { Context } from "../../context/context";



const ReportsPage = (e) => {
    const [tasks, setTasks] = useState([])
    const [incompleteCount, setIncompleteCount] = useState(0)
    const [completeCount, setCompleteCount] = useState(0)
    const [maxCount, setMaxCount] = useState(0)

    const context = useContext(Context)

    //updating count
    useEffect(() => {

        if (context.tasks && context.tasks.length) {
           const completeCount =  countTasksForStatus('complete')
           const incompleteCount =  countTasksForStatus('incomplete')
           console.log("completeCount:", completeCount, "incompleteCount :", incompleteCount)

            setIncompleteCount(incompleteCount)
            setCompleteCount(completeCount)
            setTasks(context.tasks)

            // get max count
            const max = Math.max(completeCount,incompleteCount)
            console.log("max", max)
            setMaxCount(max)
        }
       
    }, [context.tasks])

 

    /**
     * svjhcscbv
     * @param {String} status 
     */
    const countTasksForStatus = (status) => {
        const number =  context.tasks.reduce((prevCount , task)=>{
            if(task.status === status){
                return prevCount + 1
            }

            return prevCount
      
        }, 0)

        return number
    }

    
    /**
     * svjhcscbv
     * @param {Number} statusCount 
     */
    const getPixelHeightForCategory = (statusCount) => {
        const constainerHeight = 500
        const buffer = 3 + maxCount
        const categoryPercentage =  (statusCount / buffer) * 100
        const onePercentInPixels = constainerHeight / 100
        const barHeight = categoryPercentage * onePercentInPixels

        console.log('[getPixelHeightForCategory]', barHeight)
        return barHeight
    }


    return (
        < div className="graph">
            <div className="incomplete-bar" style={{ height: getPixelHeightForCategory(incompleteCount)}}></div>
            <div className="completed-bar" style={{ height: getPixelHeightForCategory(completeCount)}}></div>
        </ div >

    )
}

export {ReportsPage}