package models

import (
	"time"
)

type Paste struct {
	ID        string `gorm:"primarykey"`
	Content   string `json:"content" name:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
