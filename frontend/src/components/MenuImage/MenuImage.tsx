import Image from "next/image"
import React from "react"

interface MenuImageProps {
  image: string
}

const MenuImage: React.FC<MenuImageProps> = ({image}) => {
  return (
    <div className="mx-auto" style={{ position: 'relative', width: '95%', height: "70%" }}>
      <div className="flex flex-col justify-center items-center pt-5 pb-6">
      <Image
          src={"http://127.0.0.1:8081/get_image/?filepath=" + image}
          layout="fill"  
          objectFit="contain" 
          alt="menuimage"/>
        
    </div>
    </div>
  
  )
}

export {MenuImage}