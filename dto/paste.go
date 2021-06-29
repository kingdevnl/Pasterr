package dto

type PasteCreate struct {
	Content string `json:"content" validate:"required"`
	Language string `json:"language" validate:"required"`
}