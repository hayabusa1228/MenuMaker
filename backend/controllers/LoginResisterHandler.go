// contorller定義
package controller

import (
	"log"
	_ "log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"github.com/hayabusa1228/MenuCreator/database"
	"github.com/hayabusa1228/MenuCreator/structs"
)

const db_file_path = "./database/db/userinfo.db"
var hash_add_string = "bvslfjvbsbvslnblsnblwabnerbreblbnefbn.febnfbf.bneksfbnfbnefbnfbnfk;b;fkb;kfnb;febfektb"



func LoginHandler(c *gin.Context){
	var LoginInfo structs.UserInfo

	if err := c.ShouldBindJSON(&LoginInfo); err == nil {
		LoginInfo.PassWord +=  hash_add_string
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
		hashed_password, err := bcrypt.GenerateFromPassword([]byte(RegisterInfo.PassWord + hash_add_string), 10)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status" : "NG",
			})
			return
		}

		RegisterInfo.PassWord = string(hashed_password)

		// log.Println("password",bcrypt.CompareHashAndPassword([]byte(RegisterInfo.PassWord), []byte("1228"+ hash_add_string)))
		log.Println(RegisterInfo.PassWord)
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


