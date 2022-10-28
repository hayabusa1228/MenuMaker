package database

import (

	"github.com/hayabusa1228/MenuCreator/structs"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func CreateUserInfoDB(filepath string){
	db, err := gorm.Open(sqlite.Open(filepath), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }
	db.AutoMigrate(&structs.UserInfo{})
}

func CheckUserNameAndPassword(logininfo *structs.UserInfo, filepath string) bool {
	db, err := gorm.Open(sqlite.Open(filepath), &gorm.Config{})
  if err != nil {
    return false
  }
  // 入力された情報が適切であるか
	if err := db.First(&logininfo,"username = ? AND password = ?", logininfo.UserName, logininfo.PassWord); err.Error == nil {
		return true
	}

	return false
}


func checkSameNameUser(db *gorm.DB, registerinfo *structs.UserInfo) bool{
	// 同じ名前の人がいるか
	if err:= db.First(&registerinfo,"username = ?", registerinfo.UserName); err.Error != nil {
		return true
	} 
	return false
}

func RegisterUserToDB(registerinfo *structs.UserInfo, filepath string) bool{
	db, err := gorm.Open(sqlite.Open(filepath), &gorm.Config{})
  if err != nil {
    return false
  }

	// すでに同じ名前がいたら登録しない
	if(checkSameNameUser(db, registerinfo)){
		db.Create(&registerinfo);
		return true
	}else{
		return false
	}
}

