// contorller定義
package controller

import (
	_ "log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hayabusa1228/MenuCreator/database"
	"github.com/hayabusa1228/MenuCreator/structs"
)

const db_file_path = "./database/userinfo.db"


func LoginHandler(c *gin.Context){
	var LoginInfo structs.UserInfo

	if err := c.ShouldBindJSON(&LoginInfo); err == nil {
		// log.Println("Check login info")
		if(database.CheckUserNameAndPassword(&LoginInfo, db_file_path)){
			c.JSON(http.StatusOK, gin.H{
				"status" : "OK",
			})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{
			"status" : "NG",
	})
	return
}


func ResgisterHandler(c *gin.Context){
	//postされたjsonデータを取得
	var RegisterInfo structs.UserInfo

	if err := c.ShouldBindJSON(&RegisterInfo); err == nil {
		// RegisterInfo.ID = config.LoadAndChangeIDJsonFile()
		result := database.RegisterUserToDB(&RegisterInfo, db_file_path)
		if (result){
			// log.Println("Send register response from server to client")
			c.JSON(http.StatusOK, gin.H{
				"status" : "OK",
			})
			return
		}
		}

		c.JSON(http.StatusOK, gin.H{
				"status" : "NG",
		})
		return	
 }


