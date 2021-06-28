package app

import (
	"Pasterr/db"
	"Pasterr/log"
	"Pasterr/routes/controllers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"os"
	"time"
)

var app *fiber.App

func setupRoutes() {

	controllers.SetupPasteRoutes(app)


	app.Static("/", "./frontend/dist", fiber.Static{
		Compress: false,
		CacheDuration: time.Duration(-1),
	})

	app.Get("*", func(ctx *fiber.Ctx) error {
		return ctx.SendFile("./frontend/dist/index.html")
	})

}

func Start() {
	logger := log.NewLogger("Main")

	logger.Info("Booting up Pasterr on port: " + os.Getenv("APP_PORT") + "\n")

	app = fiber.New()
	app.Use(cors.New())


	db.Connect()
	db.Migrate()

	setupRoutes()

	err := app.Listen(":" + os.Getenv("APP_PORT"))
	if err != nil {
		panic(err)
	}

}
