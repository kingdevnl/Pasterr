package main

import (
	"Pasterr/app"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	app.Start()
}
