package models

import (
	"time"
)

type Paste struct {
	ID        string `gorm:"primarykey"`
	Content   string `json:"content" name:"content"`
	Language  string `json:"language" json:"language"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
