package dto

type PasteCreate struct {
	Content string `json:"content" validate:"required"`
}