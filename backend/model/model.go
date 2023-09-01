package model

import (
	_"log"

	"github.com/gin-gonic/gin"
	"github.com/hayabusa1228/MenuCreator/config"
	"github.com/hayabusa1228/MenuCreator/controllers"
)


func SetupModel() *gin.Engine {
	r := gin.Default()

	// cors config 
	config.CorsSetting(r)
	
	// r.Static("./images","/images")


	r.POST("/login", controller.LoginHandler)
	r.POST("/register", controller.ResgisterHandler)
	r.POST("/save_design", controller.SaveDesignInfo)
	r.POST("/get_design", controller.GetDesignInfo)
	r.POST("/upload_image",controller.UploadImage)
	r.POST("/save_tableinfo", controller.SaveTableInfo)
	r.POST("/check_menu_password", controller.CheckMenuPassWord)

	r.GET("/get_image", controller.GetImage)
	r.GET("/remove_image", controller.RemoveImage)

	return r
}
