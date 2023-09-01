package controller

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/hayabusa1228/MenuCreator/database"
	"github.com/hayabusa1228/MenuCreator/structs"
)


func SaveTableInfo(c *gin.Context){
	var TableInfo structs.TablePostInfo

	if err := c.ShouldBindJSON(&TableInfo); err == nil {
		  database.SaveTableToDB(TableInfo, db_file_path)
			return
	}else{
		log.Println(err)
	}
}



func CheckMenuPassWord(c *gin.Context){
	id := c.PostForm("id")
	password := c.PostForm("password")

	// データベースでパスワードがあってるか確認する
	log.Println(id)
	log.Println(password)

}