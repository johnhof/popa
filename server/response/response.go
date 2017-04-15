package response

import (
	"encoding/json"
	"net/http"
)

// Response definted the base response of the server
type Response struct {
	Status  int         `json:"status"`
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// New returns the byte array for a response
func New(status int, message string, data interface{}) *Response {
	success := false
	if status >= 200 && status < 300 {
		success = true
	}
	return &Response{status, success, message, data}
}

// Write converts the response to a byte array and writed it to the ResponseWriter
func (r *Response) Write(w http.ResponseWriter) {
	w.Write(r.Bytes())
}

// Bytes converts the response to a byte array and returns it
func (r *Response) Bytes() []byte {
	j, _ := json.Marshal(r)
	return j
}
