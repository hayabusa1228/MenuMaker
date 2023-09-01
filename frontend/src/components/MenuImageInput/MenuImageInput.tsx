import { useRef, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useSession } from "next-auth/react"

interface MenuImageInputProps {
  current_category: string
  image_path: string
  setImagePath: any
}

const MenuImageInput: React.FC<MenuImageInputProps> = ({ current_category,image_path, setImagePath }) => {
  const img_input_ref = useRef<HTMLInputElement>(null)
  const {data, status} = useSession()

  const postImage = async(formData: FormData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8081/upload_image', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      return response.data;
    } catch (err) {
      return {
        status: "NG"
      }
    }
  }


  const ImgChangeHandler = async () => {
    const ref = (img_input_ref.current as HTMLInputElement)
   if(!ref.files?.length){
    return
   }
   const formData = new FormData();
   const filedir =  data?.user?.name + "/" + current_category 
   const uuid = Math.random().toString(32).substring(2);
   // uuidでファイル名の重複を防ぐ
   const filename = uuid + ref.files[0].name
   formData.append("image", ref.files[0]);
   formData.append("filedir", filedir )
   formData.append("filename", filename)
  //  console.log(data?.user?.name + "/" + ref.files[0].name)
   const response = await postImage(formData)

   if(response.status == "OK"){
    // メニューの写真のpathを更新
    setImagePath(filedir + "/" + filename)
   }

   console.log(response)

  // setfn(ref.files[])
  }

  return (
      <div className="mx-auto" style={{ position: 'relative', width: '95%', height: "50%" }}>
          <div className="flex justify-center items-center">
          <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center  bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
        {
          image_path ?   
              <Image 
                    src={"http://127.0.0.1:8081/get_image/?filepath=" + image_path}
                    layout="fill"  
                    objectFit="contain" 
                    alt="menuimage"/>
                    :
                  <>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">画像をuploadしてください</p>
                  </>
        }
        </div>
      <input onChange={ImgChangeHandler} ref={img_input_ref} id="dropzone-file" type="file" className=" bg-white hidden "/>
  </label>
</div>
</div>
  )
}


export { MenuImageInput }