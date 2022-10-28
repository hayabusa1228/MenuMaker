package structs

type UserInfo struct {
	ID  uint `gorm:"primary_key"`
	UserName string `json:"username" binding:"required" gorm:"column:username" `
	PassWord string `json:"password" binding:"required" gorm:"column:password"`
}

