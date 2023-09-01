package database

import (
	"log"
	_ "log"

	"github.com/hayabusa1228/MenuCreator/structs"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func SaveDesignToDB(DesignInfo structs.MenuPostInfo,filepath string){
	db, err := gorm.Open(sqlite.Open(filepath), &gorm.Config{})
	if err != nil {
    panic("failed to connect database")
  }

  // 前の情報を取得
	var user_oldinfo structs.UserInfo
	db.Where("username=?", DesignInfo.UserName).Preload(clause.Associations).First(&user_oldinfo)
  

	// Menu情報保存
	var menues []structs.Menu
		for i:= 0; i< len(DesignInfo.Menues); i++ {
			menues = append(menues,   structs.Menu{
				Category: DesignInfo.Menues[i].Category,
				Content: DesignInfo.Menues[i].Contents,
			})
	}

	user_newinfo := structs.UserInfo{
		ID:0,
    UserName: user_oldinfo.UserName,
		PassWord: user_oldinfo.PassWord,
		MenuDesignID: 0,
		MenuDesign :	structs.MenuDesign{
				ShopName: DesignInfo.ShopName,
				Menu: menues,
	  },
		Tables: user_oldinfo.Tables,
  }

	db.Create(&user_newinfo)

	db.Where("ID=?", user_oldinfo.ID).Select(clause.Associations).Delete(&structs.UserInfo{ID: user_oldinfo.ID})

	// var user_info structs.UserInfo

	// err = db.Where("username=?", DesignInfo.UserName).Preload("MenuDesign.Menu.Content").First(&user_info).Error

	// log.Println(user_info.MenuDesign)
	

}

func GetDesignInfo(username string, filepath string) structs.MenuDesign{
	var user_info structs.UserInfo

	db, err := gorm.Open(sqlite.Open(filepath), &gorm.Config{})
	if err != nil {
    panic("failed to connect database")
  }
	err = db.Where("username=?", username).Preload("MenuDesign.Menu.Content").First(&user_info).Error
	if err != nil {
		return structs.MenuDesign{}
	}

	log.Println(user_info.MenuDesign)

	return user_info.MenuDesign
}
