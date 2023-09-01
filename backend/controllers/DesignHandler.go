package controller

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"

	"github.com/hayabusa1228/MenuCreator/database"
	"github.com/hayabusa1228/MenuCreator/structs"
)



func SaveDesignInfo(c *gin.Context) {
	var DesignInfo structs.MenuPostInfo
	if err := c.ShouldBindJSON(&DesignInfo); err == nil {
		database.SaveDesignToDB(DesignInfo,db_file_path)
		c.JSON(http.StatusOK, gin.H{
			"status" : "OK",
		})
	}
}

func GetDesignInfo(c *gin.Context) {
  // usernameはpostでもらう
	username := c.PostForm("username")
	DesignInfo := database.GetDesignInfo(username, db_file_path)
	c.JSON(http.StatusOK, gin.H{
		"status" : "OK",
		"shopName" : DesignInfo.ShopName,
		"menu" : DesignInfo.Menu,
	})
}

func UploadImage(c *gin.Context) {
	file, _, _ := c.Request.FormFile("image")
	filename := c.Request.FormValue("filename")
	filepath := c.Request.FormValue("filedir")

	log.Println(filepath)

	if f, err := os.Stat(filepath); os.IsNotExist(err) || !f.IsDir() {
		os.MkdirAll("./images/" + filepath, 0777)
  }

	out, err := os.Create("./images/" + filepath + "/" + filename)
	if err != nil {
		log.Println(err)
	  c.JSON(http.StatusOK, gin.H{
			"status" : "NG",
		})
		return
	}

	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status" : "NG",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status" : "OK",
	})
}


func RemoveImage(c *gin.Context){
	filepath := c.Query("filepath")
	err := os.Remove("./images/"+ filepath)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status" : "NG",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status" : "OK",
	})

}

func GetImage(c *gin.Context) {
	filepath := c.Query("filepath")
	c.File("./images/"+ filepath)
}