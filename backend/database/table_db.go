package database

import (
	"github.com/hayabusa1228/MenuCreator/structs"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func SaveTableToDB(TableInfo structs.TablePostInfo, filepath string){
	db, err := gorm.Open(sqlite.Open(filepath), &gorm.Config{})
	if err != nil {
    panic("failed to connect database")
  }

	// 前の情報を取得
	var user_oldinfo structs.UserInfo
	db.Where("username=?", TableInfo.UserName).Preload(clause.Associations).First(&user_oldinfo)

	var tables []structs.Table
	for i:=0; i<len(TableInfo.TableInfos); i++{
		tables = append(tables, structs.Table{
			TableNum: TableInfo.TableInfos[i].TableNum,
			PassWord: TableInfo.TableInfos[i].PassWord,
			QRcodeURL: TableInfo.TableInfos[i].QRcodeURL,
		})
	}
	user_newinfo := structs.UserInfo{
		ID:0,
    UserName: user_oldinfo.UserName,
		PassWord: user_oldinfo.PassWord,
		MenuDesignID: 0,
		MenuDesign : user_oldinfo.MenuDesign,
		Tables: tables,
	}
	db.Create(&user_newinfo)

	
	db.Where("ID=?", user_oldinfo.ID).Select(clause.Associations).Delete(&structs.UserInfo{ID: user_oldinfo.ID})
	
}