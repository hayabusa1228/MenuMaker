package structs


// user_info table
type UserInfo struct {
	ID  uint `gorm:"primary_key"`
	UserName string `json:"username" gorm:"column:username" `
	PassWord string `json:"password" gorm:"column:password"`
	MenuDesignID uint
	MenuDesign MenuDesign 
	Tables []Table 
}

// menu_designs table
type MenuDesign struct {
	ID uint
	ShopName string
	Menu []Menu 
}

type Menu struct {
	ID uint
	MenuDesignID uint
	Category string
	Content []Content 
}

type Content struct {
	ID  uint
	MenuID uint
	Name string `json:"name"`
	Image string `json:"image"`
	Price string `json:"price"`
}


type Table struct {
	ID uint
	UserInfoID uint
	TableNum string
	PassWord string 
	MenuPageURL string
	QRcodeURL string 
	OrderContents []OrderContent
	TotalPrice uint
}

type OrderContent struct {
	ID uint
	TableID uint
	Name string
	Number uint
}


// Designを取得する構造体
type MenuPostInfo struct {
	UserName string `json:"user_name"`
	ShopName string `json:"shop_name"`
	Menues []struct{
		Category string `json:"category"`
		Contents []Content `json:"contents"`
	} `json:"menues"`
}

// tableinfoを取得する構造体
type TablePostInfo struct {
	UserName string `json:"user_name"`
	TableInfos []struct{
		TableNum string `json:"table_num"`
		PassWord string `json:"password"`
		QRcodeURL string `json:"qr_url"`
	} `json:"table_infos"`
}