'use client'
import {CircularProgress} from "@nextui-org/react";

const loading = () => {
  return (
    <div className="absolute w-full h-full top-1/2 left-1/2">
        <div className="top-1/2 left-1/2">

        <CircularProgress classNames={{
            svg: "w-24 h-24 ",
            
          }} color="primary" aria-label="Loading..."/>
        </div>
    </div>
  )
}

export default loading