// modelを記述
package main

import (
	_"log"

	"github.com/hayabusa1228/MenuCreator/config"
	"github.com/hayabusa1228/MenuCreator/database"
	"github.com/hayabusa1228/MenuCreator/model"
)



func init(){
	config.LoggingSettings("./log/test.log")
	database.CreateUserInfoDB("./database/userinfo.db")
}

func main() {
	// log.Println("server start!")
	r := model.SetupModel()
	// Listen and Server in 0.0.0.0:8080
	r.Run("127.0.0.1:8081")
	
}
