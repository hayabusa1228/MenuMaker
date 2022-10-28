package model

import (
	"github.com/gin-gonic/gin"
	"github.com/hayabusa1228/MenuCreator/config"
	"github.com/hayabusa1228/MenuCreator/controllers"
)


func SetupModel() *gin.Engine {
	r := gin.Default()

	// cors config 
	config.CorsSetting(r)


	r.POST("/login", controller.LoginHandler)
	r.POST("/register", controller.ResgisterHandler)


	return r
}
