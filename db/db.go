package db

import (
	"Pasterr/db/models"
	"Pasterr/log"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
)

var (
	DB *gorm.DB
	logger *log.Logger
)

func Connect() {
	logger = log.NewLogger("DB")
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	name := os.Getenv("DB_NAME")

	var err error

	DB, err = gorm.Open(mysql.Open(fmt.Sprintf(
		"%s:%s@tcp(%s:3306)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, name)), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}
}

func Migrate() {
	logger.Info("Migrating database "+os.Getenv("DB_NAME"))
	err := DB.AutoMigrate(&models.Paste{})
	if err != nil {
		panic(err)
	}
	logger.Info("Finished migration.")

}
