package controllers

import (
	"Pasterr/db"
	"Pasterr/db/models"
	"Pasterr/dto"
	"errors"
	"github.com/gofiber/fiber/v2"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"strings"
)
import "github.com/go-playground/validator"

type PasteController struct{}

func (c PasteController) createPaste(ctx *fiber.Ctx) error {

	var input dto.PasteCreate
	err := ctx.BodyParser(&input)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString("Bad request, Missing body.")
	}

	err = validator.New().Struct(input)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": err.Error(),
		})
	}
	paste := models.Paste{
		ID:       strings.Split(uuid.NewV4().String(), "-")[0],
		Content:  input.Content,
		Language: input.Language,
	}

	db.DB.Create(&paste)
	return ctx.Status(fiber.StatusCreated).JSON(&paste)
}

func (c PasteController) viewPaste(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	var paste models.Paste

	err := db.DB.Where("id = ?", id).First(&paste).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"data": "Paste not found",
		})
	}

	return ctx.JSON(fiber.Map{
		"data": paste,
	})
}
func (c PasteController) viewPasteRaw(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	var paste models.Paste

	err := db.DB.Where("id = ?", id).First(&paste).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return ctx.Status(fiber.StatusNotFound).SendString("Paste " + id + " Not found.")
	}

	return ctx.SendString(paste.Content)
}

func SetupPasteRoutes(app *fiber.App) {
	controller := PasteController{}
	app.Post("/api/paste/create", controller.createPaste)
	app.Get("/api/paste/:id", controller.viewPaste)
	app.Get("/:id/raw", controller.viewPasteRaw)

}
