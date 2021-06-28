package log

import (
	"fmt"
	"time"
)
//var (
//	Black   = Color("\033[1;30m%s\033[0m")
//	Red     = Color("\033[1;31m%s\033[0m")
//	Green   = Color("\033[1;32m%s\033[0m")
//	Yellow  = Color("\033[1;33m%s\033[0m")
//	Purple  = Color("\033[1;34m%s\033[0m")
//	Magenta = Color("\033[1;35m%s\033[0m")
//	Teal    = Color("\033[1;36m%s\033[0m")
//	White   = Color("\033[1;37m%s\033[0m")
//)


type Logger struct {
	prefix string ""
}

func NewLogger(prefix string) *Logger {

	return &Logger{
		prefix: prefix,
	}
}

func getDateTime() string {
	return time.Now().Format("02-01-2006 15:04:05")
}


func (l *Logger) Info(message interface{}) {
	fmt.Printf("[%s] [%s] [INFO] > %s\n", getDateTime(), l.prefix, message)
}

func (l *Logger) Debug(message interface{}) {
	fmt.Printf("[%s] [%s] [DEBUG] > %s\n", getDateTime(), l.prefix, message)
}
func (l *Logger) Error(message interface{}) {
	fmt.Printf("[%s] [%s] [ERROR] > %s\n", getDateTime(), l.prefix, message)

}